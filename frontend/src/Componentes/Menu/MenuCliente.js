import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Menu.css";

const API_URL = "http://localhost:8080";

export function MenuCliente(props) {
  const [id, setId] = useState();
  const [cliente, setCliente] = useState({});
  const [vendas, setVendas] = useState([]);
  const [mostraInfo, setMostraInfo] = useState(false);
  const [mostraForm, setMostraForm] = useState(false);
  const [mostraHistorico, setMostraHistorico] = useState(false);
  const [info, setInfo] = useState("");
  const [updateClienteInfo, setUpdateClienteInfo] = useState({
    login: "",
    nome: "",
    dataDeNascimento: "",
    email: "",
  });

  useEffect(() => {
    setId(props.user);
    console.log("Menu Cliente:" + props.user);
    getCliente(props.user);
  }, []);

  const onClickForm = () => {
    setMostraForm(!mostraForm);
  };

  const onClickHistorico = () => {
    setMostraHistorico(!mostraHistorico);
    getVendasByClienteId(id);
  };
  const onClickInfo = () => {
    setMostraInfo(!mostraInfo);
  };

  function getCliente(userid) {
    console.log(" Busca Cliente" + userid);
    fetch(API_URL + "/getClienteById/" + userid, {
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
        console.log(error);
      });
  }

  function getVendasByClienteId(userid) {
    fetch(API_URL + "/getVendasByClienteId/" + userid, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Vendas Cliente");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setVendas(parsedResponse.vendas);
      })
      .catch((error) => {
        console.log(error);
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
            <p>
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
            </p>
          </div>
          <div
            className={mostraHistorico ? "MostraHistorico" : "EscondeHistorico"}
          >
            <div className="TituloHistorico">Compras Realizadas</div>
            {vendas.map((vend, index) => (
              <div className="ListaHistorico" key={index}>
                Data: {vend.dataVenda}, Valor: {vend.valor}
                {vend.livros.map((liv, ind) => (
                  <div className="LivroHistorico" key={ind}>
                    {liv.titulo} : {vend.quantLivros[ind]} uni.
                  </div>
                ))}
              </div>
            ))}
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
          <button className="ButtonMenu" onClick={onClickHistorico}>
            Ver Historico
          </button>
        </div>
      </div>
    </>
  );
}
