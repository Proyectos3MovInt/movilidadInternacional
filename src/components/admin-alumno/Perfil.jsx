"use client";
import { useEffect, useState } from "react";
import { EditSquare, ArrowForwardIos } from "../Icons";
import { useParams } from "next/navigation";
import { cambiarEstado } from "@/lib/adminFunctions";
import { getUniversidades } from "@/lib/universidadesFunctions";

export default function Perfil({ datos }) {
  const [estado, setEstado] = useState("aprobada");
  const [universidad, setUniversidad] = useState("");
  const [universidadesDisponibles, setUniversidadesDisponibles] = useState([]);
  const [datosApi, setDatosApi] = useState({});
  const { id } = useParams();

  useEffect(() => {
  const obtenerDatosUniversidades = async () => {
    setDatosApi(datos);
    setEstado(ApiToEstado(datos.processStatus));

    const idsDestino = [
      datos.universidadDestino1,
      datos.universidadDestino2,
      datos.universidadDestino3,
    ].filter(Boolean);

    try {
      const todasLasUniversidades = await getUniversidades(); 
      const nombres = idsDestino.map((id) => {
        const encontrada = todasLasUniversidades.find((u) => u._id === id);
        return encontrada ? encontrada.nombre : `Universidad no encontrada`;
      });

      setUniversidadesDisponibles(nombres);
      setUniversidad(nombres[0] || "");
    } catch (err) {
      console.error("Error al obtener nombres de universidades:", err);
    }
  };

  obtenerDatosUniversidades();
}, [datos]);


  const toggleEstado = async () => {
    const newEstado = (() => {
      switch (estado) {
        case "finalizada": return "denegada";
        case "denegada": return "pendiente";
        case "pendiente": return "movilidad";
        case "movilidad": return "aprobada";
        case "aprobada": return "finalizada";
        default: return "pendiente";
      }
    })();
    setEstado(newEstado);
    await cambiarEstado(id, estadoToApi(newEstado));
  };

  const estadoToApi = (estado) => {
    switch (estado) {
      case "aprobada": return "ACEPTADO";
      case "denegada": return "RECHAZADO";
      case "pendiente": return "PENDIENTE";
      case "movilidad": return "EN CURSO";
      case "finalizada": return "FINALIZADO";
      default: return "";
    }
  };

  const ApiToEstado = (estado) => {
    switch (estado) {
      case "ACEPTADO": return "aprobada";
      case "RECHAZADO": return "denegada";
      case "PENDIENTE": return "pendiente";
      case "EN CURSO": return "movilidad";
      case "FINALIZADO": return "finalizada";
      default: return "";
    }
  };

  const renderEstado = () => {
    switch (estado) {
      case "aprobada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-lime-400 rounded-3xl inline-flex justify-start items-center gap-2">
            <div className="w-2.5 h-2.5 bg-lime-700 rounded-full" />
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Aceptado por U-TAD
            </div>
          </div>
        );
      case "denegada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-red-500 rounded-3xl inline-flex justify-start items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-700 rounded-full" />
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Rechazado por U-TAD
            </div>
          </div>
        );
      case "pendiente":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-orange-400 rounded-3xl inline-flex justify-start items-center gap-2">
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full" />
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Solicitud realizada
            </div>
          </div>
        );
      case "movilidad":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-pink-500 rounded-3xl inline-flex justify-start items-center gap-2">
            <div className="w-2.5 h-2.5 bg-pink-600 rounded-full" />
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Movilidad empezada
            </div>
          </div>
        );
      case "finalizada":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-zinc-400 rounded-3xl inline-flex justify-start items-center gap-2">
            <div className="w-2.5 h-2.5 bg-neutral-500 rounded-full"></div>
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Movilidad finalizada
            </div>
          </div>
        );
      default:
        return null;
    }
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
          Nombre:{" "}
          <span className="text-[#14192C] font-normal">
            {datosApi.nombreApellidos || ""}
          </span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Titulación:{" "}
          <span className="text-[#14192C] font-normal">{datosApi.titulacion || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Curso de matriculación:{" "}
          <span className="text-[#14192C] font-normal">2025</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Semestre:{" "}
          <span className="text-[#14192C] font-normal">{datosApi.semestreIntercambio || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Nota media:{" "}
          <span className="text-[#14192C] font-normal">8,7</span>
        </p>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col w-[15.5625rem] h-[9.5rem] items-stretch justify-start gap-[0.5rem]">
        {/* Fila: Dropdown + Edit */}
        <div className="flex items-center justify-end gap-[1rem] w-full">
          <div className="relative w-full h-[2rem]">
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
              value={universidad}
              onChange={(e) => setUniversidad(e.target.value)}
            >
              {universidadesDisponibles.length === 0 ? (
                <option value="">Sin universidades disponibles</option>
              ) : (
                universidadesDisponibles.map((uni, i) => (
                  <option key={i} value={uni}>
                    {uni}
                  </option>
                ))
              )}
            </select>

            <div className="absolute inset-0 bg-[#82B1F4] rounded-[0.5rem] flex items-center pl-[2.5rem] pr-[1rem] text-white font-semibold text-sm pointer-events-none z-10">
              {universidad || "Selecciona universidad"}
            </div>

            <ArrowForwardIos className="absolute left-[1rem] top-1/2 -translate-y-1/2 w-[1rem] h-[1rem] text-white z-40 pointer-events-none" />
          </div>

          <button className="w-[1.5rem] h-[1.5rem]">
            <EditSquare />
          </button>
        </div>

        <div className="flex justify-end pr-[2.5rem] w-full cursor-pointer select-none" onClick={toggleEstado}>
          {renderEstado()}
        </div>
      </div>
    </div>
  );
}
