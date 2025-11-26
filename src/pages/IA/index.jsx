import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { consultarNutricionistaIA } from "../../ai";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./style.css";

export default function IA() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!pergunta.trim()) return toast.warning("Digite uma dúvida!");
    if (!usuario) return toast.error("Perfil não encontrado. Faça login novamente.");

    setLoading(true);
    setResposta(""); // Limpa resposta anterior

    try {
      const resultado = await consultarNutricionistaIA(usuario, pergunta);
      setResposta(resultado);
      toast.success("Resposta gerada!");
    } catch {
      toast.error("Erro ao consultar a IA.");
    } finally {
      setLoading(false);
    }
  };

  const sugestoes = [
    "Me dê uma opção de café da manhã pré-treino",
    "Como bater minha meta de proteínas gastando pouco?",
    "Quais suplementos você recomenda para o meu objetivo?",
  ];

  return (
    <div className="ia-container">
      <h1>Nutricionista Virtual 🤖</h1>
      <p>Tire suas dúvidas ou peça sugestões personalizadas para o seu perfil.</p>

      <div className="ia-content">
        <div className="ia-input-area">
          <Card>
            <form onSubmit={handleEnviar} className="ia-form">
              <textarea
                className="ia-textarea"
                placeholder="Ex: O que posso comer de lanche da tarde?"
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Consultando..." : "Enviar Pergunta"}
              </Button>
            </form>
            
            <div className="sugestoes">
              <p>Sugestões:</p>
              {sugestoes.map((sugestao, index) => (
                <button 
                  key={index} 
                  className="chip-button" 
                  onClick={() => setPergunta(sugestao)}
                >
                  {sugestao}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {resposta && (
          <div className="ia-response-area">
            <div className="ia-bubble">
              <h3>Resposta do BioFit AI:</h3>
              {/* Formata quebras de linha */}
              {resposta.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}