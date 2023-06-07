import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setGastoEditar }) => {
  return (
    <div className="listado-gastos contenedor">
      {gastos.length ? <h2>Gastos</h2> : <h2>Aun no tienes gastos</h2>}
      {gastos.map((gasto) => {
        return (
          <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} />
        );
      })}
    </div>
  );
};

export default ListadoGastos;
