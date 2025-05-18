"use client";
import { useRouter } from "next/navigation";

const CajaAlumno = ({ solicitud, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin-alumno/${solicitud.id}`);
  };

  const ApiToEstado = (estado) => {
    switch (estado?.toUpperCase()) {
      case "ACEPTADO": return "aprobada";
      case "RECHAZADO": return "denegada";
      case "PENDIENTE": return "pendiente";
      case "EN CURSO": return "movilidad";
      case "FINALIZADO": return "finalizada";
      default: return "pendiente";
    }
  };

  const estadoNormalizado = ApiToEstado(solicitud.estado);

  const renderEstado = () => {
    switch (estadoNormalizado) {
      case "aprobada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-lime-400 rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-lime-700 rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Aceptado por U-TAD
            </div>
          </div>
        );
      case "denegada":
        return (
          <div className="h-7 px-4 py-1 bg-red-500 rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-700 rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Rechazado por U-TAD
            </div>
          </div>
        );
      case "movilidad":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-pink-500 rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-pink-600 rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad empezada
            </div>
          </div>
        );
      case "finalizada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-zinc-400 rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-neutral-500 rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad finalizada
            </div>
          </div>
        );
      case "pendiente":
      default:
        return (
          <div className="w-48 h-7 px-4 py-1 bg-orange-400 rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Solicitud realizada
            </div>
          </div>
        );
    }
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
        {renderEstado()}
      </div>
    </div>
  );
};

export default CajaAlumno;
