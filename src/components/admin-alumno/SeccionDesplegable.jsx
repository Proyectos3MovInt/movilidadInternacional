"use client";
import { useState, useEffect } from "react";
import { ArrowForwardIos } from "../Icons";
import { getUnis, setLockedFields } from "@/lib/form";
import { useParams } from "next/navigation";
import CandadoToggle from "@/components/admin-alumno/CandadoToggle";
import BotonDescargar from "./BotonDescargar";

export default function SeccionDesplegable({ title, data = [], archivo, uni, locks, setLocks, lockKey }) {
  const [abierto, setAbierto] = useState(true);
  const [unis, setUnis] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUnis = async () => {
      const unisdata = await getUnis();
      setUnis(unisdata);
    };
    console.log(data);
    fetchUnis();
  }, []);

  const updateLock = async () => {
    const updatedLocks = { ...locks, [lockKey]: !locks[lockKey] };
    setLocks(updatedLocks);
    await setLockedFields(id, updatedLocks);
  }

  return (
    <div className="w-full">
      {/* Header azul */}
      <div className="flex justify-between items-center px-[1.5rem] py-[0.5rem] bg-[#0065EF] rounded-t-[0.5rem]">
        <h2 className="text-white font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <CandadoToggle 
          isLocked={locks[lockKey]}
          onToggle={updateLock}
          />
          <button onClick={() => setAbierto(!abierto)}>
            <ArrowForwardIos
              className={`w-5 h-5 text-white transition-transform duration-200 ${abierto ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* Contenido desplegable */}
      {!archivo && !uni && abierto && (
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

      {!archivo && uni && abierto && (
        <div className="bg-white border border-t-0 border-[#9DA3A7] rounded-b-[0.5rem] overflow-hidden divide-y">
          {data.map(({ label, value }, idx) => {
            const uniMap = unis.reduce((map, uni) => {
              map[uni._id] = uni.nombre;
              return map;
            }, {});

            return (
              <div
                key={idx}
                className="flex justify-between items-center px-[1.5rem] py-[0.75rem] text-sm"
              >
                <span className="text-[#14192C] font-semibold">{label}</span>
                <span className="text-[#14192C] font-normal text-right">{uniMap[value]}</span>
              </div>
            );
          })}
        </div>
      )}
      {archivo && abierto && (
        <div className="bg-white border border-t-0 border-[#9DA3A7] rounded-b-[0.5rem] divide-y">
          {data.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-6 py-4 text-sm"
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="text-black font-semibold text-base">{label}</span>
                  {value !== "" ? (
                    <BotonDescargar file={value} className="h-8 px-3 text-sm" />
                  ) :
                    (<span>El alumno aún no subió este archivo</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};