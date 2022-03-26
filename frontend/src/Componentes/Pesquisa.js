import { useEffect, useState } from "react";
import "./Autor.css";

const API_URL = "http://localhost:8080";

export function Pesquisa(props) {
  const [pesquisa, setPesquisa] = useState({ nome: "" });
  const [restultados, setResultados] = useState([]);
  //const [selecionado, setSelecionado] = useState({});

  useEffect(() => {
    getLivros();
  }, []);

  function getLivros() {
    fetch(API_URL + "/getLivros", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          console.log(response);
          throw new Error("Base de dados vazia");
        }
        if (response.status !== 200) {
          throw new Error("Falha encontar Livros");
        }
        return response.json();
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
        console.log(parsedResponse.livros);
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
        <button onClick={getLivros}>Pesquisa</button>
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
