import { useState } from "react";

export function FileUpload({ label, name, register, multiple = false }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="w-[678px] px-6 py-7 bg-white rounded-xl shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.24)] flex flex-col justify-start items-start gap-2">
      <div className="w-full flex flex-col justify-start items-start gap-1.5">
        <div className="text-slate-900 text-xl font-semibold font-['Montserrat'] leading-10">
          {label}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="file"
            {...register(name)}
            multiple={multiple}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button
            type="button"
            className="flex items-center gap-2 w-[auto] h-[3rem] bg-transparent border-2 border-[#14192C] px-4 py-2 rounded-full"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.575C11.8667 15.575 11.7417 15.554 11.625 15.512C11.5083 15.4707 11.4 15.4 11.3 15.3L7.7 11.7C7.51667 11.5167 7.425 11.2833 7.425 11C7.425 10.7167 7.51667 10.4833 7.7 10.3C7.88333 10.1167 8.12067 10.0207 8.412 10.012C8.704 10.004 8.94167 10.0917 9.125 10.275L11 12.15V5C11 4.71667 11.096 4.479 11.288 4.287C11.4793 4.09567 11.7167 4 12 4C12.2833 4 12.521 4.09567 12.713 4.287C12.9043 4.479 13 4.71667 13 5V12.15L14.875 10.275C15.0583 10.0917 15.296 10.004 15.588 10.012C15.8793 10.0207 16.1167 10.1167 16.3 10.3C16.4833 10.4833 16.575 10.7167 16.575 11C16.575 11.2833 16.4833 11.5167 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4707 12.375 15.512C12.2583 15.554 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18V16C4 15.7167 4.09567 15.479 4.287 15.287C4.479 15.0957 4.71667 15 5 15C5.28333 15 5.521 15.0957 5.713 15.287C5.90433 15.479 6 15.7167 6 16V18H18V16C18 15.7167 18.096 15.479 18.288 15.287C18.4793 15.0957 18.7167 15 19 15C19.2833 15 19.5207 15.0957 19.712 15.287C19.904 15.479 20 15.7167 20 16V18C20 18.55 19.8043 19.021 19.413 19.413C19.021 19.8043 18.55 20 18 20H6Z"
                fill="#14192C"
              />
            </svg>
            <span className="text-[#14192C] text-lg">Subir archivo</span>
          </button>
        </div>
        {fileName && (
          <span className="text-sm text-black mt-1">{fileName}</span>
        )}
      </div>
    </div>
  );
}
