import { useState } from "react";

export function FileUpload({ label, name, register, multiple = false }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-black font-semibold">{label}</label>
      <div className="relative w-[12rem]">
        <input
          type="file"
          {...register(name)}
          multiple={multiple}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button
          type="button"
          className="w-full px-4 py-2 border-2 border-black bg-white text-black font-semibold rounded-md text-center"
        >
          Subir Archivo
        </button>
      </div>
      {fileName && <span className="text-sm text-black mt-1">{fileName}</span>}
    </div>
  );
}
