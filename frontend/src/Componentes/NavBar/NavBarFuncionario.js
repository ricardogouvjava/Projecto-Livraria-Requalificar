import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import "./Navbar.css";

export function NavBarFuncionario() {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/HomeFuncionario/:id");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/Pesquisa");
          }}
        >
          Pesquisa
        </button>
        <button
          onClick={() => {
            navigate("/MenuFuncionario");
          }}
        >
          Opcoes
        </button>
        <Logout></Logout>
      </div>
    </>
  );
}
