import "./Pesquisa.css";
import { PesquisaCliente } from "./PesquisaCliente";
import { PesquisaAutor } from "./PesquisaAutor";

export function PesquisaService(props) {
  if (props.tipo === "Funcionario") {
    console.log("Funcionario passou para a navbar Funcionario");
    return <PesquisaAutor user={props.user} tipo={props.tipo}></PesquisaAutor>;
  } else {
    console.log("Cliente passou para a navbar Cliente");
    return (
      <PesquisaCliente user={props.user} tipo={props.tipo}></PesquisaCliente>
    );
  }
}
