import { useState } from "react";

export function TextArea({ label, name, register }) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <textarea
        {...register(name)}
        className="w-full p-2 border rounded h-24 resize-none"
      ></textarea>
    </div>
  );
}
