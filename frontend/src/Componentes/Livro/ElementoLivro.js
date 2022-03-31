import imageteste from "./teste.jpg";
import "./Livro.css";
const API_URL = "http://localhost:8080";

export function ElementoLivro(props) {
  let data = props.livro;
  return (
    <div className="LivroBodyZoom">
      <div className="LivroInfoZoom">
        <div>Titulo: {data.titulo}</div>
        <div>ISBN: {data.isbn}</div>
        <div>Data de Lancamento: {data.dataDeLancamento} </div>
        <div>Paginas: {data.paginas} </div>
        <div>Preco: {data.preco}</div>
        <div>Autores: {data.autores}</div>
        <div>Edicao: {data.edicao} </div>
        <div>Sinopse: {data.sinopse} </div>
        <div>vendidos: {data.vendidos} </div>
      </div>
      <div className="LivroImageZoom">
        <img src={imageteste} alt="image"></img>
      </div>
    </div>
  );
}
