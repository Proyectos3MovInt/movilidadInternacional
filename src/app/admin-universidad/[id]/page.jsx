"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import UniversityDetailPage from "@/components/admin-university/UniversityDetailPage";
import ModalArchivar from "@/components/admin-university/ModalArchivar";
import {
  getUniversityById,
  getUniversityFiles,
  getUniversityStudents,
} from "@/lib/adminFunctions";
import { archivarUniversidad } from "@/lib/universidadesFunctions"; // Importa la función

export default function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uni, setUni] = useState(null);
  const [files, setFiles] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [wasArchived, setWasArchived] = useState(false); // para pasarlo como prop

  useEffect(() => {
    async function fetchData() {
      try {
        const university = await getUniversityById(id);
        const archivos = await getUniversityFiles(id);
        const students = await getUniversityStudents(id);
        setUni(university);
        setFiles(archivos);
        setStudents(students);
        setWasArchived(university?.estado === "archivada" || university?.archivada === true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const handleConfirmArchivar = async () => {
    if (!id) return;
    const ok = await archivarUniversidad(id);
    if (ok) {
      setWasArchived(true);
      setShowModal(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando universidad...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UniversityDetailPage
        university={uni}
        archivos={files}
        alumnos={students}
        archived={wasArchived}
        onShowModal={() => setShowModal(true)}
      />
      <ModalArchivar
  open={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleConfirmArchivar}
/>

    </div>
  );
}
