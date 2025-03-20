const CajaAlumno = ({ solicitud, index }) => {
  return (
    <div
      className={`grid grid-cols-6 p-3 items-center ${
        index % 2 === 0 ? "bg-blue-100" : "bg-white"
      }`}
    >
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
  );
};

export default CajaAlumno;
