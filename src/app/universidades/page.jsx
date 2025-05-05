"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUniversidades } from "@/lib/universidadesFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import UniversidadesTable from "@/components/universidades/UniversidadesTable";
import { Descargar, SimboloMas } from "@/components/Icons";
import PopupNuevaUniversidad from "@/components/universidades/PopupNuevaUniversidad";

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
  const botonRef = useRef(null);
  const router = useRouter();

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
              top: `${botonRef.current?.offsetTop + 50}px`,
              left: `${botonRef.current?.offsetLeft + 300}px`,
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
        <UniversidadesTable universidades={sortedUniversidades()} />
        <div className="flex justify-center items-center space-x-2 mt-4">
          <div className="text-xs font-semibold">Página 1 de 1</div>
        </div>
      </div>

      {/* Botón de descarga */}
      <div className="w-full max-w-6xl px-6 mt-4">
        <div className="flex justify-start">
          <button className="h-10 px-4 bg-blue-600 rounded-lg flex items-center gap-2 text-white">
            <Descargar />
            Descargar excel
          </button>
        </div>
      </div>
    </div>
  );
}
