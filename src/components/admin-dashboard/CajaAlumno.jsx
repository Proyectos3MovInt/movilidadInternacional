"use client";

import { useRouter } from "next/navigation";

const CajaAlumno = ({ solicitud, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin-alumno/${solicitud.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full px-6 py-4 cursor-pointer ${
        index % 2 === 0 ? "bg-sky-100" : "bg-white"
      } hover:bg-blue-200`}
    >
      <div className="flex w-full justify-between items-center text-base font-normal font-['Montserrat'] text-black">
        <div className="w-[200px]">{solicitud.nombre}</div>
        <div className="w-[120px]">{solicitud.grado}</div>
        <div className="w-[100px]">{solicitud.ano}</div>
        <div className="w-[150px]">{solicitud.universidadDestino}</div>
        <div className="w-[60px]">{solicitud.notaMedia}</div>
        <div
          className={`w-[200px] px-4 py-1 rounded-3xl flex items-center justify-center gap-2 text-xs font-semibold text-white ${
            solicitud.estado === "Aprobada"
              ? "bg-lime-400"
              : solicitud.estado === "Rechazada"
              ? "bg-red-400"
              : "bg-orange-300"
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              solicitud.estado === "Aprobada"
                ? "bg-lime-700"
                : solicitud.estado === "Rechazada"
                ? "bg-red-700"
                : "bg-orange-500"
            }`}
          />
          <span>
            {solicitud.estado === "Aprobada"
              ? "Aceptado por U-TAD"
              : solicitud.estado === "Rechazada"
              ? "Rechazado por U-TAD"
              : "Solicitud realizada"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CajaAlumno;
