const Notes = () => {
    return (
      <div className="w-80 px-6 py-4 bg-white rounded-lg inline-flex flex-col justify-start items-start gap-2">
        <div className="text-center justify-center text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
          Anotaciones
        </div>
        <textarea
          className="w-full p-2 mt-4 border border-gray-300 rounded-lg text-black text-base font-normal font-['Montserrat'] leading-normal"
          rows="5"
          placeholder="Escriba aquí" //podemos cambiar el placeholder por lo q queramos
        ></textarea>
      </div>
    );
  };
  
  export default Notes;
  