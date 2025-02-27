export function Checkbox({ label, name, register, required }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" {...register(name, { required })} className="mr-2" />
      <label className="text-gray-700">{label}</label>
    </div>
  );
}
