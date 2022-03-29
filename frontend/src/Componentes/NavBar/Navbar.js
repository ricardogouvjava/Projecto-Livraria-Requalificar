import { useState, React, useEffect } from "react";
import { NavBarCliente } from "./NavBarCliente";
import { NavBarFuncionario } from "./NavBarFuncionario";

export function Navbar(props) {
  if (props.tipo === "Funcionario") {
    console.log("Funcionario passou para a navbar Funcionario");
    return (
      <NavBarFuncionario
        user={props.user}
        tipo={props.tipo}
      ></NavBarFuncionario>
    );
  } else {
    console.log("Cliente passou para a navbar Cliente");
    return <NavBarCliente user={props.user} tipo={props.tipo}></NavBarCliente>;
  }
}
