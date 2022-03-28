import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Componentes/NavBar/Navbar";
import { CriarConta } from "./Componentes/CriarConta/CriarConta";
import { HomePage } from "./Componentes/Home/Home";
import { PesquisaService } from "./Componentes/Pesquisa/Pesquisa";
import { Login } from "./Componentes/Login/Login";
import { ClienteService } from "./Componentes/Cliente/Cliente";
import { AutorService } from "./Componentes/Autor/Autor";
import { FuncionarioService } from "./Componentes/Funcionario/Funcionario";
import { Footer } from "./Footer/Footer";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar user={user}></Navbar>}
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
            path="/Pesquisa"
            element={
              <VerificaUser user={user}>
                <PesquisaService user={user}></PesquisaService>
              </VerificaUser>
            }
          ></Route>
          <Route
            path="/Cliente/:id"
            element={
              <VerificaUser user={user}>
                <ClienteService user={user}></ClienteService>
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
          <Route
            path="/Funcionario"
            element={
              <VerificaUser user={user}>
                <FuncionarioService user={user}></FuncionarioService>
              </VerificaUser>
            }
          />
          <Route path="/*" element={<Login doLogin={setUser}></Login>} />
          <Route path="/CriarConta" element={<CriarConta></CriarConta>}></Route>
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
