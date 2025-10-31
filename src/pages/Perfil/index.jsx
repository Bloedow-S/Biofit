import { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import Button from "../../components/Button";
import "./style.css";

import iconBmi from "../../assets/fogo.png";
import iconWeight from "../../assets/peso.png";
import iconUser from "../../assets/do-utilizador.png";

// Componente InfoItem (sem alteração)
function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
};

// Função para calcular o IMC (sem alteração)
function calcularIMC(peso, alturaEmCm) {
  if (!peso || !alturaEmCm) return "N/A";
  const alturaEmMetros = alturaEmCm / 100;
  const imc = peso / (alturaEmMetros * alturaEmMetros);
  return imc.toFixed(1);
}

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    // Proteção da Rota:
    // Se não há usuário OU se o perfil não está completo, chuta ele daqui
    if (!usuarioSalvo || !usuarioSalvo.perfilCompleto) {
      alert("Você precisa fazer login e completar seu perfil primeiro.");
      navigate('/'); // Manda de volta para o login
      return;
    }

    // Se chegou aqui, o usuário está OK
    const imcCalculado = calcularIMC(usuarioSalvo.peso, usuarioSalvo.altura);
    setUserData({
      ...usuarioSalvo,
      imc: imcCalculado,
    });

  }, [navigate]); 

  const handleEdit = () => {
    // Leva o usuário de volta à página de "onboarding" para editar os dados
    alert("Você será levado para a tela de edição de perfil.");
    // Define a flag como false temporariamente para permitir a re-edição
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario) {
      usuario.perfilCompleto = false;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    navigate('/criar-conta');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    alert("Você foi desconectado.");
    navigate('/'); 
  };

  // Enquanto os dados não carregam
  if (!userData) {
    return <div>Carregando perfil...</div>;
  }

  // Renderização principal
  return (
    <div className="perfil-container">
      {/* Agora o 'nome' existe e será exibido */}
      <h1 className="perfil-greeting">Olá, {userData.nome.split(" ")[0]}!</h1>

      <div className="stat-cards-container">
        <div className="stat-card">
          <img src={iconBmi} alt="IMC" />
          <div className="stat-info">
            <span className="stat-label">IMC Atual</span>
            <span className="stat-value">{userData.imc}</span>
          </div>
        </div>
        <div className="stat-card">
          <img src={iconWeight} alt="Peso" />
          <div className="stat-info">
            <span className="stat-label">Peso Atual</span>
            <span className="stat-value">{userData.peso} kg</span> 
          </div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <img src={iconUser} alt="Minhas Informações" />
          <h2>Minhas Informações</h2>
        </div>

        <div className="info-list">
          <InfoItem label="Nome" value={userData.nome} />
          <InfoItem label="E-mail" value={userData.email} />
          <InfoItem label="Sexo" value={userData.sexo} />
          <InfoItem label="Idade" value={`${userData.idade} anos`} />
          <InfoItem label="Peso" value={`${userData.peso} kg`} />
          <InfoItem label="Altura" value={`${userData.altura} cm`} />
          <InfoItem label="Objetivo" value={userData.objetivo} />
        </div>

        <Button
          type="button"
          onClick={handleEdit}
          className="perfil-edit-button" 
        >
          Editar Dados
        </Button>
     
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}