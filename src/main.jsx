// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import CriarConta from "./pages/CriarConta/index.jsx";
import Perfil from "./pages/Perfil/index";
import Calculos from "./pages/Calculos/Calculos";
import Macros from "./pages/Macros/Macros";
import History from "./pages/History/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer autoClose={3000} position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} /> {/*rota publica (sem Sidebar)*/}
        <Route path="/register" element={<Register />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route element={<DashboardLayout />}>
          {" "}
          {/*rota privada (COM Sidebar)*/}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/calculos" element={<Calculos />} />
          <Route path="/macros" element={<Macros />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="*" element={<div>Erro 404: Página não encontrada!</div>} />{" "}
        {/*rota para pagina não encontrada */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
