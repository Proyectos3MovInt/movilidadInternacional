import { LogoUtad, Incidencias } from "../Icons";
import SearchBar from "@/components/admin-dashboard/SearchBar";

const MenuSuperior = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="w-full h-[4.5rem] bg-white flex justify-between items-center px-[2rem]">
      {/* Logo - Izquierda */}
      <div className="h-8 flex items-center">
        <LogoUtad className="h-full w-auto" />
      </div>

      {/* Navegación Central */}
      <div className="flex gap-6 text-blue-600 font-semibold">
        <a href="#" className="hover:text-blue-700 transition-colors">Incoming</a>
        <a href="#" className="hover:text-blue-700 transition-colors">Outgoing</a>
        <a href="#" className="hover:text-blue-700 transition-colors">Universidades</a>
      </div>

      {/* Derecha: Buscador + Incidencias */}
      <div className="flex items-center gap-4">
        <div className="w-[300px] mr-2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <button className="bg-[#0065EF] text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Incidencias className="h-5 w-5" />
          <span>Incidencias</span>
        </button>
      </div>
    </nav>
  );
};

export default MenuSuperior;
