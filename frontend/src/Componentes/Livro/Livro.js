import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

export function LivroService(props) {
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
        <>OLA</>
      </div>
    </>
  );
}
