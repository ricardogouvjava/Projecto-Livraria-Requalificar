import { useState, React } from "react";

export function EditoraForm({ childToParent }) {
  const [editora, setEditora] = useState({
    nome: "editora",
    morada: "Efitoras Editoras",
  });

  return (
    <div className="DadosUser">
      <p>Nome: </p>
      <input
        type="text"
        value={editora.nome}
        onChange={(e) => {
          setEditora({
            ...editora,
            nome: e.target.value,
          });
        }}
      ></input>
      <p>Morada: </p>
      <input
        type="text"
        value={editora.morada}
        onChange={(e) => {
          setEditora({
            ...editora,
            morada: e.target.value,
          });
        }}
      ></input>
      <div className="DivButtonCriarConta">
        <button
          onClick={() => {
            childToParent(editora);
          }}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
