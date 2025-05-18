"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateForm } from "@/lib/form";
import Perfil from "@/components/admin-alumno/PerfilEditable";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import MiniCalendar from "@/utils/calendario/MiniCalendar";
import { getStudentData, getUtadFiles } from "@/lib/studentFuctions";
import { EditSquare } from "@/components/Icons";
import Chat from "@/components/chat/Chat";
import { getUnis } from "@/lib/form";
import DocumentsList from "@/components/alumno-alumno/DocumentsList";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [datosApi, setDatosApi] = useState(null);
  const [userId, setUserId] = useState(null);
  const [universidades, setUniversidades] = useState([]);
  const [isOutgoing, setIsOutgoing] = useState(true);

  const { register, setValue, getValues } = useForm();
  const [editando, setEditando] = useState({});

  const [files, setFiles] = useState([]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const campos = {
    personales: [
      { label: "DNI / NIE", name: "dniNie", type: "text" },
      { label: "Email de contacto", name: "email", type: "email" },
      {
        label: "Género",
        name: "genero",
        type: "select",
        options: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"],
      },
      { label: "Nacionalidad", name: "nacionalidad", type: "text" },
      { label: "Fecha de nacimiento", name: "fechaNacimiento", type: "date" },
      { label: "Domicilio", name: "domicilio", type: "text" },
      { label: "Número de teléfono", name: "numeroTelefono", type: "tel" },
    ],
    academica: [
      {
        label: "¿Es esta tu primera movilidad Erasmus?",
        name: "primeraMovilidad",
        type: "select",
        options: ["Sí", "No"],
      },
      {
        label: "Semestre que solicitas para realizar el intercambio",
        name: "semestreIntercambio",
        type: "select",
        options: ["Sept-Feb", "Feb-Jun"],
      },
      {
        label: "Universidad de destino solicitada - 1a opción",
        name: "universidadDestino1",
        type: "selectUni",
      },
      {
        label: "Universidad de destino solicitada - 2a opción",
        name: "universidadDestino2",
        type: "selectUni",
      },
      {
        label: "Universidad de destino solicitada - 3a opción",
        name: "universidadDestino3",
        type: "selectUni",
      },
      {
        label: "¿Estás interesado en hacer un examen no oficial de inglés?",
        name: "examenCertificado",
        type: "select",
        options: ["Sí", "No"],
      },
    ],
    archivos: [
      {
        label: "Expediente académico",
        name: "expedienteAcademico",
        type: "file",
      },
      { label: "Foto carnet", name: "carnetUni", type: "file" },
      { label: "Carta de motivación", name: "cartaMotivacion", type: "file" },
      { label: "Learning Agreement", name: "learningAgreement", type: "file" },
      {
        label: "Certificado de idiomas",
        name: "certificadoIdiomas",
        type: "file",
      },
      { label: "Link a portfolio", name: "linkPortfolio", type: "file" },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentResponse, filesResponse, unisResponse] =
          await Promise.all([getStudentData(), getUtadFiles(), getUnis()]);

        const data = studentResponse[0];
        if (data.fechaNacimiento) {
          data.fechaNacimiento = formatDate(data.fechaNacimiento);
        }

        if(data.studentType != "outgoing") {
          setIsOutgoing(false);
        }

        setUniversidades(unisResponse);
        setFiles(filesResponse);
        setDatosApi(data);
        setUserId(data._id);

        [...campos.personales, ...campos.academica, ...campos.archivos].forEach(
          ({ name }) => {
            if (data[name] !== undefined) setValue(name, data[name]);
          }
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(files);

  const getNombreUniversidad = (id) => {
    const uni = universidades.find((u) => u._id === id);
    return uni ? uni.nombre : id; // Muestra nombre o el ID si no se encuentra
  };

  const handleBlur = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    if (value.trim() !== "") {
      await updateForm(name, value);
      setEditando((prev) => ({ ...prev, [name]: false }));
    }
  };

  const renderSeccion = (titulo, campos) => (
    <div className="w-full">
      <div className="flex justify-between items-center px-[1.5rem] py-[0.5rem] bg-[#0065EF] rounded-t-[0.5rem]">
        <h2 className="text-white font-semibold">{titulo}</h2>
      </div>
      <div className="bg-white border border-t-0 border-[#9DA3A7] rounded-b-[0.5rem] overflow-hidden divide-y">
        {campos.map(({ label, name, type, options }, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-[1.5rem] py-[0.75rem] text-sm"
          >
            <span className="text-[#14192C] font-semibold w-1/2">{label}</span>
            <span className="text-[#14192C] font-normal text-right w-1/2 flex justify-end items-center gap-3">
              {type === "file" ? (
                <label className="cursor-pointer flex items-center gap-2">
                  <span className="text-sm text-blue-600 underline">
                    Subir archivo
                  </span>
                  <input
                    type="file"
                    name={name}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) updateForm(name, file);
                    }}
                  />
                </label>
              ) : editando[name] ? (
                type === "select" || type === "selectUni" ? (
                  <select
                    {...register(name)}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                    autoFocus
                  >
                    <option value="">Selecciona una opción</option>
                    {(type === "selectUni" ? universidades : options)?.map(
                      (opt, i) => (
                        <option
                          key={i}
                          value={type === "selectUni" ? opt._id : opt}
                        >
                          {type === "selectUni" ? opt.nombre : opt}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type={type}
                    {...register(name)}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                    autoFocus
                  />
                )
              ) : (
                <>
                  <span>
                    {type === "selectUni"
                      ? getNombreUniversidad(getValues(name))
                      : getValues(name)}
                  </span>
                  <button
                    onClick={() =>
                      setEditando((prev) => ({ ...prev, [name]: true }))
                    }
                  >
                    <EditSquare className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                  </button>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      <div>
        <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex justify-center py-12">
        <Perfil datos={datosApi} />
      </div>
      <div className="flex justify-center">
        <div className="flex gap-[4rem] w-[66.875rem] mb-20">
          <div className="flex flex-col gap-5 w-[41.5625rem]">
            {renderSeccion("Datos personales", campos.personales)}
            {renderSeccion("Información académica", campos.academica)}
            {renderSeccion("Archivos adjuntos", campos.archivos)}
          </div>
          <div className="flex flex-col gap-4 w-[21.3125rem] items-stretch">
            <div className="w-full">
              <MiniCalendar showIncoming={!isOutgoing} showOutgoing={isOutgoing} />
            </div>
            <div className="w-full flex-1">
              <Chat admin={false} id={userId} />
            </div>
            <div className="w-full flex-1 bg-white p-6 rounded-2xl shadow">
              <DocumentsList documentos={files} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
