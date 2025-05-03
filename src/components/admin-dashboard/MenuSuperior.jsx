"use client";

import * as Icons from "../Icons";
import SearchBar from "@/components/admin-dashboard/SearchBar";
import { useRouter } from "next/navigation";

const MenuSuperior = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();
  return (
    <div className="w-[1440px] h-16 relative">
      <div className="w-[1440px] h-16 py-4 left-0 top-0 absolute bg-white" />
      <div className="w-[1069px] h-16 py-4 left-[185px] top-0 absolute bg-white inline-flex justify-between items-center">
        <button
          className="w-48 h-8 relative cursor-pointer"
          onClick={() => router.push("/admin-dashboard")}
        >
          <Icons.LogoUtad />
        </button>
        <div className="flex justify-end items-center gap-5">
          <div
            data-property-1="buscador corto"
            className="w-10 h-10 relative cursor-pointer"
          >
            <div className="w-10 h-10 left-0 top-0 absolute bg-white rounded-full border-[1.50px] border-black" />
            <div className="w-4 h-4 left-[10px] top-[10px] absolute">
              <Icons.Lupa />
            </div>
          </div>
          <div
            onClick={() => router.push("/admin-calendar")}
            data-property-1="Default"
            className="px-4 py-1 bg-blue-600 rounded-lg flex justify-start items-center gap-2 cursor-pointer"
          >
            <button className="w-6 h-6 relative cursor-pointer">
              <Icons.CalendarHeader />
            </button>
            <div className="justify-start text-white text-base font-normal font-['Montserrat'] leading-normal">
              Calendario
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSuperior;
