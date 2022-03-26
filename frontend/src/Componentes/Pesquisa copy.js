import { useEffect, useState } from "react";
import "./Autor.css";

const API_URL = "http://localhost:8080";

export function PesquisaOutro(props) {
  const [pesquisa, setPesquisa] = useState({ nome: "" });
  const [restultados, setResultados] = useState([]);
  //const [selecionado, setSelecionado] = useState({});

  useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    fetch(API_URL + "/getClientes", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 204) {
          console.log(response);
          throw new Error("Base de dados vazia");
        }
        if (response.status !== 200) {
          throw new Error("Falha encontar Autores");
        }
        return response.json();
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.clientes);
        console.log(parsedResponse.clientes);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <>
      <div className="Pesquisa">
        {" Pesquisa de Livros "}
        <input
          type="text"
          name="Pesquisa"
          className="Pequisa"
          value={pesquisa.nome}
          onChange={(char) => {
            setPesquisa({ ...pesquisa, nome: char.target.value });
          }}
        ></input>
        <button onClick={getClientes}>Pesquisa</button>
      </div>
      <header className="CabecalhoListagem">
        <h1>Autores</h1>
      </header>
      <section className="Listagem">
        <div className="ElementoAutor">
          <p>{"ID-/-NOME-/-EMAIL"}</p>
        </div>
        {restultados.map(function (element, index) {
          return (
            <div key={index} className="ElementoAutor">
              <p>
                {element.login +
                  " , " +
                  element.nome +
                  " , " +
                  element.dataDeNascimento}
              </p>
              02
            </div>
          );
        })}
      </section>
    </>
  );
}
