"use client";
import React, { useState } from "react";
import "./CreateEventBtn.css";
import { CreateEventPopup } from "@/components/admin-calendar/createEventPopup";
import { SimboloMas } from "../Icons";

export const CreateEventBtn = () => {
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el popup

  // Función para mostrar el popup
  const handleClick = () => {
    setShowPopup(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setShowPopup(false);
    location.reload();
  };

  return (
    <div>
      <div className="h-10 px-4 py-1 bg-white rounded-lg inline-flex justify-start items-center gap-2 cursor-pointer" onClick={handleClick}>
          <SimboloMas />
        <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">Crear nuevo evento</div>
      </div>

      {/* Mostrar el popup cuando showPopup es true */}
      {showPopup && <CreateEventPopup onClose={handleClosePopup} />}
    </div>
  );
};
