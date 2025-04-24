import CajaAlumno from "@/components/admin-dashboard/CajaAlumno";
import { formatFieldName } from "@/utils/format";


const SolicitudesTable = ({ solicitudes, selectedFields }) => {
    const visibleFields = Object.keys(selectedFields).filter(field => selectedFields[field]);

    return (
        <div className="border rounded-lg overflow-hidden shadow">
            <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                    {visibleFields.map((field) => (
                        <th key={field} className="p-3 text-left font-semibold">
                            {formatFieldName(field)}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y">
                {solicitudes.map((solicitud, index) => (
                    <CajaAlumno
                        key={solicitud.id}
                        solicitud={solicitud}
                        index={index}
                        visibleFields={visibleFields}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SolicitudesTable;