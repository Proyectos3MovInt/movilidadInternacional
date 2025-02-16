"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormularioLayout from "../components/FormularioLayout";

export default function Register() {
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
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
      const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.status === 201) {
        alert("¡Registro exitoso!");
        router.push("/login");
      } else {
        alert("Hubo un problema con el registro.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Hubo un problema al registrarse.");
    }
  };

  return (
    <FormularioLayout titulo="CREAR CUENTA">
      <input
        className="w-full p-2 border border-black rounded-full mb-6"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 border border-black rounded-full mb-6"
        type="text"
        placeholder="Apellido"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        className="w-full p-2 border border-black rounded-full mb-6"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border border-black rounded-full mb-6"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-1/2 bg-blue-600 text-white py-2 rounded-full font-semibold">
        Registrarse
      </button>
    </FormularioLayout>
  );
}
