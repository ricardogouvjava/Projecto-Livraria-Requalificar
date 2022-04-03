import { useEffect, useState } from "react";
import { ElementoLivro } from "../Livro/ElementoLivro";
import "./Pesquisa.css";
import imageteste from "../../images/teste.jpg";

const API_URL = "http://localhost:8080";
const info1 = "Pode pesquisar por titulo autor ou editora.";

export function PesquisaFuncionario(props) {
  const [pesquisa, setPesquisa] = useState("");
  const [restultados, setResultados] = useState([]);
  const [info, setInfo] = useState(info1);
  const [selecinou, SetSelecinou] = useState(false);
  const [abreLivro, SetAbreLivro] = useState(false);
  const [selecionado, setSelecionado] = useState({
    titulo: "",
    isbn: "",
    preco: 0,
    stock: 0,
    dataDeLancamento: "",
    paginas: 0,
    edicao: 0,
    sinopse: "",
    imagem: "",
    vendidos: 0,
    editora: "",
    autores: [],
  });

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
        if (response.status === 204) {
          setInfo("Nenhum Livro Encontrado");
          setResultados([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
        console.log("Livro Econtrados:" + parsedResponse.livros);
      })
      .catch(() => {
        setInfo("Nenhum Livro Encontrado");
        setResultados([]);
      });
  }

  function getLivrosByPesquisa() {
    fetch(API_URL + "/procuraLivros/" + pesquisa, {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Livro Encontrado");
          setResultados([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
        setInfo("Livros Encontrados");
      })
      .catch(() => {
        setInfo("Nenhum Livro Encontrado");
        setResultados([]);
      });
  }

  return (
    <>
      <div className="MainBodyClean">
        <div className="Pesquisa">
          <h3>Pesquisa de Livros</h3>
          <div>
            <input
              type="text"
              name="Pesquisa"
              value={pesquisa}
              onChange={(char) => {
                setPesquisa(char.target.value);
              }}
            ></input>
          </div>
          <button className="butaoPesquisa" onClick={getLivrosByPesquisa}>
            Pesquisa
          </button>
        </div>
        <div className="Informacao">
          <p>{info}</p>
        </div>
        <div
          className={
            abreLivro
              ? "MostraLivroSeleciondadoZoom"
              : "EscondeLivroSelecionadoZoom"
          }
        >
          <ElementoLivro livro={selecionado}></ElementoLivro>
          <button>Editar Livro</button>
        </div>
        <div className="Grelha">
          {restultados.map(function (element, index) {
            return (
              <div
                key={index}
                className="ElementoGrelha"
                onClick={() => {
                  setSelecionado(element);
                  SetSelecinou(true);
                  SetAbreLivro(!abreLivro);
                }}
              >
                <div className="LivroBody">
                  <div className="LivroImage">
                    <img src={imageteste} alt="image"></img>
                  </div>
                  <div className="LivroInfo">
                    <p>{element.titulo}</p>
                    <p>{element.dataDeLancamento}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
