# 🚀 Front

Este projeto utiliza o **Next.js (App Router)** integrado ao **Chakra UI v3** e **next-themes**, configurado para oferecer uma interface moderna, responsiva e com suporte nativo a Dark Mode (Tema Escuro/Claro).

## 🛠️ Tecnologias Utilizadas

* **Next.js** (Framework React com App Router)
* **Chakra UI v3** (Sistema de Design e Componentes)
* **Next Themes** (Gerenciamento de Tema Dinâmico)
* **TypeScript** (Tipagem Estática e Segurança de Código)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina (recomenda-se versão 18 ou superior).

## 🔧 Instalação e Execução

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências básicas:**
    ```bash
    npm install
    ```

4.  **Instale as bibliotecas do Chakra UI e Gerenciamento de Tema:**
    ```bash
    npm i @chakra-ui/react @emotion/react next-themes
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

## 🌑 Funcionalidades de Tema

A aplicação utiliza um **Provider Global** que combina o `ChakraProvider` com o `ThemeProvider` do `next-themes`. Isso garante:
* Detecção automática do tema do sistema operacional.
* Troca de temas sem "flicker" (piscar de cores) durante o carregamento.
* Persistência da escolha do usuário no navegador.

## 📁 Estrutura do Projeto

* `src/app/`: Contém as rotas, layouts e páginas.
* `src/components/`: Componentes de UI reutilizáveis.
* `src/theme/`: Definições de cores, fontes e customizações do Chakra.
