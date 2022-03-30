import { AutorForm } from "./AutorForm";
import { useState, React } from "react";

const API_URL = "http://localhost:8080";

export function AdicionaAutor(props) {
  const [info, setInfo] = useState("");

  function addAutor(data) {
    fetch(API_URL + "/addAutor", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro adicionar autor");
        }

        return response.json();
      })
      .then((res) => {
        setInfo("Sucesso em criar autor");
        console.log(res);
      })
      .catch((error) => {
        setInfo("Falha criar autor");
      });
  }

  return (
    <>
      <AutorForm childToParent={addAutor}></AutorForm>
      <div>{info}</div>
    </>
  );
}
