import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Menu.css";

const API_URL = "http://localhost:8080";

export function MenuCliente(props) {
  const { params } = useParams();
  const [id, setId] = useState("1");
  const [cliente, setCliente] = useState({});
  const [mostraInfo, setMostraInfo] = useState(false);
  const [mostraForm, setMostraForm] = useState(false);
  const [info, setInfo] = useState("");
  const [updateClienteInfo, setUpdateClienteInfo] = useState({
    login: "",
    nome: "",
    dataDeNascimento: "",
    email: "",
  });
  const onClickInfo = () => {
    setMostraInfo(!mostraInfo);
  };

  const onClickForm = () => {
    setMostraForm(!mostraForm);
  };
  useEffect(() => {
    getCliente();
  }, []);

  function getCliente() {
    console.log(id);
    fetch(API_URL + "/getClienteById/" + id, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Autor");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setCliente(parsedResponse.cliente);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function updateCliente() {
    if (verificaLoginValido) {
      fetch(API_URL + "/updateCliente/", {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateClienteInfo),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Erro actualizar cliente");
          }

          return response.json();
        })
        .then((res) => {
          setInfo("Sucesso em actualizar os dados da conta");
          setCliente(res.cliente);
          console.log(res);
        })
        .catch((error) => {
          setInfo("Falha em actualizar os dados da conta");
        });
    } else {
      setInfo("Login Invalido");
    }
  }

  function verificaLoginValido() {
    let check = {
      login: updateClienteInfo.login,
      password: updateClienteInfo.password,
    };
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
        return true;
      })
      .catch((error) => {
        setInfo(error);
      });
  }

  return (
    <>
      <div className="MainBody">
        <div className="bodyleft">
          <div className={mostraInfo ? "MostraSelecao" : "EscondeSelecao"}>
            <h4>Dados</h4>
            <p>Login: {cliente.login}</p>
            <p>Nome: {cliente.nome}</p>
            <p>Data de Nascimento: {cliente.dataDeNascimento}</p>
            <p>Email: {cliente.email}</p>
          </div>
          <div className={mostraForm ? "MostraSelecao" : "EscondeSelecao"}>
            <h4>Alterar Dados</h4>
            <p>
              Login: (Autenticacao)
              <input
                type="text"
                value={updateCliente.login}
                onChange={(e) => {
                  setUpdateClienteInfo({
                    ...updateClienteInfo,
                    login: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              Password: (Autenticacao)
              <input
                type="password"
                value={updateCliente.password}
                onChange={(e) => {
                  setUpdateClienteInfo({
                    ...updateClienteInfo,
                    password: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              Nome:
              <input
                type="text"
                value={updateCliente.nome}
                onChange={(e) => {
                  setUpdateClienteInfo({
                    ...updateClienteInfo,
                    nome: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              Data de Nascimento: (dd/MM/yyyy)
              <input
                type="text"
                value={updateCliente.dataDeNascimento}
                onChange={(e) => {
                  setUpdateClienteInfo({
                    ...updateClienteInfo,
                    dataDeNascimento: e.target.value,
                  });
                }}
              ></input>
            </p>
            Email:
            <input
              type="text"
              value={updateCliente.email}
              onChange={(e) => {
                setUpdateClienteInfo({
                  ...updateClienteInfo,
                  email: e.target.value,
                });
              }}
            ></input>
            <button className="Button" onClick={updateCliente}>
              Update Info
            </button>
          </div>
          <p className="Informacao">{info}</p>
        </div>
        <div className="bodyright">
          <button className="ButtonMenu" onClick={onClickInfo}>
            Info Cliente
          </button>
          <button className="ButtonMenu" onClick={onClickForm}>
            Altera Info
          </button>
          <button className="ButtonMenu">Ver Historico</button>

          <button className="ButtonMenu">Ver Cupoes</button>
        </div>
      </div>
    </>
  );
}
