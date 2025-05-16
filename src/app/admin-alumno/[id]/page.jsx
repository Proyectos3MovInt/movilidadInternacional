"use client";
import { useState, useEffect } from "react";
import Perfil from "@/components/admin-alumno/Perfil";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import SeccionDesplegable from "@/components/admin-alumno/SeccionDesplegable";
import Anotaciones from "@/components/admin-alumno/Anotaciones";
import Calendario from "@/components/admin-alumno/Calendario";
import Chat from "@/components/chat/Chat";
import { getStudentData } from "@/lib/adminFunctions";
import { useParams } from "next/navigation";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [datosApi, setDatosApi] = useState([]);
  const [datosPersonales, setDatosPersonales] = useState([]);
  const [infoAcademica, setInfoAcademica] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    const formatDate = (isoString) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const fetchData = async () => {
      try {
        const data = await getStudentData(id);
        setDatosApi(data);
        console.log(data);
        setDatosPersonales([
          { label: "DNI / NIE", value: data.dniNie || "" },
          { label: "Email de contacto", value: data.email || "" },
          { label: "Género", value: data.genero || "" },
          { label: "Nacionalidad", value: data.nacionalidad || "" },
          { label: "Fecha de nacimiento", value: formatDate(data.fechaNacimiento) || "" },
          { label: "Domicilio", value: data.domicilio || "" },
          { label: "Número de teléfono", value: data.numeroTelefono || "" }
        ]);

        setInfoAcademica([
          { label: "¿Es esta tu primera movilidad Erasmus?", value: data.primeraMovilidad ? "Sí" : "No" },
          { label: "Semestre que solicitas para realizar el intercambio", value: data.semestreIntercambio || "" },
          { label: "Universidad de destino solicitada - 1a opción", value: data.universidadDestino1 || "" },
          { label: "Universidad de destino solicitada - 2a opción", value: data.universidadDestino2 || "" },
          { label: "Universidad de destino solicitada - 3a opción", value: data.universidadDestino3 || "" },
          { label: "¿Estás interesado en hacer un examen no oficial de inglés?", value: data.examenCertificado ? "Sí" : "No" }
        ]);

        setArchivosAdjuntos([
          { label: "Expediente académico", value: data.expedienteAcademico || "" },
          { label: "Foto carnet", value: data.carnetUni || "" },
          { label: "Carta de motivación", value: data.cartaMotivacion || "" },
          { label: "Learning Agreement", value: data.learningAgreement || "" },
          { label: "Certificado de idiomas", value: data.certificadoIdiomas || "" },
          { label: "Link a portfolio", value: data.linkPortfolio || "" }
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex justify-center py-12">
        <Perfil datos={datosApi} />
      </div>
      <div className="flex justify-center">
        <div className="flex gap-[4rem] w-[66.875rem] mb-20">
          <div className="flex flex-col gap-5 w-[41.5625rem]">
            <SeccionDesplegable title="Datos personales" data={datosPersonales} />
            <SeccionDesplegable title="Información académica" data={infoAcademica} uni={true} />
            <SeccionDesplegable title="Archivos adjuntos" data={archivosAdjuntos} archivo={true} />
          </div>
          <div className="flex flex-col gap-4 w-[21.3125rem]">
            <Calendario />
            <Anotaciones />
            <Chat admin={true} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
