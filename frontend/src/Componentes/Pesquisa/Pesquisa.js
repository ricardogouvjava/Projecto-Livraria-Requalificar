import { useState } from "react";
import { PesquisaAutor } from "./PesquisaAutor";
import { PesquisaLivro } from "./PesquisaLivro";

const API_URL = "http://localhost:8080";
//const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function PesquisaService(props) {
  const [mostraPesquisaLivro, setMostraPesquisaLivro] = useState(false);
  const [mostraPesquisaAutor, setMostraPequisaAutor] = useState(false);
  const [info, setInfo] = useState("");
  const onClickPesquisaLivro = () => {
    setMostraPesquisaLivro(!mostraPesquisaLivro);
  };

  const onClickPesquisaAutor = () => {
    setMostraPequisaAutor(!mostraPesquisaAutor);
  };
  return (
    <div className="MainBody">
      <div className="bodyleft">
        <div
          className={mostraPesquisaLivro ? "MostraSelecao" : "EscondeSelecao"}
        >
          <PesquisaLivro></PesquisaLivro>
        </div>
        <div
          className={mostraPesquisaAutor ? "MostraSelecao" : "EscondeSelecao"}
        >
          <PesquisaAutor></PesquisaAutor>
        </div>
        <p className="Informacao">{info}</p>
      </div>
      <div className="bodyright">
        <button className="ButtonMenu" onClick={onClickPesquisaLivro}>
          PesquisaLivro
        </button>
        <button className="ButtonMenu" onClick={onClickPesquisaAutor}>
          Pesquisa Autor
        </button>
        <button className="ButtonMenu">Pesquisa Editora</button>
        <button className="ButtonMenu">Ver Cupoes</button>
      </div>
    </div>
  );
}
