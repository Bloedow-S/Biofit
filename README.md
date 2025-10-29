# BioFit - Programa de Acompanhamento de Saúde

Este projeto é um aplicativo de acompanhamento de saúde e fitness, desenvolvido como parte da disciplina de Laboratório de Engenharia de Software. Ele permite ao usuário gerenciar seu perfil pessoal e calcular diversas métricas corporais e nutricionais.

O projeto foi criado com **React** e **Vite**.

## Autores

* Arthur Zimmermann
* Gabriel Molinari
* Rafaella Gonçalves
* Sabrina Bloedow

## Funcionalidades Principais

Conforme a documentação do projeto, as principais funcionalidades incluem:

1.  **Gerenciamento de Perfil:**
    * Cadastro de usuário com nome, email, sexo, idade, peso, altura e objetivo.
    * Edição dos dados pessoais.
    * Exibição de um resumo rápido na tela de perfil, incluindo IMC e peso atual.

2.  **Cálculos e Métricas Corporais:**
    * **IMC:** Cálculo do Índice de Massa Corporal.
    * **TMB:** Cálculo da Taxa Metabólica Basal (calorias diárias).
    * **Déficit Calórico:** Cálculo baseado no objetivo do usuário.
    * **Creatina:** Cálculo da dose recomendada com base no peso.

3.  **Cálculo de Macronutrientes:**
    * Calcula a distribuição ideal de proteínas, carboidratos e gorduras com base no gasto calórico diário (TMB) e no objetivo do usuário.

## Estrutura do Projeto

O projeto utiliza uma estrutura padrão de aplicações React, separando componentes reutilizáveis e páginas.

## Tecnologias Utilizadas

* **Vite:** Build tool e servidor de desenvolvimento.
* **React:** Biblioteca principal para a UI.
* **React Router DOM:** Para gerenciamento de rotas (navegação entre páginas).
* **ESLint:** Ferramenta para linting e padronização de código.
* **Prop-types:** Para validação de tipos das props nos componentes React.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### `npm run dev`

Executa o aplicativo em modo de desenvolvimento.
Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no terminal) para visualizá-lo no navegador.

### `npm run build`

Compila o aplicativo para produção na pasta `dist/`.

### `npm run lint`

Executa o ESLint para analisar o código e encontrar problemas de formatação ou erros.

### `npm run preview`

Inicia um servidor local para pré-visualizar a versão de produção (após executar `npm run build`).