import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
      <LivroForm childToParent={addLivro}></LivroForm>
    </>
  );
}
