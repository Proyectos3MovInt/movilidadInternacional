// components/admin-university/UniversityHeader.jsx
export default function UniversityHeader({ nombre, contactoEmail, pais }) {
  return (
    <div className="flex items-start gap-6">
      {/* Placeholder de logo */}
      <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-gray-400">Logo</span>
      </div>

      {/* Datos de la universidad */}
      <div className="flex flex-col gap-2">
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Nombre:{" "}
          <span className="text-[#14192C] font-normal">{nombre || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          País: <span className="text-[#14192C] font-normal">{pais || ""}</span>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Web:{" "}
          <a href="#" className="text-[#14192C] font-normal hover:underline">
            {/* aquí luego pondrás university.web */}
            example.com
          </a>
        </p>
        <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
          Persona de contacto:{" "}
          <a
            href={`mailto:${contactoEmail}`}
            className="text-[#14192C] font-normal hover:underline"
          >
            {contactoEmail || ""}
          </a>
        </p>
      </div>
    </div>
  );
}
