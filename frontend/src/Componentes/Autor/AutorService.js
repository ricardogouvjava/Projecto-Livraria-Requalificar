import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Autor.css";

const API_URL = "http://localhost:8080";

export function AutorService(props) {
  const navigate = useNavigate();
  const [opcao, SetOpcao] = useState();

  const [autorLista, setAutoresLista] = useState([]);
  const [novoAutor, setNovoAutor] = useState({ nome: "", email: "" });
  const [autorSelecionado, setAutorSelecionado] = useState({});
  const [info, setInfo] = useState("");
  const [restultados, setResultados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [autoresPesquisa, setAutoresPesquisa] = useState([]);
  const [selecionado, setSelecionado] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });
  const [selecinou, SetSelecinou] = useState(false);
  const [mostra, SetMostra] = useState(false);

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
        if (response.status === 204) {
          setInfo("Nenhum Autor Encontrado");
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
        console.log("Autores Econtrados:" + parsedResponse.autores);
      })
      .catch(() => {
        setInfo("Nenhum Autor Encontrado");
        setResultados([]);
      });
  }

  function fetchAutores() {
    getAutores();
    if (autorLista.length < 1) {
      setInfo("Base de dados vazia");
    } else if (autorLista.length >= 1) {
      setInfo("Autores encontrados");
    }
  }

  function getAutoresByPesquisa() {
    fetch(API_URL + "/procuraAutor/" + pesquisa, {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Autor Encontrado");
          setResultados([]);
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
      })
      .catch((error) => {
        if (error === undefined) {
          setInfo("Nenhum Autor Encontrado");
          setResultados([]);
        }
      });
  }

  function addAutor() {
    if (
      novoAutor.nome.trim().length !== 0 &&
      novoAutor.email.trim().length !== 0
    ) {
      fetch(API_URL + "/addAutor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoAutor),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Falha adicionar autor");
          }
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          if (!parsedResponse.status) {
            alert(parsedResponse.message);
            return;
          }

          console.log(parsedResponse.message);
          // Precisamos de refrescar a lista, se tivessemos o id bastava adicionar um novo com o id
          fetchAutores();
        })
        .catch((error) => {
          console.log(error);
          setInfo("Falha em adicionar Autor");
        });
    }
  }

  function removeAutor(id) {
    //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
    let autorListaaux = autorLista;
    console.log(id);
    //Da set do selecionado a null caso seja apagado
    if (autorSelecionado.id === id) {
      setAutorSelecionado(null);
    }

    fetch(API_URL + "/removeAutor/" + id, {
      mode: "cors",
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Autor");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        //Filtramos o que não queremos
        autorListaaux = autorListaaux.filter((e, i) => e.id !== id);

        setAutoresLista(autorListaaux);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateAutor() {
    let updatedAutor = {
      id: autorSelecionado.id,
      nome: novoAutor.nome,
      email: novoAutor.email,
    };
    console.log("Update:" + JSON.stringify(updatedAutor));

    fetch(API_URL + "/updateAutor", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedAutor),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar Autor");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        fetchAutores();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="MainBody">
        <div className={mostra ? "MostraSelecao" : "EscondeSelecao"}>
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
          <button className="butaoPesquisa" onClick={getAutoresByPesquisa}>
            Pesquisa
          </button>

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
          {autoresPesquisa.length > 0 && (
            <div className="Listagem">
              {autoresPesquisa.map(function (element, index) {
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
          )}
        </div>

        <div className="Altera">
          <div className="Linha">
            <div className="column">Autor Selecionado :</div>
            <div className="column">
              {autorSelecionado.nome + " , " + autorSelecionado.email}
            </div>
          </div>
          <div className="Linha">
            <div className="column">
              <p>Nome:</p>
              <input
                type="text"
                value={novoAutor.name}
                onChange={(e) => {
                  setNovoAutor({ ...novoAutor, nome: e.target.value });
                }}
              />
            </div>
            <div className="column">
              <p>Email:</p>
              <input
                type="text"
                value={novoAutor.email}
                onChange={(e) => {
                  setNovoAutor({ ...novoAutor, email: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="Informacao">Info: {info}</div>
      </div>
    </>
  );
}
