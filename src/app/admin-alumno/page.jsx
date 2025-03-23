"use client";
import React, { useState } from 'react';
import MainSection from '@/components/admin-alumno/MainSection';
import Calendar from '@/components/admin-alumno/Calendar';
import Notes from '@/components/admin-alumno/Notes';
import AccordionSection from '@/components/admin-alumno/AccordionSection';
import MenuSuperior from '@/components/admin-dashboard/MenuSuperior';

// Datos de subsecciones, si quereis añadir otra hay q agregar tambien un campo en el return (linea 43)
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
  { label: '1100', value: '' }
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
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-sky-100 min-h-screen">
      <MenuSuperior searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* contenido de la propia pagina */}
      <div className="container mx-auto p-4">
        <MainSection />

        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* columna principal con los despelgables*/}
          <div className="col-span-2">
            <AccordionSection title="Datos Personales" data={DatosPersonales} />
            <AccordionSection title="Información Académica" data={InfoAcademica} />
            <AccordionSection title="Archivos Adjuntos" data={ArchivosAdjuntos} />
          </div>

          {/* columna secundaria (calendario y anotaciones*/}
          <div>
            <Calendar />
            <div className="mt-8">
              <Notes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
