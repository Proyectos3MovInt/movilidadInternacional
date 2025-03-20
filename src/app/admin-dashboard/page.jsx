"use client";

// DE MOMENTO PARA ALUMNOS OUTGOING

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/formulario/InputField';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/admin-dashboard/Sidebar';
import SolicitudesTable from '@/components/admin-dashboard/SolicitudesTable';
import SearchBar from '@/components/admin-dashboard/SearchBar';
import { getStudentsTable } from '@/lib/adminFunctions';

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getStudentsTable("outgoing");
      // Agregar cada estudiante al estado de manera segura
      response_json.forEach((student) => {
        setSolicitudes((prevSolicitudes) => [
          ...prevSolicitudes,
          {
            nombre: student.nombreApellidos || "Desconocido",
            grado: student.titulacion || "No especificado",
            año: new Date().getFullYear(),
            estado: student.processStatus || "Pendiente",
            universidadDestino: student.universidadDestino1 || "No especificada",
            notaMedia: null,
          },
        ]);
      });
      setTableFilled(true);
    };
    // Cuando redirijes con el middleware, el useEffect se carga dos veces por lo que aparecen los registros duplicados. Con esto lo evitamos.
    if(!tableFilled){
      fillTable();
    }
  }, []);


  const [filtroAño, setFiltroAño] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para actualizar la nota media
  const handleNotaChange = (index, value) => {
    const updatedSolicitudes = [...solicitudes];
    updatedSolicitudes[index].notaMedia = value ? parseFloat(value) : null;
    setSolicitudes(updatedSolicitudes);
  };

  const handleSort = (key) => {
    const sorted = [...solicitudes].sort((a, b) =>
      typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]
    );
    setSolicitudes(sorted);
  };

  const solicitudesFiltradas = solicitudes.filter(s =>
    (!filtroAño || s.año === filtroAño) &&
    (searchTerm === "" || s.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar setFiltroAño={setFiltroAño} />
      <div className="flex-1 p-6 bg-white">
        <div className="relative flex items-center bg-gray-200 p-3 rounded mb-4 shadow-inner">
          <div className="absolute left-4">
            <svg width="30" height="30" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.597 25.1655H26.7897L26.1492 24.5478C28.8943 21.3451 30.3127 16.9757 29.5349 12.3318C28.4597 5.97218 23.1524 0.893611 16.747 0.115813C7.07024 -1.07376 -1.07376 7.07024 0.115813 16.747C0.893611 23.1524 5.97218 28.4597 12.3318 29.5349C16.9757 30.3127 21.3451 28.8943 24.5478 26.1492L25.1655 26.7897V28.597L34.888 38.3194C35.8259 39.2574 37.3586 39.2574 38.2966 38.3194C39.2345 37.3815 39.2345 35.8488 38.2966 34.9108L28.597 25.1655ZM14.8711 25.1655C9.17487 25.1655 4.57671 20.5673 4.57671 14.8711C4.57671 9.17487 9.17487 4.57671 14.8711 4.57671C20.5673 4.57671 25.1655 9.17487 25.1655 14.8711C25.1655 20.5673 20.5673 25.1655 14.8711 25.1655Z" fill="black" />
            </svg>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} register={register} className="pl-12 w-full border-none bg-transparent outline-none text-gray-700" />
        </div>
        <div className="flex space-x-2 mb-4">
          <Button onClick={() => handleSort('nombre')} className="p-2 border rounded">Alfabéticamente</Button>
          <Button onClick={() => handleSort('grado')} className="p-2 border rounded">Por grado</Button>
          <Button onClick={() => handleSort('año')} className="p-2 border rounded">Por año de salida</Button>
          <Button onClick={() => handleSort('estado')} className="p-2 border rounded">Por estado</Button>
          <Button onClick={() => handleSort('notaMedia')} className="p-2 border rounded">Por Nota Media</Button>
        </div>
        <SolicitudesTable solicitudes={solicitudesFiltradas} handleNotaChange={handleNotaChange} />
      </div>
    </div>
  );
}
