const Filtros = () => {
  return (
    <div className="sombra filtros contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filtrar">Filtrar gastos</label>
          <select name="filtrar" id="filtrar">
            <option value="">Selecciona una Categoria</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="varios">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
