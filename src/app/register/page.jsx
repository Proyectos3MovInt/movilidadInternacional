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
  const [passwordError, setPasswordError] = useState("");
  const [studentType, setStudentType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!/[a-z]/.test(pwd)) {
      return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!/[0-9]/.test(pwd)) {
      return "La contraseña debe contener al menos un número";
    }
    if (!/[*!@#\$%\^&\(\)\-_=\+\[\]{};:'",.<>\/?\\|]/.test(pwd)) {
      return "La contraseña debe contener al menos un carácter especial";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);

    if (error) return;

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

      <section className="flex bg-white rounded-[2.5rem] max-w-[668px] min-h-[600px] w-full justify-center shadow-lg px-10 py-14 relative">
        <form
          className="w-full flex flex-col items-center gap-8"
          onSubmit={handleSubmit}
        >
          <img
            src="/logoblanco.jpg"
            alt="Logo"
            className="w-[180px] h-auto absolute top-6 left-6"
          />

          <h2 className="text-[2rem] font-bold text-[#0065EF] text-center leading-9 mt-12">
            CREA TU CUENTA
          </h2>

          <div className="flex flex-col w-full gap-5 mt-2">
            <div className="flex gap-4 w-full">
              <input
                className="w-[224px] h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
                type="text"
                placeholder="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-full h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              className="w-full h-[48px] px-4 border border-black rounded-lg text-black text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative w-full h-[48px]">
              <input
                className={`w-full h-full px-4 pr-12 border rounded-lg text-black text-md focus:outline-none focus:ring-2 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-black focus:ring-[#0065EF]"
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  const error = validatePassword(value);
                  setPasswordError(error);
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Icons.EyeIcon /> : <Icons.EyeClosedIcon />}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-600 text-sm -mt-3">{passwordError}</p>
            )}

            <select
              className="w-full h-[48px] px-4 border border-black rounded-lg text-black bg-white text-md focus:outline-none focus:ring-2 focus:ring-[#0065EF]"
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
            >
              <option value="">Elige la opción</option>
              <option value="utad">Soy estudiante de U-tad</option>
              <option value="otro">No soy estudiante</option>
            </select>
          </div>

          <div className="w-full flex justify-center mt-4">
            <button
              type="submit"
              className="w-[338px] h-[56px] bg-[#0065EF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Registrarme
            </button>
          </div>

          {error && (
            <div className="w-full flex justify-center mt-2">
              <p className="text-red-600 flex items-center gap-2 text-center">
                <Icons.Error className="w-5 h-5" />
                Hubo un problema al registrarse.
              </p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
