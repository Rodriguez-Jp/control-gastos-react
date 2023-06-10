import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setPresupuestoValido,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => {
      return gasto.cantidadGasto + total;
    }, 0);

    const totalDisponible = presupuesto - totalGastado;

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  useEffect(() => {
    setTimeout(() => {
      calcularPorcentaje(presupuesto, gastado);
    }, 1000);
  }, [gastado]);

  const formatearPresupuesto = (presupuesto) => {
    return presupuesto.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const calcularPorcentaje = (presupuesto, totalGastado) => {
    const porcentajeTotal = (totalGastado * 100) / presupuesto;
    setPorcentaje(porcentajeTotal.toFixed(2));
  };

  const reiniciarApp = () => {
    const confirmar = confirm("Esta seguro que desea resetear la app?");

    if (confirmar) {
      setGastos([]);
      setPresupuesto(0);
      setPresupuestoValido(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
            textColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={reiniciarApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
        </p>
        <p className={disponible < 0 ? `negativo` : ""}>
          <span>Disponible: </span> {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
