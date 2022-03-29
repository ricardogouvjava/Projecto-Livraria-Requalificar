import { useState, React, useEffect } from "react";
const API_URL = "http://localhost:8080";

export function GetAutores() {
  const [data, setData] = useState();
  useEffect(() => {
    getAutores();
  }, []);

  function getAutores() {
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
        setData(parsedResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div>{data}</div>
    </>
  );
}
