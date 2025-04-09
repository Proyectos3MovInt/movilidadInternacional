import { updateForm } from "@/lib/form.js";

export function Checkbox({ label, name, register, required }) {
  const handleChange = async (event) => {
    const value = event.target.checked;
    await updateForm(name, value);
  };

  return (
    <div className="w-[678px] px-6 py-7 bg-white rounded-xl shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.24)] flex flex-col justify-start items-start gap-2">
      <div className="w-full flex flex-col justify-start items-start gap-1.5">
        <div className="text-slate-900 text-xl font-semibold font-['Montserrat'] leading-10">
          {label}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register(name, { required })}
          className="mr-2 accent-[#0065EF]"
          onChange={handleChange}
        />
        <label className="text-slate-900 text-base font-normal font-['Montserrat']">
          {label}
        </label>
      </div>
    </div>
  );
}
