import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { AdicionaEditora } from "../Editora/AdicionarEditora";

import "./Autor.css";

const API_URL = "http://localhost:8080";

export function AutorService(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [opcao, SetOpcao] = useState();
  const [autorLista, setAutoresLista] = useState([]);
  const [autorSelecionado, setAutorSelecionado] = useState({});
  const [selectEditar, SetSelectEditar] = useState(false);
  const [selectVerdadosAutor, SetSelectVerdadosAutor] = useState(false);
  const [selecinou, SetSelecinou] = useState(false);
  const [selectRemover, SetSelectRemover] = useState(false);
  const [novoAutor, setNovoAutor] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });
  const [editora, SetEditora] = useState({});
  const [editoras, SetEditoras] = useState([]);
  //const [autoresPesquisa, setAutoresPesquisa] = useState([]);

  // O que foi pesquisado
  const [pesquisa, setPesquisa] = useState("");
  const [selecionado, setSelecionado] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });

  useEffect(() => {
    fetchAutores();
  }, []);

  function fetchAutores() {
    getAutores();
    if (autorLista.length === 0) {
      setInfo("Base de dados vazia");
    } else {
      setInfo("Autores encontrados");
    }
  }

  function opcaoEditar() {
    SetSelectEditar(!selectEditar);
  }

  function opcaoRemover() {
    SetSelectRemover(!selectRemover);
  }

  function verAutor() {
    SetSelectVerdadosAutor(!selectVerdadosAutor);
  }

  function adicionarEditora() {
    <AdicionaEditora></AdicionaEditora>;
  }

  function AdicionaEditoraAutor() {
    let tempAutor = novoAutor;
    tempAutor.editora = editora;
    SetEditora({});
  }

  function getEditoras() {
    fetch(API_URL + "/getEditoras", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Editora Encontrada");
          SetEditoras([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        SetEditoras(parsedResponse.editoras);
        console.log("Editoras Econtrados:" + parsedResponse.editoras);
      })
      .catch(() => {
        setInfo("Nenhums Editora Encontrada");
        SetEditoras([]);
      });
  }

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
          setAutoresLista([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setAutoresLista(parsedResponse.autores);
        console.log("Autores Econtrados:" + parsedResponse.autores);
      })
      .catch(() => {
        setInfo("Nenhum Autor Encontrado");
        setAutoresLista([]);
      });
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
          setAutoresLista([]);
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setAutoresLista(parsedResponse.livros);
      })
      .catch((error) => {
        if (error === undefined) {
          setInfo("Nenhum Autor Encontrado");
          setAutoresLista([]);
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

  function removeAutor() {
    let id = selecionado.id;
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
        setInfo("Sucesso em remover autor");
        SetSelectEditar(false);
        SetSelectRemover(false);
        SetSelecinou(false);
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
        <div className="PesquisaEditora">
          <h3>Pesquisa Autores</h3>
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
          <div>
            <button onClick={getAutoresByPesquisa}>Pesquisa</button>
          </div>

          <div className="Listagem">
            <h3>Resultados</h3>
            {pesquisa.length > 0 && (
              <div>
                {autorLista.map(function (element, index) {
                  return (
                    <div
                      key={index}
                      className="ElementoListagem"
                      onClick={() => {
                        setAutorSelecionado(element);
                        console.log(element);
                        SetSelecinou(true);
                      }}
                    >
                      {element.nome + " , " + element.email}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="Informacao">Info: {info}</div>
      </div>
      <div className={selecinou ? "MostraSeleciondo" : "EscondeSeleciondo"}>
        <h4>Autor Seleciondado</h4>
        <div>
          {selecionado.nome}, Morada: {selecionado.email}
        </div>
        <button onClick={verAutor}>Ver do Autor</button>
        <button onClick={opcaoEditar}>Altera dados do autor</button>
        <button onClick={opcaoRemover}>Remove autor</button>
        <button onClick={adicionarEditora}>Adiciona Editora</button>
      </div>
      <div className={selectEditar ? "MostraEditar" : "EscondeEditar"}>
        <div className="DadosUser">
          <h4> Editar Autor: {selecionado.nome}</h4>
          <p>Nome:</p>
          <input
            type="text"
            value={novoAutor.nome}
            onChange={(e) => {
              setNovoAutor({ ...novoAutor, nome: e.target.value });
            }}
          />
          <p>Email: </p>
          <input
            type="text"
            value={novoAutor.email}
            onChange={(e) => {
              setNovoAutor({
                ...novoAutor,
                email: e.target.value,
              });
            }}
          ></input>
          <p>Editora: </p>
          <input
            type="text"
            value={novoAutor.editora}
            onChange={(e) => {
              setNovoAutor({
                ...novoAutor,
                editora: e.target.value,
              });
            }}
          ></input>
          <div className="DivButtonCriarConta">
            <button onClick={updateAutor}>Finalizar</button>
          </div>
        </div>
      </div>
      <div className={selectRemover ? "MostraSelecao" : "EscondeSelecao"}>
        <div>
          <p>Tem a certeza que pretende Remover?</p>
        </div>
        <button onClick={removeAutor}>Sim</button>
        <button onClick={opcaoRemover}>Nao</button>
      </div>

      <div className={selectVerdadosAutor ? "MostraSelecao" : "EscondeSelecao"}>
        <div>
          <p>Nome : {selecionado.nome}</p>
          <p>Email : {selecionado.email}</p>
          <p>Editora : {selecionado.nome}</p>
          <div>
            {selecionado.livros.map((liv) => (
              <div key={liv.id}> autor: {liv.nome}</div>
            ))}
          </div>
        </div>
      </div>

      {/*
        <div className={mostra ? "MostraSelecao" : "EscondeSelecao"}>
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
            <p>Selecionado: {autorSelecionado.titulo} </p>{" "}
            <button
              onClick={() => {
                navigate("/Autor");
              }}
            >
              Ver Livro
            </button>
          </div>
          {autorLista.length > 0 && (
            <div className="Listagem">
              {autorLista.map(function (element, index) {
                return (
                  <div
                    key={index}
                    className="ElementoListagem"
                    onClick={() => {
                      setAutorSelecionado(element);
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
*/}
    </>
  );
}
