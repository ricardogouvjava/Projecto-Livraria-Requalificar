import { useState, React } from "react";
import { AdicionaEditora } from "../Editora/AdicionarEditora";
import Select from "react-select";
const API_URL = "http://localhost:8080";
export function AutorForm({ childToParent }) {
  const [autor, setAutor] = useState({
    nome: "autor",
    email: "autor@autor",
    editora: "",
  });
  const [editorasList, setEditorasList] = useState([]);
  const [selectState, SetSelectState] = useState({});
  const [editora, setEditora] = useState(editorasList[0]);
  const [mostra, SetMostra] = useState(false);

  const onChangesetEditora = (item) => {
    setEditora(item);
    // console.log("Editora:" + editora.nome);
  };
  function AdicionaEditoraAutor() {
    let tempAutor = autor;
    tempAutor.editora = editora;
  }
  function AdicionaEditoraNova() {
    SetMostra(!mostra);
  }

  const [info, setInfo] = useState("");
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
          setEditorasList([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setEditorasList(parsedResponse.editoras);
        console.log("Editoras Econtrados:" + parsedResponse.editoras);
      })
      .catch(() => {
        setInfo("Nenhums Editora Encontrada");
        setEditorasList([]);
      });
  }

  return (
    <div className="DadosUser">
      <p>Nome: </p>
      <input
        type="text"
        value={autor.nome}
        onChange={(e) => {
          setAutor({
            ...autor,
            nome: e.target.value,
          });
        }}
      ></input>
      <p>Email: </p>
      <input
        type="text"
        value={autor.email}
        onChange={(e) => {
          setAutor({
            ...autor,
            email: e.target.value,
          });
        }}
      ></input>

      <div className="DadosUser">
        <p>Editora: </p> <p> {editora && editora.nome} </p>
      </div>

      <div className="selectEditora">
        <p>Seleciona Editora</p>
        <Select
          value={editora}
          onChange={onChangesetEditora}
          options={editorasList}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.nome}
        />
        <button onClick={AdicionaEditoraAutor}>Confima</button>
        <button onClick={AdicionaEditoraNova}>Adiciona Editora</button>
        <button onClick={getEditoras}>Actualizar Editoras</button>
        <div className={mostra ? "MostraSelecao" : "EscondeSelecao"}>
          <AdicionaEditora></AdicionaEditora>
        </div>
      </div>
      <div className="DivButtonCriarConta">
        <button
          onClick={() => {
            childToParent(autor);
          }}
        >
          Cria Autor
        </button>
      </div>
    </div>
  );
}
