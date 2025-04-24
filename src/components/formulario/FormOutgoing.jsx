"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, use } from "react";
import { InputField } from "./InputField";
import { RadioGroup } from "./RadioGroup";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import { TextArea } from "./TextArea";
import { Checkbox } from "./Checkbox";
import Overlay from "../Overlay";
import { getForm } from "@/lib/form";
import { useRouter } from "next/navigation";

export default function Formulario() {
  const { register, handleSubmit, reset } = useForm();
  const [ id, setId ] = useState(null);
  const [ uploadedFiles, setUploadedFiles ] = useState({});

  const router = useRouter();

  useEffect(() => {
    const callForm = async () => {
      const response_json = await getForm();
      if(response_json) {
        const {_id, ...formData } = response_json;
        setId(_id);
        console.log(_id);
        reset(formData);
      }
    }
    callForm();
  }, []);

  const handleClick = () => {
    router.push("/alumno-alumno/");
  }

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
        <div className="w-[648.75px] justify-center text-blue-600 text-2xl font-bold font-['Montserrat'] leading-relaxed">FORMULARIO MOVILIDAD INTERNACIONAL<br/>EXCHANGE STUDENTS (OUTGOING)</div>
        <br></br>
        <p style={{ marginBottom: "20px" }}>
        Este formulario está dirigido a alumnos de U-tad que quieran solicitar movilidad de estudios a
        través de Programa Erasmus+ o en modalidad de Acuerdo Bilateral.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Por favor lee detenidamente todos los campos y asegúrate de tener a mano toda la
          documentación solicitada en la convocatoria, para poder adjuntarla a la solicitud:
        </p>

        <ul style={{ marginBottom: '20px' }}>
          <li>- Expediente Académico (solicitarlo en Secretaría Académica).</li>
          <li>- 1 foto carnet.</li>
          <li>- Certificado de idiomas.</li>
          <li>- Carta de motivación (en inglés) dirigida a la Oficina de Relaciones Internacionales de U-tad.</li>
          <li>- Borrador de Learning Agreement para cada una de las universidades a las que se solicita plaza.</li>
        </ul>

        <p style={{ marginBottom: '20px' }}>
          La resolución se publicará en el site interno Movilidad Internacional.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Para cualquier duda o información adicional: <a href="mailto:exchange@u-tad.com">exchange@u-tad.com</a>
        </p>

        <p style={{ marginBottom: '20px' }}>
          PLAZO DE RECEPCIÓN DE SOLICITUDES: HASTA 14 DE FEBRERO A LAS 23:59h
        </p>
        <div className="space-y-6 w-full">
          <InputField label={<span className="font-bold">Nombre y Apellidos del Alumno*</span>} name="nombreApellidos" register={register} required lang="es" />
          <InputField label={<span className="font-bold">DNI/NIE*</span>} name="dniNie" register={register} required lang="es" />
          <InputField label={<span className="font-bold">Email de contacto*</span>} name="email" register={register} required type="email" lang="es"/>
          <RadioGroup label={<span className="font-bold">Género*</span>} name="genero" options={["Mujer", "Hombre", "No binario", "Prefiero no decirlo"]} register={register} />
          <InputField label={<span className="font-bold">Nacionalidad*</span>} name="nacionalidad" register={register} required lang="es"/>
          <DatePicker label={<span className="font-bold">Fecha de nacimiento*</span>} name="fechaNacimiento" register={register} required />
          <InputField label={<span className="font-bold">Domicilio (Municipio, Código Postal, Provincia)*</span>} name="domicilio" register={register} required lang="es"/>
          <InputField label={<span className="font-bold">Número de teléfono de contacto*</span>} name="numeroTelefono" register={register} required type="tel" lang="es"/>
          <RadioGroup label={<span className="font-bold">Titulación del alumno*</span>} name="titulacion" options={["Grado en Animación (Inglés)", "Grado en Animación (Español)", "Grado en Diseño de Productos Interactivos (Inglés)", "Grado en Diseño de Productos Interactivos (Español)", "Grado en Diseño Digital", "Grado en Ingeniería del Software (Español)", "Grado en Ingeniería del Software (Inglés)", "Doble grado en Ingeniería del Software y Matemática Computacional o Física Computacional", "Grado en Efectos Visuales (VFX)"]} register={register} />
          <RadioGroup label={<span className="font-bold">¿Es esta tu primera movilidad Erasmus?*</span>} name="primeraMovilidad" options={["Sí", "No"]} register={register} />
          <RadioGroup label={<span className="font-bold">Semestre que solicitas para realizar el intercambio*</span>} name="semestreIntercambio" options={["Sept-Feb", "Feb-Jun"]} register={register} />
          <InputField label={<span className="font-bold">Universidad de destino solicitada - 1ª opción*</span>} name="universidadDestino1" register={register} required lang="es"/>
          <InputField label={<span className="font-bold">Universidad de destino solicitada - 2ª opción</span>} name="universidadDestino2" register={register} lang="es"/>
          <InputField label={<span className="font-bold">Universidad de destino solicitada - 3ª opción</span>} name="universidadDestino3" register={register} lang="es"/>
          <FileUpload label={<span className="font-bold">Foto carnet U-tad*</span>} name="fotoCarnet" register={register} lang="es" />
          <FileUpload label={<span className="font-bold">Carta de motivación (en inglés)*</span>} name="cartaMotivacion" register={register} lang="es" />
          <FileUpload label={<span className="font-bold">Borrador de Learning Agreement*</span>} name="learningAgreement" register={register} lang="es" />
          <FileUpload label={<span className="font-bold">Certificado de idiomas*</span>} name="certificadoIdiomas" register={register} lang="es" />
          <RadioGroup label={<span className="font-bold">¿Te interesa hacer un examen de inglés en UCJC?*</span>} name="examenCertificado" options={["Sí", "No"]} register={register} />
          <InputField label={<span className="font-bold">Link a portfolio o demoreel</span>} name="linkPortfolio" register={register} type="url" lang="es"/>
          <TextArea label={<span className="font-bold">Algún comentario que quieras trasladar</span>} name="comentarios" register={register} />
          <div className="text-[1rem] text-black mb-6">
            <h3 className="text-[1.2rem] font-semibold mb-2">Política de datos personales</h3>
            <p style={{ marginBottom: '20px' }}>
            Los datos personales facilitados, así como los incluidos en la documentación que acompaña
            a la solicitud de admisión en el programa de intercambio, así como los generados durante el
            proceso de movilidad, serán incluidos en un fichero bajo la responsabilidad de U tad Centro
            Digital S.L.
            </p>

            <p style={{ marginBottom: '20px' }}>
              La finalidad de este fichero es analizar y evaluar su solicitud, así como, en su caso, realizar las
              gestiones necesarias para el proceso de movilidad. Con esta finalidad, usted acepta
              expresamente que sus datos sean comunicados a los correspondientes centros académicos
              a los que U tad está asociada, a la Universidad Camilo José Cela y a la universidad de destino.
            </p>

            <p style={{ marginBottom: '20px' }}>
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
          <div className="text-center w-full">
            <button onClick={handleClick} type="submit" className="w-[13.875rem] h-[2.688rem] bg-[#0065EF] text-white text-lg font-medium py-2 rounded-full hover:bg-blue-700 transition">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
