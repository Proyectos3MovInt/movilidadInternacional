import { updateForm } from "@/lib/form.js";

export function RadioGroup({ label, name, options, register }) {
  
  const handleChange = async (event) => {
    const value = event.target.value;
    await updateForm(name, value);
  };

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
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}