// src/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Lembre-se de criar o arquivo .env com VITE_GEMINI_API_KEY=sua_chave
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const consultarNutricionistaIA = async (perfilUsuario, pergunta) => {
  try {
    // ATUALIZAÇÃO: O modelo 1.5 foi descontinuado. Usando o 2.5 Flash.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    // Montamos um contexto para a IA saber quem é o usuário
    const contexto = `
      Você é um nutricionista esportivo especializado.
      Responda de forma curta, motivadora e direta (máximo 1 parágrafo).
      
      Dados do usuário:
      - Nome: ${perfilUsuario.nome}
      - Objetivo: ${perfilUsuario.objetivo}
      - Peso: ${perfilUsuario.peso}kg
      - Altura: ${perfilUsuario.altura}cm
      - Idade: ${perfilUsuario.idade} anos
      - Sexo: ${perfilUsuario.sexo}
      
      Pergunta do usuário: "${pergunta}"
    `;

    const result = await model.generateContent(contexto);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro Gemini:", error);
    throw new Error("A IA está indisponível no momento.");
  }
};