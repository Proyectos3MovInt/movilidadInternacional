"use client";

import CajaUniversidad from "@/components/universidades/CajaUniversidad";

const UniversidadesTable = ({ archived, universidades, columnasVisibles }) => {
  return (
    <div className="flex flex-col space-y-2">
      {universidades.map((uni, index) => (
        <CajaUniversidad key={uni.id} universidad={uni} index={index} archived={archived} columnasVisibles={columnasVisibles}/>
      ))}
    </div>
  );
};

export default UniversidadesTable;
