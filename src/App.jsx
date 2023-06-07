import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import nuevoGastoSvg from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (!Object.keys(gastoEditar).length > 0) {
      return;
    }
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const guardarGasto = (gasto) => {
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto]);
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          presupuestoValido={presupuestoValido}
          setPresupuestoValido={setPresupuestoValido}
          gastos={gastos}
        />
        {presupuestoValido && (
          <>
            <main>
              {gastos && (
                <ListadoGastos
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                />
              )}
            </main>
            <div className="nuevo-gasto">
              <img
                src={nuevoGastoSvg}
                alt="icono de agregar"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            setGastos={setGastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )}
      </div>
    </>
  );
}

export default App;
