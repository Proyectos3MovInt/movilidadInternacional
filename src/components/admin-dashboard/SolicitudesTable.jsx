import CajaAlumno from "@/components/admin-dashboard/CajaAlumno";

const SolicitudesTable = ({ solicitudes, selectedFields }) => {
    const visibleFields = Object.keys(selectedFields).filter((field) => selectedFields[field]);
    return (
        <div className="border rounded-lg overflow-hidden shadow">
            <div className="grid grid-cols-6 font-semibold bg-gray-100 border-b p-3">
                {visibleFields.map((field, index) => (
                    <span key={index}>{field}</span>
                ))}
            </div>
            <div className="divide-y">
                {visibleFields.map((solicitud, index) => (
                    <CajaAlumno key={index} solicitud={solicitud} index={index} />
                ))}
            </div>
        </div>
    );
};

export default SolicitudesTable;
