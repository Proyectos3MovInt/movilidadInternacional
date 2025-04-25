"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { RadioGroup } from "./RadioGroup";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import { TextArea } from "./TextArea";
import Overlay from "../Overlay";
import { getForm } from "@/lib/form";

export default function Formulario() {
  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [page, setPage] = useState(1);

  const fieldsByPage = {
    1: ["nombre", "apellido", "pasaporte", "email", "telefono", "genero", "nacionalidad", "fechaNacimiento"],
    2: ["domicilio", "contactoEmergencia", "emailEmergencia", "telefonoEmergencia"],
    3: ["institucion1", "institucion2EU", "institucion2ROW", "titulacion", "linkPortfolio", "semestre"],
    4: ["comentarios", "politicaDatos"]
  };

  useEffect(() => {
    const callForm = async () => {
      const response_json = await getForm();
      if(response_json) {
        reset(response_json);
      }
    }
    callForm();
  }, []);

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => setPage(prev => prev - 1);

  const onSubmit = (data) => {
    console.log(data);
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
            <InputField label="Name*" name="nombre" register={register} required lang="en" />
            <InputField label="Last Name*" name="apellido" register={register} required lang="en" />
            <InputField label="Passport Number*" name="pasaporte" register={register} required lang="en" />
            <InputField label="Email*" name="email" register={register} required type="email" lang="en" />
            <InputField label="Phone Number (Please include the country code)*" name="telefono" register={register} required type="tel" lang="en" />
            <RadioGroup label="Gender*" name="genero" options={["Woman", "Man", "Non-binary", "Prefer not to say"]} register={register} required />
            <InputField label="Nationality*" name="nacionalidad" register={register} required lang="en" />
            <DatePicker label="Date of Birth*" name="fechaNacimiento" register={register} required />
          </div>
        )}

        {page === 2 && (
          <div className="space-y-6 w-full">
            <InputField label="Permanent Address*" name="domicilio" register={register} required lang="en" />
            <InputField label="Emergency Contact Person*" name="contactoEmergencia" register={register} required lang="en" />
            <InputField label="Emergency Contact Email*" name="emailEmergencia" register={register} required type="email" lang="en" />
            <InputField label="Emergency Contact Phone (Please include the country code)*" name="telefonoEmergencia" register={register} required type="tel" lang="en" />
          </div>
        )}

        {page === 3 && (
          <div className="space-y-6 w-full">
            <InputField label="Sending Institution - 1*" name="institucion1" register={register} required lang="en" />
            <InputField label="Sending Institution - 2 (Europe - Erasmus+)*" name="institucion2EU" register={register} required lang="en" />
            <InputField label="Sending Institution - 2 (ROW)*" name="institucion2ROW" register={register} required lang="en" />
            <RadioGroup label="Undergraduate Programme for the exchange*" name="titulacion" options={["BFA in Animation (English)", "BFA in Animation (Spanish)", "BA in Interactive Product Design (English)", "BA in Interactive Product Design (Spanish)", "BFA in Digital Design (Spanish)", "BS in Computer Science (Spanish)", "BS in Computer Science and Computational Mathematics (Spanish)"]} register={register} required />
            <InputField label="Link to portfolio or demoreel" name="linkPortfolio" register={register} type="url" lang="en" />
            <RadioGroup label="Semester for Exchange*" name="semestre" options={["Fall (Sept - Feb)", "Spring (Feb - Jun)"]} register={register} required />
          </div>
        )}

        {page === 4 && (
          <div className="space-y-6 w-full">
            <TextArea label="Any comments or questions you'd like to send with your application" name="comentarios" register={register} />
            <div className="text-sm text-black">
              <h3 className="text-lg font-semibold mb-2">Data Protection Policy</h3>
              <p className="mb-4">
                The personal data provided, as well as those included in the documentation accompanying the application for admission in the exchange programme as well as those generated during the admission process, will be included in a file under the responsibility of U-tad Centro Digital S.L. The purpose of this file is to analyze and evaluate your application, as well as, if necessary, to make the necessary arrangements for the admission process. For this purpose, you expressly accept that your data will be communicated to the corresponding academic centers to which U-tad is associated with.
              </p>
              <p className="mb-4">
                Your data will be kept for a period of 5 years after the end of your relationship with U-tad in order to meet the company's possible legal obligations. The legal basis for this processing is your consent.
              </p>
              <p className="mb-4">
                Likewise, you may at any time revoke the consent given, as well as exercise your rights of access, rectification, deletion, opposition, limitation of processing, and portability, where such rights are applicable, by writing to the above address or to the address of our Data Protection Officer.
              </p>
            </div>
            <RadioGroup label="I accept the data protection policy*" name="politicaDatos" options={["Yes", "No"]} register={register} required />
          </div>
        )}

        <div className="flex justify-between w-full mt-8">
          {page > 1 && (
            <button type="button" onClick={prevPage} className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition">
              Previous
            </button>
          )}
          {page < 4 && (
            <button type="button" onClick={nextPage} className="bg-[#0065EF] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition ml-auto">
              Next
            </button>
          )}
          {page === 4 && (
            <button type="submit" className="bg-[#0065EF] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ml-auto">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
