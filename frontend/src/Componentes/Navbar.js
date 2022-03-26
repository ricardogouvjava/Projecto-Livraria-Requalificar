import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function Navbar(props) {
  const navigate = useNavigate();
  return (
    <>
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
            navigate("/Info/2");
          }}
        >
          Info
        </button>
        <button
          onClick={() => {
            navigate("/Autor");
          }}
        >
          Autor
        </button>
      </div>
    </>
  );
}
