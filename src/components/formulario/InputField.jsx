import React from 'react';
import { updateForm } from "@/lib/form.js";

export function InputField({
  label,
  name,
  register,
  type = 'text',
  required = false,
}) {
  
  const handleBlur = async (event) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      console.log(await updateForm(name, value));
    } 
  };

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input 
        {...register(name, { required })} 
        type={type} 
        className="w-full p-2 border rounded" 
        onBlur={handleBlur}
      />
    </div>
  );
}
