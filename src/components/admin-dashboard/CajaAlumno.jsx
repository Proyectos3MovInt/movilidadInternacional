import { useRouter } from "next/navigation";

const CajaAlumno = ({ solicitud, index, visibleFields }) => {
  const router = useRouter();

  const handleClick = () => {


    router.push(`/admin-alumno/${solicitud.id}`);
  };

  // Función para determinar el estilo de cada campo
  const getCellStyle = (field) => {
    const baseStyle = "p-3";

    if (field === 'estado') {
      return {
        className: `${baseStyle}`,
        content: (
            <span className={`px-3 py-1 rounded-full text-white ${
                solicitud.estado === "Aprobada" ? "bg-green-500" :
                    solicitud.estado === "Rechazada" ? "bg-red-500" :
                        "bg-yellow-500"
            }`}>
            {solicitud[field]}
          </span>
        )
      };
    }

    return {
      className: field === 'universidadDestino' ? `${baseStyle} min-w-28` : baseStyle,
      content: solicitud[field]
    };
  };

  return (
      <tr
          onClick={handleClick}
          className={`cursor-pointer ${
              index % 2 === 0 ? "bg-blue-100" : "bg-white"
          } hover:bg-gray-200`}
      >
        {visibleFields.map((field) => {
          const { className, content } = getCellStyle(field);
          return (
              <td key={field} className={className}>
                {content}
              </td>
          );
        })}
      </tr>
  );
};

export default CajaAlumno;













