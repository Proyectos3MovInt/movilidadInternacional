import { updateForm } from "@/lib/form.js";

export function RadioGroup({ label, name, options, register }) {
  
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

      <div className="flex flex-col justify-start items-start gap-2">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center text-slate-900 text-sm font-normal font-['Montserrat']">
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
