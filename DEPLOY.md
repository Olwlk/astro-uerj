# Guia de Deploy - Astro UERJ

Este guia explica passo a passo como colocar sua aplicação Astro UERJ no ar usando GitHub e Vercel.

## Pré-requisitos

1.  Ter uma conta no [GitHub](https://github.com/).
2.  Ter uma conta na [Vercel](https://vercel.com/) (pode criar usando a conta do GitHub).
3.  Ter o **Git** instalado no seu computador.

## Passo 1: Criar o Repositório no GitHub

1.  Acesse [github.com/new](https://github.com/new).
2.  **Repository name**: Digite `astro-uerj`.
3.  **Public/Private**: Escolha **Public** (Público).
4.  Não precisa marcar "Add a README file" (já temos um).
5.  Clique em **Create repository**.

## Passo 2: Subir o Código para o GitHub

Abra o terminal na pasta do seu projeto (`c:\Users\Carrefour\Desktop\projeto\astro-uerj`) e rode os seguintes comandos, um por um:

```bash
# 1. Inicializar o git (se ainda não fez)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "Primeiro commit: Astro UERJ completo"

# 4. Renomear a branch principal para main
git branch -M main

# 5. Conectar com o repositório que você criou (SUBSTITUA SEU-USUARIO PELO SEU USER DO GITHUB)
git remote add origin https://github.com/SEU-USUARIO/astro-uerj.git

# 6. Enviar os arquivos
git push -u origin main
```

> **Nota:** Se o comando `git remote add` der erro dizendo que já existe, rode `git remote set-url origin https://github.com/SEU-USUARIO/astro-uerj.git`.

## Passo 3: Deploy na Vercel

1.  Acesse o dashboard da [Vercel](https://vercel.com/dashboard).
2.  Clique no botão **"Add New..."** e selecione **"Project"**.
3.  Na tela "Import Git Repository", você deve ver o seu projeto `astro-uerj` na lista (se conectou sua conta GitHub). Clique em **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: A Vercel deve detectar automaticamente como **Vite**. Se não, selecione **Vite**.
    *   **Root Directory**: Deixe como `./`.
    *   **Build Command**: Deve estar `npm run build` (ou `vite build`).
    *   **Output Directory**: Deve estar `dist`.
5.  Clique em **Deploy**.

## Passo 4: Finalização

A Vercel vai começar a construir o projeto. Isso leva cerca de 1 minuto.
Quando terminar, você verá uma tela com fogos de artifício e o botão **"Visit"**.

*   **Seu Link Público:** Será algo como `https://astro-uerj.vercel.app`.
*   Esse é o link que você deve entregar ao professor!

## Atualizações Futuras

Sempre que você fizer alterações no código e quiser atualizar o site:

1.  Faça as alterações no código.
2.  Rode:
    ```bash
    git add .
    git commit -m "Descrição da mudança"
    git push
    ```
3.  A Vercel detectará o novo commit e fará o deploy automático da nova versão!
