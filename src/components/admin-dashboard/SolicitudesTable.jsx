const SolicitudesTable = ({ solicitudes }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <div className="grid grid-cols-6 font-semibold bg-gray-100 border-b p-3">
        <span>Nombre</span>
        <span>Titulación</span>
        <span>Año de salida</span>
        <span>Universidad de destino</span>
        <span>Nota media</span>
        <span>Estado de solicitud</span>
      </div>
      <div className="divide-y">
        {solicitudes.map((solicitud, index) => (
          <div key={index} className="grid grid-cols-6 p-3 items-center">
            <span>{solicitud.nombre}</span>
            <span>{solicitud.grado}</span>
            <span>{solicitud.año}</span>
            <span>{solicitud.universidadDestino}</span>
            <span>{solicitud.notaMedia}</span>
            <span
              className={`px-3 py-1 rounded-full text-white text-center ${
                solicitud.estado === "Aprobada"
                  ? "bg-green-500"
                  : solicitud.estado === "Rechazada"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {solicitud.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudesTable;
