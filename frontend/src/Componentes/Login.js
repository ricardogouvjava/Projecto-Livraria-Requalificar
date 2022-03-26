import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";

const API_URL = "http://localhost:8080";

export function Login(props) {
  const navigate = useNavigate();
  const [userchek, setUsercheck] = useState({ login: "", password: "" });
  const [user, setUser] = useState({});

  const [infocheck, setInfoCheck] = useState("Aguarda Login!");

  function verificaLoginValido(check) {
    fetch(API_URL + "/verificaLogin", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(check),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Cliente");
        }
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        console.log(parsedResponse.cliente);
        return setUser(parsedResponse.cliente);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="LoginForm">
        <h3>Por favor introduza os seus dados</h3>
        <div className="LoginForm-Row">
          <div className="LoginForm-Column">
            <p>Login:</p>
            <input
              type="text"
              name="login"
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
              name="password"
              value={userchek.password}
              onChange={(e) => {
                setUsercheck({ ...userchek, password: e.target.value });
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            console.log("UserCheck>" + userchek);
            verificaLoginValido(userchek);
            if (user !== undefined) {
              console.log("Pass");
              console.log(user);
              navigate("/home");
              props.doLogin(user);
              console.log("User :" + user);
            } else if (user === undefined) {
              setInfoCheck("Login Incorrecto");
              console.log("Login Incorrecto");
            }
          }}
        >
          Login
        </button>
        <p className="Info">{infocheck}</p>
      </div>
    </>
  );
}
