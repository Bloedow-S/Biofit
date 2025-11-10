import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

export default function Calculos() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [resultados, setResultados] = useState({
    imc: 0,
    tmb: 0,
    caloriasObjetivo: 0,
    creatina: 0,
  });

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo || !usuarioSalvo.perfilCompleto) {
      alert("Perfil não encontrado ou incompleto. Redirecionando...");
      navigate('/');
      return;
    }
    setUserData(usuarioSalvo);
    localStorage.setItem('usuarioDados', JSON.stringify(usuarioSalvo));
  }, [navigate]);

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
      
      const macros = calcularMacros(caloriasObjCalc, objetivo);
      setResultados(novosResultados);
      localStorage.setItem('resultados', JSON.stringify(novosResultados));
      
      // Salve o plano alimentar original
      const planoOriginal = {
        calorias: caloriasObjCalc.toFixed(0),
        macros: macros,
        tipo: "original",
        objetivo: objetivo,
        peso: peso,
        altura: altura,
        idade: idade,
        sexo: sexo,
        geradoEm: new Date().toISOString()
      };

      // Pega histórico anterior
      const historico = JSON.parse(localStorage.getItem('historicoPlanos')) || [];
      historico.push(planoOriginal);

      localStorage.setItem('planoAlimentarAtual', JSON.stringify(planoOriginal));
      localStorage.setItem('historicoPlanos', JSON.stringify(historico));

    }
    
  }, [userData]); 

  // Função para calcular macronutrientes
  const calcularMacros = (calorias, objetivo) => {
    let pctProteina, pctCarboidrato, pctGordura;

    if (objetivo === 'Ganhar Massa') {
      pctProteina = 0.30;
      pctCarboidrato = 0.45;
      pctGordura = 0.25;
    } else if (objetivo === 'Perder Peso') {
      pctProteina = 0.35;
      pctCarboidrato = 0.40;
      pctGordura = 0.25;
    } else {
      pctProteina = 0.28;
      pctCarboidrato = 0.47;
      pctGordura = 0.25;
    }

    const proteina = (calorias * pctProteina) / 4;
    const carboidrato = (calorias * pctCarboidrato) / 4;
    const gordura = (calorias * pctGordura) / 9;

    return {
      proteina: proteina.toFixed(0),
      carboidrato: carboidrato.toFixed(0),
      gordura: gordura.toFixed(1),
      pctProteina: (pctProteina * 100).toFixed(0),
      pctCarboidrato: (pctCarboidrato * 100).toFixed(0),
      pctGordura: (pctGordura * 100).toFixed(0)
    };
  };

  if (!userData) {
    return <div>Carregando cálculos...</div>;
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
            Sua Taxa Metabólica Basal (TMB) é a quantidade de calorias que seu corpo queima em repouso total.
          </p>
          <p className="resultado-aviso">
            Usamos a fórmula Mifflin-St Jeor, baseada no seu sexo, idade, peso e altura.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Calorias para seu Objetivo</h2>
          <div className="resultado-valor">
            {resultados.caloriasObjetivo}
            <span>kcal</span>
          </div>
          <p className="resultado-descricao">
            Para atingir seu objetivo de <strong>{userData.objetivo}</strong>, esta é a sua meta de ingestão calórica diária.
          </p>
          <p className="resultado-aviso">
            Valor baseado no seu TMB com ajuste de +/- 500 kcal.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Dose de Creatina</h2>
          <div className="resultado-valor">
            {resultados.creatina}
            <span>gramas</span>
          </div>
          <p className="resultado-descricao">
            Esta é uma dose de manutenção de creatina sugerida com base no seu peso corporal (0.03g/kg).
          </p>
          <p className="resultado-aviso">
            Doses padrão de manutenção variam de 3g a 5g diárias.
          </p>
        </div>

        <div className="resultado-card">
          <h2>Seu IMC</h2>
          <div className="resultado-valor">
            {resultados.imc}
          </div>
          <p className="resultado-descricao">
            Seu Índice de Massa Corporal (IMC) é <strong>{resultados.imc}</strong>. 
            Esta é uma métrica de referência para peso e altura.
          </p>
          <p className="resultado-aviso">
            O IMC não diferencia gordura de massa muscular.
          </p>
        </div>

      </div>
    </div>
  );
}