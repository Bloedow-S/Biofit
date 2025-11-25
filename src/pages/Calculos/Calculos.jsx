import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Calculos() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  // Estado para controlar se está salvando
  const [saving, setSaving] = useState(false);

  const [resultados, setResultados] = useState({
    imc: 0,
    tmb: 0,
    caloriasObjetivo: 0,
    creatina: 0,
  });

  // 1. Carregar dados DO SERVIDOR usando o ID salvo no login
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Usuário não identificado. Faça login novamente.");
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (!data.perfilCompleto) {
            alert("Complete seu perfil antes de acessar os cálculos.");
            navigate("/CriarConta");
            return;
          }
          setUserData(data);
        } else {
          console.error("Erro ao buscar usuário");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // 2. Realizar Cálculos e SALVAR NO DB.JSON quando userData for carregado
  useEffect(() => {
    if (userData) {
      const { peso, altura, idade, sexo, objetivo, id } = userData;

      const alturaM = altura / 100;
      const imcCalc = peso / (alturaM * alturaM);

      let tmbCalc = 0;
      if (sexo === "Masculino" || sexo === "Outro") {
        tmbCalc = 10 * peso + 6.25 * altura - 5 * idade + 5;
      } else {
        tmbCalc = 10 * peso + 6.25 * altura - 5 * idade - 161;
      }

      let caloriasObjCalc = tmbCalc;
      if (objetivo === "Perder Peso") {
        caloriasObjCalc -= 500;
      } else if (objetivo === "Ganhar Massa") {
        caloriasObjCalc += 500;
      }

      const creatinaCalc = Math.min(peso * 0.03, 10);

      const novosResultados = {
        imc: imcCalc.toFixed(1),
        tmb: tmbCalc.toFixed(0),
        caloriasObjetivo: caloriasObjCalc.toFixed(0),
        creatina: creatinaCalc.toFixed(1),
      };

      setResultados(novosResultados);
      // Salva no localStorage apenas para persistência de sessão rápida
      localStorage.setItem("resultados", JSON.stringify(novosResultados));

      // --- LÓGICA DE SALVAMENTO NO BACKEND ---
      const salvarNoHistorico = async () => {
        // Evita salvar duplicado se já estiver salvando
        if (saving) return;
        setSaving(true);

        const novoRegistro = {
          userId: id, // Vínculo com o usuário (Chave Estrangeira)
          date: new Date().toLocaleDateString("pt-BR"),
          timestamp: new Date().toISOString(),
          peso: peso,
          objetivo: objetivo,
          resultadoCalorias: novosResultados.caloriasObjetivo,
          resultadoImc: novosResultados.imc,
        };

        try {
          await fetch("http://localhost:3000/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoRegistro),
          });
          console.log("Cálculo salvo no histórico do servidor!");
        } catch (error) {
          console.error("Erro ao salvar histórico:", error);
        } finally {
          setSaving(false);
        }
      };

      // Chamamos a função de salvar
      salvarNoHistorico();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (!userData) {
    return <div>Carregando dados do servidor...</div>;
  }

  return (
    <div className="calculos-container">
      <h1>Suas Métricas</h1>
      {/* O restante do JSX permanece igual ao seu arquivo original */}
      <div className="resultados-grid">
        <div className="resultado-card">
          <h2>Gasto Calórico Diário (TMB)</h2>
          <div className="resultado-valor">
            {resultados.tmb}
            <span>kcal</span>
          </div>
          <p className="resultado-descricao">
            Sua Taxa Metabólica Basal (TMB) é a quantidade de calorias que seu
            corpo queima em repouso total.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Calorias para seu Objetivo</h2>
          <div className="resultado-valor">
            {resultados.caloriasObjetivo}
            <span>kcal</span>
          </div>
          <p className="resultado-descricao">
            Para atingir seu objetivo de <strong>{userData.objetivo}</strong>.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Dose de Creatina</h2>
          <div className="resultado-valor">
            {resultados.creatina}
            <span>g</span>
          </div>
          <p className="resultado-descricao">
            Dose de manutenção baseada no peso (0.03g/kg).
          </p>
        </div>

        <div className="resultado-card">
          <h2>Seu IMC</h2>
          <div className="resultado-valor">{resultados.imc}</div>
          <p className="resultado-descricao">Índice de Massa Corporal.</p>
        </div>
      </div>
    </div>
  );
}
