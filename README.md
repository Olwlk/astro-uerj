
# Astro UERJ

Aplicação web para cálculos astrológicos (Tropical e Sideral) desenvolvida para a disciplina de Instalações em Ambiente de Computação.

## Funcionalidades

- **Cálculo de Mapa Astral**: Suporte para sistemas Tropical (Ocidental) e Sideral (Védico - Lahiri).
- **Visualização**:
  - Roda Zodiacal (Estilo Ocidental).
  - Mapa Diamante (Estilo Norte-Indiano).
- **Análise**:
  - Posições planetárias (Signo, Casa, Grau).
  - Nakshatras e Padas.
  - Karakas Jaimini (Atmakaraka, Darakaraka).
  - Mapa Navamsa (D-9).
- **Exportação**: Gerar PDF do mapa e relatório.

## Tecnologias

- React + Vite
- TailwindCSS
- Astronomia (Lib de cálculos)
- html2pdf.js

## Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/astro-uerj.git
   ```
2. Instale as dependências:
   ```bash
   cd astro-uerj
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`.

## Deploy

Recomendado usar **Vercel** ou **Netlify**.
Basta conectar o repositório GitHub e usar as configurações padrão do Vite (`npm run build`).

## Licença

MIT
