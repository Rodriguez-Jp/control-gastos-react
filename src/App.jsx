import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import nuevoGastoSvg from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState({});

  useEffect(() => {
    if (!Object.keys(gastoEditar).length > 0) {
      return;
    }
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }, [gastoEditar]);

  useEffect(() => {
    const getLS = () => {
      const data = JSON.parse(localStorage.getItem("gastos")) ?? [];
      if (presupuesto > 0) {
        setPresupuestoValido(true);
      }
      setGastos(data);
    };
    getLS();
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    //Filtra la lista
    const gastosFiltrados = gastos.filter(
      (gasto) => gasto.categoriaGasto === filtro
    );
    setGastosFiltrados(gastosFiltrados);
  }, [filtro]);

  const generarId = () => {
    return crypto.randomUUID();
  };

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) => {
        return gastoState.id === gasto.id ? gasto : gastoState;
      });
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(
      (gastoState) => id !== gastoState.id
    );
    setGastos(gastosActualizados);
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
          setGastos={setGastos}
        />
        {presupuestoValido && (
          <>
            <main>
              {gastos && (
                <>
                  <Filtros filtro={filtro} setFiltro={setFiltro} />
                  <ListadoGastos
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                  />
                </>
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
