import { useState, React } from "react";
import "./CriarConta.css";

export function FormUtilizador({ childToParent }) {
  const [user, setUser] = useState({
    login: "string",
    nome: "string",
    dataDeNascimento: "20-02-1980",
    email: "asasasasas@dsdsd.com",
  });

  return (
    <div className="DadosUser">
      <p>Login: (Autenticacao)</p>
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
      <p>Password: (Autenticacao)</p>
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

      <p>Nome: </p>
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
      <p>Data de Nascimento: (dd/MM/yyyy) </p>
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
      <p>Email: </p>
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
      <div className="DivButtonCriarConta">
        <button
          onClick={() => {
            childToParent(user);
          }}
        >
          Cria Conta
        </button>
      </div>
    </div>
  );
}
