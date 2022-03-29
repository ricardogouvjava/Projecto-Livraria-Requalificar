import imageteste from "./teste.jpg";
import { useState, React, useEffect } from "react";
import "./LivroForm.css";
const API_URL = "http://localhost:8080";
export function LivroForm({ childToParent }) {
  const [autores, setAutores] = useState([]);
  const [info, setInfo] = useState("");
  const [livro, setLivroInfo] = useState({
    id: 0,
    autores: [
      {
        nome: "Autor X",
        email: "string",
      },
    ],
    titulo: "O melhor Livro de Sempre",
    isbn: "0123455",
    preco: 10,
    stock: 10,
    dataDeLancamento: "20-10-2000",
    paginas: 100,
    edicao: 1,
    sinopse: "string",
    imagem: "C:\\Users\\Java08\\Desktop\\teste.jpg",
    vendidos: 0,
  });

  useEffect(() => {
    getAutores();
  }, []);

  function getAutores() {
    fetch(API_URL + "/getAutores", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 204) {
          setInfo("Nenhum Autor Encontrado");
          setAutores([]);
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setAutores(parsedResponse.autores);
        console.log("Autores Encontrados:" + parsedResponse);
      })
      .catch((error) => {
        setInfo("Nenhum Autor Encontrado");
        setAutores([]);
      });
  }

  return (
    <div className="LivroForm">
      <h4>Alterar Dados</h4>
      <p>
        <b>Titulo</b>
        <input
          type="text"
          value={livro.titulo}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              titulo: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>isbn: (Autenticacao) </b>
        <input
          type="text"
          value={livro.isbn}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              isbn: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Data de Lancamento: (dd-MM-yyyy) </b>
        <input
          type="text"
          value={livro.dataDeLancamento}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              dataDeLancamento: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Edicao:</b>
        <input
          type="text"
          value={livro.edicao}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              edicao: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Paginas: </b>
        <input
          type="text"
          value={livro.paginas}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              paginas: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Sinopse: </b>
        <input
          type="text"
          value={livro.sinopse}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              sinopse: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Preco: </b>
        <input
          type="text"
          value={livro.preco}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              preco: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>stock: </b>
        <input
          type="text"
          value={livro.stock}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              stock: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>vendidos: </b>
        <input
          type="text"
          value={livro.vendidos}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              vendidos: e.target.value,
            });
          }}
        ></input>
      </p>
      <b>imagem: </b>
      <img src={imageteste} style={{ width: "100px" }} alt="image"></img>
      {/*
      <p>
        <input
          type="text"
          value={livro.imagem}
          onChange={(e) => {
            setLivroInfo({
              ...livro,
              imagem: e.target.value,
            });
          }}
        ></input>
      </p>*/}

      <select value="Autores" id="Autores">
        {autores.map((option) => (
          <option key={option.index} value={option.key}>
            {option.nome}
          </option>
        ))}
        {console.log(autores)}
      </select>
      <br></br>

      <button
        onClick={() => {
          childToParent(livro);
        }}
      >
        Adiciona Livro
      </button>
      <div>{info}</div>
    </div>
  );
}
