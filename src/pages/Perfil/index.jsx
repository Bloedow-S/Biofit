import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import "./style.css";

import iconBmi from "../../assets/fogo.png";
import iconWeight from "../../assets/peso.png";
import iconUser from "../../assets/do-utilizador.png";

// Componente InfoItem (inalterado)
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

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
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Faça login novamente.");
      navigate("/");
      return;
    }

    // BUSCA DADOS DO SERVIDOR (Garante que está atualizado)
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (!data.perfilCompleto) {
            navigate("/CriarConta");
            return;
          }

          const imcCalculado = calcularIMC(data.peso, data.altura);
          // Atualiza estado e também o localStorage para outras páginas usarem se precisarem rápido
          const dadosCompletos = { ...data, imc: imcCalculado };
          setUserData(dadosCompletos);
          localStorage.setItem("usuario", JSON.stringify(dadosCompletos));
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEdit = () => {
    // Vai para a tela de CriarConta, mas precisamos garantir que ela saiba que é uma EDIÇÃO
    // Uma forma simples é setar o perfilCompleto como false no objeto do localStorage temporariamente
    // ou apenas navegar e deixar a CriarConta (já configurada no passo anterior) carregar os dados.
    navigate("/CriarConta");
  };

  const handleLogout = () => {
    localStorage.clear(); // Limpa tudo (token, dados, historico local)
    navigate("/");
  };

  if (!userData) return <div>Carregando perfil...</div>;

  return (
    <div className="perfil-container">
      <h1 className="perfil-greeting">
        Olá, {userData.nome ? userData.nome.split(" ")[0] : "Usuário"}!
      </h1>

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
      </div>
      <Button type="button" onClick={handleEdit} className="perfil-edit-button">
        Editar Dados
      </Button>
      <button className="logout-button" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}
