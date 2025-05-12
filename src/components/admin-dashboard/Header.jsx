"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import * as Icons from "@/components/Icons";

const titulacionesDisponibles = [
  "DIDI",
  "INSO",
  "ANIV",
  "VIDEOJUEGOS",
  "MAIS",
  "FÍSICA",
  "VFX",
  "MULTIPLATAFORMA",
  "ARTE VIDEOJUEGOS",
  "INGEN VIDEOJUEGOS",
  "ILUSTRACIÓN",
];

const Header = ({ filters, setFilters }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const getTabStyle = (tabPath) =>
    pathname.includes(tabPath)
      ? "text-blue-600 font-semibold"
      : "text-neutral-500 font-semibold";

  const getIconClass = (tabPath) =>
    pathname.includes(tabPath) ? "text-blue-600" : "text-neutral-500";

  const handleRadioChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
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
            <div onClick={() => router.push("/alumnos-incoming")} className="flex cursor-pointer items-center gap-2">
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
          {/* Botón Filtros */}
          <div className="relative">
            <button
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsOrderOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2 bg-white"
            >
              <Icons.Filtros />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">Filtros</span>
              <Icons.FlechaAbajo />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
                <span className="text-black text-sm font-semibold font-['Montserrat']">Titulación</span>
                <div className="flex flex-col gap-2">
                  {titulacionesDisponibles.map((titulacion) => (
                    <label key={titulacion} className="flex justify-between items-center text-sm font-['Montserrat'] text-black">
                      <span>{titulacion}</span>
                      <input
                        type="radio"
                        name="titulacion"
                        value={titulacion}
                        checked={filters.titulacion === titulacion}
                        onChange={() => handleRadioChange("titulacion", titulacion)}
                        className="w-4 h-4 accent-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botón Ordenar */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOrderOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2 bg-white"
            >
              <Icons.Filtros />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">Ordenar</span>
              <Icons.FlechaAbajo />
            </button>

            {isOrderOpen && (
              <div className="absolute top-full mt-2 left-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
                <span className="text-black text-sm font-semibold font-['Montserrat']">Alfabéticamente:</span>
                <div className="flex flex-col gap-2">
                  <label className="flex justify-between items-center text-sm text-black font-['Montserrat']">
                    <span>Alfabéticamente A-Z</span>
                    <input
                      type="radio"
                      name="orden"
                      value="az"
                      checked={filters.orden === "az"}
                      onChange={() => handleRadioChange("orden", "az")}
                      className="w-4 h-4 accent-blue-600"
                    />
                  </label>
                  <label className="flex justify-between items-center text-sm text-black font-['Montserrat']">
                    <span>Alfabéticamente Z-A</span>
                    <input
                      type="radio"
                      name="orden"
                      value="za"
                      checked={filters.orden === "za"}
                      onChange={() => handleRadioChange("orden", "za")}
                      className="w-4 h-4 accent-blue-600"
                    />
                  </label>
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
