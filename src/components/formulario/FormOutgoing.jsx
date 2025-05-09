"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { RadioGroup } from "./RadioGroup";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import { TextArea } from "./TextArea";
import Overlay from "../Overlay";
import { getForm, getUnis } from "@/lib/form";
import { SelectField } from "./SelectField";
import ConfirmarFormularioOutgoing from "@/components/formulario/ConfirmarFormularioOutgoing";
import { useRouter } from "next/navigation";

export default function Formulario() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [page, setPage] = useState(1);
  const [unis, setUnis] = useState([]);
  const [formData, setFormData] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const watchedData = watch();
  const router = useRouter();

  useEffect(() => {
    const callForm = async () => {
      const response_json = await getForm();
      if (response_json) {
        reset(response_json);
        console.log(response_json);
      }
    };

    const callUnis = async () => {
      const response_json = await getUnis();
      setUnis(response_json);
    };

    callForm();
    callUnis();
  }, []);

  const nextPage = () => {
    setFormData(watchedData);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setFormData(watchedData);
    setPage((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log(data);
    router.push('/alumno-alumno/');
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center relative font-[Montserrat]"
      style={{ backgroundImage: "url('images/fondo1.jpg')" }}
    >
      <Overlay />
      <form
        className="relative bg-white rounded-[2.5rem] mt-80 flex flex-col p-10 w-[70%] max-w-[50rem] shadow-lg font-[Montserrat] items-start overflow-auto text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-blue-600 text-2xl font-bold text-center mb-6">
          FORMULARIO MOVILIDAD INTERNACIONAL<br />EXCHANGE STUDENTS (OUTGOING)
        </div>

        {page === 1 && (
          <div className="space-y-6 w-full">
            <p>Este formulario está dirigido a alumnos de U-tad...</p>
            {/* ... texto omitido por brevedad ... */}
            <InputField label="Nombre y Apellidos del Alumno*" name="nombreApellidos" register={register} required defaultValue={formData.nombreApellidos || ""} />
            <InputField label="DNI/NIE*" name="dniNie" register={register} required defaultValue={formData.dniNie || ""} />
            <InputField label="Email de contacto*" name="email" register={register} required type="email" defaultValue={formData.email || ""} />
            <RadioGroup label="Género*" name="genero" options={["Mujer", "Hombre", "No binario", "Prefiero no decirlo"]} register={register} defaultValue={formData.genero} />
            <InputField label="Nacionalidad*" name="nacionalidad" register={register} required defaultValue={formData.nacionalidad || ""} />
            <DatePicker label="Fecha de nacimiento*" name="fechaNacimiento" register={register} required defaultValue={formData.fechaNacimiento} />
            <InputField label="Domicilio (Municipio, Código Postal, Provincia)*" name="domicilio" register={register} required defaultValue={formData.domicilio || ""} />
            <InputField label="Número de teléfono de contacto*" name="numeroTelefono" register={register} required type="tel" defaultValue={formData.numeroTelefono || ""} />
          </div>
        )}

        {page === 2 && (
          <div className="space-y-6 w-full">
            <RadioGroup
              label="Titulación del alumno*"
              name="titulacion"
              options={[
                "Grado en Animación (Inglés)",
                "Grado en Animación (Español)",
                "Grado en Diseño de Productos Interactivos (Inglés)",
                "Grado en Diseño de Productos Interactivos (Español)",
                "Grado en Diseño Digital",
                "Grado en Ingeniería del Software (Español)",
                "Grado en Ingeniería del Software (Inglés)",
                "Doble grado en Ingeniería del Software y Matemática Computacional o Física Computacional",
                "Grado en Efectos Visuales (VFX)",
              ]}
              register={register}
              defaultValue={formData.titulacion}
            />
            <RadioGroup label="¿Es esta tu primera movilidad Erasmus?*" name="primeraMovilidad" options={["Sí", "No"]} register={register} defaultValue={formData.primeraMovilidad} />
            <RadioGroup label="Semestre que solicitas para realizar el intercambio*" name="semestreIntercambio" options={["Sept-Feb", "Feb-Jun"]} register={register} defaultValue={formData.semestreIntercambio} />
            <SelectField label="Universidad de destino solicitada - 1ª opción*" name="universidadDestino1" register={register} required options={unis} lang="es" />
            <SelectField label="Universidad de destino solicitada - 2ª opción*" name="universidadDestino2" register={register} required options={unis} lang="es" />
            <SelectField label="Universidad de destino solicitada - 3ª opción*" name="universidadDestino3" register={register} required options={unis} lang="es" />
          </div>
        )}

        {page === 3 && (
          <div className="space-y-6 w-full">
            <FileUpload label="Foto carnet U-tad*" name="fotoCarnet" register={register} lang="es" />
            <FileUpload label="Carta de motivación (en inglés)*" name="cartaMotivacion" register={register} lang="es" />
            <FileUpload label="Borrador de Learning Agreement*" name="learningAgreement" register={register} lang="es" />
            <FileUpload label="Certificado de idiomas*" name="certificadoIdiomas" register={register} lang="es" />
            <RadioGroup label="¿Te interesa hacer un examen de inglés en UCJC?*" name="examenCertificado" options={["Sí", "No"]} register={register} defaultValue={formData.examenCertificado} />
            <InputField label="Link a portfolio o demoreel" name="linkPortfolio" register={register} type="url" defaultValue={formData.linkPortfolio || ""} />
          </div>
        )}

        {page === 4 && (
          <div className="space-y-6 w-full">
            <TextArea label="Algún comentario que quieras trasladar" name="comentarios" register={register} defaultValue={formData.comentarios || ""} />
            <div className="text-[1rem] text-black mb-6">
              {/* Política de datos - omitida por brevedad */}
            </div>
            <RadioGroup label="Acepto la política de datos personales*" name="politicaDatos" options={["Sí", "No"]} register={register} defaultValue={formData.politicaDatos} />
          </div>
        )}

        <div className="flex justify-between w-full mt-8">
          {page > 1 && (
            <button type="button" onClick={prevPage} className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition">
              Anterior
            </button>
          )}
          {page < 4 && (
            <button type="button" onClick={nextPage} className="bg-[#0065EF] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition ml-auto">
              Siguiente
            </button>
          )}
          {page === 4 && (
            <button
              type="button"
              onClick={() => setShowConfirmPopup(true)}
              className="bg-[#0065EF] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ml-auto"
            >
              Enviar
            </button>
          )}
        </div>
      </form>

      {showConfirmPopup && (
        <ConfirmarFormularioOutgoing
          onConfirm={() => router.push('/alumno-alumno/')}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}
    </div>
  );
}
