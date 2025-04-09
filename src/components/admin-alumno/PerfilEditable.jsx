"use client";
import { useEffect, useState } from "react";
import { EditSquare, ArrowForwardIos } from "../Icons";

export default function PerfilEditable({ datos }) {
  const [estado, setEstado] = useState("aprobada");
  const [universidad, setUniversidad] = useState("U-tad");
  const [datosApi, setDatosApi] = useState({});

  useEffect(() => { setDatosApi(datos) }, [datos]);

  const toggleEstado = () => {
    setEstado((prev) => {
      if (prev === "aprobada") return "denegada";
      if (prev === "denegada") return "pendiente";
      return "aprobada";
    });
  };

  return (
    <div className="relative flex w-[66.875rem] h-[14rem] px-[3rem] justify-between items-center gap-[6.5rem] flex-shrink-0 rounded-[0.5rem] bg-white">
      {/* Imagen */}
      <img
        src="/images/PerfilDefault.png"
        alt="Foto de perfil"
        className="w-[9.5rem] h-[9.5rem] flex-shrink-0 rounded-full object-cover"
      />

      {/* Datos del perfil */}
      <div className="flex flex-col w-[22.875rem] items-start gap-[0.5rem] font-montserrat">
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Nombre: <span className="text-[#14192C] font-normal">{datosApi.nombreApellidos || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Titulación: <span className="text-[#14192C] font-normal">{datosApi.titulacion || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Curso de matriculación: <span className="text-[#14192C] font-normal">2025</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Semestre: <span className="text-[#14192C] font-normal">{datosApi.semestreIntercambio || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Nota media: <span className="text-[#14192C] font-normal">8,7</span>
        </p>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col w-[15.5625rem] h-[9.5rem] items-stretch justify-start gap-[0.5rem]">
        {/* Fila: Dropdown + Edit */}
        <div className="flex items-center justify-end gap-[1rem] w-full">
          {/* Dropdown con icono y select invisible */}
          <div className="relative w-full h-[2rem]">
            {/* Select funcional (invisible pero por encima) */}
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
              value={universidad}
              onChange={(e) => setUniversidad(e.target.value)}
            >
              <option value="U-tad">Universidad de destino</option>
              <option value="Otra">Otra</option>
            </select>

            {/* Icono flecha visual */}
            <ArrowForwardIos className="absolute left-[1rem] top-1/2 -translate-y-1/2 w-[1rem] h-[1rem] text-white z-40 pointer-events-none" />
          </div>
        </div>

        {/* Estado aprobado/denegado/pendiente */}
        <div className="flex justify-end pr-[2.5rem] w-full">
          <button
            onClick={toggleEstado}
            className={`w-[7.25rem] h-[2rem] px-[1rem] py-[0.25rem] flex justify-center items-center gap-[0.5rem] rounded-[0.5rem] text-white font-medium text-sm 
              ${estado === "aprobada" ? "bg-[#48B726]" :
               estado === "denegada" ? "bg-red-500" :
               "bg-orange-400"}`}
          >
            <span
              className={`w-2 h-2 rounded-full 
                ${estado === "aprobada" ? "bg-white" :
                 estado === "denegada" ? "bg-white" :
                 "bg-white"}`}
            />
            {estado === "aprobada" ? "Aprobada" :
             estado === "denegada" ? "Denegada" :
             "Pendiente"}
          </button>
        </div>
      </div>
    </div>
  );
};