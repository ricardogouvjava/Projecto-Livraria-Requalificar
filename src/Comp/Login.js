import { Navigate, useNavigate } from "react-router-dom";

export function Login(props) {
  const navigate = useNavigate();
  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          navigate("/LoginForm");
        }}
      >
        Clicar para fazer Login{" "}
      </button>
    </>
  );
}
