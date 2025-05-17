"use client";

import { useState, useEffect } from "react";

export default function Anotaciones({ id }) {
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentario = async () => {
      try {
        const res = await fetch(`/admin/anotaciones/${id}`);
        if (!res.ok) throw new Error("Error cargando el comentarip");
        const data = await res.json();

        setComentario(data?.comentario || "");
      } catch (err) {
        console.error("Error cargando el comentario:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchComentario();
  }, [id]);

  const handleBlur = async () => {
    try {
      const res = await fetch(`/admin/anotaciones/${id}`, {
        method: "POST", // o "PUT"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comentario }),
      });

      if (!res.ok) throw new Error("Error al guardar el comentario");
    } catch (err) {
      console.error("Error al guardar comentario:", err);
    }
  };

  return (
    <div className="bg-white rounded-[0.5rem] p-6 w-full">
      <div className="justify-center text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
        Comentarios
      </div>
      <textarea
        onBlur={handleBlur}
        onChange={(e) => setComentario(e.target.value)}
        value={comentario}
        className="w-full p-2 rounded h-36 resize-none border border-gray-300"
        placeholder={loading ? "Cargando comentario..." : "Escribe un comentario aquí..."}
      />
      {loading && (
        <p className="text-sm text-gray-500 mt-2">Cargando comentario...</p>
      )}
    </div>
  );
}
