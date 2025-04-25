"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getUniversidades } from "@/lib/universidadesFunctions";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Header from "@/components/admin-dashboard/Header";
import { Descargar } from "@/components/Icons";

export default function UniversidadesPage() {
  const [universidades, setUniversidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    orden: { az: false, za: false },
    titulacion: {
      DIDI: false,
      INSO: false,
      ANIM: false,
      DIPI: false,
      MAS: false,
      ENTORNOS: false,
      MULTIPLATAFORMA: false,
    },
    ano: {
      "2024-2025": false,
      "2023-2024": false,
      "2022-2023": false,
      "2021-2022": false,
      "2020-2021": false,
      Anterior: false,
    },
    estado: { Pendiente: false, Rechazada: false, Aprobada: false },
  });
  const [activeTab, setActiveTab] = useState("universidades");
  const [calendarDate, setCalendarDate] = useState({ mes: "FEB", ano: "2025" });

  useEffect(() => {
    const fillTable = async () => {
      const response_json = await getUniversidades();
      const universidadesData = response_json.map((uni) => ({
        nombre: uni.nombre || "Desconocida",
        pais: uni.pais || "No especificada",
        contacto: uni.contacto || "No especificado",
      }));
      setUniversidades(universidadesData);
    };
    fillTable();
  }, []);

  const sortedUniversidades = () => {
    let resultados = [...universidades];

    if (searchTerm) {
      resultados = resultados.filter((universidad) =>
        universidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.pais.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universidad.contacto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const { orden, titulacion, ano, estado } = filters;

    if (Object.values(titulacion).some(Boolean)) {
      resultados = resultados.filter((uni) =>
        Object.keys(titulacion).some((key) => titulacion[key] && uni.nombre.includes(key))
      );
    }

    if (Object.values(ano).some(Boolean)) {
      resultados = resultados.filter((uni) => ano[uni.ano]);
    }

    if (Object.values(estado).some(Boolean)) {
      resultados = resultados.filter((uni) => estado[uni.estado]);
    }

    if (orden.az) {
      resultados = resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden.za) {
      resultados = resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    return resultados;
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
          <div className="w-[75rem]">
            {sortedUniversidades().map((uni, index) => (
              <div key={index} className="w-[1070px] px-6 py-4 bg-sky-100 inline-flex justify-center items-center gap-36 mt-2">
                <div className="w-[1016px] h-6 relative">
                  <div className="left-0 top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.nombre}</div>
                  <div className="left-[386px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.pais}</div>
                  <div className="left-[832px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.contacto}</div>
                  <div className="left-[579px] top-0 absolute inline-flex justify-start items-center gap-2">
                    <div className="w-16 h-6 px-4 py-1 bg-rose-500 rounded flex justify-center items-center gap-2">
                      <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">DIDI</div>
                    </div>
                    <div className="w-16 h-6 px-4 py-1 bg-teal-400 rounded flex justify-center items-center gap-2">
                      <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">INSO</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="text-xs font-semibold font-['Montserrat'] leading-none">
              Página 1 de 1
            </div>
          </div>
        </div>
      </div>

      <div className="w-[75rem] flex justify-between items-center mt-4">
        <div className="flex justify-start">
          <button className="h-10 px-4 py-1 bg-blue-600 rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer text-white">
            <Descargar />
            <span className="text-base font-normal font-['Montserrat'] leading-normal">Descargar excel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
