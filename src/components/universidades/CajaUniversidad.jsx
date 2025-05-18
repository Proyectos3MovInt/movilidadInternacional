"use client";

import { useRouter } from "next/navigation";

const CajaUniversidad = ({ universidad, index, archived }) => {
  const router = useRouter();

  const handleClick = () => {
    const basePath = archived ? "admin-universidad-archivada" : "admin-universidad";
    router.push(`/${basePath}/${universidad.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full px-6 py-4 cursor-pointer ${
        index % 2 === 0 ? "bg-sky-100" : "bg-white"
      } hover:bg-blue-200`}
    >
      <div className="flex w-full justify-between items-center text-base font-normal font-['Montserrat'] text-black">
        <div className="w-[300px]">{universidad.nombre}</div>      {/* Nombre universidad */}
        <div className="w-[150px]">{universidad.pais}</div>       {/* País */}
        <div className="w-[250px]">{universidad.contacto}</div>   {/* Contacto */}
      </div>
    </div>
  );
};

export default CajaUniversidad;
