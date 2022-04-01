import { useEffect, useState, React } from "react";
import { AdicionaEditora } from "../Editora/AdicionarEditora";
import Select from "react-select";
import "./Autor.css";

const API_URL = "http://localhost:8080";

export function AutorService(props) {
  const [info, setInfo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [autorLista, setAutoresLista] = useState([]);
  const [autorSelecionado, setAutorSelecionado] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });
  const [selectEditar, setSelectEditar] = useState(false);
  const [selectVerdadosAutor, setSelectVerdadosAutor] = useState(false);
  const [selecinou, setSelecinou] = useState(false);
  const [selectRemover, setSelectRemover] = useState(false);
  const [mostraAdiconarEditora, SetMostraAdicionarEditora] = useState(false);
  const [novoAutor, setNovoAutor] = useState({
    nome: "",
    email: "",
    editora: "",
    livros: [],
  });
  const [editora, setEditora] = useState({});
  const [editoras, setEditoras] = useState([]);

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

  function AdicionaEditoraNova() {
    getEditoras();
    SetMostraAdicionarEditora(!mostraAdiconarEditora);
  }
  const onChangesetEditora = (item) => {
    setEditora(item);
  };
  function opcaoEditar() {
    setSelectEditar(!selectEditar);
  }

  function opcaoRemover() {
    setSelectRemover(!selectRemover);
  }

  function verAutor() {
    setSelectVerdadosAutor(!selectVerdadosAutor);
  }

  function adicionarEditora() {
    <AdicionaEditora></AdicionaEditora>;
  }

  function AdicionaEditoraAutor() {
    let tempAutor = novoAutor;
    tempAutor.editora = editora;
    setEditora({});
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
          setEditoras([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setEditoras(parsedResponse.editoras);
        console.log("Editoras Econtrados:" + parsedResponse.editoras);
      })
      .catch(() => {
        setInfo("Nenhums Editora Encontrada");
        setEditoras([]);
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
        }
        getAutores();
      });
  }

  function removeAutor() {
    let id = autorSelecionado.id;
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
        setSelectEditar(false);
        setSelectRemover(false);
        setSelecinou(false);
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
                        setSelecinou(true);
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
          Nome: {autorSelecionado.nome}, Morada: {autorSelecionado.email}
        </div>
        <button onClick={verAutor}>Ver do Autor</button>
        <button onClick={opcaoEditar}>Altera dados do autor</button>
        <button onClick={opcaoRemover}>Remove autor</button>
        <button onClick={adicionarEditora}>Adiciona Editora</button>
      </div>
      <div className={selectEditar ? "MostraEditar" : "EscondeEditar"}>
        <div className="DadosAutor">
          <h4> Editar Autor: {autorSelecionado.nome}</h4>
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
          <div className="selectEditora">
            <p>Seleciona Editora</p>
            <Select
              value={editora}
              onChange={onChangesetEditora}
              options={editoras}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.nome}
            />
            <button onClick={AdicionaEditoraAutor}>Confima</button>
            <button onClick={AdicionaEditoraNova}>Adiciona Editora</button>
            <button onClick={getEditoras}>Actualizar Editoras</button>
            <div
              className={
                mostraAdiconarEditora ? "MostraSelecao" : "EscondeSelecao"
              }
            >
              <AdicionaEditora></AdicionaEditora>
            </div>
          </div>
          <div className="UpdateAutor">
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
        <p>Nome : {autorSelecionado.nome}</p>
        <p>Email : {autorSelecionado.email}</p>
        <p>Editora : {autorSelecionado.nome}</p>
        <div>
          {autorSelecionado.livros &&
            autorSelecionado.livros.map((liv) => (
              <div key={liv.id}> autor: {liv.nome}</div>
            ))}
        </div>
      </div>
    </>
  );
}
