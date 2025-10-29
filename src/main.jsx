// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import DashboardLayout from './components/layouts/DashboardLayout';

// 1. CORRIJA OS CAMINHOS DOS IMPORTS
import Login from './pages/Login/index'; // Aponta para Login.jsx dentro da pasta Login
import Register from './pages/Register/index';
import CriarConta from './pages/CriarConta/CriarConta'; 
import Perfil from './pages/Perfil/index';      
import Calculos from './pages/Calculos/Calculos';    
import Macros from './pages/Macros/Macros';       

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* --- Rotas Públicas (sem Sidebar) --- */}
        {/* (Mais tarde, podemos envolvê-las no AuthLayout) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        {/* 2. ADICIONE A ROTA PARA CRIAR CONTA AQUI FORA */}
        <Route path="/criar-conta" element={<CriarConta />} />

        {/* --- Rotas Privadas (COM Sidebar) --- */}
        <Route element={<DashboardLayout />}>
          {/* Todas as rotas aqui dentro serão renderizadas onde está o <Outlet /> */}
          <Route path="/perfil" element={<Perfil />} />
          {/* 3. ADICIONE AS OUTRAS ROTAS PRIVADAS AQUI DENTRO */}
          <Route path="/calculos" element={<Calculos />} />
          <Route path="/macros" element={<Macros />} />
        </Route>

        {/* Rota para página não encontrada */}
        <Route path="*" element={<div>Erro 404: Página não encontrada!</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
