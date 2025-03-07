const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="relative flex items-center bg-gray-200 p-4 rounded mb-4 shadow-inner w-full">
        {/* Icono de búsqueda en SVG */}
        <div className="absolute left-4">
          <svg width="25" height="25" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.597 25.1655H26.7897L26.1492 24.5478C28.8943 21.3451 30.3127 16.9757 29.5349 12.3318C28.4597 5.97218 23.1524 0.893611 16.747 0.115813C7.07024 -1.07376 -1.07376 7.07024 0.115813 16.747C0.893611 23.1524 5.97218 28.4597 12.3318 29.5349C16.9757 30.3127 21.3451 28.8943 24.5478 26.1492L25.1655 26.7897V28.597L34.888 38.3194C35.8259 39.2574 37.3586 39.2574 38.2966 38.3194C39.2345 37.3815 39.2345 35.8488 38.2966 34.9108L28.597 25.1655ZM14.8711 25.1655C9.17487 25.1655 4.57671 20.5673 4.57671 14.8711C4.57671 9.17487 9.17487 4.57671 14.8711 4.57671C20.5673 4.57671 25.1655 9.17487 25.1655 14.8711C25.1655 20.5673 20.5673 25.1655 14.8711 25.1655Z" fill="black"/>
          </svg>
        </div>
  
        {/* Campo de búsqueda */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          className="pl-12 w-full p-2 border-none bg-transparent outline-none text-gray-700"
        />
      </div>
    );
  };
  
  export default SearchBar;