import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserForm } from "../DadosCliente";

const API_URL = "http://localhost:8080";

export function CriarConta() {
  return <UserForm></UserForm>;
}
