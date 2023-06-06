const ControlPresupuesto = ({ presupuesto }) => {
  const formatearPresupuesto = (presupuesto) => {
    return presupuesto.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>Grafica aqui</div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatearPresupuesto(presupuesto)}
        </p>
        <p>
          <span>Gastado: </span> {formatearPresupuesto(presupuesto)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
