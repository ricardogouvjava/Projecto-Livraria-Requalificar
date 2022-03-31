import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ElementoLivro } from "../Livro/ElementoLivro";
import "./Pesquisa.css";
import imageteste from "./teste.jpg";

const API_URL = "http://localhost:8080";
const info1 = "Pode pesquisar por titulo autor ou editora.";

export function PesquisaCliente(props) {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(0);
  const [pesquisa, setPesquisa] = useState("");
  const [restultados, setResultados] = useState([]);
  const [info, setInfo] = useState(info1);
  const [selecinou, SetSelecinou] = useState(false);
  const [abreLivro, SetAbreLivro] = useState(false);
  const [carrinhoAtivo, SetCarrinhoAtivo] = useState(false);
  const [selecionado, setSelecionado] = useState({
    titulo: "",
    dataDeLancamento: "",
    paginas: "",
  });

  const [carrinho, setCarrinho] = useState({
    livro: {},
    quantidade: 0,
    cliente: {},
    valor: 0,
    data: "",
  });

  useEffect(() => {
    getLivros();
  }, []);

  function mudaquantidade(quant) {
    setQuantidade(quant);
  }

  function adicionaLivroCarrinho() {
    setCarrinho({ ...carrinho, livro: selecionado });
    SetCarrinhoAtivo(true);
    SetSelecinou(!selecinou);
  }

  function getLivros() {
    fetch(API_URL + "/getLivros", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Livro Encontrado");
          setResultados([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
        console.log("Livro Econtrados:" + parsedResponse.livros);
      })
      .catch(() => {
        setInfo("Nenhum Livro Encontrado");
        setResultados([]);
      });
  }

  function getLivrosByPesquisa() {
    fetch(API_URL + "/procuraLivros/" + pesquisa, {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setInfo("Nenhum Livro Encontrado");
          setResultados([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setResultados(parsedResponse.livros);
        setInfo("Livros Encontrados");
      })
      .catch(() => {
        setInfo("Nenhum Livro Encontrado");
        setResultados([]);
      });
  }

  return (
    <>
      <div className="MainBodyClean">
        <div className="PesquisaCarrinho">
          <div className="Pesquisa">
            <h3>Pesquisa de Livros</h3>
            <div>
              <input
                type="text"
                name="Pesquisa"
                value={pesquisa}
                onChange={(char) => {
                  setPesquisa(char.target.value);
                }}
              ></input>
              <button className="butaoPesquisa" onClick={getLivrosByPesquisa}>
                Pesquisa
              </button>
            </div>
          </div>
          {carrinho.livro && (
            <div className={carrinhoAtivo ? "Carinho" : "EscondeCarrinho"}>
              Carrinho
              {
                //carrinho.livro.map((item, index) => (<div key={index}>{item.nome}</div>))
              }
              <div>
                {" "}
                {carrinho.livro} : {carrinho.quantidade}{" "}
              </div>
            </div>
          )}
        </div>

        <div className="Informacao">
          <p>{info}</p>
        </div>
        <div
          className={
            abreLivro
              ? "MostraLivroSeleciondadoZoom"
              : "EscondeLivroSelecionadoZoom"
          }
        >
          <ElementoLivro livro={selecionado}></ElementoLivro>

          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={0}
            min={1}
            onChange={(e) => {
              mudaquantidade(e.target.valueAsNumber);
              console.log(quantidade);
            }}
          ></input>
          <button onClick={adicionaLivroCarrinho}>Adicionar Carrinho</button>
        </div>
        <div className="Grelha">
          {restultados.map(function (element, index) {
            return (
              <div
                key={index}
                className="ElementoGrelha"
                onClick={() => {
                  setSelecionado(element);
                  SetSelecinou(true);
                  SetAbreLivro(!abreLivro);
                }}
              >
                <div className="LivroBody">
                  <div className="LivroImage">
                    <img src={imageteste} alt="image"></img>
                  </div>
                  <div className="LivroInfo">
                    <p>{element.titulo}</p>
                    <p>{element.dataDeLancamento}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
