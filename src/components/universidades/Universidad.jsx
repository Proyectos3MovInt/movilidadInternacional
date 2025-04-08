const Universidad = ({ universidad, index }) => {
    return (
      <div className={`grid grid-cols-6 p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
        <span>{universidad.nombre}</span>
        <span>{universidad.pais}</span>
        <span>{universidad.contacto}</span>
      </div>
    );
  };
  
  export default Universidad;
  