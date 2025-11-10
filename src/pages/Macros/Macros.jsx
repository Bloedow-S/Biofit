import { useState, useEffect } from "react"; 
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import './style.css'

export default function Macros() {
  {/*javascript <Button>Editar</Button>*/}
  const [edit, setEdit] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [usuario, setUsuario] = useState(null)
  
  const [macros, setMacros] = useState({
  proteina: 0,
  carboidrato: 0,
  gordura: 0,
  pctProteina: 0,
  pctCarboidrato: 0,
  pctGordura: 0
  });

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuarioDados"))
    if (dados) {
      setUsuario(dados);
    }
  }, [])

  useEffect(() => {
    const calculosSalvos = JSON.parse(localStorage.getItem("resultados"));
    if (calculosSalvos) {
      setResultados(calculosSalvos);
    }
  }, [])

  useEffect(() => {
    if (resultados && usuario) {
      calcularMacros();
    }
  }, [resultados, usuario]);
  
  const handleCaloriasChange = (e) => {
    const novoValor = e.target.value;
    setResultados({
      ...resultados,
      caloriasObjetivo: novoValor
    });
  }

  const handleObjetivo = (e) => {
    const novoObjetivo = e.target.value;  
    setUsuario({
      ...usuario,
      objetivo: novoObjetivo
    });
  }

  const calcularMacros = () => {
    const calorias = parseFloat(resultados.caloriasObjetivo);
    const objetivo = usuario.objetivo;

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

    setMacros({
      proteina: proteina.toFixed(0),
      carboidrato: carboidrato.toFixed(0),
      gordura: gordura.toFixed(1),
      pctProteina: (pctProteina * 100).toFixed(0),
      pctCarboidrato: (pctCarboidrato * 100).toFixed(0),
      pctGordura: (pctGordura * 100).toFixed(0)
      });
  };

  const handleSalvar = () => {
    localStorage.setItem('resultados', JSON.stringify(resultados));
    localStorage.setItem('usuarioDados', JSON.stringify(usuario))
    
    const planoCustomizado = {
      calorias: resultados.caloriasObjetivo,
      macros: macros,
      tipo: "customizado",
      objetivo: usuario.objetivo,
      peso: usuario.peso,
      altura: usuario.altura,
      idade: usuario.idade,
      sexo: usuario.sexo,
      geradoEm: new Date().toISOString()
    };

    localStorage.setItem('planoAlimentarAtual', JSON.stringify(planoCustomizado));
    
    const historico = JSON.parse(localStorage.getItem('historicoPlanos')) || [];
    historico.push(planoCustomizado);
    localStorage.setItem('historicoPlanos', JSON.stringify(historico));
    
    alert('Plano alimentar salvo com sucesso!');
  }

  const HandleEdit = () => {
    if (edit) {
      handleSalvar();
    }
    setEdit(!edit);
  }

  if (!resultados) return <div>Carregando...</div>;

  return (
    <div className="macros-container">
      <h1>Macronutrientes</h1>
      <div className="macros-grid">
        <div className="metas-card">
          <h3 className="titulo-card">Metas</h3>
          <div className="campo">
            <label>Calorias diárias</label>
            <Input type="number" name="calorias" disabled={!edit} value={resultados.caloriasObjetivo} onChange={handleCaloriasChange}/>
          </div>
          <div className="select">
            <label>Objetivo</label>
            <Select name="objetivo" disabled={!edit} value={usuario.objetivo} onChange={handleObjetivo}>
              <option value="Perder Peso">Perder Peso (Déficit)</option>
              <option value="Manter Peso">Manter Peso (Manutenção)</option>
              <option value="Ganhar Massa">Ganhar Massa (Superávit)</option>
            </Select>
          </div>
          <Button type="submit" onClick = {HandleEdit}>{edit ? 'Salvar' : 'Editar'}</Button>
        </div>
          
        <div className="plano-card">
          <h3 className="titulo-card">Plano Alimentar</h3>
          <div className="plano-resultado">
            <div className="aviso-plano"> 
            </div>
            <div className="total-recomendado">
              <span>Total Recomendado</span>
              <p>2000 <span>kcal</span></p>
            </div>

            <div className="progress-bar">
              {/* Sua barra de progresso aqui */}
            </div>

            <div className="macros-list">
              
            <div className="macro-item proteina">
              <span className="macro-label">Proteína</span>
              <p className="macro-valor">{macros.proteina}g</p>
              <span className="macro-percentual">{macros.pctProteina}%</span>
            </div>

            <div className="macro-item carboidrato">
              <span className="macro-label">Carboidrato</span>
              <p className="macro-valor">{macros.carboidrato}g</p>
              <span className="macro-percentual">{macros.pctCarboidrato}%</span>
            </div>

            <div className="macro-item gordura">
              <span className="macro-label">Gordura</span>
              <p className="macro-valor">{macros.gordura}g</p>
              <span className="macro-percentual">{macros.pctGordura}%</span>
            </div>
          </div>
          </div>
        </div>
      </div>
      <p>Este plano foi gerado com base nos dados do seu perfil. Você pode customizar as calorias e o objetivo acima.</p>
    </div>
  );
}