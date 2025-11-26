import { useState, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import "./style.css";

export default function Macros() {
  const [edit, setEdit] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const [macros, setMacros] = useState({
    proteina: 0,
    carboidrato: 0,
    gordura: 0,
    pctProteina: 0,
    pctCarboidrato: 0,
    pctGordura: 0,
  });

  // Carregar dados ao iniciar
  useEffect(() => {
    // Tenta carregar do localStorage ou define valores padrão para evitar erros se estiver vazio
    const dados = JSON.parse(localStorage.getItem("usuario")); // Alterado de "usuarioDados" para "usuario" para consistência com outras telas
    const calculos = JSON.parse(localStorage.getItem("resultados"));

    if (dados) setUsuario(dados);
    if (calculos) setResultados(calculos);
  }, []);

  // Função de cálculo
  const calcularMacros = useCallback(() => {
    if (!resultados || !usuario) return;

    const calorias = parseFloat(resultados.caloriasObjetivo);
    const objetivo = usuario.objetivo;

    let pctProteina, pctCarboidrato, pctGordura;

    if (objetivo === "Ganhar Massa") {
      pctProteina = 0.3;
      pctCarboidrato = 0.45;
      pctGordura = 0.25;
    } else if (objetivo === "Perder Peso") {
      pctProteina = 0.35;
      pctCarboidrato = 0.4;
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
      pctGordura: (pctGordura * 100).toFixed(0),
    });
  }, [resultados, usuario]);

  // Chama o cálculo sempre que os dados mudam
  useEffect(() => {
    if (resultados && usuario) {
      calcularMacros();
    }
  }, [resultados, usuario, calcularMacros]);

  const handleCaloriasChange = (e) => {
    setResultados({ ...resultados, caloriasObjetivo: e.target.value });
  };

  const handleObjetivo = (e) => {
    setUsuario({ ...usuario, objetivo: e.target.value });
  };

  // Salvar no Banco de Dados
  const handleSalvar = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return toast.error("Erro: Usuário não logado.");

    try {
      // 1. Atualiza objetivo do usuário
      await fetch(`https://6927085926e7e41498fca64b.mockapi.io/BioFit/:endpoint/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objetivo: usuario.objetivo }),
      });

      // 2. Salva histórico
      const novoRegistro = {
        userId: parseInt(userId),
        date: new Date().toLocaleDateString("pt-BR"),
        timestamp: new Date().toISOString(),
        peso: usuario.peso,
        objetivo: usuario.objetivo,
        resultadoCalorias: resultados.caloriasObjetivo,
        resultadoImc: resultados.imc || "N/A",
        tipo: "customizado",
      };

      await fetch("https://6927085926e7e41498fca64b.mockapi.io/BioFit/:endpoint/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoRegistro),
      });

      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("resultados", JSON.stringify(resultados));

      toast.success("Plano atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar. Verifique se o servidor está rodando.");
    }
  };

  const HandleEdit = () => {
    if (edit) {
      handleSalvar();
    }
    setEdit(!edit);
  };

  if (!resultados || !usuario) return <div>Carregando dados... (Visite a aba Cálculos primeiro)</div>;

  return (
    <div className="macros-container">
      <h1>Macronutrientes</h1>
      <div className="macros-grid">
        <div className="metas-card">
          <h3 className="titulo-card">Metas</h3>
          <div className="campo">
            <label>Calorias diárias</label>
            <Input
              type="number"
              name="calorias"
              disabled={!edit}
              value={resultados.caloriasObjetivo}
              onChange={handleCaloriasChange}
            />
          </div>
          <div className="select">
            <label>Objetivo</label>
            <Select
              name="objetivo"
              disabled={!edit}
              value={usuario.objetivo}
              onChange={handleObjetivo}
            >
              <option value="Perder Peso">Perder Peso (Déficit)</option>
              <option value="Manter Peso">Manter Peso (Manutenção)</option>
              <option value="Ganhar Massa">Ganhar Massa (Superávit)</option>
            </Select>
          </div>
          <Button type="submit" onClick={HandleEdit}>
            {edit ? "Salvar" : "Customizar"}
          </Button>
        </div>

        <div className="plano-card">
          <h3 className="titulo-card">Plano Alimentar</h3>
          <div className="plano-resultado">
            <div className="total-recomendado">
              <span>Total Recomendado</span>
              <p>
                {resultados.caloriasObjetivo}
                <span>kcal</span>
              </p>
            </div>

            <div className="macros-list">
              <div className="macro-item proteina">
                <span className="macro-label">Proteína</span>
                <div className="macro-info">
                  <p className="macro-valor">{macros.proteina}g</p>
                  <span className="macro-percentual">{macros.pctProteina}%</span>
                </div>
              </div>
              <div className="macro-item carboidrato">
                <span className="macro-label">Carboidrato</span>
                <div className="macro-info">
                  <p className="macro-valor">{macros.carboidrato}g</p>
                  <span className="macro-percentual">{macros.pctCarboidrato}%</span>
                </div>
              </div>
              <div className="macro-item gordura">
                <span className="macro-label">Gordura</span>
                <div className="macro-info">
                  <p className="macro-valor">{macros.gordura}g</p>
                  <span className="macro-percentual">{macros.pctGordura}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Este plano foi gerado com base nos dados do seu perfil. Você pode
        customizar as calorias e o objetivo acima.
      </p>
    </div>
  );
}