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
      console.log("Cliente Passou");
      setOpcao(
        <NavBarFuncionario
          user={props.user}
          tipo={props.tipo}
        ></NavBarFuncionario>
      );
    } else if (props.tipo === "Cliente") {
      console.log("Funcionario Passou");
      setOpcao(
        <NavBarCliente user={props.user} tipo={props.tipo}></NavBarCliente>
      );
    }
  }
  return <div>{opcao}</div>;
}
