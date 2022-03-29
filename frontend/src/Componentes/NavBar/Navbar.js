import { useState, React, useEffect } from "react";
import { NavBarCliente } from "./NavBarCliente";
import { NavBarFuncionario } from "./NavBarFuncionario";

export function Navbar(props) {
  const [opcao, setOpcao] = useState();

  useEffect(() => {
    verificaTipo();
  }, []);

  function verificaTipo() {
    if (props.tipo === "Funcionario") {
      console.log("Funcionario passou para a navbar Funcionario");
      setOpcao(
        <NavBarFuncionario
          user={props.user}
          tipo={props.tipo}
        ></NavBarFuncionario>
      );
    } else if (props.tipo === "Cliente") {
      console.log("Cliente passou para a navbar Cliente");
      setOpcao(
        <NavBarCliente user={props.user} tipo={props.tipo}></NavBarCliente>
      );
    }
  }
  return <div>{opcao}</div>;
}
