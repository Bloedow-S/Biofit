import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar'; 
import './DashboardLayout.css';   

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      {/* 1. A Sidebar fica fixa à esquerda */}
      <Sidebar />

      {/* 2. O <Outlet> renderiza o conteúdo da rota "filha" (ex: /perfil) */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}