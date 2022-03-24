import { useEffect, useState } from "react";
import "./SelecaoAutor.css";

const API_URL = "https://livrariarequalificar.herokuapp.com";
//const API_URL = "https://pessoa-backend.herokuapp.com";

export function SelecaoAutor() {
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
        if (response.status !== 200) {
          throw new Error("Falha encontar Autores");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setAutoresLista(parsedResponse);
        console.log(parsedResponse);
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

    //Da set do selecionado a null caso seja apagado
    if (autorSelecionado.id === id) {
      setAutorSelecionado(null);
    }

    fetch(API_URL + "/removeAutor", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
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
      nome: novoAutor.name,
      email: novoAutor.email,
    };

    fetch(API_URL + "/updateAutor", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedAutor),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro encontrar Autor");
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
      <header className="Autor-Header">
        <h1>Autores</h1>
      </header>
      <section className="list-container">
        {autorLista.map(function (elemento, index) {
          return (
            <div key={index} className="ElementoAutor">
              <p
                className="todo-text"
                onClick={() => setAutorSelecionado(elemento)}
              >
                {"Nome: " + elemento.nome + ", idade: " + elemento.email}
              </p>
              <button
                className="todo-remove"
                onClick={() => removeAutor(elemento.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </section>

      <div>
        <p>Autor Selecionado</p>
        <p>
          nome:{autorSelecionado.nome + " email: " + autorSelecionado.email}
        </p>
        <p>Nome:</p>
        <input
          type="text"
          value={novoAutor.name}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, nome: e.target.value });
          }}
        />
        <p>email:</p>
        <input
          type="text"
          value={novoAutor.email}
          onChange={(e) => {
            setNovoAutor({ ...novoAutor, email: e.target.value });
          }}
        />
        <p>Ação:</p>
        <button onClick={addAutor}>Add Autor</button>
        <button onClick={updateAutor}>Update Autor</button>
      </div>
    </>
  );
}
