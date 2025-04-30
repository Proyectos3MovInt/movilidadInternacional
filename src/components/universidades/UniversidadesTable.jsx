import { Button } from "@/components/ui/button"; 

const UniversidadesTable = ({ universidades }) => {
  return (
    <div className="w-[1070px] px-6 py-4 bg-sky-100 inline-flex justify-center items-center gap-36">
      <div className="w-[1016px] h-6 relative">
        {/* Títulos de las columnas */}
        <div className="left-0 top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">Nombre</div>
        <div className="left-[386px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">País</div>
        <div className="left-[832px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">Contacto</div>
        <div className="left-[579px] top-0 absolute inline-flex justify-start items-center gap-2">
          <div className="w-16 h-6 px-4 py-1 bg-rose-500 rounded flex justify-center items-center gap-2">
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">DIDI</div>
          </div>
          <div className="w-16 h-6 px-4 py-1 bg-teal-400 rounded flex justify-center items-center gap-2">
            <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">INSO</div>
          </div>
        </div>

        {/* Datos de las universidades */}
        {universidades.map((uni, index) => (
          <div key={index} className="w-full h-6 relative mt-4">
            <div className="left-0 top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.nombre}</div>
            <div className="left-[386px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.pais}</div>
            <div className="left-[832px] top-0 absolute justify-start text-black text-base font-normal font-['Montserrat'] leading-normal">{uni.contacto}</div>
            <div className="left-[579px] top-0 absolute inline-flex justify-start items-center gap-2">
              {uni.titulacion.map((titulacion, idx) => (
                <div key={idx} className={`w-16 h-6 px-4 py-1 ${titulacion === 'DIDI' ? 'bg-rose-500' : 'bg-teal-400'} rounded flex justify-center items-center gap-2`}>
                  <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">{titulacion}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversidadesTable;
