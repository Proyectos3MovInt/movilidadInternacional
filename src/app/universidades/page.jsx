// pages/admin/universidades/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUniversidades } from "@/lib/universidadesFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import { Descargar } from "@/components/Icons";

export default function UniversidadesPage() {
  const [universidades, setUniversidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    /* tu objeto de filtros */
  });
  const [activeTab, setActiveTab] = useState("universidades");
  const [calendarDate, setCalendarDate] = useState({ mes: "FEB", ano: "2025" });
  const router = useRouter();

  useEffect(() => {
    const fillTable = async () => {
      const data = await getUniversidades();
      const universidadesData = data.map((uni) => ({
        id: uni._id, // <-- guardamos el id
        nombre: uni.nombre || "Desconocida",
        pais: uni.pais || "No especificada",
        contacto: uni.contactoEmail || "No especificado",
        // titulación, año, estado… si vienes en la API puedes añadirlos aquí
      }));
      setUniversidades(universidadesData);
    };
    fillTable();
  }, []);

  const sortedUniversidades = () => {
    // ... tu lógica de filtros y ordenamiento
    return universidades; // simplified
  };

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Header
        filters={filters}
        setFilters={setFilters}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
      />

      <div className="w-full max-w-6xl px-6 py-4 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            {sortedUniversidades().map((uni) => (
              <Link
                key={uni.id}
                href={`/admin-universidad/${uni.id}`}
                className="block w-full cursor-pointer"
              >
                <div className="w-full px-6 py-4 bg-sky-100 flex justify-between items-center hover:bg-sky-200 rounded-lg">
                  <span className="text-base font-normal">{uni.nombre}</span>
                  <span className="text-base font-normal">{uni.pais}</span>
                  <span className="text-base font-normal">{uni.contacto}</span>

                  {/* Si tienes etiquetas de programa */}
                  <div className="flex gap-2">
                    <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded">
                      DIDI
                    </span>
                    <span className="bg-teal-400 text-white text-xs font-semibold px-3 py-1 rounded">
                      INSO
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="text-xs font-semibold">Página 1 de 1</div>
          </div>
        </div>
      </div>

      {/* Ahora: mismo wrapper que la tabla */}
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
