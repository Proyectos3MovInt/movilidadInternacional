"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateForm } from "@/lib/form";
import Perfil from "@/components/admin-alumno/PerfilEditable";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import Calendario from "@/components/admin-alumno/Calendario";
import { useParams } from "next/navigation";
import { getStudentData } from "@/lib/adminFunctions";
import { EditSquare } from "@/components/Icons";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const { register, setValue, getValues } = useForm();
  const [editando, setEditando] = useState({});

  const campos = {
    personales: [
      { label: "DNI / NIE", name: "dniNie", type: "text" },
      { label: "Email de contacto", name: "email", type: "email" },
      { label: "Género", name: "genero", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"]},
      { label: "Nacionalidad", name: "nacionalidad", type: "text" },
      { label: "Fecha de nacimiento", name: "fechaNacimiento", type: "date" },
      { label: "Domicilio", name: "domicilio", type: "text" },
      { label: "Número de teléfono", name: "numeroTelefono", type: "tel" }
    ],
    academica: [
      { label: "¿Es esta tu primera movilidad Erasmus?", name: "primeraMovilidad", type: "select", options: ["Sí", "No"]},
      { label: "Semestre que solicitas para realizar el intercambio", name: "semestreIntercambio", type: "select", options: ["Sept-Feb", "Feb-Jun"]},
      { label: "Universidad de destino solicitada - 1a opción", name: "universidadDestino1", type: "text" },
      { label: "Universidad de destino solicitada - 2a opción", name: "universidadDestino2", type: "text" },
      { label: "Universidad de destino solicitada - 3a opción", name: "universidadDestino3", type: "text" },
      { label: "¿Estás interesado en hacer un examen no oficial de inglés?", name: "examenCertificado", type: "select", options: ["Sí", "No"]}
    ],
    archivos: [
      { label: "Expediente académico", name: "expedienteAcademico", type: "file" },
      { label: "Foto carnet", name: "carnetUni", type: "file" },
      { label: "Carta de motivación", name: "cartaMotivacion", type: "file" },
      { label: "Learning Agreement", name: "learningAgreement", type: "file" },
      { label: "Certificado de idiomas", name: "certificadoIdiomas", type: "file" },
      { label: "Link a portfolio", name: "linkPortfolio", type: "file" }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentData(id);
        [...campos.personales, ...campos.academica, ...campos.archivos].forEach(({ name }) => {
          if (data[name] !== undefined) setValue(name, data[name]);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleBlur = async (e) => {
    const value= e.target.value;
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
          <div key={idx} className="flex justify-between items-center px-[1.5rem] py-[0.75rem] text-sm">
            <span className="text-[#14192C] font-semibold w-1/2">{label}</span>
            <span className="text-[#14192C] font-normal text-right w-1/2 flex justify-end items-center gap-3">
              {type === "file" ? (
                <label className="cursor-pointer flex items-center gap-2">
                  <span className="text-sm text-blue-600 underline">Subir archivo</span>
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
                type === "select" ? (
                  <select
                    {...register(name)}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                    autoFocus
                  >
                    <option value="">Selecciona una opción</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
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
                  <span>{getValues(name)}</span>
                  <button onClick={() => setEditando((prev) => ({ ...prev, [name]: true }))}>
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
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex justify-center py-12">
        <Perfil datos={{}} />
      </div>
      <div className="flex justify-center">
        <div className="flex gap-[4rem] w-[66.875rem] mb-20">
          <div className="flex flex-col gap-5 w-[41.5625rem]">
            {renderSeccion("Datos personales", campos.personales)}
            {renderSeccion("Información académica", campos.academica)}
            {renderSeccion("Archivos adjuntos", campos.archivos)}
          </div>
          <div className="flex flex-col gap-4 w-[21.3125rem]">
            <Calendario />
          </div>
        </div>
      </div>
    </div>
  );
}
