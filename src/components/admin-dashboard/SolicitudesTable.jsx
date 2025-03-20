import CajaAlumno from "./CajaAlumno";

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
          <CajaAlumno key={index} solicitud={solicitud} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SolicitudesTable;
