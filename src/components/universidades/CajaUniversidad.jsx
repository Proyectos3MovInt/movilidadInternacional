"use client";

import { useRouter } from "next/navigation";

const TITULACION_COLORS = {
  DIDI: "bg-rose-500",
  INSO: "bg-teal-400",
  INSG: "bg-indigo-500",
  MAIS: "bg-amber-500",
  FIIS: "bg-green-600",
  DEFAULT: "bg-gray-400",
};

const CajaUniversidad = ({ universidad, index, archived }) => {
  const router = useRouter();

  const handleClick = () => {
    if (archived) {
      router.push(`/admin-universidad-archivada/${universidad.id}`);
    } else {
      router.push(`/admin-universidad/${universidad.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full px-6 py-4 cursor-pointer ${index % 2 === 0 ? "bg-sky-100" : "bg-white"
        } hover:bg-blue-200`}
    >
      <div className="flex w-full justify-between items-center text-base font-normal font-['Montserrat'] text-black">
        <div className="w-[300px]">{universidad.nombre}</div>
        <div className="w-[150px]">{universidad.pais}</div>
        <div className="w-[300px]">{universidad.contacto}</div>
        <div className="flex gap-2 w-[220px]">
          {universidad.titulacion?.length > 0 ? (
            universidad.titulacion.map((titulacion, idx) => (
              <span
                key={idx}
                className={`text-white text-xs font-semibold px-3 py-1 rounded ${TITULACION_COLORS[titulacion] || TITULACION_COLORS.DEFAULT
                  }`}
              >
                {titulacion}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 italic">Sin titulaciones</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CajaUniversidad;
