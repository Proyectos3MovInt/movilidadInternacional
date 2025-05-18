// app/universidades/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    columnas: ["nombre", "pais", "contactoEmail"],
    orden: "az",
  });
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const fillTable = async () => {
    const data = await getUniversidades();
    if (!data) return;

    const universidadesData = data.map((uni) => ({
      id: uni._id,
      nombre: uni.nombre || "Desconocida",
      pais: uni.pais || "No especificado",
      contactoEmail: uni.contactoEmail || "No especificado",
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
    fillTable();
  };

  const handleArchivarRedirect = () => {
    router.push("/universidades-archivadas");
  };

  const handleExcelExport = async (data) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const blob = await exportToExcel(data);
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Universidades${formattedDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  const columnasUniversidad = ["nombre", "contactoEmail", "pais"];
  const columnasLabels = {
    nombre: "Nombre",
    contactoEmail: "Email de Contacto",
    pais: "País"
  };

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen relative">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="w-[75rem] px-6 mt-2 flex justify-start relative">
        <div
          onClick={() => setMostrarPopup((prev) => !prev)}
          className="h-10 px-4 py-1 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-600 inline-flex justify-start items-center gap-2 cursor-pointer"
        >
          <SimboloMas className="w-5 h-5 text-blue-600" />
          <div className="text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
            Añadir universidad
          </div>
        </div>

        {mostrarPopup && (
          <div className="absolute z-50 mt-2" style={{ top: "100%", left: 0 }}>
            <PopupNuevaUniversidad onClose={handlePopupClose} />
          </div>
        )}
      </div>

      <div className="w-[80rem] px-6 pt-2 pb-0">
        <Header filters={filters} setFilters={setFilters} columnasDisponibles={columnasUniversidad} columnasLabels={columnasLabels} />
      </div>

      <div className="w-[75rem] px-6 pt-0 mt-[-1px]">
        <UniversidadesTable universidades={paginatedUniversidades()} columnasVisibles={filters.columnas} />
      </div>

      <div className="w-[75rem] px-6 flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <button
            onClick={handleArchivarRedirect}
            className="h-10 px-4 py-1 border-2 border-solid border-[#0065EF] bg-white rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer text-[#0065EF]"
          >
            <Archivar />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">
              Archivadas
            </span>
          </button>

          <button
            onClick={() => handleExcelExport(universidades)}
            className="h-10 px-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white"
          >
            <Descargar />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">
              Descargar excel
            </span>
          </button>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <div
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black flex justify-center items-center cursor-pointer ${currentPage === 1 ? "opacity-40 pointer-events-none" : ""}`}
          >
            <div className="text-center text-black text-xs font-semibold font-['Montserrat']">{"<"}</div>
          </div>

          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-10 p-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] bg-white text-black flex justify-center items-center cursor-pointer ${currentPage === i + 1 ? "font-bold" : ""}`}
            >
              <div className="text-center text-xs font-semibold font-['Montserrat']">{i + 1}</div>
            </div>
          ))}

          <div
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`w-9 h-10 p-2 bg-white rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black flex justify-center items-center cursor-pointer ${currentPage === totalPages ? "opacity-40 pointer-events-none" : ""}`}
          >
            <div className="text-center text-black text-xs font-semibold font-['Montserrat']">{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}