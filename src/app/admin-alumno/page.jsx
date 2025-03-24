"use client";
import React, { useState } from "react";
import Perfil from "@/components/admin-alumno/Perfil";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";
import SeccionDesplegable from "@/components/admin-alumno/SeccionDesplegable"; // Asegúrate de que la ruta sea correcta
import Anotaciones from "@/components/admin-alumno/Anotaciones";
import Calendario from "@/components/admin-alumno/Calendario";


// 🧾 Datos temporales simulados
const DatosPersonales = [
  { label: 'DNI / NIE', value: '66568934K' },
  { label: 'Email de contacto', value: 'lucia.gonzalez@live.u-tad.com' },
  { label: 'Género', value: 'Mujer' },
  { label: 'Nacionalidad', value: 'Española' },
  { label: 'Fecha de nacimiento', value: '15/07/2003' },
  { label: 'Domicilio', value: 'Calle Falsa 123, Madrid, España' },
  { label: 'Número de teléfono de contacto', value: '+34 678 123 456' }
];

const InfoAcademica = [
  { label: '¿Es esta tu primera movilidad Erasmus?', value: 'Sí' },
  { label: 'Semestre que solicitas para realizar el intercambio', value: '2°' },
  { label: 'Universidad de destino solicitada - 1a opción', value: 'Universidad de Milan' },
  { label: 'Universidad de destino solicitada - 2a opción', value: 'Universidad de Roma' },
  { label: 'Universidad de destino solicitada - 3a opción', value: 'Universidad de Nueva York' },
  { label: '¿Estás interesado en hacer un examen no oficial de nivel de inglés en UCJC a través de U-Tad?', value: 'No' },
];

const ArchivosAdjuntos = [
  { label: 'Expediente académico', value: '' },
  { label: 'Foto carnet', value: '' },
  { label: 'Carta de motivación dirigida a la Oficina de Relaciones Internacionales de U-tad (en inglés)', value: '' },
  { label: 'Borrador de Learning Agreement para cada una de las universidades a las que se solicita plaza', value: '' },
  { label: 'Certificado de idiomas', value: '' },
  { label: 'Link a portfolio o demoreel', value: '' }
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-[#EAF2FF] min-h-screen">
      {/* Menú superior */}
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  
      {/* Perfil centrado */}
      <div className="flex justify-center py-12">
        <Perfil />
      </div>
  
      {/* Contenedor de columnas alineadas */}
      <div className="flex justify-center">
        <div className="flex gap-[4rem] w-[66.875rem] mb-20">
          {/* Columna izquierda: secciones desplegables */}
          <div className="flex flex-col gap-5 w-[41.5625rem]">
            <SeccionDesplegable title="Datos personales" data={DatosPersonales} />
            <SeccionDesplegable title="Información académica" data={InfoAcademica} />
            <SeccionDesplegable title="Archivos adjuntos" data={ArchivosAdjuntos} />
          </div>
  
          {/* Columna derecha: calendario y anotaciones */}
          <div className="flex flex-col gap-4 w-[21.3125rem] ">
            <Calendario />
            <Anotaciones />
          </div>
        </div>
      </div>
    </div>
  );
  
}
