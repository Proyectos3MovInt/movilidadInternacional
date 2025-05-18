import { useState } from "react";
import UniversityHeader from "./UniversityHeader";
import DocumentsList from "./DocumentsList";
import StudentsTable from "./StudentsTable";
import Anotaciones from "../admin-alumno/Anotaciones";
import { archivarUniversidad } from "@/lib/universidadesFunctions";
import { editarUniversidad } from "@/lib/universidadesFunctions";
import { useRouter } from "next/navigation";
import { Archivar, Editar } from "@/components/Icons";

const gradoSiglas = {
  // ...
};

function siglaDe(titulacion) {
  return gradoSiglas[titulacion] || titulacion || "—";
}

export default function UniversityDetailPage({
  university,
  archivos,
  alumnos,
  archived,
  onShowModal,
}) {
  const router = useRouter();
  const [isArchived, setIsArchived] = useState(archived);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: university.nombre,
    pais: university.pais,
    contactoEmail: university.contactoEmail,
    web: university.web || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await editarUniversidad(university._id, formData); // función que debes definir
      setIsEditing(false);
      router.refresh(); // actualiza los datos de la página
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="px-8 pt-6 space-y-6">
      {/* Fila 1: Universidad + Documentos */}
      <div className="max-w-5xl mx-auto flex gap-6">
        <div className="flex-1">
          <div className="bg-white p-6 rounded-2xl shadow">
            <UniversityHeader
              nombre={formData.nombre}
              contactoEmail={formData.contactoEmail}
              pais={formData.pais}
              web={formData.web}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          {/* Botones debajo del header */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => onShowModal()}
              className="h-10 px-4 py-1 border-2 border-solid border-[#0065EF] bg-white rounded-lg inline-flex items-center gap-2 cursor-pointer text-[#0065EF]"
            >
              <Archivar className="w-4 h-4 text-[#0065EF]" />
              <span className="text-sm font-semibold font-['Montserrat']">
                {isArchived ? "Desarchivar" : "Archivar"}
              </span>
            </button>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="h-10 px-4 py-2 bg-green-600 rounded-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="text-white text-sm font-semibold font-['Montserrat']">
                  Guardar
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="h-10 px-4 py-2 bg-[#0065EF] rounded-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <Editar className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold font-['Montserrat']">
                  Editar
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="w-80 bg-white p-6 rounded-2xl shadow">
          <DocumentsList documentos={archivos} />
        </div>
      </div>

      {/* Fila 2: Alumnos + Comentarios */}
      <div className="max-w-5xl mx-auto flex gap-6">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow">
          <StudentsTable
            students={alumnos.map((s) => ({
              id: s._id,
              nombre: s.nombreApellidos,
              programa: siglaDe(s.titulacion),
              curso: s.semestreIntercambio || "—",
              estado: s.processStatus || "—",
            }))}
          />
        </div>

        <div className="w-80 bg-white p-6 rounded-2xl shadow">
          <Anotaciones />
        </div>
      </div>
    </div>
  );
}
