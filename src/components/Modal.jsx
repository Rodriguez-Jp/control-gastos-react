import { useEffect, useReducer, useState } from "react";
import Alerta from "./Alerta";
import cerrarModal from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [categoriaGasto, setCategoriaGasto] = useState("");
  const [alerta, setAlerta] = useState({});
  const [estaEditando, setEstaEditando] = useState(false);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setEstaEditando(true);
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidadGasto(gastoEditar.cantidadGasto);
      setCategoriaGasto(gastoEditar.categoriaGasto);
    }
  }, []);

  const generarId = () => {
    return crypto.randomUUID();
  };

  const handleCerrarModal = () => {
    setAnimarModal(false);
    if (estaEditando) {
      setEstaEditando(false);
    }

    setTimeout(() => {
      setModal(false);
    }, 500);

    setGastoEditar({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [nombreGasto, cantidadGasto, categoriaGasto].includes("") ||
      cantidadGasto <= 0
    ) {
      setAlerta({
        msg: "Datos incorrectos, por favor verifica",
        tipo: "error",
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }

    guardarGasto({
      id: generarId(),
      nombreGasto,
      cantidadGasto,
      categoriaGasto,
    });
  };

  const { msg } = alerta;

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={cerrarModal}
          alt="Boton para cerrar ventana modal"
          onClick={handleCerrarModal}
        />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        {estaEditando ? (
          <legend>Editar gasto</legend>
        ) : (
          <legend>Nuevo gasto</legend>
        )}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre del gasto"
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Cantidad"
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            id="categoria"
            value={categoriaGasto}
            onChange={(e) => setCategoriaGasto(e.target.value)}
          >
            <option value="">Selecciona una Categoria</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="varios">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={estaEditando ? "Editar gasto" : "Agregar Gasto"}
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </div>
  );
};

export default Modal;
