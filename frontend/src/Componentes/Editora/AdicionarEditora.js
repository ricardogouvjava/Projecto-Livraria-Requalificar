import { EditoraForm } from "./EditoraForm";
import { useState, React } from "react";

const API_URL = "http://localhost:8080";

export function AdicionaEditora(props) {
  const [info, setInfo] = useState("");

  function addEditora(data) {
    fetch(API_URL + "/addEditora", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro actualizar editora");
        }

        return response.json();
      })
      .then((res) => {
        setInfo("Sucesso em criar editora");
        console.log(res);
      })
      .catch((error) => {
        setInfo("Falha criar editora");
      });
  }

  return (
    <>
      <EditoraForm childToParent={addEditora}></EditoraForm>
      <div>{info}</div>
    </>
  );
}
