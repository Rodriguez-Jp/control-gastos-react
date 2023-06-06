const Alerta = ({ alerta }) => {
  return <div className={`alerta ${alerta.tipo}`}>{alerta.msg}</div>;
};

export default Alerta;
