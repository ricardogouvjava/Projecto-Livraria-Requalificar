import { useState } from "react";
import "./LoginForm.css";

const API_URL = "http://localhost:8080";

let usertest = {
  login: "string",
  nome: "string",
  dataDeNascimento: "20-03-2000",
  id: 1,
  email: "string",
};

export function LoginForm() {
  const [userchek, setUsercheck] = useState({ login: "", password: "" });
  const [infocheck, setInfoCheck] = useState("Aguarda Login!");
  return (
    <>
      <div className="LoginForm">
        <h3>Por favor introduza os seus dados</h3>
        <div className="LoginForm-Row">
          <div className="LoginForm-Column">
            <p>Login:</p>
            <input
              type="text"
              value={userchek.login}
              onChange={(e) => {
                setUsercheck({ ...userchek, login: e.target.value });
              }}
            />
          </div>
          <div className="LoginForm-Column">
            <p>Password:</p>
            <input
              type="password"
              value={userchek.password}
              onChange={(e) => {
                setUsercheck({ ...userchek, password: e.target.value });
              }}
            />
          </div>
        </div>
        <button onClick={() => setInfoCheck(verificaLogin(userchek))}>
          Login
        </button>
        <br></br>
        <p className="Info">{infocheck}</p>
      </div>
    </>
  );
}

function verificaLogin(userchek) {
  fetch(API_URL + "/verificaLogin", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userchek),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Erro encontrar Cliente");
      }
      return response.json();
    })
    .then((parsedResponse) => {
      if (parsedResponse.status === true) {
        return parsedResponse.cliente;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return "Fail";
}
