"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "@/components/Icons";
import Overlay from "@/components/Overlay";
import { register } from "@/lib/auth";

export default function Register() {
  const [isClient, setIsClient] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response_status = await register(email, password, firstName, lastName);
    if (response_status === 201) {
      router.push("/form-outgoing");
    } else {
      console.log("Error en registro. Código de estado:", response_status);
      setError(true);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative font-[Montserrat]"
      style={{ backgroundImage: "url('/images/fondo1.jpg')" }}
    >
      <Overlay />

      <form
        className="relative bg-white rounded-2xl flex flex-col items-center p-12 w-[668px] h-auto shadow-lg"
        onSubmit={handleSubmit}
      >
        <img src="/logoblanco.jpg" alt="Logo" className="w-[180px] h-auto absolute top-6 left-6" />

        <h2 className="text-2xl font-bold text-[#0065EF] text-center mt-14 leading-9">
          CREA TU CUENTA
        </h2>

        <div className="flex flex-col w-full mt-6 space-y-5">
          <div className="flex gap-4">
            <input
              className="w-[224px] h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-[308px] h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="w-[548px] h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-[548px] h-[48px] px-4 border border-black rounded-lg flex justify-between items-center">
            <input
              className="w-full text-black text-md focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Icons.EyeIcon /> : <Icons.EyeClosedIcon />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox text-[#0065EF] rounded"
            checked={isStudent}
            onChange={() => setIsStudent(!isStudent)}
          />
          <span className="text-black text-md">Soy estudiante de U-tad</span>
        </div>

        <div className="mt-6 w-full flex justify-center">
          <button
            type="submit"
            className="w-[338px] h-[56px] bg-[#0065EF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Registrarme
          </button>
        </div>

        {error && (
          <div className="w-full flex justify-center mt-4">
            <p className="text-red-600 flex items-center gap-2 text-center">
              <Icons.Error />
              Hubo un problema al registrarse.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
