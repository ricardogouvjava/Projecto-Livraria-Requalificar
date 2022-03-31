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
    id: "",
    titulo: "",
    dataDeLancamento: "",
    paginas: "",
  });
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  let totalSaco = 0;

  useEffect(() => {
    getLivros();
  }, []);

  function mudaquantidade(quant) {
    setQuantidade(quant);
  }

  function adicionaLivroCarrinho() {
    setCarrinho([
      ...carrinho,
      {
        id: selecionado.id,
        preco: selecionado.preco,
        titulo: selecionado.titulo,
        numero: quantidade,
      },
    ]);
    //console.log(selecionado);
    //console.log(carrinho);
    SetCarrinhoAtivo(true);
    SetSelecinou(!selecinou);
    totalSaco = calculaTotal();
    setTotal(calculaTotal());
  }

  function calculaTotal() {
    let soma = 0;
    carrinho.forEach(function (arrayItem) {
      soma = arrayItem.preco * arrayItem.numero;
    });
    console.log(soma);
    return soma;
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
          {carrinho && (
            <div className={carrinhoAtivo ? "Carinho" : "EscondeCarrinho"}>
              ___Carrinho___
              {carrinho.map((item, index) => (
                <div key={index}>
                  {item.titulo} : {item.numero}
                </div>
              ))}
              Total : {calculaTotal()}
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
            id="number"
            name="numerodeLivros"
            //value={quantidade}
            min={0}
            onChange={(e) => {
              mudaquantidade(e.target.valueAsNumber);
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
