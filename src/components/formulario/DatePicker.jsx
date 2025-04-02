import { updateForm } from "@/lib/form.js";

export function DatePicker({ label, name, register, required }) {
  const handleBlur = async (event) => {
    const value = event.target.value;
    if (value) {
      await updateForm(name, value);
    }
  };

  return (
    <div className="w-[678px] px-6 py-7 bg-white rounded-xl shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.24)] flex flex-col justify-start items-start gap-2">
      <div className="w-full flex flex-col justify-start items-start gap-0.5">
        <div className="text-slate-900 text-xl font-semibold font-['Montserrat'] leading-10">
          {label}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-0">
        <input
          type="date"
          {...register(name, { required })}
          onBlur={handleBlur}
          className="w-full p-2 border-none outline-none appearance-none" 
        />
      </div>
    </div>
  );
}
