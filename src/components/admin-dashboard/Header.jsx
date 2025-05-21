"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import * as Icons from "@/components/Icons";

const Header = ({ filters, setFilters, columnasDisponibles, columnasLabels }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const columnas = columnasDisponibles || [];

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

  const handleCheckboxChange = (columna) => {
    setFilters((prev) => {
      const current = Array.isArray(prev.columnas) ? prev.columnas : [];
      return {
        ...prev,
        columnas: current.includes(columna)
          ? current.filter((c) => c !== columna)
          : [...current, columna],
      };
    });
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-[75rem] px-6 pt-2 pb-2 flex justify-between items-center relative z-10">
        {/* Tabs alineados a la izquierda */}
        <div className="flex items-center gap-32">
          <div
            onClick={() => router.push("/admin-dashboard")}
            className="relative flex cursor-pointer items-center gap-2 group"
          >
            <Icons.Person className={`w-5 h-5 ${getIconClass("admin-dashboard")} group-hover:text-blue-600`} />
            <div className={`text-base font-['Montserrat'] ${getTabStyle("admin-dashboard")} group-hover:text-blue-600`}>
              Outgoing
            </div>
            {pathname.includes("admin-dashboard") && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-600 -mb-2.5" />
            )}
          </div>

          <div
            onClick={() => router.push("/alumnos-incoming")}
            className="relative flex cursor-pointer items-center gap-2 group"
          >
            <Icons.People className={`w-5 h-5 ${getIconClass("incoming")} group-hover:text-blue-600`} />
            <div className={`text-base font-['Montserrat'] ${getTabStyle("incoming")} group-hover:text-blue-600`}>
              Incoming
            </div>
            {pathname.includes("incoming") && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-600 -mb-2.5" />
            )}
          </div>

          <div
            onClick={() => router.push("/universidades")}
            className="relative flex cursor-pointer items-center gap-2 group"
          >
            <Icons.Universidad className={`w-5 h-5 ${getIconClass("universidades")} group-hover:text-blue-600`} />
            <div className={`text-base font-['Montserrat'] ${getTabStyle("universidades")} group-hover:text-blue-600`}>
              Universidades
            </div>
            {pathname.includes("universidades") && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-blue-600 -mb-2.5" />
            )}
          </div>
        </div>

        {/* Filtros y Ordenar alineados a la derecha */}
        <div className="flex items-center gap-8">
          <div className="relative">
            <button
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsOrderOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2 bg-white"
            >
              <Icons.Filtros />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">Columnas</span>
              <Icons.FlechaAbajo />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 right-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
                <span className="text-black text-sm font-semibold font-['Montserrat']">Mostrar columnas:</span>
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {columnas.map((columna) => (
                    <label key={columna} className="flex justify-between items-center text-sm font-['Montserrat'] text-black">
                      <span>{columnasLabels?.[columna] || columna}</span>
                      <input
                        type="checkbox"
                        name="columnas"
                        value={columna}
                        checked={Boolean(filters.columnas?.includes(columna))}
                        onChange={() => handleCheckboxChange(columna)}
                        className="w-4 h-4 accent-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

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
              <div className="absolute top-full mt-2 right-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
                <span className="text-black text-sm font-semibold font-['Montserrat']">Alfabéticamente:</span>
                <div className="flex flex-col gap-2">
                  <label className="flex justify-between items-center text-sm text-black font-['Montserrat']">
                    <span>A-Z</span>
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
                    <span>Z-A</span>
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
