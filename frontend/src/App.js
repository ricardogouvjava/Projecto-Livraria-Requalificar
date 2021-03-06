import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Componentes/NavBar/Navbar";
import { CriarConta } from "./Componentes/CriarConta/CriarConta";
import { Login } from "./Componentes/Login/Login";
import { MenuCliente } from "./Componentes/Menu/MenuCliente";
import { MenuFuncionario } from "./Componentes/Menu/MenuFuncionario";
import { Footer } from "./Footer/Footer";
import { HomePageFuncionario } from "./Componentes/Home/HomePageFuncionario";
import { HomePageCliente } from "./Componentes/Home/HomePageCliente";
import { Loja } from "./Componentes/Loja/Loja";
import { PesquisaFuncionario } from "./Componentes/Pesquisa/PesquisaFuncionario";

function App() {
  const [user, setUser] = useState();
  const [tipo, setTipo] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        {user && tipo && <Navbar user={user} tipo={tipo}></Navbar>}
        <Routes>
          <Route
            path="/HomeFuncionario/:id"
            element={
              <VerificaUser user={user}>
                <HomePageFuncionario user={user}></HomePageFuncionario>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/HomeCliente/:id"
            element={
              <VerificaUser user={user}>
                <HomePageCliente user={user}></HomePageCliente>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/Loja"
            element={
              <VerificaUser user={user}>
                <Loja tipo={tipo} user={user}></Loja>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/MenuCliente/:id"
            element={
              <VerificaUser user={user}>
                <MenuCliente user={user} tipo={tipo}></MenuCliente>
              </VerificaUser>
            }
          />
          <Route
            path="/MenuFuncionario/:id"
            element={
              <VerificaUser user={user}>
                <MenuFuncionario user={user}></MenuFuncionario>
              </VerificaUser>
            }
          />
          <Route
            path="/PesquisaFuncionario"
            element={
              <VerificaUser user={user}>
                <PesquisaFuncionario user={user}></PesquisaFuncionario>
              </VerificaUser>
            }
          />
          <Route path="/Logout" element={<Navigate to="/" replace={true} />} />
          <Route
            path="/*"
            element={<Login setUser={setUser} setTipo={setTipo}></Login>}
          />
          <Route
            path="/CriarContaFuncionario"
            element={<CriarConta tipo={"Funcionario"}></CriarConta>}
          />
          <Route
            path="/CriarContaCliente"
            element={<CriarConta tipo={"Cliente"}></CriarConta>}
          />
        </Routes>
        <Footer></Footer>
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
