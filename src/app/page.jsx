"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "@/components/Icons";
import { login } from "@/lib/auth.js";
import Boton from "@/components/BotonAzul";
import Overlay from "@/components/Overlay";

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

  if (!isClient) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response_status = await login(email, password);
    if (response_status === 200) {
      router.push("/form-outgoing");
    } else {
      console.log("Error en login. Código de estado:", response_status);
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
        className="relative bg-white rounded-[2.5rem] flex flex-col w-[90%] max-w-[33.75rem] min-h-[33rem] shadow-lg items-center py-10 px-8 z-10"
        onSubmit={handleSubmit}
      >

        <div className="absolute top-6 left-6">
          <img src="/logoblanco.jpg" alt="Logo" className="w-[180px] h-auto" />
        </div>

        <h2 className="text-[2rem] leading-[2.438rem] font-bold text-[#0065EF] text-center mt-24">
          INICIO DE SESIÓN
        </h2>

        <div className="flex flex-col items-center w-full mt-6 gap-6">
          <input
            className="w-[26.25rem] h-[2.75rem] p-3 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-[26.25rem] h-[2.75rem]">
            <input
              className="w-full h-full p-3 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Icons.EyeIcon /> : <Icons.EyeClosedIcon />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-[26.25rem] mt-6">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black text-lg">Recuérdame</span>
          </label>
          <a href="#" className="text-black underline text-lg">
            Olvidé mi contraseña
          </a>
        </div>

        <div className="flex justify-center w-full mt-6">
          <Boton text="Iniciar sesión" />
        </div>

        <div className="flex flex-row items-center gap-2 mt-4">
          <div className="text-black text-lg">¿Aún no tienes cuenta?</div>
          <a href="/register" className="text-black underline font-bold text-lg">
            Regístrate
          </a>
        </div>

        {error && (
          <div className="w-full flex justify-center mt-2">
            <p className="text-red-600 flex items-center gap-2 font-medium text-center">
              <Icons.Error className="w-4 h-4" />
              Correo o contraseña incorrectos.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
