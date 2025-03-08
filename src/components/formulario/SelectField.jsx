import { updateForm } from "@/lib/form.js";

export function SelectField({ label, name, register, options }) {
  
  const handleChange = async (event) => {
    const value = event.target.value;
    await updateForm(name, value);
  };

  return (
    <div className="mb-4">
      <label className="block text-[#0056E0] font-semibold mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full p-3 border border-[#0056E0] bg-[#E0EBFF] rounded-lg text-[#003580] focus:outline-none focus:ring-2 focus:ring-[#0056E0] transition"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
