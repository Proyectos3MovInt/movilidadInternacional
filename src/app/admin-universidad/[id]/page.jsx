// pages/admin/universities/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import UniversityDetailPage from "@/components/admin-university/UniversityDetailPage";
import { getUniversityById, getUniversityFiles } from "@/lib/adminFunctions";

export default function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uni, setUni] = useState(null);
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const university = await getUniversityById(id);
        const archivos = await getUniversityFiles(id);
        setUni(university);
        setFiles(archivos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Cargando universidad...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UniversityDetailPage university={uni} archivos={files} />
    </div>
  );
}
