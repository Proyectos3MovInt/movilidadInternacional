"use client";

import * as Icons from "../Icons";
import { useRouter } from "next/navigation";

const MenuSuperior = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center bg-white h-16">
      <div className="w-[75rem] flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <button
          className="w-48 h-8 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Icons.LogoUtad />
        </button>

        {/* Calendario */}
        <div className="flex items-center gap-5">
          <div
            onClick={() => router.push("/admin-calendar")}
            className="px-4 py-1 bg-blue-600 rounded-lg flex items-center gap-2 
            cursor-pointer hover:bg-[#003366] transition-colors duration-200"
          >
            <button className="w-6 h-6">
              <Icons.CalendarHeader />
            </button>
            <div className="text-white text-base font-normal font-['Montserrat'] leading-normal">
              Calendario
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSuperior;
