const MainSection = () => {
    return (
      <div className="w-[1070px] h-56 px-12 bg-white rounded-lg inline-flex justify-center items-center gap-16">
        {/* imagen de perfil (ahora mismo no se puede cambiar, hay que añadir esa funcionalidad) */}
        <img
          className="w-36 h-36 rounded-full"
          src="https://placehold.co/152x152"
          alt="Profile"
        />
        
        <div className="flex justify-end items-start gap-24">
          {/* campos de los detalles personales */}
          <div className="w-96 inline-flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
                Nombre:
              </div>
              <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">
                Lucía González Lobo
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
                Titulación:
              </div>
              <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">
                Diseño Digital
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
                Curso de matriculación:
              </div>
              <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">
                2022 - 2023
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
                Semestre:
              </div>
              <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">
                2º
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
                Nota media:
              </div>
              <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">
                8,7
              </div>
            </div>
          </div>


        {/* Campos de universidad y estado */}
          <div className="flex justify-start items-start gap-4">
            <div className="w-64 h-36 inline-flex flex-col justify-start items-end gap-4">
              <div className="self-stretch flex flex-col justify-end items-end gap-2">
                {/* universidad de destino */}
                <div
                  data-estado="cerrado"
                  className="self-stretch h-8 px-4 py-1 bg-blue-300 rounded-lg inline-flex justify-start items-center gap-2"
                >
                  <div className="w-4 h-4 relative">
                    <div className="w-4 h-4 left-[16px] top-0 absolute origin-top-left rotate-90">
                      <div className="w-4 h-4 left-0 top-0 absolute bg-zinc-300" />
                      <div className="w-3.5 h-2 left-[1.33px] top-[4.17px] absolute bg-white" />
                    </div>
                  </div>
                  <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
                    Universidad de destino
                  </div>
                </div>
                {/* estado de la solicitud */}
                <div
                  data-property-1="Aprobada"
                  className="w-28 h-8 px-4 py-1 bg-lime-400 rounded-lg inline-flex justify-center items-center gap-2"
                >
                  <div className="w-2.5 h-2.5 bg-lime-700 rounded-full" />
                  <div className="justify-start text-white text-xs font-semibold font-['Montserrat'] leading-none">
                    Aprobada
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[3px] top-[3.17px] absolute bg-blue-600" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MainSection;
  