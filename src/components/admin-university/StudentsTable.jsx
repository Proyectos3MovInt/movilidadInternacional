// components/admin-university/StudentsTable.jsx
export default function StudentsTable({ students }) {
  const renderEstado = (estadoNormalizado) => {
    switch (estadoNormalizado) {
      case "ACEPTADO":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#84CC59] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#4B8726] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Aceptado por U-TAD
            </div>
          </div>
        );
      case "RECHAZADO":
        return (
          <div className="h-7 px-4 py-1 bg-[#F05A50] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#BD3229] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Rechazado por U-TAD
            </div>
          </div>
        );
      case "EN CURSO":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#FF58A2] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#D72071] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad empezada
            </div>
          </div>
        );
      case "FINALIZADO":
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#9DA3A7] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#686A6C] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Movilidad finalizada
            </div>
          </div>
        );
      case "PENDIENTE":
      default:
        return (
          <div className="w-48 h-7 px-4 py-1 bg-[#EEA63B] rounded-3xl inline-flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#BC8127] rounded-full" />
            <div className="text-white text-xs font-semibold font-['Montserrat']">
              Solicitud realizada
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 rounded-2xl">
      <h3 className="text-[#0065EF] font-semibold mb-4">
        Alumnos de intercambio:
      </h3>
      <div className="divide-y divide-gray-200 rounded-lg overflow-hidden">
        {students.map((s, idx) => (
          <div
            key={s.id}
            className={`flex items-center py-3 px-4 ${
              idx % 2 === 0 ? "bg-white" : "bg-[#E5E9EC]"
            }`}
          >
            {/* Nombre */}
            <div className="flex-1 text-sm text-[#14192C]">{s.nombre}</div>
            {/* Programa */}
            <div className="w-32 text-sm text-[#14192C]">{s.programa}</div>
            {/* Curso */}
            <div className="w-24 text-sm text-[#14192C]">{s.curso}</div>
            {/* Estado */}
            {renderEstado(s.estado)}
          </div>
        ))}
      </div>
    </div>
  );
}
