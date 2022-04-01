import { imageteste } from "../../images/teste.jpg";
import "./Livro.css";
const API_URL = "http://localhost:8080";

const data = {
  id: 0,
  autores: [
    {
      id: 0,
      nome: "string",
      email: "string",
    },
  ],
  titulo: "O mundo dos String",
  isbn: "string",
  preco: 0,
  stock: 0,
  dataDeLancamento: "20-10-2008",
  paginas: 0,
  edicao: 0,
  sinopse: "string",
  imagem: "string",
  vendidos: 0,
};

export function LivroService(props) {
  return (
    <div className="LivroBody">
      <div className="Livrobodyleft">
        <div>Id: </div>
        <div>Titulo: {data.titulo}</div>
        <div>ISBN: {data.isbn}</div>
        <div>Data de Lancamento: </div>
        <div>Paginas: </div>
        <div>Preco: </div>
        <div>Autores: </div>
        <div>Edicao: </div>
        <div>Sinopse: </div>
        <div>vendidos: </div>
      </div>
      <div className="Livrobodyright">
        <img src={imageteste} alt="image"></img>
      </div>
    </div>
  );
}
