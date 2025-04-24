"use client";
import { useState } from "react";
import { ArrowForwardIos } from "../Icons"; // o el nombre del icono que uses

export default function SeccionDesplegable ({ title, data = [] }) {
  const [abierto, setAbierto] = useState(true);

  return (
    <div className="w-full">
      {/* Header azul */}
      <div className="flex justify-between items-center px-[1.5rem] py-[0.5rem] bg-[#0065EF] rounded-t-[0.5rem]">
        <h2 className="text-white font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setAbierto(!abierto)}>
            <ArrowForwardIos
              className={`w-5 h-5 text-white transition-transform duration-200 ${
                abierto ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
  
      {/* Contenido desplegable */}
      {abierto && (
        <div className="bg-white border border-t-0 border-[#9DA3A7] rounded-b-[0.5rem] overflow-hidden divide-y">
          {data.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-[1.5rem] py-[0.75rem] text-sm"
            >
              <span className="text-[#14192C] font-semibold">{label}</span>
              <span className="text-[#14192C] font-normal text-right">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};