import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";

const API_URL = "http://localhost:8080";

export function Login(props) {
  const navigate = useNavigate();
  const [userchek, setUsercheck] = useState({ login: "", password: "" });
  const [info, setInfo] = useState("Aguarda Login!");
  const [tipo, setUserTipo] = useState("Cliente");

  function defineTipo(defineT) {
    setUserTipo(defineT);
    console.log(defineT);
  }

  function verificaLoginValido(verifica) {
    if (tipo === "Cliente") {
      fetch(API_URL + "/verificaLoginCliente", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifica),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 403 || response.status === 204) {
            setInfo("Login Invalido");
          } else if (response.status !== 200) {
            setInfo("Erro");
            throw new Error("error");
          }
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          return parseInt(parsedResponse.cliente.id);
        })
        .then((idCliente) => {
          console.log(idCliente);
          props.setUser(idCliente);
          props.setTipo(tipo);
          navigate("/HomeCliente/:id");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (tipo === "Funcionario") {
      fetch(API_URL + "/verificaLoginFuncionario", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(verifica),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 403 || response.status === 204) {
            setInfo("Login Invalido");
          } else if (response.status !== 200) {
            setInfo("Erro");
            throw new Error("error");
          }
          return response.json();
        })
        .then((parsedResponse) => {
          return parseInt(parsedResponse.funcionario.id);
        })
        .then((idFuncionario) => {
          props.setUser(idFuncionario);
          props.setTipo(tipo);
          navigate("/HomeFuncionario/:id");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <div className="Login">
        <p>Login: </p>
        <input
          type="text"
          value={userchek.login}
          onChange={(e) => {
            setUsercheck({ ...userchek, login: e.target.value });
          }}
        />
        <p>Password:</p>
        <input
          type="password"
          value={userchek.password}
          onChange={(e) => {
            setUsercheck({ ...userchek, password: e.target.value });
          }}
        />
        <div>
          <select
            className="SelectUser"
            value={tipo}
            onChange={(e) => {
              defineTipo(e.target.value);
            }}
          >
            <option value={"Cliente"}>Cliente</option>
            <option value={"Funcionario"}>Funcionario</option>
          </select>
          <button
            className="Button"
            onClick={() => verificaLoginValido(userchek)}
          >
            Login
          </button>
        </div>
        <p className="Informacao">{info}</p>

        <button
          className="Button"
          onClick={() => {
            let path = "/CriarConta" + tipo;
            console.log(path);
            navigate(path);
          }}
        >
          Criar Conta
        </button>
      </div>
    </>
  );
}
