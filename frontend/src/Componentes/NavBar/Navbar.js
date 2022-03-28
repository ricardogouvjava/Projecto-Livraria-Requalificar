import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function Navbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/home");
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
            navigate("/Cliente/:id");
          }}
        >
          Cliente
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
          Funcionario
        </button>
      </div>
    </>
  );
}
