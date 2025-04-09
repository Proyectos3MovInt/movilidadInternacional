import { useState, useEffect } from 'react';
import { updateForm } from "@/lib/form.js";

export function InputField({
  label,
  name,
  register,
  type = 'text',
  required = false,
  lang = 'en'
}) {

  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if(lang == "es") {
      setText("Respuesta");
    } else {
      setText("Text");
    }
  })
  
  const handleBlur = async (event) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      console.log(await updateForm(name, value));
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-[678px] px-6 py-7 bg-white rounded-xl shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.24)] flex flex-col justify-start items-start gap-2">
      <div className="w-full flex flex-col justify-start items-start gap-1.5">
        <div className="text-slate-900 text-xl font-semibold font-['Montserrat'] leading-10">
          {label}
        </div>
      </div>


      <div className="w-full flex flex-col justify-start items-start gap-1">
        <input 
          {...register(name, { required })}
          type={type}
          value={inputValue}
          onChange={handleChange}
          className="w-full p-2 border-none outline-none"
          placeholder={text}
          onBlur={handleBlur}
        />
        <div className="w-full h-0 outline outline-[0.75px] outline-offset-[-0.38px] outline-slate-900"></div>
      </div>
    </div>
  );
}
