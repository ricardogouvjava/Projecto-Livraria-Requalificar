import { useState } from "react";
import "./Menu.css";
import { PesquisaLivro } from "../Pesquisa/PesquisaLivro";
import { AdicionaLivro } from "../Livro/AdicionaLivro";
import { AdicionaAutor } from "../Autor/AdicionaAutor";
import { AdicionaEditora } from "../Editora/AdicionarEditora";
import { EditoraService } from "../Editora/EditoraService";
import { AutorService } from "../Autor/AutorService";

const API_URL = "http://localhost:8080";
//const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function MenuFuncionario({ SetMostra }) {
  const [mostraLivroMenu, setMostraLivroMenu] = useState(false);
  const [mostraAutorMenu, setMostraAutorMenu] = useState(false);
  const [mostraEditoraMenu, setMostraEditoraMenu] = useState(false);
  const [opcao, SetOpcao] = useState();

  function pesquisaLivros() {
    SetOpcao(<PesquisaLivro></PesquisaLivro>);
  }

  function adicionaLivro() {
    SetOpcao(<AdicionaLivro></AdicionaLivro>);
  }

  function addicionaAutor() {
    SetOpcao(<AdicionaAutor></AdicionaAutor>);
  }

  function opcoesAutor() {
    SetOpcao(<AutorService></AutorService>);
  }

  function adicionaEditora() {
    SetOpcao(<AdicionaEditora></AdicionaEditora>);
  }
  function opcoesEditora() {
    SetOpcao(<EditoraService></EditoraService>);
  }

  return (
    <>
      <div className="MainBody">
        <div className="bodyleft">
          <div>{opcao}</div>
          <div className={mostraAutorMenu ? "MostraButtons" : "EscondeButtons"}>
            <></>
          </div>
          <div className={mostraAutorMenu ? "MostraButtons" : "EscondeButtons"}>
            <PesquisaLivro></PesquisaLivro>
          </div>
        </div>
        <div className="bodyright">
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
              <button>Outras Opcoes</button>
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
              <button onClick={addicionaAutor}>Adiciona Autor</button>
              <button onClick={opcoesAutor}>Outras Opcoes</button>
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
              <button onClick={adicionaEditora}>Adiciona</button>
              <button onClick={opcoesEditora}>Outras Opcoes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
