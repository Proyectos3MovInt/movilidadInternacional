"use client";
import { useRouter } from "next/navigation";

const CajaAlumno = ({ solicitud, index, columnasDisponibles = [] }) => {
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
          <div className="w-48 h-7 px-4 py-1 bg-[#84CC59] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4B8726] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Aceptado por U-TAD
            </div>
          </div>
        );
      case "denegada":
        return (
          <div className="h-7 px-4 py-1 bg-[#F05A50] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#BD3229] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Rechazado por U-TAD
            </div>
          </div>
        );
      case "movilidad":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#FF58A2] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#D72071] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad empezada
            </div>
          </div>
        );
      case "finalizada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#9DA3A7] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#686A6C] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad finalizada
            </div>
          </div>
        );
      case "pendiente":
      default:
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#EEA63B] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#BC8127] rounded-full" />
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
        {columnasDisponibles.includes("nombreApellidos") && (
          <div className="w-[200px]">{solicitud.nombre}</div>
        )}
        {columnasDisponibles.includes("dniNie") && (
          <div className="w-[120px]">{solicitud.dniNie}</div>
        )}
        {columnasDisponibles.includes("email") && (
          <div className="w-[200px]">{solicitud.email}</div>
        )}
        {columnasDisponibles.includes("titulacion") && (
          <div className="w-[120px]">{solicitud.grado}</div>
        )}
        {columnasDisponibles.includes("semestreIntercambio") && (
          <div className="w-[100px]">{solicitud.semestre}</div>
        )}
        {columnasDisponibles.includes("universidadDestino1") && (
          <div className="w-[150px]">{solicitud.universidadDestino}</div>
        )}
        {columnasDisponibles.includes("processStatus") && renderEstado()}
      </div>
    </div>
  );
};

export default CajaAlumno;
