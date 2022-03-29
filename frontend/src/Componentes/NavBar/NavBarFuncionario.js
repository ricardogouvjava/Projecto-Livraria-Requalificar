import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function NavBarFuncionario() {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/HomeFuncionario");
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
            navigate("/Autor");
          }}
        >
          Autor
        </button>
        <button
          onClick={() => {
            navigate("/Funcionario");
          }}
        >
          Opcoes
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
