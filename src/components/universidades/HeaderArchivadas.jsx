"use client";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleRadioChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-[75rem] px-6 pt-2 pb-2 flex justify-between items-center relative z-10">
        {/* Título "Universidades archivadas" alineado a la izquierda */}
        <h2 className="text-blue-600 text-3xl font-semibold font-['Montserrat']">
          Universidades archivadas
        </h2>

        {/* Filtros y Ordenar alineados a la derecha */}
        <div className="flex items-center gap-8">
          {/* Filtros */}
          <div className="relative">
            <button
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsOrderOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex items-center gap-2 bg-white"
            >
              <Icons.Filtros />
              <span className="text-slate-900 text-xs font-normal font-['Montserrat']">Filtros</span>
              <Icons.FlechaAbajo />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 right-0 p-4 w-64 bg-white rounded-lg shadow-lg outline outline-1 outline-black flex flex-col gap-4 z-50">
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

          {/* Ordenar */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOrderOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
              className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-black inline-flex items-center gap-2 bg-white"
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
