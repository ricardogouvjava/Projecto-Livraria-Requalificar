import "./App.css";
import { HomePage } from "./Comp/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contacts } from "./Comp/Contacts";
import { Menu } from "./Comp/Menu";
import { Navbar } from "./Comp/Navbar";
import { useState } from "react";
import { Login } from "./Comp/Login";
import { LoginForm } from "./Comp/LoginForm";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar></Navbar>}
        <Routes>
          <Route
            path="/Home"
            element={
              <verificaLogin user={user}>
                <HomePage></HomePage>
              </verificaLogin>
            }
          ></Route>
          <Route
            path="/Contacts"
            element={
              <verificaLogin user={user}>
                <Contacts></Contacts>
              </verificaLogin>
            }
          ></Route>
          <Route
            path="/Menu"
            element={
              <verificaLogin user={user}>
                <Menu></Menu>
              </verificaLogin>
            }
          ></Route>
          <Route path="/*" element={<Login setUser={setUser}></Login>}></Route>
          <Route path="/LoginForm" element={<LoginForm></LoginForm>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function verificaLogin({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
}

export default App;
