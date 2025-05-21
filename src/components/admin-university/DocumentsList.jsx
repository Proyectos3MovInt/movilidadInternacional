"use client";

import { useState } from "react";
import { useParams } from "next/navigation"
import { subirArchivoUniversidad } from "@/lib/universidadesFunctions";

export default function DocumentsList({ documentos }) {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !nombre) return;

    const formData = new FormData();
    formData.append("universidad", id);
    formData.append("file", file);
    formData.append("nombre", nombre);

    const res_ok = await subirArchivoUniversidad(formData);

    if (!res_ok) {
      console.log(res);
      alert("Error al subir el documento");
      return;
    }

    window.location.reload();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <div>
      <h3 className="font-semibold text-[#0065EF] mb-3">
        Documentos relevantes
      </h3>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 mb-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Nombre del documento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border border-gray-300 px-2 py-1 text-sm rounded"
        />

        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center text-sm text-gray-500 cursor-pointer hover:border-blue-400"
        >
          {file ? `Archivo seleccionado: ${file.name}` : "Haz clic o arrastra un archivo aquí"}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />

        <button
          type="submit"
          className="bg-[#0065EF] text-white text-sm py-1 rounded cursor-pointer
              text-white hover:bg-[#003366] transition-colors duration-200"
        >
          Subir
        </button>
      </form>

      {/* Lista de documentos */}
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
