import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const API_URL = "http://localhost:8080";

export function CriarConta() {
  const navigate = useNavigate();
  const [userchek, setUsercheck] = useState({ login: "", password: "" });
  const [infocheck, setInfoCheck] = useState("Aguarda Login!");
  return (
    <>
      <div className="LoginForm">
        <h3>Por favor introduza os seus dados</h3>
        <div className="LoginForm-Linha">
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
        <button onClick={() => setInfoCheck("Avanca")}>Login</button>
        <br></br>
        <p className="Informacao">{infocheck}</p>
      </div>
    </>
  );
}
