export default function ModalArchivar({ open, onClose, onConfirm, mode = "archivar" }) {
  if (!open) return null;

  const isArchivar = mode === "archivar";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-2xl p-8 w-[32rem] shadow-xl text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-[#001D3D] mb-4">
          {isArchivar
            ? "¿Está seguro de que quiere archivar la universidad?"
            : "¿Está seguro de que quiere desarchivar la universidad?"}
        </h2>
        <p className="text-[#001D3D] mb-6">
          {isArchivar
            ? "Esta acción no eliminará la universidad, pero la ocultará del listado activo. Podrás consultarla más adelante en la sección de universidades archivadas."
            : "La universidad se reactivará y volverá a mostrarse en el listado principal."}
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border-2 border-[#0065EF] text-[#0065EF] rounded-lg font-semibold hover:bg-[#f0f7ff]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#0065EF] text-white rounded-lg font-semibold hover:bg-[#0053c7]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
