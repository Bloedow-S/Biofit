import { useState } from "react";
import PropTypes from 'prop-types';
import Botao from "../../components/Botao";
import "./style.css";

import iconBmi from "../../assets/fogo.png";
import iconWeight from "../../assets/peso.png";
import iconUser from "../../assets/do-utilizador.png";

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
  value: PropTypes.string.isRequired,
};

export default function Perfil() {
  // Dados mockados, iguais aos da imagem
  const [userData] = useState({
    nome: "Usuário Exemplo",
    email: "jassinto@laranja.com",
    sexo: "Masculino",
    idade: "93 anos",
    peso: "70 kg",
    altura: "175 cm",
    objetivo: "Manter Peso",
    imc: "22.9",
  });

  const handleEdit = () => {
    // TODO: Implementar lógica para abrir o modo de edição
    console.log("Clicou em Editar Dados");
  };

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log("Clicou em Sair da conta");
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-greeting">Olá, {userData.nome.split(" ")[0]}!</h1>

      {/* --- Cards de Stats (IMC e Peso) --- */}
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
            <span className="stat-value">{userData.peso}</span>
          </div>
        </div>
      </div>

      {/* --- Card Principal (Minhas Informações) --- */}
      <div className="info-card">
        <div className="info-header">
          <img src={iconUser} alt="Minhas Informações" />
          <h2>Minhas Informações</h2>
        </div>

        <div className="info-list">
          <InfoItem label="Nome" value={userData.nome} />
          <InfoItem label="E-mail" value={userData.email} />
          <InfoItem label="Sexo" value={userData.sexo} />
          <InfoItem label="Idade" value={userData.idade} />
          <InfoItem label="Peso" value={userData.peso} />
          <InfoItem label="Altura" value={userData.altura} />
          <InfoItem label="Objetivo" value={userData.objetivo} />
        </div>

        {/* Usamos o componente Botao, mas aplicamos um estilo para
            encaixar no rodapé do card */}
<Botao
          type="button"
          onClick={handleEdit}
          className="perfil-edit-button"
        >
          Editar Dados
        </Botao>
     
      </div>

      {/* --- Botão de Logout --- */}
      <button className="logout-button" onClick={handleLogout}>
        {/* Não temos o ícone de saída */}
        Sair da conta
      </button>
    </div>
  );
}