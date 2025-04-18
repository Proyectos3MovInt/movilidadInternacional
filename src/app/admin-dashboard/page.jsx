"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SolicitudesTable from '@/components/admin-dashboard/SolicitudesTable';
import { getStudentsTable } from '@/lib/adminFunctions';
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';
import SearchBar from '@/components/admin-dashboard/SearchBar';
import * as Icons from '@/components/Icons';
import TableFilter from "@/components/admin-dashboard/TableFilter";

export default function AdminDashboard() {
    const { register } = useForm();
    const [solicitudes, setSolicitudes] = useState([]);
    const [tableFilled, setTableFilled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtroAno, setFiltroAno] = useState(null);
    const [sortOrder, setSortOrder] = useState(null); // Estado para ordenar solicitudes
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Controla la visibilidad del desplegable de filtros
    const [selectedFields, setSelectedFields] = useState({});
    //open del filter TEST!
    //const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fillTable = async () => {
            const response_json = await getStudentsTable("outgoing");
            const solicitudesData = response_json.data.map((student) => ({
                id: student._id,
                nombre: student.nombreApellidos || "Desconocido",
                grado: student.titulacion || "No especificado",
                ano: "2024-2025",
                estado: student.processStatus || "Pendiente",
                universidadDestino: student.universidadDestino1 || "No especificada",
                notaMedia: 7.6,
            }));
            setSolicitudes(solicitudesData);
            setTableFilled(true); // Marca como cargada la tabla
        };
        if (!tableFilled) {
            fillTable();
        }
    }, [tableFilled]);

    // Función para ordenar y filtrar las solicitudes
    const sortedSolicitudes = () => {
        let resultados = [...solicitudes];

        // Filtrar por búsqueda
        if (searchTerm) {
            resultados = resultados.filter((solicitud) =>
                solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                solicitud.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                solicitud.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                solicitud.universidadDestino.toLowerCase().includes(searchTerm.toLowerCase())
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
            <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

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
                    Solicitudes de alumnos
                </div>

                {/* Contenedor de filtros y calendario */}
                <div className="flex items-center gap-4">
                    <TableFilter solicitudesData={solicitudes} selectedFields={selectedFields} setSelectedFields={setSelectedFields}/>


                    <select
                        className="px-4 py-2 border border-slate-900 text-slate-900 rounded-lg bg-transparent hover:bg-transparent"
                        onChange={(e) => {
                            const selectedFilter = e.target.value;
                            setIsFilterOpen(false);
                            if (selectedFilter === "nombre") setSortOrder("nombre");
                            if (selectedFilter === "grado") setSortOrder("grado");
                            if (selectedFilter === "ano") setSortOrder("ano");
                            if (selectedFilter === "estado") setSortOrder("estado");
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
                        <option value="grado">Ordenar por Grado</option>
                        <option value="ano">Ordenar por Año</option>
                        <option value="estado">Ordenar por Estado</option>
                    </select>

                    <Button
                        className="px-4 py-2 border border-slate-900 text-slate-900 rounded-lg flex items-center gap-2 bg-transparent hover:bg-transparent"
                        disabled
                        style={{
                            height: '40px',
                        }}
                    >
                        <Icons.Calendar/>
                        <span>Febrero 2025</span>
                    </Button>
                </div>
            </div>

            {/* Tabla de solicitudes */}
            <div className="mt-6 bg-sky-100 p-6 rounded-lg shadow-md w-[75rem]">
                <SolicitudesTable solicitudes={sortedSolicitudes()} selectedFields={selectedFields}/>
            </div>

            {/* Paginación */}
            <div className="flex space-x-2 mt-4 justify-center">
                <Button className="px-4 py-2 bg-gray-200 rounded">1</Button>
            </div>


        </div>
    );
}