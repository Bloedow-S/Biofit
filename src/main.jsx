import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css'    //estilos globais, aplicado em todo o programa


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)


/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register/>
  </StrictMode>
)
*/