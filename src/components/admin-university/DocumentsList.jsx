"use client";
// components/admin-university/DocumentsList.jsx
export default function DocumentsList({ documentos }) {
  return (
    <div>
      <h3 className="font-semibold text-[#0065EF] mb-3">
        Documentos relevantes
      </h3>
      <ul className="space-y-2">
        {documentos.map((doc) => (
          <li key={doc._id} className="flex items-center justify-between">
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline"
            >
              {doc.nombre}
            </a>
            <span className="text-gray-400 text-xl">↗</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
