import { useState } from "react";
import Alerta from "./Alerta";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  const [alerta, setAlerta] = useState({});

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setAlerta({ msg: "Por favor digite una cantidad valida", tipo: "error" });
      return;
    }

    setAlerta({});
    setPresupuestoValido(true);
    console.log("Enviando formulario");
  };

  const { msg } = alerta;
  return (
    <div className="contenedor-presupuesto contendedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Ingresa tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Agregar" />
        {msg && <Alerta alerta={alerta} />}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
