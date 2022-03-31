import imageteste from "./teste.jpg";
import { useState, React, useEffect } from "react";
import Select from "react-select";
import "./LivroForm.css";
import { AdicionaAutor } from "../Autor/AdicionaAutor";
const API_URL = "http://localhost:8080";
export function LivroFormEdit(props) {
  const [selecionado, setSelecionado] = useState(false);
  const [autores, setAutores] = useState([]);
  const [autorToLivro, setAutorToLivro] = useState({});
  const [autoresToLivro, setAutoresToLivro] = useState([]);
  const [info, setInfo] = useState("");
  const [mostraAdicionaAutorNovo, setMostraAdicionaAutorNovo] = useState(false);

  const [livro, setLivroInfo] = useState({
    id: 0,
    autores: [
      {
        id: "",
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

  const onChangesetAutor = (item) => {
    console.log("Selecionado: " + item.id);
    setSelecionado(true);
    setAutorToLivro(item);
    console.log("autor to livro: " + autorToLivro);
  };

  function naoexiste(lista, item) {
    for (var i = 0; i <= lista.length; ++i) {
      console.log("dsdsdsdsd: " + lista[i].id);
      console.log("ds;p,p,p: " + item.id);
      if (lista[i].id === item.id) {
        return false;
      }
    }
    return true;
  }

  function adicionaAutorToLivro() {
    let tempAutores = autoresToLivro;
    console.log(" length " + autoresToLivro.length);
    console.log(" lth " + autorToLivro.id);
    if (tempAutores.length <= 0) {
      tempAutores.push(autorToLivro);
      setAutoresToLivro(tempAutores);
      setSelecionado(false);
      setAutorToLivro({});
    } else if (tempAutores.length > 0 && naoexiste(tempAutores, autorToLivro)) {
      tempAutores.push(autorToLivro);
      setAutoresToLivro(tempAutores);
      setSelecionado(false);
      setAutorToLivro({});
      console.log("Adicionado por fora");
    }
  }

  function adicionaAutorNovo() {
    setMostraAdicionaAutorNovo(!mostraAdicionaAutorNovo);
  }

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
        stock:
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
        vendidos:
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
      {autores &&
        autoresToLivro.map((autor) => (
          <div key={autor.id}>
            Id: {autor.id} Nome: {autor.nome}
          </div>
        ))}
      <b>imagem: </b>
      <img src={imageteste} style={{ width: "100px" }} alt="image"></img>

      <div className={selecionado ? "MostraSelecao" : "EscondeSelecao"}>
        Autor Seleciondado Para adicionar: {autorToLivro.nome}
      </div>
      <div className="SelectAutor">
        <p>Seleciona Autor</p>
        <Select
          value={autorToLivro}
          onChange={onChangesetAutor}
          options={autores}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.nome}
        />
        <button onClick={adicionaAutorToLivro}>Adicona Autor ao Livro</button>
        <button onClick={adicionaAutorNovo}>Adiciona Autor Novo</button>
        <button onClick={getAutores}>Actualizar Autores</button>
        <div
          className={
            mostraAdicionaAutorNovo ? "MostraSelecao" : "EscondeSelecao"
          }
        >
          <AdicionaAutor></AdicionaAutor>
        </div>
      </div>
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
