import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Componentes/Navbar";
import { Menu } from "./Componentes/Menu";
import { CriarConta } from "./Componentes/CriarConta";
import { HomePage } from "./Componentes/HomePage";
import { Pesquisa } from "./Componentes/Pesquisa";
import { Login } from "./Componentes/Login";
import { Info } from "./Componentes/Info";
import { AutorService } from "./Autor/Autor";

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
              <VerificaUser user={user}>
                <HomePage user={user}></HomePage>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/CriarConta"
            element={
              <VerificaUser user={user}>
                <CriarConta user={user}></CriarConta>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/Pesquisa"
            element={
              <VerificaUser user={user}>
                <Pesquisa user={user}></Pesquisa>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/Menu"
            element={
              <VerificaUser user={user}>
                <Menu user={user}></Menu>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/info/:id"
            element={
              <VerificaUser user={user}>
                <Info user={user}></Info>
              </VerificaUser>
            }
          />
          <Route
            path="/Autor"
            element={
              <VerificaUser user={user}>
                <AutorService user={user}></AutorService>
              </VerificaUser>
            }
          />
          <Route path="/*" element={<Login doLogin={setUser}></Login>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function VerificaUser({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default App;
