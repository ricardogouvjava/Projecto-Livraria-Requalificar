import { useEffect, useState } from "react";
import moment from "moment";
import { ElementoLivro } from "../Livro/ElementoLivro";
//import "./Pesquisa.css";
import imageteste from "../../images/teste.jpg";

const API_URL = "http://localhost:8080";
const info1 = "Pode pesquisar por titulo autor ou editora.";

export function Loja(props) {
  const [quantidade, setQuantidade] = useState(0);
  const [quantidades, setQuantidades] = useState([]);
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
    setQuantidades([...quantidades, quantidade]);
    SetCarrinhoAtivo(true);
    SetSelecinou(!selecinou);
    setTotal(calculaTotal());
  }

  function removeElementocarrinho(index) {
    let carrinhoTemp = [...carrinho];
    carrinhoTemp.splice(index, 1);
    setCarrinho(carrinhoTemp);
  }

  function calculaTotal() {
    let soma = 0;
    carrinho.forEach(function (arrayItem) {
      soma += arrayItem.preco * arrayItem.numero;
    });
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

  function pagar() {
    if (carrinho.length >= 1) {
      let venda = {
        livros: carrinho,
        cliente: { id: props.user },
        valor: total,
        quantLivros: quantidades,
        dataVenda: moment().format("DD-MM-YYYY"),
      };
      console.log(venda);
      /*     venda.push({ livros: carrinho });
      venda.push( "cliente": { id: props.user } );
      venda.push( valor: total );
      venda.push( quantLivros: quantidades );
      venda.push({ data: moment().format("DD-MM-YYYY") });
      console.log(venda); */

      fetch(API_URL + "/criaVenda", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(venda),
      })
        .then((response) => {
          if (response.status != 200) {
            throw new Error(" Falha em realizar compra");
          }
          return response.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
          <div>
            {carrinho && (
              <div className={carrinhoAtivo ? "Carinho" : "EscondeCarrinho"}>
                ___Carrinho___
                {carrinho.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.titulo} : {item.numero}
                    </p>
                    <button onClick={() => removeElementocarrinho(index)}>
                      X
                    </button>
                  </div>
                ))}
                Total : {calculaTotal()}
                <div>
                  <button onClick={pagar}> Pagar</button>
                </div>
              </div>
            )}
          </div>
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
