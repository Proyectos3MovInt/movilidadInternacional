"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SolicitudesTable from '@/components/admin-dashboard/SolicitudesTable';
import { getStudentsTable } from '@/lib/adminFunctions';
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroAño, setFiltroAño] = useState(null);

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getStudentsTable("outgoing");
      const solicitudesData = response_json.map((student) => ({
        nombre: student.nombreApellidos || "Desconocido",
        grado: student.titulacion || "No especificado",
        año: "2024-2025",
        estado: student.processStatus || "Pendiente",
        universidadDestino: student.universidadDestino1 || "No especificada",
        notaMedia: 7.6,
      }));
      setSolicitudes(solicitudesData);
      setTableFilled(true);
    };
    if (!tableFilled) {
      fillTable();
    }
  }, [tableFilled]);

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const matchesSearchTerm = solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAño = filtroAño ? solicitud.año.includes(filtroAño) : true;
    return matchesSearchTerm && matchesAño;
  });

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="mt-6">
          <SolicitudesTable solicitudes={filteredSolicitudes} />
        </div>
      </div>
    </div>
  );
}