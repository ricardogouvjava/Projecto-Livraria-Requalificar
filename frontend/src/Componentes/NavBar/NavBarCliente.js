import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import "./Navbar.css";

export function NavBarCliente(props) {
  const navigate = useNavigate();
  {
    console.log("Entrou na NavBar Cliente id:" + props.user);
  }
  {
    console.log("Entrou na NavBar Cliente id:" + props.tipo);
  }
  return (
    <>
      <div className="Header">Livraria Requalificar</div>
      <div className="Navbar">
        <button
          onClick={() => {
            navigate("/HomeCliente/" + props.user);
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
            console.log(props.user);
            navigate("/MenuCliente/" + props.user);
          }}
        >
          Menu
        </button>

        <Logout user={props.user}></Logout>
      </div>
    </>
  );
}
