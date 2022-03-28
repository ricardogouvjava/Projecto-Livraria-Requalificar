import { useState, React } from "react";
import "./LivroForm.css";
export function LivroForm({ childToParent }) {
  const [livro, setLivroInfo] = useState({
    id: 0,
    autores: [
      {
        id: 0,
        nome: "string",
        email: "string",
      },
    ],
    titulo: "string",
    isbn: "string",
    preco: 0,
    stock: 0,
    dataDeLancamento: "string",
    paginas: 0,
    edicao: 0,
    sinopse: "string",
    imagem: "string",
    vendidos: 0,
    dataLancamento: "2022-03-28T16:46:16.432Z",
  });
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
      <p>
        <b>imagem: </b>
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
      </p>

      {/*
      <select>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
*/}

      <button
        onClick={() => {
          childToParent(livro);
        }}
      >
        AdicionaLivro
      </button>
    </div>
  );
}
