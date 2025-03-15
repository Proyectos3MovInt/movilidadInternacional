import React from "react";

interface FormularioLayoutProps {
  titulo: string;
  children: React.ReactNode;
}

export default function FormularioLayout({ titulo, children }: FormularioLayoutProps) {
  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden flex justify-center items-center" style={{ backgroundImage: "url('/fondo1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <form className="relative z-10 bg-white p-12 rounded-[40px] shadow-lg w-full max-w-lg text-center">
        <img src="/logoblanco.jpg" alt="Logo" className="mb-8 w-32 ml-4" />
        <h2 className="text-2xl font-bold text-blue-600 mb-6">{titulo}</h2>
        {children}
      </form>
    </div>
  );
}
