const SolicitudesTable = ({ solicitudes }) => (
  <div className="border p-4 rounded">
    <div className="grid grid-cols-8 font-semibold border-b pb-2 mb-2">
      <span>Nombre</span>
      <span>Titulación</span>
      <span>Idioma</span>
      <span>Semestre</span>
      <span>Universidad de Destino</span>
      <span>Observaciones</span>
      <span>Año de salida</span>
      <span>Estado</span>
    </div>
    <div className="space-y-2">
      {solicitudes.map((solicitud, index) => (
        <div key={index} className="grid grid-cols-8 p-2 border rounded">
          <span>{solicitud.nombre}</span>
          <span>{solicitud.titulacion}</span>
          <span>{solicitud.idioma}</span>
          <span>{solicitud.semestre}</span>
          <span>{solicitud.universidadDestino}</span>
          <span>{solicitud.observaciones}</span>
          <span>{solicitud.año}</span>
          <span className="px-4 py-1 border rounded text-center">{solicitud.estado}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SolicitudesTable;
