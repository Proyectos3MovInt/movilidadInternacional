"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUniversidadesArchivadas } from "@/lib/universidadesFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/universidades/HeaderArchivadas";
import UniversidadesTable from "@/components/universidades/UniversidadesTable";
import { Descargar, Archivar } from "@/components/Icons";

export default function UniversidadesArchivadasPage() {
  const [universidades, setUniversidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ titulacion: "", orden: "" });
  const [calendarDate, setCalendarDate] = useState({ mes: "FEB", ano: "2025" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const fillTable = async () => {
    const data = await getUniversidadesArchivadas();
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

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen relative">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Header alineado con la tabla */}
      <div className="w-[80rem] px-6 pt-2 pb-0">
        <Header
          filters={filters}
          setFilters={setFilters}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
        />
      </div>

      {/* Tabla en contacto con la línea azul */}
      <div className="w-[75rem] px-6 pt-0 mt-[-1px]">
        <UniversidadesTable archived={true} universidades={paginatedUniversidades()} />
      </div>

      {/* Botones Activas, Descargar Excel y Paginación alineados */}
      <div className="w-[75rem] px-6 flex justify-between items-center mt-4">
        <div className="flex gap-4">
          {/* Botón Activas */}
          <button
            onClick={() => router.push("/universidades")}
            className="h-10 px-4 py-1 border-2 border-solid border-[#0065EF] bg-white rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer text-[#0065EF]"
          >
            <Archivar className="w-4 h-4 text-[#0065EF]" />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">
              Activas
            </span>
          </button>

          {/* Botón Descargar Excel */}
          <button className="h-10 px-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white">
            <Descargar />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">
              Descargar excel
            </span>
          </button>
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center space-x-2">
          <div
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <div className="text-center text-black text-xs font-semibold font-['Montserrat']">
              {"<"}
            </div>
          </div>

          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-10 p-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] bg-white text-black flex justify-center items-center cursor-pointer ${
                currentPage === i + 1 ? "font-bold" : ""
              }`}
            >
              <div className="text-center text-xs font-semibold font-['Montserrat']">
                {i + 1}
              </div>
            </div>
          ))}

          <div
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black flex justify-center items-center cursor-pointer ${
              currentPage === totalPages ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <div className="text-center text-black text-xs font-semibold font-['Montserrat']">
              {">"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
