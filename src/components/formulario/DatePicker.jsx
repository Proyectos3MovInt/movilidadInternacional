import { updateForm } from "@/lib/form.js";

export function DatePicker({ label, name, register, required }) {
  const handleBlur = async (event) => {
    const value = event.target.value;
    if (value) {
      await updateForm(name, value);
    }
  };

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type="date"
        {...register(name, { required })}
        onBlur={handleBlur}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
