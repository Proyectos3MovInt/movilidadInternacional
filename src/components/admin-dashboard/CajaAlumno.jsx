"use client";

import { useRouter } from "next/navigation";

const CajaAlumno = ({ solicitud, index }) => {
  const router = useRouter();

  const handleClick = () => {
    // Redirigir a una página estática
    router.push(`/admin-alumno`);
  };

  return (
    <div
      onClick={handleClick}
      className={`grid grid-cols-6 p-3 items-center cursor-pointer ${
        index % 2 === 0 ? "bg-blue-100" : "bg-white"
      } hover:bg-gray-200`}
    >
      <span>{solicitud.nombre}</span>
      <span>{solicitud.grado}</span>
      <span>{solicitud.año}</span>
      <span className="min-w-28">{solicitud.universidadDestino}</span>
      <span>{solicitud.notaMedia}</span>
      <span
        className={`px-3 py-1 rounded-full text-white text-center ${
          solicitud.estado === "Aprobada"
            ? "bg-green-500"
            : solicitud.estado === "Rechazada"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {solicitud.estado}
      </span>
    </div>
  );
};

export default CajaAlumno;
