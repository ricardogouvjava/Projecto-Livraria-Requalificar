import imageteste from "../../images/teste.jpg";
import "./Livro.css";
const API_URL = "http://localhost:8080";

export function ElementoLivro(props) {
  let data = props.livro;
  return (
    <div className="LivroBodyZoom">
      <div className="LivroInfoZoom">
        <div>Id: {data.id}</div>
        <div>Titulo: {data.titulo}</div>
        <div>ISBN: {data.isbn}</div>
        <div>Data de Lancamento: {data.dataDeLancamento} </div>
        <div>Paginas: {data.paginas} </div>
        <div>Preco: {data.preco}</div>
        <div>Edicao: {data.edicao} </div>
        <div>Sinopse: {data.sinopse} </div>
        <div>vendidos: {data.vendidos} </div>
        <div>Editora: {data.editora}</div>
        <div>Stock: {data.stock}</div>
      </div>
      <div className="LivroImageZoom">
        <img src={imageteste} alt="image"></img>
      </div>
    </div>
  );
}
