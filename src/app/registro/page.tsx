"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 200) {
        const result: { token: string } = await response.json();
        localStorage.setItem("jwt", result.token);
        alert("¡Registro exitoso! Ahora inicia sesión.");
        router.push("/login");
      } else {
        alert("Credenciales incorrectas o error en el servidor.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: "url('/fondo1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="absolute top-8 right-10 text-white text-lg flex space-x-2">
        <span className="font-bold cursor-pointer">Español</span>
        <span>|</span>
        <span className="cursor-pointer">English</span>
      </div>
      
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-[40px] shadow-lg w-full max-w-lg text-center">
        <img src="/logoblanco.jpg" alt="Logo" className="mb-8 w-32 ml-4" />
        <h2 className="text-2xl font-bold text-blue-600 mb-8">CREAR CUENTA</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Nombre"
          value={email}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between text-sm mt-2 mb-8">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black">Recuérdame</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black">Acepto los términos y condiciones</span>
          </label>
        </div>
        <button className="w-1/2 bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition mb-4">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
