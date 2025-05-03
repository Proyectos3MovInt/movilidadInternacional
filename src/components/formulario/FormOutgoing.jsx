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

export default function Formulario() {
  const { register, handleSubmit, reset } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [page, setPage] = useState(1);
  const [unis, setUnis] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    const callForm = async () => {
      const response_json = await getForm();
      if (response_json) {
        reset(response_json);
      }
    };

    const callUnis = async () => {
      const response_json = await getUnis();
      setUnis(response_json);
    };

    callForm();
    callUnis();
  }, []);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log("Formulario enviado:", data);
    setShowConfirmPopup(false);
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
            <p>
              Este formulario está dirigido a alumnos de U-tad que quieran solicitar movilidad de estudios a
              través de Programa Erasmus+ o en modalidad de Acuerdo Bilateral.
            </p>
            <p>
              Por favor lee detenidamente todos los campos y asegúrate de tener a mano toda la
              documentación solicitada en la convocatoria, para poder adjuntarla a la solicitud:
            </p>
            <ul className="list-disc pl-5">
              <li>Expediente Académico (solicitarlo en Secretaría Académica).</li>
              <li>1 foto carnet.</li>
              <li>Certificado de idiomas.</li>
              <li>Carta de motivación (en inglés) dirigida a la Oficina de Relaciones Internacionales de U-tad.</li>
              <li>Borrador de Learning Agreement para cada una de las universidades a las que se solicita plaza.</li>
            </ul>
            <p>
              La resolución se publicará en el site interno Movilidad Internacional.
            </p>
            <p>
              Para cualquier duda o información adicional: <a href="mailto:exchange@u-tad.com">exchange@u-tad.com</a>
            </p>
            <p>
              PLAZO DE RECEPCIÓN DE SOLICITUDES: HASTA 14 DE FEBRERO A LAS 23:59h
            </p>
            <InputField label="Nombre y Apellidos del Alumno*" name="nombreApellidos" register={register} required lang="es" />
            <InputField label="DNI/NIE*" name="dniNie" register={register} required lang="es" />
            <InputField label="Email de contacto*" name="email" register={register} required type="email" lang="es" />
            <RadioGroup label="Género*" name="genero" options={["Mujer", "Hombre", "No binario", "Prefiero no decirlo"]} register={register} />
            <InputField label="Nacionalidad*" name="nacionalidad" register={register} required lang="es" />
            <DatePicker label="Fecha de nacimiento*" name="fechaNacimiento" register={register} required />
            <InputField label="Domicilio (Municipio, Código Postal, Provincia)*" name="domicilio" register={register} required lang="es" />
            <InputField label="Número de teléfono de contacto*" name="numeroTelefono" register={register} required type="tel" lang="es" />
          </div>
        )}

        {page === 2 && (
          <div className="space-y-6 w-full">
            <RadioGroup label="Titulación del alumno*" name="titulacion" options={["Grado en Animación (Inglés)", "Grado en Animación (Español)", "Grado en Diseño de Productos Interactivos (Inglés)", "Grado en Diseño de Productos Interactivos (Español)", "Grado en Diseño Digital", "Grado en Ingeniería del Software (Español)", "Grado en Ingeniería del Software (Inglés)", "Doble grado en Ingeniería del Software y Matemática Computacional o Física Computacional", "Grado en Efectos Visuales (VFX)"]} register={register} />
            <RadioGroup label="¿Es esta tu primera movilidad Erasmus?*" name="primeraMovilidad" options={["Sí", "No"]} register={register} />
            <RadioGroup label="Semestre que solicitas para realizar el intercambio*" name="semestreIntercambio" options={["Sept-Feb", "Feb-Jun"]} register={register} />
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
            <RadioGroup label="¿Te interesa hacer un examen de inglés en UCJC?*" name="examenCertificado" options={["Sí", "No"]} register={register} />
            <InputField label="Link a portfolio o demoreel" name="linkPortfolio" register={register} type="url" lang="es" />
          </div>
        )}

        {page === 4 && (
          <div className="space-y-6 w-full">
            <TextArea label="Algún comentario que quieras trasladar" name="comentarios" register={register} />
            <div className="text-[1rem] text-black mb-6">
              <h3 className="text-[1.2rem] font-semibold mb-2">Política de datos personales</h3>
              <p>
                Los datos personales facilitados, así como los incluidos en la documentación que acompaña
                a la solicitud de admisión en el programa de intercambio, así como los generados durante el
                proceso de movilidad, serán incluidos en un fichero bajo la responsabilidad de U tad Centro
                Digital S.L.
              </p>
              <p>
                La finalidad de este fichero es analizar y evaluar su solicitud, así como, en su caso, realizar las
                gestiones necesarias para el proceso de movilidad. Con esta finalidad, usted acepta
                expresamente que sus datos sean comunicados a los correspondientes centros académicos
                a los que U tad está asociada, a la Universidad Camilo José Cela y a la universidad de destino.
              </p>
              <p>
                Sus datos serán conservados durante un plazo de 5 años tras la finalización de su relación
                con U tad con el fin de responder a las posibles obligaciones legales de la empresa. La base
                jurídica que legitima este tratamiento es su consentimiento.
              </p>
              <p>
                Asimismo, en todo momento podrá revocar el consentimiento prestado, así como ejercer sus
                derechos de acceso, rectificación, supresión, oposición, limitación de su tratamiento y
                portabilidad, cuando dichos derechos sean aplicables, a través de comunicación escrita a la
                dirección de arriba indicada o a la dirección de nuestro Delegado de Protección de Datos,
                cuyos datos de contacto son: dpo@u-tad.com aportando fotocopia de su DNI o documento
                equivalente e identificándose como solicitante de admisión al programa de intercambio.
                Además, si considera que sus datos han sido tratados de forma inadecuada, tendrá derecho
                a presentar una reclamación ante la Agencia Española de protección de Datos (C/ Jorge
                Juan, 6. 28001 Madrid www.aepd.es).
              </p>
            </div>
            <RadioGroup label="Acepto la política de datos personales*" name="politicaDatos" options={["Sí", "No"]} register={register} />
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
          onConfirm={handleSubmit(onSubmit)}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}
    </div>
  );
}
