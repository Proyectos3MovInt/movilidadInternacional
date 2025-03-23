import React, { useState } from 'react';

const AccordionSection = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6">
      {/* seccion principal (titulo e iconos, los iconos hay que cargarlos en la carpeta icons, no están implementados de momento) */}
      <div
        className="w-full px-6 py-2 bg-blue-600 rounded-lg inline-flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex-1 justify-start text-white text-xl font-semibold font-['Montserrat'] leading-normal">
          {title}
        </div>

        <div className="flex justify-start items-center gap-4">
          <div
            data-property-1="Default"
            className="h-8 px-8 py-2.5 bg-white rounded-lg flex justify-center items-center"
          >
            <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
              Validar
            </div>
          </div>

          <div className="w-6 h-6 relative origin-top-left rotate-90">
            <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-300" />
            <div className="w-5 h-3 left-[2px] top-[6.25px] absolute bg-white" />
          </div>
        </div>
      </div>

      {/* subsecciones de los desplegables */}
      {isOpen && (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index}>
              <div
                data-estado="Default"
                className="w-full px-6 py-2 bg-white rounded-tl-lg rounded-tr-lg border-b border-zinc-400 inline-flex justify-start items-center gap-1"
              >
                <div className="self-stretch inline-flex flex-col justify-center items-start gap-1">
                  <div className="text-sm font-bold text-black">{item.label}</div>
                  <div className="text-sm text-slate-900">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
