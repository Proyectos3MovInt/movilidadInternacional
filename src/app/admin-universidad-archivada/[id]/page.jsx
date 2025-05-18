"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import UniversityDetailPage from "@/components/admin-university/UniversityDetailPage";
import ModalArchivar from "@/components/admin-university/ModalArchivar";
import {
  getArchivedUniversityById,
  getUniversityFiles,
  getUniversityStudents,
} from "@/lib/adminFunctions";
import { desarchivarUniversidad } from "@/lib/universidadesFunctions";
import { useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uni, setUni] = useState(null);
  const [files, setFiles] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const university = await getArchivedUniversityById(id);
        setUni(university[0]);
        const archivos = await getUniversityFiles(id);
        const students = await getUniversityStudents(id);
        setFiles(archivos || []);
        setStudents(students || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const handleConfirmDesarchivar = async () => {
    await desarchivarUniversidad(id);
    setShowModal(false);
    router.push("/universidades");
  };

  if (loading)
    return <p className="text-center mt-10">Cargando universidad...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UniversityDetailPage
        university={uni}
        archivos={files}
        alumnos={students}
        archived={true}
        onShowModal={() => setShowModal(true)}
      />
      <ModalArchivar
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDesarchivar}
        mode="desarchivar"
      />
    </div>
  );
}
