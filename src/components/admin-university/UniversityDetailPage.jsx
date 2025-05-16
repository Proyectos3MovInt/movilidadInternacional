import { useState } from "react";
import UniversityHeader from "./UniversityHeader";
import DocumentsList from "./DocumentsList";
import StudentsTable from "./StudentsTable";
import Anotaciones from "../admin-alumno/Anotaciones";
import { archivarUniversidad, activarUniversidad } from "@/lib/universidadesFunctions";
import { useRouter } from "next/navigation";

// Map de titulaciones a siglas
const gradoSiglas = {
  "Grado en Animación (Inglés)": "ANIG",
  "Grado en Animación (Español)": "ANIV",
  "Grado en Diseño de Productos Interactivos (Inglés)": "DIPG",
  "Grado en Diseño de Productos Interactivos (Español)": "DIPI",
  "Grado en Diseño Digital": "DIDI",
  "Grado en Ingeniería del Software (Inglés)": "INSO",
  "Grado en Ingeniería del Software (Español)": "INSG",
  "Doble grado en Ingeniería del Software y Matemática Computacional o Física Computacional": "FIIS/MAIS",
  "Grado en Efectos Visuales": "EFVI",
};

function siglaDe(titulacion) {
  return gradoSiglas[titulacion] || titulacion || "—";
}

export default function UniversityDetailPage({
  university,
  archivos,
  alumnos,
}) {
  const router = useRouter();
  const [archivada, setArchivada] = useState(university.archivada || false);

  const handleToggleEstado = async () => {
    if (archivada) {
      const res = await activarUniversidad(university._id);
      if (res) setArchivada(false);
    } else {
      const res = await archivarUniversidad(university._id);
      if (res) setArchivada(true);
    }
  };

  return (
    <div className="px-8 pt-6 space-y-6">
      {/* Fila 1: Universidad + Documentos */}
      <div className="max-w-5xl mx-auto flex gap-6">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <UniversityHeader
              nombre={university.nombre}
              contactoEmail={university.contactoEmail}
              pais={university.pais}
            />
            <button
              onClick={handleToggleEstado}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                archivada
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {archivada ? "Activar universidad" : "Archivar universidad"}
            </button>
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
