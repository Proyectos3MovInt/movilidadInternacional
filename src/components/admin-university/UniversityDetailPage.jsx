// components/admin-university/UniversityDetailPage.jsx
import UniversityHeader from "./UniversityHeader";
import DocumentsList from "./DocumentsList";
import StudentsTable from "./StudentsTable";
import Anotaciones from "../admin-alumno/Anotaciones";

export default function UniversityDetailPage({
  university,
  archivos,
  // estos props ya no los usaremos porque metemos dummy aquí
}) {
  // Datos dummy para estudiantes
  const dummyStudents = [
    {
      id: "67dd34b5430b0ed294de047b",
      nombre: "María Pérez",
      programa: "Erasmus+ DIDI",
      curso: "2º Curso",
      estado: "Aceptado",
    },
    {
      id: "67dd34b5430b0ed294de047c",
      nombre: "Juan García",
      programa: "Erasmus+ INSO",
      curso: "3º Curso",
      estado: "Pendiente",
    },
    {
      id: "67dd34b5430b0ed294de047d",
      nombre: "Ana López",
      programa: "Erasmus+ DIDI",
      curso: "1º Curso",
      estado: "Rechazado",
    },
  ];

  return (
    <div className="px-8 pt-6 space-y-6">
      {/* Fila 1: Universidad + Documentos */}
      <div className="max-w-5xl mx-auto flex gap-6">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow">
          <UniversityHeader
            nombre={university.nombre}
            contactoEmail={university.contactoEmail}
            pais={university.pais}
          />
        </div>
        <div className="w-80 bg-white p-6 rounded-2xl shadow">
          <DocumentsList documentos={archivos} />
        </div>
      </div>

      {/* Fila 2: Alumnos + Comentarios */}
      <div className="max-w-5xl mx-auto flex gap-6">
        {/* Carta de Alumnos con datos dummy */}
        <div className="flex-1 rounded-2xl">
          <StudentsTable students={dummyStudents} />
        </div>

        {/* Carta de Comentarios con texto dummy */}
        <div className="w-80 bg-white rounded-2xl shadow">
          <Anotaciones />
        </div>
      </div>
    </div>
  );
}
