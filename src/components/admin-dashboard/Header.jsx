import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "@/components/Icons";

const Header = ({ sortOrder, setSortOrder, activeTab, setActiveTab }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getTabStyle = (tab) =>
    tab === activeTab ? "text-blue-600 font-semibold" : "text-neutral-500 font-semibold";

  const getIconClass = (tab) =>
    tab === activeTab ? "text-blue-600" : "text-neutral-500";

  return (
    <div className="w-full max-w-6xl px-6 py-4 mt-6 flex flex-col items-start gap-4">
      {/* Tabs + Filtros + Fecha */}
      <div className="w-full flex justify-between items-center">
        {/* Tabs */}
        <div className="w-[696px] h-10 relative">
          <div className="left-[8px] top-0 absolute inline-flex justify-start items-center gap-40">
            <div onClick={() => setActiveTab("outgoing")} className="flex cursor-pointer items-center gap-2">
              <Icons.Person className={`w-5 h-5 ${getIconClass("outgoing")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("outgoing")}`}>Outgoing</div>
            </div>
            <div onClick={() => setActiveTab("incoming")} className="flex cursor-pointer items-center gap-2">
              <Icons.People className={`w-5 h-5 ${getIconClass("incoming")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("incoming")}`}>Incoming</div>
            </div>
            <div onClick={() => setActiveTab("universidades")} className="flex cursor-pointer items-center gap-2">
              <Icons.Universidad className={`w-5 h-5 ${getIconClass("universidades")}`} />
              <div className={`text-base font-['Montserrat'] ${getTabStyle("universidades")}`}>Universidades</div>
            </div>
          </div>
        </div>

        {/* Botón Filtros + Fecha */}
        <div className="flex items-center gap-4">
          {/* Botón Filtros */}
          <div className="relative">
  <button
    onClick={() => setIsFilterOpen((prev) => !prev)}
    className="px-4 py-2 rounded-lg outline outline-[1.5px] outline-offset-[-1.5px] outline-slate-900 inline-flex items-center gap-2"
  >
    <Icons.Filtros />
    <span className="text-slate-900 text-xs font-normal font-['Montserrat'] leading-none">Filtros</span>
    <Icons.FlechaAbajo />
  </button>

  {/* Panel desplegable de filtros */}
  {isFilterOpen && (
    <div className="absolute top-full mt-2 left-0 z-50 p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black flex flex-col justify-start items-start gap-4 w-64 shadow-lg">
      {/* ... aquí el contenido del panel de filtros que ya generamos ... */}
    </div>
  )}
</div>


          {/* Botón Fecha */}
          <Button
            className="px-4 py-2 border border-slate-900 text-slate-900 rounded-lg flex items-center gap-2 bg-transparent hover:bg-transparent"
            disabled
            style={{ height: "40px" }}
          >
            <Icons.Calendar />
            <span>Febrero 2025</span>
          </Button>
        </div>
      </div>

      {/* Panel desplegable de filtros */}
      {isFilterOpen && (
  <div className="p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black flex flex-col justify-start items-start gap-4 w-64">
    {/* Alfabéticamente */}
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-black text-xs font-semibold font-['Montserrat']">Alfabéticamente:</span>
      {["A-Z", "Z-A"].map((label) => (
        <label key={label} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
          <span>Alfabéticamente {label}</span>
          <input type="checkbox" className="w-4 h-4" />
        </label>
      ))}
    </div>

    {/* Titulación */}
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-black text-xs font-semibold font-['Montserrat']">Titulación</span>
      {["DIDI", "INSO", "ANIM", "DIPI", "MAS", "ENTORNOS", "MULTIPLATAFORMA"].map((titulacion) => (
        <label key={titulacion} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
          <span>{titulacion}</span>
          <input type="checkbox" className="w-4 h-4" />
        </label>
      ))}
    </div>

    {/* Año de salida */}
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-black text-xs font-semibold font-['Montserrat']">Año de salida</span>
      {["2024-2025", "2023-2024", "2022-2023", "2021-2022", "2020-2021", "Anterior"].map((ano) => (
        <label key={ano} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
          <span>{ano}</span>
          <input type="checkbox" className="w-4 h-4" />
        </label>
      ))}
    </div>

    {/* Nota media */}
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-black text-xs font-semibold font-['Montserrat']">Nota media</span>
      {["De mayor a menor", "De menor a mayor"].map((op) => (
        <label key={op} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
          <span>{op}</span>
          <input type="checkbox" className="w-4 h-4" />
        </label>
      ))}
    </div>

    {/* Estado de la solicitud */}
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-black text-xs font-semibold font-['Montserrat']">Estado de la solicitud</span>
      {["Pendiente", "Rechazada", "Aprobada"].map((estado) => (
        <label key={estado} className="flex justify-between items-center w-full text-xs text-black font-['Montserrat']">
          <span>{estado}</span>
          <input type="checkbox" className="w-4 h-4" />
        </label>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default Header;
