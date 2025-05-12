"use client";

import { useState } from "react";

const opcionesTitulacion = [
  "DIDI", "INSO", "ANIV", "VIDEOJUEGOS", "MAIS",
  "FÍSICA", "VFX", "MULTIPLATAFORMA", "ARTE VIDEOJUEGOS",
  "INGEN VIDEOJUEGOS", "ILUSTRACIÓN"
];

export default function FiltroTitulacion({ onSelect }) {
  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState("");

  const handleSelect = (opcion) => {
    setSeleccionado(opcion);
    onSelect(opcion); // callback al padre
    setAbierto(false); // cerrar al seleccionar
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setAbierto(!abierto)}
        className="px-4 py-2 border border-gray-400 rounded-md bg-white font-semibold text-sm"
      >
        Filtro
      </button>

      {abierto && (
        <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow z-50 p-4">
          <div className="font-bold mb-2">Titulación</div>
          {opcionesTitulacion.map((opcion) => (
            <label key={opcion} className="flex items-center mb-1 cursor-pointer">
              <input
                type="radio"
                name="titulacion"
                value={opcion}
                checked={seleccionado === opcion}
                onChange={() => handleSelect(opcion)}
                className="mr-2"
              />
              {opcion}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
