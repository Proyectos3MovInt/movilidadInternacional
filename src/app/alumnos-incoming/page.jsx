"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SolicitudesTable from "@/components/admin-dashboard/SolicitudesTable";
import { getStudentsTable } from "@/lib/adminFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import { Descargar } from "@/components/Icons";
import { exportToExcel } from "@/lib/adminFunctions";

const titulacionMap = {
  ANIM: ["Grado en Animación (Inglés)", "Grado en Animación (Español)"],
  DIPI: [
    "Grado en Diseño de Productos Interactivos (Inglés)",
    "Grado en Diseño de Productos Interactivos (Español)",
  ],
  DIDI: ["Grado en Diseño Digital"],
  INSO: [
    "Grado en Ingeniería del Software (Inglés)",
    "Grado en Ingeniería del Software (Español)",
  ],
  MAS: [
    "Doble grado en Ingeniería del Software y Matemática Computacional o Física Computacional",
  ],
  ENTORNOS: ["Grado en Efectos Visuales"],
  MULTIPLATAFORMA: [],
};

export default function AlumnosIncoming() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("incoming");

  const [filters, setFilters] = useState({
    columnas: ["nombreApellidos", "titulacion", "dniNie", "semestreIntercambio", "titulacion", "processStatus"],
    orden: "az",
  });

  const [calendarDate, setCalendarDate] = useState({ mes: "FEB", ano: "2025" });

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const columnasDisponibles = ["nombreApellidos", "dniNie", "titulacion", "semestreIntercambio", "processStatus"]
  const columnasLabels = {
    nombreApellidos: "Nombre y Apellidos",
    dniNie: "DNI/NIE",
    titulacion: "Titulación",
    semestreIntercambio: "Semestre de Intercambio",
    processStatus: "Estado del Proceso"
  };

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getStudentsTable(activeTab);
      const studentsArray = Array.isArray(response_json)
        ? response_json
        : response_json?.data || [];

      const solicitudesData = studentsArray.map((student) => ({
        id: student._id,
        nombre: student.nombreApellidos || "Desconocido",
        grado: student.titulacion || "No especificado",
        dniNie: student.dniNie || "N/A",
        semestre: student.semestreIntercambio || "N/A",
        ano: "2024-2025",
        estado: student.processStatus || "Pendiente",
        universidadDestino: "",
        notaMedia: 7.6,
      }));

      setSolicitudes(solicitudesData);
      setCurrentPage(1); // reiniciar página al cambiar pestaña
    };

    fillTable();
  }, [activeTab]);

  const sortedSolicitudes = () => {
    let resultados = [...solicitudes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      resultados = resultados.filter((s) =>
        s.nombre.toLowerCase().includes(term) ||
        s.grado.toLowerCase().includes(term) ||
        s.estado.toLowerCase().includes(term) ||
        s.universidadDestino.toLowerCase().includes(term)
      );
    }

    if (filters.orden === "az") {
      resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filters.orden === "za") {
      resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }
    return resultados;
  }

  const paginatedSolicitudes = () => {
    const sorted = sortedSolicitudes();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedSolicitudes().length / itemsPerPage);
  
  const handleExcelExport = async (solicitudes) => {

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const blob = await exportToExcel(solicitudes);
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Alumnos_Incoming${formattedDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  }
  

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div>
        <Header
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filters={filters}
          setFilters={setFilters}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
          columnasDisponibles={columnasDisponibles}
          columnasLabels={columnasLabels}
        />
      </div>

      <div className="w-[72rem]">
        <SolicitudesTable solicitudes={paginatedSolicitudes()} columnasDisponibles={filters.columnas}/>
      </div>

      {/* Botón Descargar Excel */}
      <div className="w-[72rem] flex justify-between items-center mt-4">
        <div className="flex justify-start">
          <button onClick={() => handleExcelExport(solicitudes)}
          className="h-10 px-12 py-2.5 bg-blue-600 rounded-lg flex items-center gap-2 cursor-pointer
              text-white hover:bg-[#003366] transition-colors duration-200">
            <Descargar />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">
              Descargar excel
            </span>
          </button>
        </div>

        {/* Paginación alineada a la derecha */}
        <div className="flex justify-center items-center space-x-2">
          {/* Botón anterior */}
          <div
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex flex-col justify-center items-center cursor-pointer hover:bg-blue-600 hover:outline-blue-600 hover:text-white transition-colors duration-200 ${
              currentPage === 1 ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <div className="text-center text-xs font-semibold font-['Montserrat'] leading-none">{"<"}</div>
          </div>

          {/* Botones numéricos */}
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-10 p-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] ${
                currentPage === i + 1
                  ? "bg-white"
                  : "bg-white"
              } inline-flex flex-col justify-center items-center cursor-pointer hover:bg-blue-600 hover:outline-blue-600 hover:text-white transition-colors duration-200`}
            >
              <div className="text-center text-xs font-semibold font-['Montserrat'] leading-none">
                {i + 1}
              </div>
            </div>
          ))}

          {/* Botón siguiente */}
          <div
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex flex-col justify-center items-center cursor-pointer hover:bg-blue-600 hover:outline-blue-600 hover:text-white transition-colors duration-200 ${
              currentPage === totalPages ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <div className="text-center text-xs font-semibold font-['Montserrat'] leading-none">{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
