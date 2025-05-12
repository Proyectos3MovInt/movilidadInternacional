"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";  // Importamos useRouter
import { getUniversidades } from "@/lib/universidadesFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import UniversidadesTable from "@/components/universidades/UniversidadesTable";
import { Descargar, SimboloMas, Archivar } from "@/components/Icons";
import PopupNuevaUniversidad from "@/components/universidades/PopupNuevaUniversidad";
import { exportToExcel } from "@/lib/adminFunctions";

export default function UniversidadesPage() {
  const [universidades, setUniversidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    titulacion: "",
    orden: "",
  });
  const [activeTab, setActiveTab] = useState("universidades");
  const [calendarDate, setCalendarDate] = useState({ mes: "FEB", ano: "2025" });
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const botonRef = useRef(null);
  const router = useRouter();  // Usamos el hook useRouter para la navegación

  const fillTable = async () => {
    const data = await getUniversidades();
    if (!data) return;

    const universidadesData = data.map((uni) => ({
      id: uni._id,
      nombre: uni.nombre || "Desconocida",
      pais: uni.pais || "No especificada",
      contacto: uni.contactoEmail || "No especificado",
      titulacion: uni.titulaciones || [],
    }));

    setUniversidades(universidadesData);
  };

  useEffect(() => {
    fillTable();
  }, []);

  const sortedUniversidades = () => {
    let sorted = [...universidades];

    if (filters.orden === "az") {
      sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filters.orden === "za") {
      sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    if (filters.titulacion) {
      sorted = sorted.filter((uni) =>
        uni.titulacion.includes(filters.titulacion)
      );
    }

    return sorted;
  };

  const paginatedUniversidades = () => {
    const sorted = sortedUniversidades();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedUniversidades().length / itemsPerPage);

  const handlePopupClose = () => {
    setMostrarPopup(false);
    fillTable(); // Recarga la tabla al cerrar el popup
  };

  // Función para redirigir a la página de universidades archivadas
  const handleArchivarRedirect = () => {
    router.push("/universidades-archivadas");  // Redirige a la página de universidades archivadas
  };

  const handleExcelExport = async (solicitudes) => {

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const blob = await exportToExcel(solicitudes);
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Universidades${formattedDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  }

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen relative">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Botón para añadir universidad */}
      <div className="w-full max-w-6xl px-6 mt-2 flex justify-start relative">
        <div
          ref={botonRef}
          onClick={() => setMostrarPopup(!mostrarPopup)}
          className="h-10 px-4 py-1 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-600 inline-flex justify-start items-center gap-2 cursor-pointer"
        >
          <SimboloMas className="w-5 h-5 text-blue-600" />
          <div className="text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
            Añadir universidad
          </div>
        </div>

        {mostrarPopup && (
          <div
            className="absolute z-50"
            style={{
              top: `${botonRef.current?.offsetTop + 50}px}`,
              left: `${botonRef.current?.offsetLeft + 300}px}`,
            }}
          >
            <PopupNuevaUniversidad onClose={handlePopupClose} />
          </div>
        )}
      </div>

      {/* Header alineado con tabla */}
      <div className="w-full max-w-6xl px-6 mt-2 ml-[100px]">
        <Header
          filters={filters}
          setFilters={(newFilters) => {
            setFilters(newFilters);
          }}
        />
      </div>

      {/* Tabla de universidades */}
      <div className="w-full max-w-6xl px-6 py-4 mt-6">
        <UniversidadesTable universidades={paginatedUniversidades()} />
      </div>

      {/* Botones Archivar y Descargar Excel */}
      <div className="w-[69rem] flex justify-start items-center gap-4 mt-4">
        {/* Botón Archivar - Redirige a la página de universidades archivadas */}
        <button
          onClick={handleArchivarRedirect}  // Llama a la función para redirigir
          className="h-10 px-4 py-1 border-2 border-solid border-[#0065EF] bg-white rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer text-[#0065EF]"
        >
          <Archivar />
          <span className="text-base font-normal font-['Montserrat'] leading-normal">
            Archivadas
          </span>
        </button>

        {/* Botón Descargar Excel */}
        <button onClick={() => handleExcelExport(universidades)}  className="h-10 px-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white">
          <Descargar />
          <span className="text-base font-normal font-['Montserrat'] leading-normal">
            Descargar excel
          </span>
        </button>
      </div>

      {/* Paginación alineada a la derecha */}
      <div className="w-[75rem] flex justify-end items-center mt-4">
        {/* Botón anterior */}
        <div
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex flex-col justify-center items-center cursor-pointer ${
            currentPage === 1 ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          <div className="text-center text-black text-xs font-semibold font-['Montserrat'] leading-none">{"<"}</div>
        </div>

        {/* Botones numéricos */}
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-9 h-10 p-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] ${
              currentPage === i + 1
                ? "bg-white text-black"
                : "bg-white text-black"
            } inline-flex flex-col justify-center items-center cursor-pointer`}
          >
            <div className="text-center text-xs font-semibold font-['Montserrat'] leading-none">
              {i + 1}
            </div>
          </div>
        ))}

        {/* Botón siguiente */}
        <div
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex flex-col justify-center items-center cursor-pointer ${
            currentPage === totalPages ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          <div className="text-center text-black text-xs font-semibold font-['Montserrat'] leading-none">{">"}</div>
        </div>
      </div>
    </div>
  );
}
