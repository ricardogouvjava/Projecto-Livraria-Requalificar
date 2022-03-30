import { padding } from "@mui/system";
import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Editora.css";

const API_URL = "http://localhost:8080";

export function EditoraService(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [editorasPesquisa, setEditorasPesquisa] = useState([]);
  const [autor, setAutor] = useState({
    id: 0,
    nome: "",
    morada: "",
    editora: "",
  });
  const [autores, setAutores] = useState([]);
  const [selecinou, SetSelecinou] = useState(false);
  const [selectEditar, SetSelectEditar] = useState(false);
  const [selectRemover, SetSelectRemover] = useState(false);
  const [selectAdicionaAutor, SetSelectAdicionaAutor] = useState(false);
  const [selectState, SetSelectState] = useState({});
  const [selectVerdadosEditora, SetSelectVerdadosEditora] = useState(false);
  const [selecionado, setSelecionado] = useState({
    nome: "",
    morada: "",
    autores: [],
  });
  const [novoEditora, setNovoEditora] = useState({ nome: "", morada: "" });
  useEffect(() => {
    getEditoras();
  }, []);

  function opcaoEditar() {
    SetSelectEditar(!selectEditar);
  }

  function opcaoRemover() {
    SetSelectRemover(!selectRemover);
  }

  function opcaoAdicionaAutor() {
    getAutores();
    SetSelectAdicionaAutor(!selectAdicionaAutor);
  }

  function verEditora() {
    SetSelectVerdadosEditora(!selectVerdadosEditora);
  }

  function adicionaAutor() {
    let tempEditora = selecionado;
    if (!tempEditora.autores.includes(autor)) {
      tempEditora.autores.push(autor);
      setAutor({});
      setInfo("Autor Adicionado");
      console.log(selecionado);

      fetch(
        API_URL + "/addAutor/" + autor.id + "/ToEditora/" + tempEditora.id,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Erro associar autor a editora");
          }

          return response.json();
        })
        .then((res) => {
          setInfo("Sucesso em associar autor a editora");
          console.log(res);
        })
        .catch((error) => {
          setInfo("Erro associar autor a editora");
        });
    } else {
      setInfo("Autor ja existe!!");
    }
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
          setEditorasPesquisa([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setEditorasPesquisa(parsedResponse.editoras);
        console.log("Editoras Econtrados:" + parsedResponse.editoras);
      })
      .catch(() => {
        setInfo("Nenhum Editora Encontrada");
        setEditorasPesquisa([]);
      });
  }

  function getEditorasByPesquisa() {
    if (pesquisa === "") {
      getEditoras();
    } else {
      fetch(API_URL + "/procuraEditora/" + pesquisa, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 204) {
            setInfo("Nenhum Editora Encontrada");
            setEditorasPesquisa([]);
          } else if (response.status !== 200 && response.status !== 204) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then((parsedResponse) => {
          setEditorasPesquisa(parsedResponse.editoras);
        })
        .catch((error) => {
          setInfo("Nenhuma Editora Encontrada");
          setEditorasPesquisa([]);
        });
    }
  }

  function updateEditora() {
    let updatedEditora = {
      id: props.edit.id,
      nome: novoEditora.nome,
      morada: novoEditora.morada,
    };
    console.log("Update:" + JSON.stringify(updatedEditora));

    fetch(API_URL + "/updateEditora", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedEditora),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar Editora");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        setInfo("Editora actualizada");
        SetSelectEditar(false);
        SetSelecinou(false);
        SetSelectAdicionaAutor(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeEditora() {
    let id = selecionado.id;
    setSelecionado({
      nome: "",
      morada: "",
      autores: [],
    });

    fetch(API_URL + "/removeEditora/" + id, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Editora");
        }

        return response.json();
      })
      .then((res) => {
        setEditorasPesquisa(res.editoras);
        setInfo("Sucesso em remover editora");
        SetSelectEditar(false);
        SetSelectRemover(false);
        SetSelecinou(false);
        SetSelectAdicionaAutor(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="EditoraBody">
        <div className="PesquisaEditora">
          <h3>Pesquisa de Editoras</h3>
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
            <button onClick={getEditorasByPesquisa}>Pesquisa</button>
          </div>

          <div className="Listagem">
            {" "}
            <h3>Resultados</h3>
            {editorasPesquisa.length > 0 && (
              <div>
                {editorasPesquisa.map(function (element, index) {
                  return (
                    <div
                      key={index}
                      className="ElementoListagem"
                      onClick={() => {
                        setSelecionado(element);
                        console.log(element);
                        SetSelecinou(true);
                      }}
                    >
                      {element.nome + " , " + element.morada}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="Informacao">
          <p>{info}</p>
        </div>
        <div className={selecinou ? "MostraSelecao" : "EscondeSelecao"}>
          <p>
            Selecionado -- Editora: {selecionado.nome}, Morada:{" "}
            {selecionado.morada}
          </p>
          <button onClick={verEditora}>Ver dados Editora</button>
          <button onClick={opcaoEditar}>Altera Dados Editora</button>
          <button onClick={opcaoRemover}>Remove Editora</button>
          <button onClick={opcaoAdicionaAutor}>Adiciona Autor</button>
        </div>
        <div className={selectEditar ? "MostraSelecao" : "EscondeSelecao"}>
          <div className="DadosUser">
            <h3> Editar Editora: {selecionado.nome}</h3>
            <p>Nome:</p>
            <input
              type="text"
              value={novoEditora.nome}
              onChange={(e) => {
                setNovoEditora({ ...novoEditora, nome: e.target.value });
              }}
            />
            <p>Morada: </p>
            <input
              type="text"
              value={novoEditora.morada}
              onChange={(e) => {
                setNovoEditora({
                  ...novoEditora,
                  morada: e.target.value,
                });
              }}
            ></input>
            <div className="DivButtonCriarConta">
              <button onClick={updateEditora}>Finalizar</button>
            </div>
          </div>
        </div>
        <div className={selectRemover ? "MostraSelecao" : "EscondeSelecao"}>
          <div>
            <p>Tem a certeza que pretende Remover?</p>
          </div>
          <button onClick={removeEditora}>Sim</button>
          <button onClick={opcaoRemover}>Nao</button>
        </div>
        <div
          className={selectAdicionaAutor ? "MostraSelecao" : "EscondeSelecao"}
        >
          Seleciona Autor
          <select
            style={{ width: "200px", padding: "0.2em", margin: "10px" }}
            value={selectState.value}
            id="Autores"
            onChange={(e) => {
              SetSelectState({ value: e.target.value });
              console.log(e.target.key);
              setAutor(autores[e.target.value - 1]);
              console.log(autores[e.target.value - 1]);
            }}
          >
            {autores.map((elementoAutor, index) => (
              <option key={index} value={elementoAutor.id}>
                {elementoAutor.id}__{elementoAutor.nome}
              </option>
            ))}
          </select>
          <button onClick={adicionaAutor}>Confima</button>
        </div>

        <div
          className={selectVerdadosEditora ? "MostraSelecao" : "EscondeSelecao"}
        >
          <div>
            <p>Nome : {selecionado.nome}</p>
            <p>Morada : {selecionado.morada}</p>
            <div>
              {selecionado.autores.map((aut, index) => (
                <div key={aut.id}> autor: {aut.nome}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
