// components/admin-university/StudentsTable.jsx
export default function StudentsTable({ students }) {
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
            <div className="w-48 flex justify-end">
              <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                {/* Bullet */}
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                Aceptado por U-TAD
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
