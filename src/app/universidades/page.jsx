"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import UniversidadesTable from '@/components/universidades/UniversidadesTable';
import { getUniversidades } from '@/lib/universidadesFunctions'; 
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';
import SearchBar from '@/components/admin-dashboard/SearchBar';

export default function UniversidadesPage() {
  const { register } = useForm();
  const [universidades, setUniversidades] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroAño, setFiltroAño] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); // Estado para ordenar universidades
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Controla la visibilidad del desplegable de filtros

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getUniversidades(); 
      const universidadesData = response_json.map((uni) => ({
        nombre: uni.nombre || "Desconocida",
        ubicacion: uni.ubicacion || "No especificada",
        programa: uni.programa || "No especificado",
      }));
      setUniversidades(universidadesData);
      setTableFilled(true); 
    };
    if (!tableFilled) {
      fillTable();
    }
  }, [tableFilled]);

  const sortedUniversidades = () => {
    let resultados = [...universidades];

    // Filtrar por búsqueda
    if (searchTerm) {
      resultados = resultados.filter((universidad) =>
        universidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.programa.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar si hay sortOrder
    if (sortOrder) {
      resultados.sort((a, b) => {
        if (a[sortOrder] < b[sortOrder]) return -1;
        if (a[sortOrder] > b[sortOrder]) return 1;
        return 0;
      });
    }

    return resultados;
  };

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      {/* Menú superior con buscador */}
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Fila de título y botones */}
      <div className="w-full max-w-6xl px-6 py-4 mt-6 flex justify-between items-center">
        <div
          style={{
            color: 'var(--Azul-base-u-tad, #0065EF)',
            fontFamily: 'Montserrat',
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: '1.5rem',
          }}
        >
          Universidades
        </div>

        {/* Contenedor de filtros y calendario */}
        <div className="flex items-center gap-4">
          <select
            className="px-4 py-2 border border-slate-900 text-slate-900 rounded-lg bg-transparent hover:bg-transparent"
            onChange={(e) => {
              const selectedFilter = e.target.value;
              setIsFilterOpen(false);
              if (selectedFilter === "nombre") setSortOrder("nombre");
              if (selectedFilter === "ubicacion") setSortOrder("ubicacion");
              if (selectedFilter === "programa") setSortOrder("programa");
            }}
            defaultValue=""
            style={{
              marginRight: '1.44rem',
              height: '40px',
              width: 'auto',
            }}
          >
            <option value="" disabled>Filtros</option>
            <option value="nombre">Ordenar por Nombre</option>
            <option value="ubicacion">Ordenar por Ubicación</option>
            <option value="programa">Ordenar por Programa</option>
          </select>

          <Button
            className="px-4 py-2 border border-slate-900 text-slate-900 rounded-lg flex items-center gap-2 bg-transparent hover:bg-transparent"
            disabled
            style={{
              height: '40px',
            }}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M3 4H5V2H7V4H17V2H19V4H21V6H3V4ZM19 8H5V18H19V8Z" fill="#1C1B1F" />
            </svg>
            <span>Febrero 2025</span>
          </Button>
        </div>
      </div>

      {/* Tabla de universidades */}
      <div className="mt-6 bg-sky-100 p-6 rounded-lg shadow-md w-[75rem]">
        <UniversidadesTable universidades={sortedUniversidades()} />
      </div>

      {/* Paginación */}
      <div className="flex space-x-2 mt-4 justify-center">
        <Button className="px-4 py-2 bg-gray-200 rounded">1</Button>
      </div>
    </div>
  );
}
