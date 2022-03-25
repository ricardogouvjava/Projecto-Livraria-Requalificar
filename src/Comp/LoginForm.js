import { useReducer } from "react";
import { Navigate } from "react-router-dom";

export function LoginForm() {
  const [user, setUser] = useState({ login: "", password: "" });

  return (
    <>
      <div>
        <div className="row">
          <div className="column">
            <p>Nome:</p>
            <input
              type="text"
              value={user.login}
              onChange={(e) => {
                setUser({ ...user, login: e.target.value });
              }}
            />
          </div>
          <div className="column">
            <p>Password:</p>
            <input
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
        </div>
        <p>Opcoes:</p>
        <button onClick={verificaLogin(user)}>Login</button>
      </div>
    </>
  );
}

function verificaLogin({ user, children }) {
  /// find cliente by id
  fetch(API_URL + "/comparaClienteId/" + id, {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Erro encontrar Cliente");
      }

      return response.json();
    })
    .then((res) => {
      console.log(res);
      //Filtramos o que não queremos
      autorListaaux = autorListaaux.filter((e, i) => e.id !== id);

      setAutoresLista(autorListaaux);
    })
    .catch((error) => {
      alert(error);
    });
  //if (!user) {
  //  return <Navigate to="/" replace={true}></Navigate>;
  // }

  return children;
}
