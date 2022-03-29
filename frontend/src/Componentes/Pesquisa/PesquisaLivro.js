import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pesquisa.css";

const API_URL = "http://localhost:8080";
const info1 = "Pode pesquisar por titulo autor ou editora.";

export function PesquisaLivro(props) {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("all");
  const [restultados, setResultados] = useState([]);
  const [info, setInfo] = useState(info1);
  const [selecinou, SetSelecinou] = useState(false);
  const [selecionado, setSelecionado] = useState({
    titulo: "",
    dataDeLancamento: "",
    paginas: "",
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
        console.log(parsedResponse.livros);
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
        <div className={selecinou ? "MostraSelecao" : "EscondeSelecao"}>
          <p>Selecionado: {selecionado.titulo} </p>{" "}
          <button
            onClick={() => {
              navigate("/Livro");
            }}
          >
            Ver Livro
          </button>
        </div>
        <div className="Listagem">
          {restultados.map(function (element, index) {
            return (
              <div
                key={index}
                className="ElementoListagem"
                onClick={() => {
                  setSelecionado(element);
                  SetSelecinou(true);
                }}
              >
                {element.titulo +
                  " , " +
                  element.paginas +
                  " , " +
                  element.dataDeLancamento}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
