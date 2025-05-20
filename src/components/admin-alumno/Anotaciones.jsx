"use client";

import { addStudentAnotaciones, getStudentAnotaciones } from "@/lib/adminFunctions";
import { addUniversityAnotaciones, getUniversityAnotaciones } from "@/lib/universidadesFunctions";
import { useState, useEffect } from "react";

export default function Anotaciones({ id, isStudent = true }) {
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentario = async () => {
      try {
        let res_json = "";
        if (isStudent) {
          res_json = await getStudentAnotaciones(id);
        } else {
          res_json = await getUniversityAnotaciones(id);
        }

        console.log(res_json);

        setComentario(res_json.anotacionesAdmin || "");
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
      if (isStudent) {
        const res = await addStudentAnotaciones(id, comentario);
      } else {
        const res = await addUniversityAnotaciones(id, comentario);
      }

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
        placeholder={
          loading ? "Cargando comentario..." : "Escribe un comentario aquí..."
        }
      />
      {loading && (
        <p className="text-sm text-gray-500 mt-2">Cargando comentario...</p>
      )}
    </div>
  );
}
