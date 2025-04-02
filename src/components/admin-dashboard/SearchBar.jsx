import * as Icons from '../Icons';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex items-center bg-white p-2 rounded-[0.5rem] shadow-md w-80">
      <div className="absolute left-4">
        <Icons.Lupa />
      </div>

      {/* Campo de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
        className="pl-10 w-full p-2 border-none bg-transparent outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
