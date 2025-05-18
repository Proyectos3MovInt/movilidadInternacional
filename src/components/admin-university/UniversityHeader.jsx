export default function UniversityHeader({
  nombre,
  contactoEmail,
  pais,
  web,
  isEditing = false,
  onChange = () => {},
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-gray-400">Logo</span>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <LabelValue label="Nombre:" value={nombre} name="nombre" isEditing={isEditing} onChange={onChange} />
        <LabelValue label="País:" value={pais} name="pais" isEditing={isEditing} onChange={onChange} />
        <LabelValue label="Web:" value={web} name="web" isEditing={isEditing} onChange={onChange} />
        <LabelValue label="Persona de contacto:" value={contactoEmail} name="contactoEmail" isEditing={isEditing} onChange={onChange} isEmail />
      </div>
    </div>
  );
}

function LabelValue({ label, value, name, isEditing, onChange, isEmail = false }) {
  return (
    <p className="text-[#0065EF] font-semibold text-[1rem] leading-[1.5rem]">
      {label}{" "}
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="ml-1 border border-gray-300 rounded px-2 py-1 text-sm text-[#14192C] font-normal"
        />
      ) : isEmail ? (
        <a href={`mailto:${value}`} className="text-[#14192C] font-normal hover:underline">
          {value || ""}
        </a>
      ) : (
        <span className="text-[#14192C] font-normal">{value || ""}</span>
      )}
    </p>
  );
}
