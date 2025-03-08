import { useState } from "react";
import { updateForm } from "@/lib/form.js";

export function TextArea({ label, name, register }) {
  
  const handleBlur = async (event) => {
    const value = event.target.value;
    if (value.trim() !== "") {
      await updateForm(name, value);
    }
  };

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <textarea
        {...register(name)}
        className="w-full p-2 border rounded h-24 resize-none"
        onBlur={handleBlur}
      ></textarea>
    </div>
  );
}