import { useState, React } from "react";
import { FormUtilizador } from "./FormUtilizador";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function CriarContaFuncionario() {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  function addFuncionario(dados) {
    if (
      dados.nome.trim().length !== 0 &&
      dados.email.trim().length !== 0 &&
      dados.nome.trim().length !== 0 &&
      dados.dataDeNascimento.trim().length !== 0
    ) {
      fetch(API_URL + "/addFuncionario", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dados),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Falha adicionar Funcionario");
          }
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          setInfo("Sucesso em adicionar Funcionario");
        })
        .catch((error) => {
          console.log(error);
          setInfo("Falha em adicionar Funcionario");
        });
    }
  }

  return (
    <div className="MainBodyClean">
      <h3>Criar Conta Funcionario</h3>
      <FormUtilizador childToParent={addFuncionario}></FormUtilizador>
      <div className="Informacao">{info}</div>
    </div>
  );
}
