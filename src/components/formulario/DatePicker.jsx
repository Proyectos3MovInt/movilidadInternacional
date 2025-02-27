import { useState } from "react";

export function DatePicker({ label, name, register, required }) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type="date"
        {...register(name, { required })}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
