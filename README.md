# BioFit - Programa de Acompanhamento de Saúde

[cite_start]Este projeto é um aplicativo de acompanhamento de saúde e fitness, desenvolvido como parte da disciplina de Laboratório de Engenharia de Software[cite: 2]. [cite_start]Ele permite ao usuário gerenciar seu perfil pessoal e calcular diversas métricas corporais e nutricionais[cite: 7].

O projeto foi criado com **React** e **Vite**.

## Autores

* [cite_start]Arthur Zimmermann [cite: 4]
* [cite_start]Gabriel Molinari [cite: 4]
* [cite_start]Rafaella Gonçalves [cite: 4]
* [cite_start]Sabrina Bloedow [cite: 4]

## Funcionalidades Principais

Conforme a documentação do projeto, as principais funcionalidades incluem:

1.  [cite_start]**Gerenciamento de Perfil[cite: 8]:**
    * [cite_start]Cadastro de usuário com nome, email, sexo, idade, peso, altura e objetivo[cite: 8].
    * [cite_start]Edição dos dados pessoais[cite: 9].
    * [cite_start]Exibição de um resumo rápido na tela de perfil, incluindo IMC e peso atual[cite: 9, 14].

2.  [cite_start]**Cálculos e Métricas Corporais[cite: 10]:**
    * [cite_start]**IMC:** Cálculo do Índice de Massa Corporal[cite: 43].
    * [cite_start]**TMB:** Cálculo da Taxa Metabólica Basal (calorias diárias)[cite: 49].
    * [cite_start]**Déficit Calórico:** Cálculo baseado no objetivo do usuário[cite: 52].
    * [cite_start]**Creatina:** Cálculo da dose recomendada com base no peso[cite: 53].

3.  [cite_start]**Cálculo de Macronutrientes[cite: 11]:**
    * [cite_start]Calcula a distribuição ideal de proteínas, carboidratos e gorduras com base no gasto calórico diário (TMB) e no objetivo do usuário[cite: 11].

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