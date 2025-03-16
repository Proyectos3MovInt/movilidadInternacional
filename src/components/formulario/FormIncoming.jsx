"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { InputField } from "./InputFieldEN";
import { RadioGroup } from "./RadioGroup";
import { FileUpload } from "./FileUploadEN";
import { DatePicker } from "./DatePicker";
import { TextArea } from "./TextArea";
import { Checkbox } from "./Checkbox";
import Overlay from "../Overlay";
import { getForm } from "@/lib/form";

export default function InternationalMobilityForm() {
  const { register, handleSubmit, reset } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    const callForm = async () => {
      const response_json = await getForm();
      if (response_json) {
        reset(response_json);
      }
    };
    callForm();
  }, []);

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
        <div className="w-[648.75px] justify-center text-blue-600 text-2xl font-bold font-['Montserrat'] leading-relaxed">INTERNATIONAL MOBILITY<br/>EXCHANGE STUDENTS (INCOMING)</div>
        <br></br>
        <p style={{ marginBottom: "20px" }}>
            Once the application is uploaded, student will receive an email asking for the
            documents needed in order to finish the application process. After receiving
            all the information required by the International Relations Office the
            academic coordinator will confirm if the student can continue with the
            procedure within two weeks.
        </p>

        <p style={{ marginBottom: "20px" }}>
            After confirmation by the academic coordinator, the student must send a
            draft Learning Agreement with the subjects wishing to study. Admission in
            specific topics will depend on availability of places in the classroom.

        </p>

        <p style={{ marginBottom: "20px" }}>
            Students must take out a private insurance to cover medical expenses from
            their home country for the entire period of their stay in Spain.

        </p>

        <p style={{ marginBottom: "20px" }}>
          For Non-EU students: you should apply either for a student visa at the
          Spanish Embassy or Consulate in your countries of origin or for a residence
          permit to enter and remain in Spain legally. U-tad’s International Relations
          Office will send the acceptance letter you will need to apply for a student
          visa before coming to Spain.
        </p>

        <div className="space-y-6 w-full">
          <InputField
            label={<span className="font-bold">Name*</span>}
            name="name"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Last Name*</span>}
            name="lastName"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Passport Number*</span>}
            name="passportNumber"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Email*</span>}
            name="email"
            register={register}
            required
            type="email"
          />
          <InputField
            label={<span className="font-bold">Phone Number (Please include the country code)*</span>}
            name="phoneNumber"
            register={register}
            required
            type="tel"
          />
          <RadioGroup
            label={<span className="font-bold">Gender*</span>}
            name="gender"
            options={["Woman", "Man", "Non-binary", "Prefer not to say"]}
            register={register}
          />
          <InputField
            label={<span className="font-bold">Nationality*</span>}
            name="nationality"
            register={register}
            required
          />
          <DatePicker
            label={<span className="font-bold">Date of Birth*</span>}
            name="dateOfBirth"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Permanent Address*</span>}
            name="permanentAddress"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Emergency Contact Person*</span>}
            name="emergencyContact"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Emergency Contact Email*</span>}
            name="emergencyContactEmail"
            register={register}
            required
            type="email"
          />
          <InputField
            label={<span className="font-bold">Emergency Contact Phone (Please include the country code)*</span>}
            name="emergencyContactPhone"
            register={register}
            required
            type="tel"
          />
          <InputField
            label={<span className="font-bold">Sending Institution - 1*</span>}
            name="emergencyContact"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Sending Institution - 2 (Europe - Erasmus+)*</span>}
            name="emergencyContact"
            register={register}
            required
          />
          <InputField
            label={<span className="font-bold">Sending Institution - 2 (ROW)*</span>}
            name="emergencyContact"
            register={register}
            required
          />
          <RadioGroup
            label={<span className="font-bold">Undergraduate Programme for the exchange*</span>}
            name="undergraduateProgramme"
            options={[
              "BFA in Animation (English)",
              "BFA in Animation (Spanish)",
              "BA in Interactive Product Design (English)",
              "BA in Interactive Product Design (Spanish)",
              "BFA in Digital Design (Spanish)",
              "BS in Computer Science (Spanish)",
              "BS in Computer Science and Computational Mathematics (Spanish)",
            ]}
            register={register}
          />
          <InputField label={<span className="font-bold">Link to portfolio or demoreel</span>} name="linkPortfolio" register={register} type="url" />
          <RadioGroup
            label={<span className="font-bold">Semester for Exchange*</span>}
            name="semester"
            options={["Fall (Sept - Feb)", "Spring (Feb - Jun)"]}
            register={register}
          />
          <TextArea
            label={<span className="font-bold">Any comments or questions you'd like to send with your application</span>}
            name="comments"
            register={register}
          />
          <div className="text-[1rem] text-black mb-6">
            <h3 className="text-[1.2rem] font-semibold mb-2">Data Protection Policy</h3>
            <p style={{ marginBottom: "20px" }}>
              The personal data provided, as well as those included in the documentation
              accompanying the application for admission in the exchange programme as well
              as those generated during the admission process, will be included in a file
              under the responsibility of U-tad Centro Digital S.L. The purpose of this file is
              to analyze and evaluate your application, as well as, if necessary, to make the
              necessary arrangements for the admission process. For this purpose, you expressly
              accept that your data will be communicated to the corresponding academic centers
              to which U-tad is associated with.
            </p>

            <p style={{ marginBottom: "20px" }}>
              Your data will be kept for a period of 5 years after the end of your relationship
              with U-tad in order to meet the company's possible legal obligations. The legal
              basis for this processing is your consent.
            </p>

            <p style={{ marginBottom: "20px" }}>
              Likewise, you may at any time revoke the consent given, as well as exercise your
              rights of access, rectification, deletion, opposition, limitation of processing,
              and portability, where such rights are applicable, by writing to the above address
              or to the address of our Data Protection Officer.
            </p>
          </div>

          <RadioGroup
            label="I accept the data protection policy*"
            name="dataProtectionPolicy"
            options={["Yes", "No"]}
            register={register}
          />

          <div className="text-center w-full">
            <button
              type="submit"
              className="w-[13.875rem] h-[2.688rem] bg-[#0065EF] text-white text-lg font-medium py-2 rounded-full hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
