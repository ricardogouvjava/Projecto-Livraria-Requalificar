import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CriaContaCliente } from "./Cliente";
import { CriarContaFuncionario } from "./Funcionario";

const API_URL = "http://localhost:8080";

export function CriarConta(props) {
  const [opcao, setOpcao] = useState();

  useEffect(() => {
    verificaTipo();
  }, []);

  function verificaTipo() {
    if (props.tipo === "Cliente") {
      console.log("Cliente Passou");
      setOpcao(<CriaContaCliente></CriaContaCliente>);
    } else if (props.tipo === "Funcionario") {
      console.log("Funcionario Passou");
      setOpcao(<CriarContaFuncionario></CriarContaFuncionario>);
    }
  }
  return <div className="Form">{opcao}</div>;
}
