import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { ElementoLivro } from "./ElementoLivro";
import "./Livro.css";
import imageteste from "./teste.jpg";

const API_URL = "http://localhost:8080";

export function LivroService(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [livrosPesquisa, setLivrosPesquisa] = useState([]);
  const [autor, setAutor] = useState({
    id: 0,
    nome: "",
    morada: "",
    livro: "",
  });
  const [autores, setAutores] = useState([]);
  const [selecinou, SetSelecinou] = useState(false);
  const [selectEditar, SetSelectEditar] = useState(false);
  const [selectRemover, SetSelectRemover] = useState(false);
  const [selectAdicionaAutor, SetSelectAdicionaAutor] = useState(false);
  const [selectState, SetSelectState] = useState({});
  const [selectVerdadosLivro, SetSelectVerdadosLivro] = useState(false);
  const [selecionado, setSelecionado] = useState({
    titulo: "",
    isbn: "",
    preco: 0,
    stock: 0,
    dataDeLancamento: "",
    paginas: 0,
    edicao: 0,
    sinopse: "",
    imagem: "",
    vendidos: 0,
  });
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    isbn: "",
    preco: 0,
    stock: 0,
    dataDeLancamento: "",
    paginas: 0,
    edicao: 0,
    sinopse: "",
    imagem: "",
    vendidos: 0,
  });

  useEffect(() => {
    getLivros();
  }, []);

  function opcaoEditar() {
    SetSelectEditar(!selectEditar);
  }

  function opcaoRemover() {
    SetSelectRemover(!selectRemover);
  }

  function opcaoAdicionaAutor() {
    getAutores();
    SetSelectAdicionaAutor(!selectAdicionaAutor);
  }

  function verLivro() {
    SetSelectVerdadosLivro(!selectVerdadosLivro);
  }

  function adicionaAutor() {
    let tempLivro = selecionado;
    if (!tempLivro.autores.includes(autor)) {
      tempLivro.autores.push(autor);
      setAutor({});
      setInfo("Autor Adicionado");
      console.log(selecionado);

      fetch(API_URL + "/addAutor/" + autor.id + "/ToLivro/" + tempLivro.id, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Erro associar autor a livro");
          }

          return response.json();
        })
        .then((res) => {
          setInfo("Sucesso em associar autor a livro");
          console.log(res);
        })
        .catch((error) => {
          setInfo("Erro associar autor a livro");
        });
    } else {
      setInfo("Autor ja existe!!");
    }
  }

  function getAutores() {
    fetch(API_URL + "/getAutores", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 204) {
          setInfo("Nenhum Autor Encontrado");
          setAutores([]);
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setAutores(parsedResponse.autores);
        console.log("Autores Encontrados:" + parsedResponse);
      })
      .catch((error) => {
        setInfo("Nenhum Autor Encontrado");
        setAutores([]);
      });
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
          setInfo("Nenhum Livro Encontrada");
          setLivrosPesquisa([]);
          return null;
        } else if (response.status !== 200 && response.status !== 204) {
          throw new Error("error");
        } else {
          return response.json();
        }
      })
      .then((parsedResponse) => {
        setLivrosPesquisa(parsedResponse.livros);
        console.log("Livros Econtrados:" + parsedResponse.livros);
      })
      .catch(() => {
        setInfo("Nenhum Livro Encontrada");
        setLivrosPesquisa([]);
      });
  }

  function getLivrosByPesquisa() {
    if (pesquisa === "") {
      getLivros();
    } else {
      fetch(API_URL + "/procuraLivro/" + pesquisa, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 204) {
            setInfo("Nenhum Livro Encontrada");
            setLivrosPesquisa([]);
          } else if (response.status !== 200 && response.status !== 204) {
            throw new Error("error");
          } else {
            return response.json();
          }
        })
        .then((parsedResponse) => {
          setLivrosPesquisa(parsedResponse.livros);
        })
        .catch((error) => {
          setInfo("Nenhuma Livro Encontrada");
          setLivrosPesquisa([]);
        });
    }
  }

  function updateLivro() {
    let updatedLivro = {
      id: selecionado.id,
      isbn: selecionado.isbn,
      titulo: novoLivro.titulo,
      morada: novoLivro.morada,
      preco: novoLivro.preco,
      sinopse: novoLivro.vendidos,
      edicao: novoLivro.edicao,
      vendidos: novoLivro.vendidos,
      stock: novoLivro.stock,
      paginas: novoLivro.paginas,
      imagem: imageteste,
    };
    console.log("Update:" + JSON.stringify(updatedLivro));

    fetch(API_URL + "/updateLivro", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedLivro),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar Livro");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        setInfo("Livro actualizado");
        SetSelectEditar(false);
        SetSelecinou(false);
        SetSelectAdicionaAutor(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeLivro() {
    let isbn = selecionado.isbn;
    setSelecionado({
      nome: "",
      morada: "",
      autores: [],
    });

    fetch(API_URL + "/removeLivroByIsbn/" + isbn, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Livro");
        }

        return response.json();
      })
      .then((res) => {
        setLivrosPesquisa(res.livros);
        setInfo("Sucesso em remover livro");
        SetSelectEditar(false);
        SetSelectRemover(false);
        SetSelecinou(false);
        SetSelectAdicionaAutor(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="LivroOpcoesBody">
        <div className="PesquisaLivro">
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
          </div>
          <div>
            <button onClick={getLivrosByPesquisa}>Pesquisa</button>
          </div>
          <div className="Informacao">Info: {info}</div>
          <div className="Listagem">
            {" "}
            <h3>Resultados</h3>
            {livrosPesquisa.length > 0 && (
              <div>
                {livrosPesquisa.map(function (element, index) {
                  return (
                    <div
                      key={index}
                      className="ElementoListagem"
                      onClick={() => {
                        setSelecionado(element);
                        console.log(element);
                        SetSelecinou(true);
                      }}
                    >
                      {element.titulo + " , " + element.dataDeLancamento}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="Informacao">
          <p>{info}</p>
        </div>
        <div className={selecinou ? "MostraSeleciondo" : "EscondeSeleciondo"}>
          <h4>Livro Seleciondado</h4>
          <div>
            {selecionado.titulo}, Morada: {selecionado.dataDeLancamento}
          </div>
          <button onClick={verLivro}>Ver dados Livro</button>
          <button onClick={opcaoEditar}>Altera Dados Livro</button>
          <button onClick={opcaoRemover}>Remove Livro</button>
        </div>
        <div className={selectEditar ? "MostraEditar" : "EscondeEditar"}>
          <div className="LivroForm">
            <h4> Editar Livro: {selecionado.titulo}</h4>
            <p>
              Id: (Autenticacao Nao editavel)
              <input type="text" value={selecionado.id}></input>
            </p>
            <p>
              isbn: (Autenticacao Nao editavel)
              <input type="text" value={selecionado.isbn}></input>
            </p>
            <p>
              Titulo
              <input
                type="text"
                value={novoLivro.titulo}
                onChange={(e) => {
                  setNovoLivro({ ...novoLivro, titulo: e.target.value });
                }}
              ></input>
            </p>

            <p>
              <b>Data de Lancamento: (dd-MM-yyyy) </b>
              <input
                type="text"
                value={novoLivro.dataDeLancamento}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    dataDeLancamento: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              Edicao:
              <input
                type="text"
                value={novoLivro.edicao}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    edicao: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              Paginas:
              <input
                type="text"
                value={novoLivro.paginas}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    paginas: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              <b>Sinopse: </b>
              <input
                type="text"
                value={novoLivro.sinopse}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    sinopse: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              <b>Preco: </b>
              <input
                type="text"
                value={novoLivro.preco}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    preco: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              stock:
              <input
                type="text"
                value={novoLivro.stock}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    stock: e.target.value,
                  });
                }}
              ></input>
            </p>
            <p>
              vendidos:
              <input
                type="text"
                value={novoLivro.vendidos}
                onChange={(e) => {
                  setNovoLivro({
                    ...novoLivro,
                    vendidos: e.target.value,
                  });
                }}
              ></input>
            </p>
            <b>imagem: </b>
            <img src={imageteste} style={{ width: "100px" }} alt="image"></img>
          </div>
          <button onClick={updateLivro}>Finalizar</button>
        </div>
      </div>
      <div className={selectRemover ? "MostraSelecao" : "EscondeSelecao"}>
        <div>
          <p>Tem a certeza que pretende Remover?</p>
        </div>
        <button onClick={removeLivro}>Sim</button>
        <button onClick={opcaoRemover}>Nao</button>
      </div>

      <div
        className={
          selectVerdadosLivro
            ? "LivroSelecionadoOpcoesMostra"
            : "LivroSelecionadoOpcoesEsconde"
        }
      >
        <ElementoLivro livro={selecionado}></ElementoLivro>
      </div>
    </>
  );
}
