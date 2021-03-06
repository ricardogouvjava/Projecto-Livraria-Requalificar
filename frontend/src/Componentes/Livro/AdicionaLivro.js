import { useState } from "react";
import { LivroForm } from "./LivroForm";

const API_URL = "http://localhost:8080";

export function AdicionaLivro(props) {
  const [info, setInfo] = useState("");

  function addLivro(data) {
    fetch(API_URL + "/addLivro", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro adicionar livro");
        }

        return response.json();
      })
      .then((res) => {
        setInfo("Sucesso em adicionar livro");
        console.log(res);
      })
      .catch((error) => {
        setInfo("Erro adicionar livro");
      });
  }

  return (
    <>
      <LivroForm childToParent={addLivro}></LivroForm>
      {info}
    </>
  );
}
