"use client";
import { ArrowForwardIos } from "../Icons"; // Asegúrate de tenerlo

const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];
const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);
const diaActual = 1; // Simulamos que hoy es día 1 para resaltarlo

export default function Calendario() {
  return (
    <div className="flex flex-col items-center bg-white rounded-[0.5rem] py-[1.5rem] w-full gap-[1.125rem]">
      {/* Encabezado */}
      <div className="flex justify-between items-center w-[90%]">
        <h3 className="text-[#14192C] font-semibold text-sm">Enero 2025</h3>
        <button>
          <ArrowForwardIos className="w-4 h-4 text-[#14192C]" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-[#14192C] text-sm font-semibold w-[90%]">
        {diasSemana.map((dia, idx) => (
          <div key={idx}>{dia}</div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-[#14192C] text-sm w-[90%]">
        {diasMes.map((dia) => (
          <div key={dia}>
            {dia === diaActual ? (
              <div className="w-6 h-6 rounded-full bg-[#0065EF] text-white flex items-center justify-center mx-auto">
                {dia}
              </div>
            ) : (
              <div>{dia}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
