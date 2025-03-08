import { updateForm } from "@/lib/form.js";

export function Checkbox({ label, name, register, required }) {
  const handleChange = async (event) => {
    const value = event.target.checked;
    await updateForm(name, value);
  };

  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        {...register(name, { required })} 
        className="mr-2" 
        onChange={handleChange}
      />
      <label className="text-gray-700">{label}</label>
    </div>
  );
}
