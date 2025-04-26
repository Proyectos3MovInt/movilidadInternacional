"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as Icons from "@/components/Icons";

const Header = ({ filters, setFilters, calendarDate, setCalendarDate }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getTabStyle = (tabPath) =>
    pathname.includes(tabPath)
      ? "text-blue-600 font-semibold"
      : "text-neutral-500 font-semibold";

  const getIconClass = (tabPath) =>
    pathname.includes(tabPath) ? "text-blue-600" : "text-neutral-500";

  const handleCheckboxChange = (category, key) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  return (
    <div className="left-[-80px] w-full max-w-6xl px-6 py-4 flex flex-col items-start gap-4 relative z-10">
      <div className="w-full flex justify-between items-center">
        <div className="w-[696px] h-10 relative">
          <div className="left-[8px] top-0 absolute inline-flex justify-start items-center gap-26">
            <div onClick={() => router.push("/admin-dashboard")} className="flex cursor-pointer items-center gap-2">
              <Icons.Person className={`w-5 h-5 ${getIconClass("admin-dashboard")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("admin-dashboard")}`}>Outgoing</div>
            </div>
            <div onClick={() => router.push("/incoming")} className="flex cursor-pointer items-center gap-2">
              <Icons.People className={`w-5 h-5 ${getIconClass("incoming")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("incoming")}`}>Incoming</div>
            </div>
            <div onClick={() => router.push("/universidades")} className="flex cursor-pointer items-center gap-2">
              <Icons.Universidad className={`w-5 h-5 ${getIconClass("universidades")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("universidades")}`}>Universidades</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[80px] relative z-50">
          <div className="relative">
            <button
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsCalendarOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2 bg-white"
            >
              <Icons.Filtros />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">Filtros</span>
              <Icons.FlechaAbajo />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
                <div className="flex flex-col items-start gap-1 w-full">
                  <span className="text-black text-xs font-semibold font-['Montserrat']">Alfabéticamente</span>
                  {[{ label: "A-Z", key: "az" }, { label: "Z-A", key: "za" }].map(({ label, key }) => (
                    <label key={key} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={filters.orden[key]}
                        onChange={() => handleCheckboxChange("orden", key)}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-1 w-full">
                  <span className="text-black text-xs font-semibold font-['Montserrat']">Titulación</span>
                  {["DIDI", "INSO", "INSG", "MAIS", "FIIS"].map((titulacion) => (
                    <label key={titulacion} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
                      <span>{titulacion}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={filters.titulacion[titulacion]}
                        onChange={() => handleCheckboxChange("titulacion", titulacion)}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-1 w-full">
                  <span className="text-black text-xs font-semibold font-['Montserrat']">Año de salida</span>
                  {["2024-2025", "2023-2024", "2022-2023", "2021-2022", "2020-2021", "Anterior"].map((ano) => (
                    <label key={ano} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
                      <span>{ano}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={filters.ano[ano]}
                        onChange={() => handleCheckboxChange("ano", ano)}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-1 w-full">
                  <span className="text-black text-xs font-semibold font-['Montserrat']">Estado de la solicitud</span>
                  {["Pendiente", "Rechazada", "Aprobada"].map((estado) => (
                    <label key={estado} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
                      <span>{estado}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={filters.estado[estado]}
                        onChange={() => handleCheckboxChange("estado", estado)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => {
                setIsCalendarOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2 bg-white"
            >
              <Icons.Calendar />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">{calendarDate?.mes} {calendarDate?.ano}</span>
              <Icons.FlechaAbajo />
            </button>

            {isCalendarOpen && (
              <div className="absolute top-full mt-2 right-0 p-6 w-[250px] bg-white rounded-lg shadow-lg outline outline-1 outline-black z-50 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  {["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"].map((mes) => (
                    <div
                      key={mes}
                      className="w-14 p-2 rounded-lg outline outline-1 outline-zinc-400 flex justify-center items-center hover:bg-zinc-100 cursor-pointer"
                      onClick={() => setCalendarDate({ ...calendarDate, mes })}
                    >
                      <div className="text-black text-base font-normal font-['Montserrat']">{mes}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;