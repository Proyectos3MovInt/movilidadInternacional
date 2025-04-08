const UniversidadesTable = ({ universidades }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      {/* Cabecera de la tabla con las columnas actualizadas */}
      <div className="grid grid-cols-3 font-semibold bg-gray-100 border-b p-3">
        <span>Nombre</span>
        <span>País</span>
        <span>Contacto</span>
      </div>

      {/* Filas de datos */}
      <div className="divide-y">
        {universidades.map((universidad, index) => (
          <div key={index} className={`grid grid-cols-3 p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
            <span>{universidad.nombre}</span>
            <span>{universidad.pais}</span>
            <span>{universidad.contacto}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversidadesTable;
