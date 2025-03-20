"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SolicitudesTable from '@/components/admin-dashboard/SolicitudesTable';
import SearchBar from '@/components/admin-dashboard/SearchBar';
import { getStudentsTable } from '@/lib/adminFunctions';
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getStudentsTable("outgoing");
      response_json.forEach((student) => {
        setSolicitudes((prevSolicitudes) => [
          ...prevSolicitudes,
          {
            nombre: student.nombreApellidos || "Desconocido",
            grado: student.titulacion || "No especificado",
            año: "2024-2025",
            estado: student.processStatus || "Pendiente",
            universidadDestino: student.universidadDestino1 || "No especificada",
            notaMedia: 7.6,
          },
        ]);
      });
      setTableFilled(true);
    };
    if (!tableFilled) {
      fillTable();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      {/* Menú superior */}
      <MenuSuperior logoSize="w-[2.4375rem] h-[2rem] flex-shrink-0" />

      {/* Contenido principal */}
      <div className="w-full max-w-6xl p-6">
        <h2 className="text-blue-600 font-bold text-xl mb-4">Solicitudes de alumnos</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} register={register} />
        <SolicitudesTable solicitudes={solicitudes} />
      </div>

      {/* Paginación */}
      <div className="flex space-x-2 mt-4">
        <Button className="px-4 py-2 bg-gray-200 rounded">1</Button>
      </div>
    </div>
  );
}
