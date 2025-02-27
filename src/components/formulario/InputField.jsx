import React from 'react';

export function InputField({
  label,
  name,
  register,
  type = 'text',
  required = false,
}) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input {...register(name, { required })} type={type} className="w-full p-2 border rounded" />
    </div>
  );
}
