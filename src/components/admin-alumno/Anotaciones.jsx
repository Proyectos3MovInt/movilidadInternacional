"use client";

import { useState, useEffect } from "react";

export default function Anotaciones({ id }) {
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentario = async () => {/*
      try {
        const response = await axios.get(`/api/comentarios/${id}`);
        if (response.data?.comentario) {
          setComentario(response.data.comentario);
        } else {
          setComentario(""); // or set a hint here
        }
      } catch (err) {
        console.error("Error loading comentario:", err);
      } finally {
        setLoading(false);
      }
    */};

    if (id) fetchComentario();
  }, [id]);

  const handleBlur = async () => {
    /*try {
      await axios.post(`/api/comentarios/${id}`, {
        comentario,
      });
    } catch (err) {
      console.error("Error saving comentario:", err);
    }*/
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
        className="w-full p-2 rounded h-36 resize-none"
        placeholder={"Escribe un comentario aquí..."}
      />
    </div>
  );
}
