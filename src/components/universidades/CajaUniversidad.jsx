"use client";

import { useRouter } from "next/navigation";

const CajaUniversidad = ({ universidad, index, archived, columnasVisibles }) => {
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
        { columnasVisibles.includes("nombre") && <div className="w-[300px]">{universidad.nombre}</div> }
        { columnasVisibles.includes("pais") && <div className="w-[150px]">{universidad.pais}</div> }
        { columnasVisibles.includes("contactoEmail") && <div className="w-[250px]">{universidad.contactoEmail}</div> }
      </div>
    </div>
  );
};

export default CajaUniversidad;
