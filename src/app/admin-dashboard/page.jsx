"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/formulario/InputField';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([
    { nombre: 'Juan Pérez', grado: 'Licenciatura', año: 2025, estado: 'Pendiente' },
    { nombre: 'Ana Gómez', grado: 'Maestría', año: 2024, estado: 'Aprobado' },
  ]);

  const handleSort = (key) => {
    const sorted = [...solicitudes].sort((a, b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key]);
      }
      return a[key] - b[key];
    });
    setSolicitudes(sorted);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-200 p-6">
        <div className="mb-6 text-center">
          <div className="h-16 w-16 bg-gray-400 rounded-full mx-auto"></div>
          <p className="mt-2 font-semibold">Nombre del Admin</p>
        </div>
        <nav>
          <ul className="space-y-4">
            <li className="bg-gray-300 p-3 rounded">Solicitudes</li>
            <li className="p-3">Incidencias</li>
            <li className="p-3">Universidades</li>
            <li className="p-3">Histórico</li>
            <ul className="pl-4 mt-2 space-y-1">
              <li>2025</li>
              <li>2024</li>
              <li>2023</li>
            </ul>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <div className="flex items-center border p-3 rounded mb-4">
          <InputField
            label=""
            name="search"
            register={register}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <Button onClick={() => handleSort('nombre')} className="p-2 border rounded">Alfabéticamente</Button>
          <Button onClick={() => handleSort('grado')} className="p-2 border rounded">Por grado</Button>
          <Button onClick={() => handleSort('año')} className="p-2 border rounded">Por año de salida</Button>
          <Button onClick={() => handleSort('estado')} className="p-2 border rounded">Por estado</Button>
        </div>
        <div className="border p-4 rounded">
          <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-2">
            <span>Nombre</span>
            <span>Grado</span>
            <span>Año de salida</span>
            <span>Estado</span>
          </div>
          <div className="space-y-2">
            {solicitudes.map((solicitud, index) => (
              <div key={index} className="grid grid-cols-4 p-2 border rounded">
                <span>{solicitud.nombre}</span>
                <span>{solicitud.grado}</span>
                <span>{solicitud.año}</span>
                <span className="px-4 py-1 border rounded text-center">{solicitud.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}