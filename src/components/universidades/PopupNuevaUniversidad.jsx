"use client";

import { useState } from "react";
import { SimboloMas, SimboloMenos } from "../Icons";
import { crearUniversidad } from "@/lib/universidadesFunctions";


export default function PopupNuevaUniversidad({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [paginaWeb, setPaginaWeb] = useState("");
  const [contactos, setContactos] = useState([{ nombre: "", email: "" }]);
  const [denominacion, setDenominacion] = useState("");
  const [plazo, setPlazo] = useState("");
  const [activoHasta, setActivoHasta] = useState("");


  const handleContactoChange = (index, field, value) => {
    const updated = [...contactos];
    updated[index][field] = value;
    setContactos(updated);
  };

  const agregarContacto = () => {
    setContactos([...contactos, { nombre: "", email: "" }]);
  };

  const eliminarContacto = (index) => {
    const updated = contactos.filter((_, i) => i !== index);
    setContactos(updated);
  };

  const handleSubmit = async () => {
    const emailPrincipal = contactos[0]?.email?.trim();
  
    if (!emailPrincipal) {
      alert("Debes introducir al menos un email de contacto.");
      return;
    }
  
    const datos = {
      nombre,
      pais: ubicacion,
      paginaWeb,
      contactos,
      contactoEmail: emailPrincipal,
      denominacion,
      plazo,
      activoHasta,
    };
  
    const respuesta = await crearUniversidad(datos);
    if (respuesta) {
      console.log("✅ Universidad creada:", respuesta);
      onClose?.();
    } else {
      alert("❌ No se pudo crear la universidad");
    }
  };
  

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white p-10 rounded-lg shadow-md z-50 w-[600px]">
      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-base text-black mb-1 font-['Montserrat']">
          Nombre de la universidad
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
          placeholder="Añade un título"
        />
      </div>

      {/* Ubicación */}
      <div className="mb-4">
        <label className="block text-base text-black mb-1 font-['Montserrat']">
          Ubicación
        </label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
          placeholder="Ciudad, País"
        />
      </div>

      {/* Página web */}
      <div className="mb-4">
        <label className="block text-base text-black mb-1 font-['Montserrat']">
          Página web (opcional)
        </label>
        <input
          type="text"
          value={paginaWeb}
          onChange={(e) => setPaginaWeb(e.target.value)}
          className="w-full h-12 px-4 py-2 rounded-lg border border-neutral-500 text-black"
          placeholder="https://..."
        />
      </div>

      {/* Contacto */}
      <div className="mb-4">
        <label className="block text-base text-black mb-2 font-['Montserrat']">
          Personas de contacto
        </label>
        {contactos.map((contacto, i) => (
          <div key={i} className="mb-4 space-y-2 relative">
            <input
              type="text"
              value={contacto.nombre}
              onChange={(e) => handleContactoChange(i, "nombre", e.target.value)}
              className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
              placeholder="Nombre completo"
            />
            <input
              type="email"
              value={contacto.email}
              onChange={(e) => handleContactoChange(i, "email", e.target.value)}
              className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
              placeholder="Email de contacto"
            />
          </div>
        ))}
                <div className="mt-2 flex gap-2">
          <button
            onClick={agregarContacto}
            className="h-8 px-4 py-1 bg-white rounded-lg outline outline-1 outline-blue-600 text-blue-600 text-xs font-semibold font-['Montserrat'] flex items-center gap-2"
          >
            <SimboloMas />
            Añadir otro contacto
          </button>

          {contactos.length > 1 && (
            <button
              onClick={() => eliminarContacto(contactos.length - 1)}
              className="h-8 px-4 py-1 bg-white rounded-lg outline outline-1 outline-red-600 text-red-600 text-xs font-semibold font-['Montserrat'] flex items-center gap-2"
            >
              <SimboloMenos />
              Eliminar último
            </button>
          )}
        </div>

      </div>



      

      {/* Denominación y plazo */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-base text-slate-900 mb-1 font-['Montserrat']">
            Denominación U-tad
          </label>
          <input
            type="date"
            value={denominacion}
            onChange={(e) => setDenominacion(e.target.value)}
            className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
          />
        </div>
        <div className="flex-1">
          <label className="block text-base text-slate-900 mb-1 font-['Montserrat']">
            Plazo del alumno
          </label>
          <input
            type="date"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
          />
        </div>
      </div>


      {/* Convenio activo hasta */}
      <div className="mb-6">
        <label className="block text-base text-black mb-1 font-['Montserrat']">
          Convenio activo hasta
        </label>
        <input
          type="date"
          value={activoHasta}
          onChange={(e) => setActivoHasta(e.target.value)}
          className="w-full h-12 px-4 py-2 rounded-lg outline outline-1.5 outline-neutral-500 text-black"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-gray-300 rounded-lg text-black font-semibold font-['Montserrat']"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-600 rounded-lg text-white font-semibold font-['Montserrat']"
        >
          Guardar Universidad
        </button>
      </div>
    </div>
  );
}
