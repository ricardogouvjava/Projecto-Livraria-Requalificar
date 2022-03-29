import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function NavBarCliente() {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/HomeCliente");
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
            navigate("/Carrinho");
          }}
        >
          Carrinho
        </button>
        <button
          onClick={() => {
            navigate("/Cliente/:id");
          }}
        >
          Perfil
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
