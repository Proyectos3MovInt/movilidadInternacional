import React from 'react';

export function RadioGroup({ label, name, options, register }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2 font-semibold">{label}</label>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center text-black font-medium">
            <input
              type="radio"
              {...register(name, { required: true })}
              value={option}
              className="mr-2 accent-[#0065EF]"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
