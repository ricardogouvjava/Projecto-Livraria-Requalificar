import { useState, React } from "react";
import "./LivroForm.css";

export function LivroForm({ setLivroInfo }) {
  const [livro, setLivro] = useState({
    autores: [
      {
        id: 0,
      },
    ],
    titulo: "string",
    isbn: "string",
    preco: 0,
    stock: 0,
    paginas: 0,
    edicao: 0,
    sinopse: "string",
    imagem: "string",
    vendidos: 0,
    dataDeLancamento: "string",
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
            setLivro({
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
            setLivro({
              ...livro,
              isbn: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <b>Data de Lancamento: </b>
        <input
          type="text"
          value={livro.dataDeLancamento}
          onChange={(e) => {
            setLivro({
              ...livro,
              dataDeLancamento: e.target.value,
            });
          }}
        ></input>
      </p>
      <p>
        <p>
          <b>Edicao: (dd/MM/yyyy)</b>
          <input
            type="text"
            value={livro.edicao}
            onChange={(e) => {
              setLivro({
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
              setLivro({
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
              setLivro({
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
              setLivro({
                ...livro,
                preco: e.target.value,
              });
            }}
          ></input>
        </p>
      </p>
      <p>
        <b>stock: </b>
        <input
          type="text"
          value={livro.stock}
          onChange={(e) => {
            setLivro({
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
            setLivro({
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
            setLivro({
              ...livro,
              imagem: e.target.value,
            });
          }}
        ></input>
      </p>
      <button
        onClick={() => {
          setLivroInfo(livro);
        }}
      >
        AdicionaLivro
      </button>
    </div>
  );
}
