import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LivroForm } from "./LivroForm";

const API_URL = "http://localhost:8080";

export function AdicionaLivro(props) {
  const { params } = useParams();
  const [id, setId] = useState("1");
  const [info, setInfo] = useState("");
  const [livroInfo, setLivroInfo] = useState({
    autores: [
      {
        id: 0,
      },
    ],
    titulo: "string",
    isbn: "string",
    preco: 0,
    stock: 0,
    paginas: 0,
    edicao: 0,
    sinopse: "string",
    imagem: "string",
    vendidos: 0,
    dataDeLancamento: "string",
  });

  function addLivro() {
    fetch(API_URL + "/addLivro/", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(livroInfo),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar livro");
        }

        return response.json();
      })
      .then((res) => {
        setInfo("Sucesso em actualizar os dados da conta");
        console.log(res);
      })
      .catch((error) => {
        setInfo("Falha em actualizar os dados da conta");
      });
  }

  return (
    <>
      <LivroForm setLivroInfo={setLivroInfo}></LivroForm>
    </>
  );
}
