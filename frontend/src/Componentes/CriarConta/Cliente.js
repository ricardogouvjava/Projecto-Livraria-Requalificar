import { useState, React } from "react";
import { FormUtilizador } from "./FormUtilizador";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function CriaContaCliente(props) {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  function addCliente(dados) {
    if (
      dados.login.trim().length !== 0 &&
      dados.email.trim().length !== 0 &&
      dados.nome.trim().length !== 0 &&
      dados.dataDeNascimento.trim().length !== 0
    ) {
      fetch(API_URL + "/addCliente", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dados),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Falha adicionar User");
          }
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          setInfo("Sucesso em adicionar User");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setInfo("Falha em adicionar User");
        });
    }
  }

  return (
    <div className="MainBodyClean">
      <h3>Criar Conta Cliente</h3>
      <FormUtilizador childToParent={addCliente}></FormUtilizador>
      <div className="Informacao">{info}</div>
    </div>
  );
}
