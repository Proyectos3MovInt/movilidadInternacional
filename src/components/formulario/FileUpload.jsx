import { useState, useEffect } from "react";
import * as Icons from "@/components/Icons";

export function FileUpload({ label, name, register, multiple = false, lang = en }) {
  /* lang = es o lang = en */
  const [fileName, setFileName] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if(lang == "es") {
      setText("Subir archivo");
    } else {
      setText("Upload file");
    }
  }, []);

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
            <Icons.FileUploadIcon />
            <span className="text-[#14192C] text-lg">{ text }</span>
          </button>
        </div>
        {fileName && (
          <span className="text-sm text-black mt-1">{fileName}</span>
        )}
      </div>
    </div>
  );
}
