"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@components/Icons";

export default function Register() {
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evita errores de hidratación

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.status === 201) {
        alert("¡Registro exitoso! Ahora inicia sesión.");
        router.push("/login");
      } else if (response.status === 400) {
        alert("Error: Este correo ya está registrado.");
      } else {
        alert("Ocurrió un problema con el registro.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Hubo un problema con el registro.");
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative font-[Montserrat]" style={{ backgroundImage: "url('/fondo1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-5 right-10 text-white text-lg">
        <span className="font-semibold">Español</span> <span className="font-medium">| English</span>
      </div>
      <form className="relative bg-white rounded-[2.5rem] flex flex-col p-0 w-[90%] max-w-[33.75rem] h-[40rem] shadow-lg font-[Montserrat] items-start py-10 px-8" onSubmit={handleSubmit}>
        <div className="absolute top-14 ml-[1.7rem]">
          <img src="/logoblanco.jpg" alt="Logo" className="w-[11.675rem] h-[3.438rem]" />
        </div>
        <div className="flex flex-col items-center w-full mt-[6.96rem] gap-6">
          <h2 className="text-[2rem] leading-[2.438rem] font-bold text-[#0065EF] text-center">CREAR CUENTA</h2>
          <input
            className="w-[26.25rem] h-[2.75rem] p-3 border-[0.1rem] border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-[26.25rem] h-[2.75rem] p-3 border-[0.1rem] border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            type="text"
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
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
              <EyeIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-[26.25rem] ml-[1.5rem] mt-[2.2rem] px-1">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black text-lg">Acepto los términos y condiciones</span>
          </label>
        </div>
        <div className="flex justify-center w-full mt-6">
          <button className="w-[13.875rem] h-[2.688rem] bg-[#0065EF] text-white text-lg font-medium py-2 rounded-full hover:bg-blue-700 transition">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}