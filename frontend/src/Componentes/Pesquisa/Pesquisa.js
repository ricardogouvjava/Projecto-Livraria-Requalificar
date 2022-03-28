import { useState } from "react";
import { PesquisaLivro } from "../Pesquisa/PesquisaLivro";

const API_URL = "http://localhost:8080";
//const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function PesquisaService(props) {
  return (
    <>
      <div className="MainBody">
        <PesquisaLivro></PesquisaLivro>
      </div>
    </>
  );
}
