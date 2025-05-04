export default function ConfirmarFormularioOutgoing({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[2rem] w-[774px] h-[444px] px-12 py-20 flex flex-col justify-between items-center shadow-lg text-center gap-6">
          <div className="flex flex-col items-center w-[612px] mb-2">
            <h2 className="text-[45px] font-semibold leading-[48px] text-[#14192C] text-center mb-6">
              ¿Estás seguro de que quieres enviar el formulario?
            </h2>
            <p className="text-[18px] text-black leading-[21px] text-center mb-0">
              Los administradores tendrán acceso a todos los archivos adjuntos
            </p>
          </div>
  
          <div className="flex gap-12">
            <button
              onClick={onCancel}
              className="bg-gray-200 text-black font-semibold w-[194px] h-[43px] rounded"
            >
              Volver
            </button>
            <button
              onClick={onConfirm}
              className="bg-[#0065EF] text-white font-semibold w-[194px] h-[43px] rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  