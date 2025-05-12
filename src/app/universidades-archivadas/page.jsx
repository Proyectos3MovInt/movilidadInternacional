"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import { getUniversidadesArchivadas } from "@/lib/universidadesFunctions"; // Esta función debe devolver las universidades archivadas
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import UniversidadesTable from "@/components/universidades/UniversidadesTable";
import { Descargar, SimboloMas } from "@/components/Icons";
import PopupNuevaUniversidad from "@/components/universidades/PopupNuevaUniversidad";

export default function UniversidadesArchivadasPage() {
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
  const router = useRouter();

  const fillTable = async () => {
    const data = await getUniversidadesArchivadas(); // Obtener universidades archivadas
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

      {/* Tabla de universidades archivadas */}
      <div className="w-full max-w-6xl px-6 py-4 mt-6">
        <UniversidadesTable universidades={paginatedUniversidades()} />
      </div>

      {/* Botón Descargar Excel */}
      <div className="w-[69rem] flex justify-start items-center gap-4 mt-4">
      <button className="h-10 px-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white">
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
