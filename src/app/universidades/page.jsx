"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import UniversidadesTable from '@/components/universidades/UniversidadesTable'; 
import { getUniversidades } from '@/lib/universidadesFunctions'; 
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';
import SearchBar from '@/components/admin-dashboard/SearchBar';

export default function UniversidadesPage() {
  const { register, handleSubmit, reset } = useForm();
  const [universidades, setUniversidades] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // Controlar visibilidad del formulario
  const [newUniversidad, setNewUniversidad] = useState(null); // Nuevo estado para la universidad creada

  // Obtener universidades desde la API
  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getUniversidades(); 
      const universidadesData = response_json.map((uni) => ({
        nombre: uni.nombre || "Desconocida",
        pais: uni.pais || "No especificada",
        contacto: uni.contacto || "No especificado",
      }));
      setUniversidades(universidadesData);
      setTableFilled(true); 
    };
    if (!tableFilled) {
      fillTable();
    }
  }, [tableFilled, newUniversidad]); // Se actualiza cuando se crea una nueva universidad

  // Función para ordenar y filtrar universidades
  const sortedUniversidades = () => {
    let resultados = [...universidades];

    if (searchTerm) {
      resultados = resultados.filter((universidad) =>
        universidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.pais.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.contacto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return resultados;
  };

  // Función para agregar universidad
  const onSubmit = (data) => {
    setUniversidades(prevState => [
      ...prevState,
      {
        nombre: data.nombre,
        pais: data.pais,
        contacto: data.contacto
      }
    ]);
    setNewUniversidad(data); // Guarda la nueva universidad
    reset(); // Resetea el formulario
    setIsFormVisible(false); // Oculta el formulario después de agregar
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

        {/* Botón para mostrar el formulario */}
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setIsFormVisible(true)} // Muestra el formulario
        >
          Crear Universidad
        </Button>
      </div>

      {/* Formulario para crear universidad */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md w-[75rem] mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre de la universidad
              </label>
              <input
                id="nombre"
                {...register('nombre', { required: true })}
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                id="pais"
                {...register('pais', { required: true })}
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="País"
              />
            </div>
            <div>
              <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">
                Contacto
              </label>
              <input
                id="contacto"
                {...register('contacto', { required: true })}
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Contacto"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Crear Universidad
              </Button>
              <Button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

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
