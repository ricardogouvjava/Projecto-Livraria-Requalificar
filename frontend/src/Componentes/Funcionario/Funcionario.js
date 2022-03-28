import { useState } from "react";
import "./Funcionario.css";
import { PesquisaLivro } from "../Pesquisa/PesquisaLivro";

const API_URL = "http://localhost:8080";
//const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function FuncionarioService(props) {
  const [mostraLivroMenu, setMostraLivroMenu] = useState(false);
  const [mostraAutorMenu, setMostraAutorMenu] = useState(false);
  const [mostraEditoraMenu, setMostraEditoraMenu] = useState(false);
  const [opcao, SetOpcao] = useState();

  function pesquisaLivros() {
    SetOpcao(<PesquisaLivro></PesquisaLivro>);
  }

  function adicionaLivro() {}

  return (
    <>
      <div className="MainBody">
        <div className="bodyleft">
          <div>{opcao}</div>
        </div>
        <div className="bodyright">
          <h1>Menu</h1>
          <div>
            <button
              className="mainbutton"
              onClick={() => {
                setMostraLivroMenu(!mostraLivroMenu);
              }}
            >
              Menu - Livro
            </button>
            <div
              className={mostraLivroMenu ? "MostraButtons" : "EscondeButtons"}
            >
              <button onClick={pesquisaLivros}>Pesquisa Livro</button>
              <button onClick={adicionaLivro}>Adiciona Livro</button>
              <button>Modifica Livro</button>
              <button>Remove Livro</button>
            </div>
            <button
              className="mainbutton"
              onClick={() => {
                setMostraAutorMenu(!mostraAutorMenu);
              }}
            >
              Menu - Autor
            </button>
            <div
              className={mostraAutorMenu ? "MostraButtons" : "EscondeButtons"}
            >
              <button>Procura Autor</button>
              <button>Adiciona Autor</button>
              <button>Actualiza Autor</button>
              <button>Remove Autor</button>
            </div>
            <button
              className="mainbutton"
              onClick={() => {
                setMostraEditoraMenu(!mostraEditoraMenu);
              }}
            >
              Menu - Editora
            </button>
            <div
              className={mostraEditoraMenu ? "MostraButtons" : "EscondeButtons"}
            >
              <button>Procura Editora</button>
              <button>Adiciona Editora</button>
              <button>Actualiza Editora</button>
              <button>Remove Editora</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
