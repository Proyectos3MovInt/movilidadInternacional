"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormularioLayout from "./components/FormularioLayout";

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const result: { token: string } = await response.json();
        localStorage.setItem("jwt", result.token);
        alert("¡Inicio de sesión exitoso!");
        router.push("/dashboard");
      } else {
        alert("Credenciales incorrectas o error en el servidor.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <FormularioLayout titulo="INICIO DE SESIÓN">
      <input
        className="w-full p-2 border border-black rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border border-black rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
        <a href="#" className="text-black underline">Olvidé mi contraseña</a>
      </div>
      <button className="w-1/2 bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition mb-4">
        Iniciar sesión
      </button>
    </FormularioLayout>
  );
}
