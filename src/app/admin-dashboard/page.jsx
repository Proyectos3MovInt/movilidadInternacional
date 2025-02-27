"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/formulario/InputField';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/admin-dashboard/Sidebar';
import SolicitudesTable from '@/components/admin-dashboard/SolicitudesTable';

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([
    { nombre: 'Juan Pérez', grado: 'Licenciatura', año: 2025, estado: 'Pendiente' },
    { nombre: 'Ana Gómez', grado: 'Maestría', año: 2024, estado: 'Aprobado' },
    { nombre: 'Carlos Ruiz', grado: 'Doctorado', año: 2023, estado: 'Rechazado' },
  ]);

  const [filtroAño, setFiltroAño] = useState(null);

  const handleSort = (key) => {
    const sorted = [...solicitudes].sort((a, b) => (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]));
    setSolicitudes(sorted);
  };

  const solicitudesFiltradas = filtroAño ? solicitudes.filter(s => s.año === filtroAño) : solicitudes;

  return (
    <div className="flex h-screen">
      <Sidebar setFiltroAño={setFiltroAño} />
      <div className="flex-1 p-6 bg-white">
        <div className="flex items-center border p-3 rounded mb-4">
          <InputField label="" name="search" register={register} className="w-full border p-2 rounded" />
        </div>
        <div className="flex space-x-2 mb-4">
          <Button onClick={() => handleSort('nombre')} className="p-2 border rounded">Alfabéticamente</Button>
          <Button onClick={() => handleSort('grado')} className="p-2 border rounded">Por grado</Button>
          <Button onClick={() => handleSort('año')} className="p-2 border rounded">Por año de salida</Button>
          <Button onClick={() => handleSort('estado')} className="p-2 border rounded">Por estado</Button>
        </div>
        <SolicitudesTable solicitudes={solicitudesFiltradas} />
      </div>
    </div>
  );
}
