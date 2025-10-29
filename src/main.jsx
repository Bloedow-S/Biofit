// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import DashboardLayout from './components/layouts/DashboardLayout';

//criar as rotas
import Login from './pages/Login';
//import CriarConta from './pages/CriarConta'; 
import Perfil from './pages/Perfil';      
//import Calculos from './pages/Calculos';    
//import Macros from './pages/Macros';       
//import Historico from './pages/Historico';  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* --- Rotas Públicas (sem Sidebar) --- */}
        {/* (Mais tarde, podemos envolvê-las no AuthLayout) */}
        <Route path="/" element={<Login />} />

        {/* --- Rotas Privadas (COM Sidebar) --- */}
        {/* Usamos o DashboardLayout como "rota-pai" */}
        <Route element={<DashboardLayout />}>
          {/* Todas as rotas aqui dentro serão renderizadas onde está o <Outlet /> */}
          <Route path="/perfil" element={<Perfil />} />

        </Route>

        {/* Rota para página não encontrada */}
        <Route path="*" element={<div>Erro 404: Página não encontrada!</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);