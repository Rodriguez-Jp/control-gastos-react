import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos"
              : "No hay gastos en esta categoria aun"}
          </h2>
          {gastosFiltrados.map((gasto) => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No tienes gastos aun"}</h2>
          {gastos.map((gasto) => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
