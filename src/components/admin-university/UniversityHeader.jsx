export default function UniversityHeader({
  nombre,
  contactoEmail,
  pais,
  web,
  fechaDenominacion,
  fechaPlazoAlumno,
  fechaFinalizacionConvenio,
  isEditing = false,
  onChange = () => {},
}) {
  return (
    <div className="flex items-start gap-6">
      {/* ─────────── Logo + Convenio ─────────── */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        {/* Logo */}
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400">Logo</span>
        </div>

        {/* Píldora de fin de convenio */}
        {isEditing ? (
          <input
            type="date"
            name="fechaFinalizacionConvenio"
            value={
              fechaFinalizacionConvenio
                ? new Date(fechaFinalizacionConvenio).toISOString().slice(0, 10)
                : ""
            }
            onChange={onChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs text-[#14192C]"
          />
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#84CC59] text-white font-['Montserrat']">
            <div className="w-2.5 h-2.5 bg-[#4B8726] rounded-full mr-2" />
            Activo hasta:{" "}
            <span className="ml-1 font-semibold">
              {fechaFinalizacionConvenio
                ? new Date(fechaFinalizacionConvenio).toLocaleDateString(
                    "es-ES"
                  )
                : "—"}
            </span>
          </span>
        )}
      </div>

      {/* ─────────── Datos de texto ─────────── */}
      <div className="flex flex-col gap-2 w-full">
        <LabelValue
          label="Nombre:"
          name="nombre"
          value={nombre}
          isEditing={isEditing}
          onChange={onChange}
        />
        <LabelValue
          label="País:"
          name="pais"
          value={pais}
          isEditing={isEditing}
          onChange={onChange}
        />
        <LabelValue
          label="Web:"
          name="web"
          value={web}
          isEditing={isEditing}
          onChange={onChange}
          isLink
        />
        <LabelValue
          label="Persona de contacto:"
          name="contactoEmail"
          value={contactoEmail}
          isEditing={isEditing}
          onChange={onChange}
          isEmail
        />

        {/* ──────── Plazos ──────── */}
        <p className="text-[#0065EF] font-semibold">Plazos:</p>
        <DateLine
          label="Denominación U-tad"
          name="fechaDenominacion"
          date={fechaDenominacion}
          isEditing={isEditing}
          onChange={onChange}
        />
        <DateLine
          label="Plazo del alumno"
          name="fechaPlazoAlumno"
          date={fechaPlazoAlumno}
          isEditing={isEditing}
          onChange={onChange}
        />
        {/* Fin de convenio ya se muestra con el logo → no lo ponemos aquí */}
      </div>
    </div>
  );
}

/* ───────────────────────── utilidades ───────────────────────── */

function LabelValue({
  label,
  value,
  name,
  isEditing,
  onChange,
  isEmail = false,
  isLink = false,
}) {
  const input = (
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="ml-1 border border-gray-300 rounded px-2 py-1 text-sm text-[#14192C]"
    />
  );

  const text = isEmail ? (
    <a href={`mailto:${value}`} className="text-[#14192C] hover:underline">
      {value}
    </a>
  ) : isLink ? (
    <a
      href={value?.startsWith("http") ? value : `https://${value}`}
      target="_blank"
      rel="noreferrer"
      className="text-[#14192C] underline"
    >
      {value}
    </a>
  ) : (
    <span className="text-[#14192C]">{value}</span>
  );

  return (
    <p className="text-[#0065EF] font-semibold">
      {label} {isEditing ? input : text}
    </p>
  );
}

function DateLine({ label, name, date, isEditing, onChange }) {
  const formatted = date ? new Date(date).toLocaleDateString("es-ES") : "—";

  // SVG inline de calendario
  const calendarSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-[#0065EF] font-semibold mr-1">{label}:</span>
      {isEditing ? (
        <input
          type="date"
          name={name}
          value={date ? new Date(date).toISOString().slice(0, 10) : ""}
          onChange={onChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs text-[#14192C]"
        />
      ) : (
        <span className="text-[#14192C]">{formatted}</span>
      )}
      {calendarSvg}
    </div>
  );
}
