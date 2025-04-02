const Universidad = ({ universidad, index }) => {
    return (
      <div className={`grid grid-cols-6 p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
        <span>{universidad.nombre}</span>
        <span>{universidad.ubicacion}</span>
        <span>{universidad.programa}</span>
        <span>{universidad.ranking}</span>
        <span>{universidad.tipo}</span>
        <span>{universidad.estado}</span>
      </div>
    );
  };
  
  export default Universidad;
  