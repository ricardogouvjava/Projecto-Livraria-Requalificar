import { useState, React } from "react";

export function AutorForm({ childToParent }) {
  const [autor, setAutor] = useState({
    nome: "autor",
    email: "autor@autor",
    editora: "",
  });
    
    
    

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
      <p>Editora: </p>
      <input
        type="text"
        value={autor.editora}
        onChange={(e) => {
          setAutor({
            ...autor,
            editora: e.target.value,
          });
        }}
      ></input>
      <div className="DivButtonCriarConta">
        <button
          onClick={() => {
            childToParent(autor);
          }}
        >
          Cria Conta
        </button>
      </div>
    </div>
  );
}
