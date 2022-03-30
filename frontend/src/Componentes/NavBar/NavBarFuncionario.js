import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import "./Navbar.css";

export function NavBarFuncionario(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/HomeFuncionario/" + props.user);
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
            navigate("/MenuFuncionario/" + props.user);
          }}
        >
          Opcoes
        </button>
        <Logout></Logout>
      </div>
    </>
  );
}
