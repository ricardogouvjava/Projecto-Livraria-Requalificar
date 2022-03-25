import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  return (
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
          navigate("/Contacts");
        }}
      >
        Contactos
      </button>
      <button
        onClick={() => {
          navigate("/Menu");
        }}
      >
        Menu
      </button>
    </div>
  );
}
