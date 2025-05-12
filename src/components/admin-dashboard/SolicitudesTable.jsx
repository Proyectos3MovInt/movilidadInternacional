import CajaAlumno from "@/components/admin-dashboard/CajaAlumno";

const SolicitudesTable = ({ solicitudes }) => {
  return (
    <div className="flex flex-col space-y-2">
      {solicitudes.map((solicitud, index) => (
        <CajaAlumno key={solicitud.id} solicitud={solicitud} index={index} />
      ))}
    </div>
  );
};

export default SolicitudesTable;
