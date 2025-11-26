import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { consultarNutricionistaIA } from "../../ai";
import "./style.css";

export default function IA() {
  const [usuario, setUsuario] = useState(null);
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Carregar usuário
  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) setUsuario(JSON.parse(dados));
  }, []);

  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, loading]);

  // Formatar texto com **negrito**
  const formatar = (txt) =>
    txt.split("\n").map((linha, i) => (
      <p
        key={i}
        dangerouslySetInnerHTML={{
          __html: linha.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        }}
      />
    ));

  // Enviar pergunta
  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!pergunta.trim()) return;
    if (!usuario) return toast.error("Faça login novamente.");

    const perguntaAtual = pergunta;
    setPergunta("");

    setMensagens((prev) => [...prev, { tipo: "user", texto: perguntaAtual }]);
    setLoading(true);

    try {
      const resposta = await consultarNutricionistaIA(usuario, perguntaAtual);

      setMensagens((prev) => [...prev, { tipo: "ai", texto: resposta }]);
    } catch {
      toast.error("Erro ao consultar IA.");
    } finally {
      setLoading(false);
    }
  };

  const sugestoes = [
    "Opção de café da manhã pré-treino ☕",
    "Como bater a meta de proteínas barato? 💸",
    "Suplementos para meu objetivo 💊",
  ];

  return (
    <div className="ia-container">
      <header className="ia-header">
        <h1>Nutricionista Virtual 🤖</h1>
        <p>
          Seu assistente pessoal para dúvidas rápidas — não substitui um
          nutricionista real. 🍏
        </p>
      </header>

      <div className="chat-window">
        {mensagens.length === 0 && (
          <div className="empty-state">
            <p>Olá, {usuario?.nome?.split(" ")[0]}! Como posso ajudar hoje?</p>

            <div className="sugestoes-container">
              {sugestoes.map((txt, i) => (
                <button
                  key={i}
                  onClick={() => setPergunta(txt)}
                  className="chip-suggestion"
                >
                  {txt}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map((m, i) => (
          <div key={i} className={`message-bubble ${m.tipo}`}>
            <div className="bubble-content">
              {m.tipo === "ai" ? formatar(m.texto) : <p>{m.texto}</p>}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-bubble ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleEnviar} className="input-area">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !pergunta.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}
