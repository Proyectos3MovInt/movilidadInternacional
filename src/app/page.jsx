"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "@/components/Icons";
import { login } from "@/lib/login.js"
import Boton from "@/components/BotonAzul";

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evita el error de hidratación

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password);
    if(response.status === 200) {
      router.push("/form-outgoing");
    } else {
      setError(true); // en el return mostraríamos el error al usuario
    }

  };

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative font-[Montserrat]" style={{ backgroundImage: "url('/fondo1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-5 right-10 text-white text-lg">
        <span className="font-semibold">Español</span> <span className="font-medium">| English</span>
      </div>
      <form className="relative bg-white rounded-[2.5rem] flex flex-col p-0 w-[90%] max-w-[33.75rem] h-[31.875rem] shadow-lg font-[Montserrat] items-start py-10 px-8" onSubmit={handleSubmit}>
        <div className="absolute top-14 ml-[1.7rem]">
          <img src="/logoblanco.jpg" alt="Logo" className="w-[11.675rem] h-[3.438rem]" />
        </div>
        <div className="flex flex-col items-center w-full mt-[6.96rem] gap-6">
        <h2 className="text-[2rem] leading-[2.438rem] font-bold text-[#0065EF] text-center">INICIO DE SESIÓN</h2>
          <input
            className="w-[26.25rem] h-[2.75rem] p-3 border-[0.1rem] border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative max-w-md flex items-center">
            <input
              className="w-[26.25rem] h-[2.75rem] p-3 border-[0.1rem] border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icons.EyeIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-[26.25rem] ml-[1.5rem] mt-[2.2rem] px-1">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black text-lg">Recuérdame</span>
          </label>
          <a href="#" className="text-black underline text-lg">Olvidé mi contraseña</a>
        </div>
        <div className="flex justify-center w-full mt-6">
          <Boton text={"Iniciar sesión"}/>
        </div>
      </form>
    </div>
  );
}