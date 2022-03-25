import { useEffect, useState } from "react";
import "./Autor.css";

//const API_URL = "http://localhost:8080";
const API_URL = "https://livrariarequalificar.herokuapp.com/";

export function AutorService() {
  const [autorLista, setAutoresLista] = useState([]);
  const [novoAutor, setNovoAutor] = useState({ nome: "", email: "" });
  const [autorSelecionado, setAutorSelecionado] = useState({});

  useEffect(() => {
    fetchAutores();
  }, []);

  function fetchAutores() {
    fetch(API_URL + "/getAutores", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 204) {
          console.log(response);
          throw new Error("Base de dados vazia");
        }
        if (response.status !== 200) {
          throw new Error("Falha encontar Autores");
        }
        return response.json();
      })
      .then((parsedResponse) => {
        setAutoresLista(parsedResponse.autores);
        console.log(parsedResponse.autores);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addAutor() {
    if (
      novoAutor.nome.trim().length !== 0 &&
      novoAutor.email.trim().length !== 0
    ) {
      fetch(API_URL + "/addAutor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoAutor),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Falha encontar autor");
          }
          console.log(response);

          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          if (!parsedResponse.status) {
            alert(parsedResponse.message);
            return;
          }

          console.log(parsedResponse.message);
          // Precisamos de refrescar a lista, se tivessemos o id bastava adicionar um novo com o id
          fetchAutores();
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function removeAutor(id) {
    //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
    let autorListaaux = autorLista;
    console.log(id);
    //Da set do selecionado a null caso seja apagado
    if (autorSelecionado.id === id) {
      setAutorSelecionado(null);
    }

    fetch(API_URL + "/removeAutor/" + id, {
      mode: "cors",
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Autor");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        //Filtramos o que não queremos
        autorListaaux = autorListaaux.filter((e, i) => e.id !== id);

        setAutoresLista(autorListaaux);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function updateAutor() {
    let updatedAutor = {
      id: autorSelecionado.id,
      nome: novoAutor.nome,
      email: novoAutor.email,
    };
    console.log("Update:" + JSON.stringify(updatedAutor));

    fetch(API_URL + "/updateAutor", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedAutor),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar Autor");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        fetchAutores();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <header className="CabecalhoListagem">
        <h1>Autores</h1>
      </header>
      <section className="Listagem">
        <div className="ElementoAutor">
          <p>{"ID-/-NOME-/-EMAIL"}</p>
        </div>
        {autorLista.map(function (element, index) {
          return (
            <div key={index} className="ElementoAutor">
              <p onClick={() => setAutorSelecionado(element)}>
                {element.id + " , " + element.nome + " , " + element.email}
              </p>
              <button
                className="ElementRemove"
                onClick={() => removeAutor(element.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </section>

      <div>
        <div className="row">
          <div className="column">Autor Selecionado :</div>
          <div className="column">
            {autorSelecionado.nome + " , " + autorSelecionado.email}
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>Nome:</p>
            <input
              type="text"
              value={novoAutor.name}
              onChange={(e) => {
                setNovoAutor({ ...novoAutor, nome: e.target.value });
              }}
            />
          </div>
          <div className="column">
            <p>Email:</p>
            <input
              type="text"
              value={novoAutor.email}
              onChange={(e) => {
                setNovoAutor({ ...novoAutor, email: e.target.value });
              }}
            />
          </div>
        </div>
        <p>Opcoes:</p>
        <button onClick={addAutor}>Adiciona Autor</button>
        <button onClick={updateAutor}>Update Autor</button>
      </div>
    </>
  );
}
