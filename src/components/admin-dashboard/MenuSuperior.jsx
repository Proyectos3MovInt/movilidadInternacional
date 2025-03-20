import { LogoUtad } from "../Icons";
const MenuSuperior = () => {
  return (
    <nav className="w-full bg-gray-100 px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <LogoUtad />
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-blue-600 font-semibold">Incoming</a>
        <a href="#" className="text-blue-600 font-semibold">Outgoing</a>
        <a href="#" className="text-blue-600 font-semibold">Universidades</a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 border rounded-full">🔍</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <span>⚠️</span> Incidencias
        </button>
      </div>
    </nav>
  );
};

export default MenuSuperior;
