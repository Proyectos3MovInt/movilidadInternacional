"use client";
import { useState } from "react";
import { ArrowForwardIos } from "../Icons";

export default function SeccionEditableAlumno({ title, data = [], setData }) {
  const [abierto, setAbierto] = useState(true);

  const handleChange = (index, newValue) => {
    const updated = [...data];
    updated[index].value = newValue;
    setData(updated);
  };

  return (
    <div className="w-full">
      {/* Cabecera azul */}
      <div className="flex justify-between items-center px-[1.5rem] py-[0.5rem] bg-[#0065EF] rounded-t-[0.5rem]">
        <h2 className="text-white font-semibold">{title}</h2>
        <button onClick={() => setAbierto(!abierto)}>
          <ArrowForwardIos
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              abierto ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Campos editables */}
      {abierto && (
        <div className="bg-white border border-t-0 border-[#9DA3A7] rounded-b-[0.5rem] overflow-hidden divide-y">
          {data.map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col px-[1.5rem] py-[0.75rem]">
              <label className="text-[#14192C] font-semibold text-sm mb-1">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
