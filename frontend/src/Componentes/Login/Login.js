import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080";

export function Login(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [userchek, setUsercheck] = useState({ login: "", password: "" });
  const [info, setInfo] = useState("Aguarda Login!");

  function verificaLoginValido(verifica) {
    fetch(API_URL + "/verificaLogin", {
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
        return parseInt(parsedResponse.cliente.id);
      })
      .then((id) => {
        props.doLogin(id);
        navigate("/home");
        //}
        return id;
      })
      .catch((error) => {
        console.log(error);
      });
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
          <button
            className="Button"
            onClick={() => verificaLoginValido(userchek)}
          >
            Login
          </button>
        </div>
        <p className="Informacao">{info}</p>
        <button className="CriaConta" onClick={() => navigate("/CriarConta")}>
          Criar Conta
        </button>
      </div>
    </>
  );
}
