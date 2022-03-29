import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pesquisa.css";

const API_URL = "http://localhost:8080";
const info1 = "Pode pesquisar por nome.";

export function PesquisaAutor(props) {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("all");
  const [autores, setAutores] = useState([]);
  const [info, setInfo] = useState(info1);
  const [selecinou, SetSelecinou] = useState(false);
  const [selecionado, setSelecionado] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });

  useEffect(() => {
    fetchAutores();
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
          console.log(response.status);
          throw new Error("Base de dados vazia");
        }
        if (response.status !== 200) {
          throw new Error("Falha encontar Autores");
        }
        return response.json();
      })
      .then((parsedResponse) => {
        setAutores(parsedResponse);
        console.log("Tentou bugar Clientes" + parsedResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchAutores() {
    getAutores();
    console.log(autores);

    if (autores.length < 1) {
      setInfo("Base de dados vazia");
    } else if (autores.length >= 1) {
      setInfo("Autores encontrados");
    }
  }

  function getAutoresByPesquisa() {
    fetch(API_URL + "/procuraAutores/" + pesquisa, {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Autor Encontrado");
          setAutores([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setAutores(parsedResponse.livros);
        setInfo("Autores Encontrados");
      })
      .catch(() => {
        setInfo("Nenhum Autor Encontrado");
        setAutores([]);
      });
  }

  return (
    <>
      <div className="MainBodyClean">
        <div className="Pesquisa">
          <h3>Pesquisa de Autores</h3>
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
          <button className="butaoPesquisa" onClick={fetchAutores}>
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
              navigate("/Autor");
            }}
          >
            Ver Livro
          </button>
        </div>
        <div className="Listagem">
          {autores.map(function (element, index) {
            return (
              <div
                key={index}
                className="ElementoListagem"
                onClick={() => {
                  setSelecionado(element);
                  SetSelecinou(true);
                }}
              >
                {element.nome +
                  " , " +
                  element.email +
                  " , " +
                  element.editora +
                  ", " +
                  element.livros}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
