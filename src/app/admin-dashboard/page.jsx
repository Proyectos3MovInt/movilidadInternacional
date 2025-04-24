"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SolicitudesTable from "@/components/admin-dashboard/SolicitudesTable";
import { getStudentsTable } from "@/lib/adminFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import * as Icons from "@/components/Icons";

export default function AdminDashboard() {
  const { register } = useForm();
  const [solicitudes, setSolicitudes] = useState([]);
  const [tableFilled, setTableFilled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("outgoing");

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getStudentsTable(activeTab);

      console.log("Respuesta de getStudentsTable:", response_json);

      const studentsArray = Array.isArray(response_json)
        ? response_json
        : response_json?.data || [];

      const solicitudesData = studentsArray.map((student) => ({
        id: student._id,
        nombre: student.nombreApellidos || "Desconocido",
        grado: student.titulacion || "No especificado",
        ano: "2024-2025",
        estado: student.processStatus || "Pendiente",
        universidadDestino: student.universidadDestino1 || "No especificada",
        notaMedia: 7.6,
      }));

      setSolicitudes(solicitudesData);
      setTableFilled(true);
    };

    fillTable();
  }, [activeTab]);

  // Filtrado y ordenación
  const sortedSolicitudes = () => {
    let resultados = [...solicitudes];

    if (searchTerm) {
      resultados = resultados.filter((solicitud) =>
        solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.universidadDestino.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
      {/* Menú superior */}
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Header con tabs y filtros */}
      <Header
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tabla de solicitudes */}
      <div className="mt-6 bg-sky-100 p-6 rounded-lg shadow-md w-[75rem]">
        <SolicitudesTable solicitudes={sortedSolicitudes()} />
      </div>

      {/* Paginación */}
      <div className="flex space-x-2 mt-4 justify-center">
        <Button className="px-4 py-2 bg-gray-200 rounded">1</Button>
      </div>
    </div>
  );
}
