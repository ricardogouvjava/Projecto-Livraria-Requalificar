import { useNavigate } from "react-router-dom";
import { useState, React } from "react";

const API_URL = "http://localhost:8080";

export function UserForm() {
  //const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [user, setUser] = useState({
    login: "",
    nome: "",
    dataDeNascimento: "",
    email: "",
  });

  function addUser() {
    if (
      user.nome.trim().length !== 0 &&
      user.email.trim().length !== 0 &&
      user.mome.trim().length !== 0 &&
      user.dataDeNascimento.trim().length !== 0
    ) {
      fetch(API_URL + "/addCliente", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
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
          //navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setInfo("Falha em adicionar User");
        });
    }
  }

  return (
    <div className="MainBodyClean">
      <h3>Criar Conta</h3>
      <div className="Dadosuser">
        <p>
          <b>Login: (Autenticacao)</b>
          <input
            type="text"
            value={user.login}
            onChange={(e) => {
              setUser({
                ...user,
                login: e.target.value,
              });
            }}
          ></input>
        </p>
        <p>
          <b>Password: (Autenticacao) </b>
          <input
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          ></input>
        </p>
        <p>
          <b>Nome: </b>
          <input
            type="text"
            value={user.nome}
            onChange={(e) => {
              setUser({
                ...user,
                nome: e.target.value,
              });
            }}
          ></input>
        </p>
        <p>
          <p>
            <b>Data de Nascimento: (dd/MM/yyyy)</b>
            <input
              type="text"
              value={user.dataDeNascimento}
              onChange={(e) => {
                setUser({
                  ...user,
                  dataDeNascimento: e.target.value,
                });
              }}
            ></input>
          </p>

          <b>Email: </b>
          <input
            type="text"
            value={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          ></input>
        </p>
      </div>
      <p className="Informacao">{info}</p>
      <button onClick={addUser}>CriaConta</button>
    </div>
  );
}
