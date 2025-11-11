import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar'; 
import './DashboardLayout.css';   

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />   {/* 1. A Sidebar fica fixa à esquerda */}
      <main className="dashboard-content">  {/* 2. O <Outlet> renderiza o conteúdo da rota "filha" (ex: /perfil) */}
        <Outlet />
      </main>
    </div>
  );
}