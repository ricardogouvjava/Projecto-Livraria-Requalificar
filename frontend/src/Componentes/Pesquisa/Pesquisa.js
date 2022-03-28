import { useState } from "react";
import { PesquisaLivro } from "../Livro/PesquisaLivro";

const API_URL = "http://localhost:8080";
//const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function PesquisaService(props) {
  return <PesquisaLivro></PesquisaLivro>;
}
