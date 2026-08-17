# Candidatos 2026

Ferramenta web que aplica metodologia de **Product Ownership** (North Star Metrics, OKRs, hipóteses testáveis) para comparar propostas de governo dos candidatos à Presidência do Brasil em 2026, de forma sistemática e auditável — em vez da leitura qualitativa usual.

## Status

🚧 MVP em desenvolvimento — setor Economia, 6 candidatos, com research e scoring reais publicados. Ver [`docs/DISCOVERY.md`](docs/DISCOVERY.md) para o mapeamento completo de problema, usuários, framework de avaliação, escopo do MVP, arquitetura, modelo de dados, fontes e decisões em aberto.

## Stack

React 19 + Vite + TypeScript + React Router + Recharts. Dados do MVP em JSON estático versionado no Git (`src/data/`). CI via GitHub Actions (lint + build), deploy contínuo na Vercel.

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run lint      # oxlint
npm run build     # build de produção (tsc + vite build)
```

## Estrutura de dados

- `src/data/candidatos.json` — dados factuais dos 6 candidatos (partido, vice, status de candidatura)
- `src/data/setores.json` — setores avaliados (Economia no MVP) e a definição de North Star de cada um
- `src/data/propostas-economia.json` — o research real por candidato: scores, North Star, OKRs, hipóteses SE/PORQUE/ENTÃO/MEDIÇÃO, lacunas, análise e fontes

## Princípios

- Análise técnica, não política — framework aplicado igualmente a todos os candidatos
- Toda afirmação de score exige fonte pública citada
- Metodologia transparente e auditável