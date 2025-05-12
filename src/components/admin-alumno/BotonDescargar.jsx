import { Descargar } from "../Icons";
import { useRouter } from "next/navigation";

export default function BotonDescargar({ file, className = "" }) {
    const router = useRouter();
  return (
    <button
      onClick={() => router.push(file)}
      className={`bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center ${className}`}
    >
     <Descargar /> Descargar
    </button>
  );
}
