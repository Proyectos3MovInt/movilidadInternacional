import { updateForm } from "@/lib/form.js";

export function SelectField({ label, name, register, options }) {
  const handleChange = async (event) => {
    const value = event.target.value;
    await updateForm(name, value);
  };

  return (
    <div className="w-[678px] px-6 py-7 bg-white rounded-xl shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.24)] flex flex-col justify-start items-start gap-2">
      <div className="w-full flex flex-col justify-start items-start gap-1.5">
        <div className="text-slate-900 text-xl font-semibold font-['Montserrat'] leading-10">
          {label}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <select
          {...register(name)}
          className="w-full p-3 border-none outline-none"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-500">
            Selecciona una opción
          </option>
          {options.map((option) => (
            <option key={option._id} value={option._id} className="text-black">
              {option.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
