import { useEffect, useState, React } from "react";
import Select from "react-select";
import "./Editora.css";

const API_URL = "http://localhost:8080";

export function EditoraService(props) {
  const [info, setInfo] = useState("");
  const [pesquisaeditora, setPesquisaEditora] = useState("");
  const [editorasLista, setEditorasLista] = useState([]);
  const [selecinou, SetSelecinou] = useState(false);
  const [selectEditar, SetSelectEditar] = useState(false);
  const [selectRemover, SetSelectRemover] = useState(false);
  const [selectVerdadosEditora, SetSelectVerdadosEditora] = useState(false);
  const [editoraSelecionada, setEditoraSelecionda] = useState({
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

  function verEditora() {
    SetSelectVerdadosEditora(!selectVerdadosEditora);
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
          setEditorasLista([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setEditorasLista(parsedResponse.editoras);
        console.log("Editoras Econtrados:");
        console.log(parsedResponse.editoras);
      })
      .catch(() => {
        setInfo("Nenhum Editora Encontrada");
        setEditorasLista([]);
      });
  }

  function getEditorasByPesquisa() {
    if (pesquisaeditora === "") {
      getEditoras();
    } else {
      fetch(API_URL + "/procuraEditora/" + pesquisaeditora, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 204) {
            setInfo("Nenhum Editora Encontrada");
            setEditorasLista([]);
          } else if (response.status !== 200 && response.status !== 204) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then((parsedResponse) => {
          setEditorasLista(parsedResponse.editoras);
        })
        .catch((error) => {
          setInfo("Nenhuma Editora Encontrada");
          setEditorasLista([]);
        });
    }
  }

  function updateEditora() {
    let updatedEditora = {
      id: editoraSelecionada.id,
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
        getEditoras();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeEditora() {
    let id = editoraSelecionada.id;
    setEditoraSelecionda({
      id: 0,
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
        setEditorasLista(res.editoras);
        setInfo("Sucesso em remover editora");
        SetSelectEditar(false);
        SetSelectRemover(false);
        SetSelecinou(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="EditoraBody">
        <div className="Informacao">
          <p>{info}</p>
        </div>
        <div className="PesquisaEditora">
          <h3>PesquisaEditora de Editoras</h3>
          <div>
            <input
              type="text"
              name="PesquisaEditora"
              value={pesquisaeditora}
              onChange={(char) => {
                setPesquisaEditora(char.target.value);
              }}
            ></input>
          </div>
          <div>
            <button onClick={getEditorasByPesquisa}>PesquisaEditora</button>
          </div>

          <div className="Listagem">
            <h3>Resultados</h3>
            {editorasLista.length > 0 && (
              <div>
                {editorasLista.map(function (element, index) {
                  return (
                    <div
                      key={index}
                      className="ElementoListagem"
                      onClick={() => {
                        console.log(element);
                        setEditoraSelecionda(element);
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

        <div className={selecinou ? "MostraSeleciondo" : "EscondeSeleciondo"}>
          <h4>Editora Seleciondada</h4>
          <div>
            {editoraSelecionada.nome}, Morada: {editoraSelecionada.morada}
          </div>
          <button onClick={verEditora}>Ver dados Editora</button>
          <button onClick={opcaoEditar}>Altera Dados Editora</button>
          <button onClick={opcaoRemover}>Remove Editora</button>
        </div>
        <div className={selectEditar ? "MostraEditar" : "EscondeEditar"}>
          <div className="DadosUser">
            <h4> Editar Editora: {editoraSelecionada.nome}</h4>
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
          className={selectVerdadosEditora ? "MostraSelecao" : "EscondeSelecao"}
        >
          <div>
            <p>Nome : {editoraSelecionada.nome}</p>
            <p>Morada : {editoraSelecionada.morada}</p>
            <div>
              {editoraSelecionada.autores &&
                editoraSelecionada.autores.map((aut, index) => (
                  <div key={index}> autor: {aut.nome}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
