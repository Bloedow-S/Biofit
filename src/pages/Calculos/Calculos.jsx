import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import './style.css'; 

export default function Calculos() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [saving, setSaving] = useState(false); 

  const [resultados, setResultados] = useState({
    imc: 0,
    tmb: 0,
    caloriasObjetivo: 0,
    creatina: 0,
  });

  // 1. Carregar dados DO SERVIDOR
  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      toast.info("Usuário não identificado. Faça login novamente.");
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (!data.perfilCompleto) {
             toast.warning("Complete seu perfil antes de acessar os cálculos.");
             navigate('/CriarConta');
             return;
          }
          setUserData(data);
        } else {
          console.error("Erro ao buscar usuário");
          toast.error("Erro ao carregar dados do usuário.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
        toast.error("Erro de conexão com o servidor.");
      }
    };

    fetchUserData();
  }, [navigate]);

  // 2. Apenas Realizar Cálculos (SEM SALVAR AUTOMATICAMENTE)
  useEffect(() => {
    if (userData) {
      const { peso, altura, idade, sexo, objetivo } = userData;

      const alturaM = altura / 100;
      const imcCalc = peso / (alturaM * alturaM);

      let tmbCalc = 0;
      if (sexo === 'Masculino' || sexo === 'Outro') {
        tmbCalc = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
      } else {
        tmbCalc = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
      }

      let caloriasObjCalc = tmbCalc;
      if (objetivo === 'Perder Peso') {
        caloriasObjCalc -= 500; 
      } else if (objetivo === 'Ganhar Massa') {
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
      localStorage.setItem('resultados', JSON.stringify(novosResultados));
    }
  }, [userData]); 

  // 3. Função Manual para Salvar
  const handleSalvarHistorico = async () => {
    if (saving || !userData) return; 
    setSaving(true);

    const novoRegistro = {
      userId: userData.id,
      date: new Date().toLocaleDateString('pt-BR'),
      timestamp: new Date().toISOString(),
      peso: userData.peso,
      objetivo: userData.objetivo,
      resultadoCalorias: resultados.caloriasObjetivo,
      resultadoImc: resultados.imc
    };

    try {
      await fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoRegistro)
      });
      toast.success("Cálculo salvo no histórico com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return <div>Carregando dados do servidor...</div>;
  }

  return (
    <div className="calculos-container">
      <h1>Suas Métricas</h1>
      
      <div className="resultados-grid">
        <div className="resultado-card">
          <h2>Gasto Calórico Diário (TMB)</h2>
          <div className="resultado-valor">
            {resultados.tmb}
            <span>kcal</span>
          </div>
          <p className="resultado-descricao">
            Calorias que seu corpo queima em repouso.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Calorias para seu Objetivo</h2>
          <div className="resultado-valor">
            {resultados.caloriasObjetivo}
            <span>kcal</span>
          </div>
          <p className="resultado-descricao">
            Para atingir: <strong>{userData.objetivo}</strong>.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Dose de Creatina</h2>
          <div className="resultado-valor">
            {resultados.creatina}
            <span>g</span>
          </div>
          <p className="resultado-descricao">
            Dose de manutenção (0.03g/kg).
          </p>
        </div>

        <div className="resultado-card">
          <h2>Seu IMC</h2>
          <div className="resultado-valor">
            {resultados.imc}
          </div>
          <p className="resultado-descricao">
            Índice de Massa Corporal.
          </p>
        </div>
      </div>

      {/* BOTÃO PARA SALVAR MANUALMENTE */}
      <div style={{ marginTop: '30px', maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Button onClick={handleSalvarHistorico} disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar no Histórico'}
        </Button>
      </div>
    </div>
  );
}