"use client";

import * as Icons from "../Icons";
import { useRouter } from "next/navigation";

const MenuSuperior = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();
  return (
    <header className="w-full bg-white h-16 flex items-center shadow-sm">
      <div className="w-[66.875rem] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          className="flex items-center h-8 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Icons.LogoUtad />
        </button>

        {/* Acciones de la derecha */}
        <div className="flex items-center gap-6">
          {/* Buscador */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black"
            onClick={() => {
              /* si quieres abrir un modal de búsqueda */
            }}
          >
            <Icons.Lupa />
          </button>

          {/* Botón Calendario */}
          <button
            onClick={() => router.push("/admin-calendar")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-lg"
          >
            <Icons.CalendarHeader className="w-5 h-5" />
            <span className="text-base font-normal">Calendario</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MenuSuperior;
