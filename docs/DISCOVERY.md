# Discovery — Candidatos 2026

**Status**: Discovery concluído, decisões-chave resolvidas com o PO — pronto para especificação técnica do MVP
**Data**: 17 de agosto de 2026 (atualizado com decisões do PO)
**Contexto temporal crítico**: registro de candidaturas no TSE encerrou em 15/ago/2026. Eleição em outubro/2026 — **o MVP tem uma janela de lançamento de semanas, não meses.**

---

## 1. O que este projeto é

Site que aplica o rigor de **Product Ownership** (North Star Metrics, OKRs, hipóteses testáveis) para comparar, de forma sistemática e auditável, as propostas de governo dos candidatos à Presidência do Brasil em 2026 — em vez da leitura qualitativa/jornalística usual.

Os dois documentos-fonte se encaixam assim:
- `po_politica_brasil.md` → a **metodologia** (o framework de 5 camadas, estrutura de hipótese SE/PORQUE/ENTÃO/MEDIÇÃO, North Star por setor).
- `CONCEITO_PROJETO.md` → o **produto** que expõe essa metodologia aplicada a candidatos reais, com stack técnica e UX definidos.

---

## 2. Validação de realidade (pesquisa feita hoje, 17/ago/2026)

O conceito original listava 5 candidatos como exemplo. Confirmei contra fontes jornalísticas atuais — a lista se sustenta, com ajustes importantes:

| Candidato | Partido | Situação confirmada | Observação |
|---|---|---|---|
| **Lula** | PT | Candidatura à reeleição oficializada em 02/ago/2026, convenção do PT | **Vice: Geraldo Alckmin (PSB)**, não estava no doc original. Coligação com PCdoB, PV, PDT, PSOL, Rede. |
| **Romeu Zema** | Novo | Candidatura homologada pelo Novo | Ainda sem vice definido na época da apuração |
| **Flávio Bolsonaro** | PL | Candidatura oficializada em evento com Javier Milei | **Isolado politicamente — sem vice definido, sem aliança partidária fechada** |
| **Ronaldo Caiado** | PSD | Candidatura oficializada | **Vice: Gilberto Kassab** |
| **Renan Santos** | Missão | Candidatura confirmada (movimento Missão Brasil) | Menor musculatura político-partidária dos 5 |
| **Pablo Marçal** | PRTB | Registrada em 15/ago/2026 | **✅ Decidido: entra no MVP.** Card com **destaque visual de status jurídico** ("candidatura sub judice — inelegível até 2032 por abuso de poder econômico/político na eleição municipal de SP 2024"), mas propostas avaliadas normalmente pelas 4 dimensões, como qualquer outro candidato. |

**Achado relevante fora do doc original**: o TSE recebeu **13 registros de candidatura à Presidência**, não 5. Além de Marçal, há candidaturas de nanicos (PSTU, PCB, PCO, Avante, Democrata, UP, DC), fora do escopo do MVP.

Fontes: [Correio Braziliense](https://www.correiobraziliense.com.br/mundo/2026/07/7468606-flavio-caiado-e-zema-confirmam-candidaturas-veja-quem-esta-na-disputa-das-eleicoes-2026.html), [Correio Braziliense — Lula/Alckmin](https://www.correiobraziliense.com.br/mundo/2026/08/7472991-pt-confirma-candidatura-de-lula-a-reeleicao-quem-disputa-a-presidencia-em-2026.html), [Metrópoles — TSE 13 registros](https://www.metropoles.com/brasil/tse-recebe-13-registros-de-candidaturas-a-presidencia-veja-quem-sao), [Poder360 — Marçal inelegível](https://www.poder360.com.br/poder-eleicoes/inelegivel-pablo-marcal-registra-candidatura-a-presidente-pelo-prtb/).

---

## 3. Problema, usuários, promessa

**Problema**: propostas de governo são vagas ("vamos revolucionar o transporte") e não comparáveis entre si. Eleitor não tem ferramenta para julgar rigor técnico, só narrativa.

**Usuários (personas)**:
1. **Eleitor engajado** — quer decidir o voto além de slogan/marketing.
2. **Jornalista/analista político** — precisa de comparação rápida e citável.
3. **Estudante de administração pública / PM** — usa como material de estudo do framework.
4. **Recrutador/comunidade de produto** (público secundário) — vê o projeto como portfólio de product thinking do Victor.

**Promessa central**: cada candidato recebe 4 scores (Rigor PO, Implementabilidade, Clareza de Métricas, Viabilidade Política) com metodologia pública, fontes citadas, e visualização comparativa lado a lado. **Esses scores são apurados de forma neutra e sourced — não carregam viés partidário de nenhum lado.** Ver seção 4.4 sobre onde a opinião pessoal do curador entra, separadamente.

---

## 4. Framework de avaliação (o núcleo do produto)

### 4.1 As 5 camadas (aplicadas por setor, não por candidato isolado)
North Star Metric → OKRs → Leading Indicators → Initiatives → KPIs de execução.

### 4.2 Estrutura de hipótese que toda proposta deveria ter
```
SE [ação] PORQUE [evidência] ENTÃO [resultado esperado, %, prazo] MEDIÇÃO [fonte, frequência]
```
Isso é o que o site vai **procurar dentro de cada proposta real** e, quando ausente, expor como lacuna.

### 4.3 As 4 dimensões de score (0–10, do CONCEITO_PROJETO.md)
| Dimensão | Pergunta central |
|---|---|
| Rigor PO | Tem North Star? OKRs derivam logicamente? Hipóteses testáveis? |
| Implementabilidade | Tem base parlamentar/poder de execução? Orçamento viável? |
| Clareza de Métricas | Números específicos e prazos, ou "melhorar"/"fortalecer"? |
| Viabilidade Política | Apoio de eleitorado e aliados é suficiente para aprovar? |

**Risco metodológico a resolver antes de codar**: os exemplos de score no CONCEITO_PROJETO.md (Lula 6.5, Zema 8.5 etc.) são **ilustrativos, não pesquisados** — não podem virar dado real do MVP sem research documentado por candidato/setor. Isso é o maior item de trabalho não-técnico do projeto (seção 9).

### 4.4 Processo de scoring: IA assistida + revisão humana, com opinião separada do score

**✅ Decidido com o PO**: o processo de atribuição de score é **IA assistida com revisão humana**, mas os 4 scores objetivos (Rigor PO, Implementabilidade, Clareza de Métrica, Viabilidade Política) seguem estritamente a rubrica pública da seção 4.3 — **sem viés partidário embutido, de nenhum espectro político**. Isso não é uma escolha estética: é o que torna o produto citável e defensável durante a campanha (um score que já nasce inclinado para um lado deixa de ser métrica e vira propaganda disfarçada de análise técnica, o que colide direto com o risco eleitoral da seção 9.3).

A opinião pessoal do curador **tem espaço no produto, mas separado e rotulado**:
- Os 4 scores + a extração de North Star/OKRs/hipóteses/lacunas são gerados por IA a partir das fontes citadas e revisados por humano contra a rubrica — **campo `analise` no modelo de dados**.
- Uma seção adicional, visualmente distinta (ex: fundo diferente, ícone de "opinião"), chamada **"Opinião do curador"**, onde comentário pessoal e interpretativo pode aparecer livremente — **campo `opiniaoCurador`, sempre rotulado como opinião, nunca misturado ao score**.

---

## 5. Escopo do MVP (Fase 1 — 2 semanas, conforme roadmap original)

Dada a janela de outubro/2026, o MVP deve ser o menor recorte que já entrega o diferencial:

- **6 candidatos**: Lula, Zema, Flávio Bolsonaro, Caiado, Renan Santos, **Pablo Marçal** (com disclaimer de inelegibilidade em destaque)
- **1 setor completo primeiro**: **✅ Economia**, decidido com o PO no lugar de Transporte — é o setor com maior diferenciação clara entre os candidatos (ex: rigor fiscal do Zema vs. agenda social do Lula). O `po_politica_brasil.md` não tem o caso de uso de Economia pré-modelado como tem Transporte, então o research de North Star/OKRs/hipóteses para Economia é trabalho adicional do MVP (ver seção 12).
- **4 dimensões de score**
- Tela principal: lista de candidatos ordenável + gráfico radar comparativo
- Tela de detalhe: North Star, OKRs, lacunas, análise textual, fontes citadas
- Sem autenticação, sem comentários, sem PDF (isso é Fase 2/3)

**Fora do MVP, mas o modelo de dados deve prever desde já**: outros setores (Fase 2), export PDF, dark mode, Supabase.

---

## 6. Arquitetura técnica proposta

```
React 18 + Vite  →  GitHub (versionamento)  →  GitHub Actions (lint/test/build)  →  Vercel (deploy)
```
- **Gráficos**: Recharts (radar chart de comparação, barras de progresso por dimensão)
- **Dados no MVP**: JSON estático versionado no Git (não Supabase) — decisão justificada: volume de dados é pequeno (5 candidatos × 1 setor), atualização é manual e rara (curadoria humana, não user-generated), e estático elimina custo/complexidade de backend antes de haver tráfego. Supabase entra só quando existir necessidade real (autenticação, Fase 3).
- **Roteamento**: React Router (lista → detalhe por candidato)
- **Hospedagem**: Vercel free tier, deploy automático por push na branch principal

---

## 7. Modelo de dados (refinado do CONCEITO_PROJETO.md)

```ts
interface Candidato {
  id: string;                 // slug, ex: "romeu-zema"
  nome: string;
  partido: string;
  vice?: string;
  coligacao?: string[];
  statusCandidatura: "oficializada" | "homologada" | "sub-judice";
}

interface PropostaSetor {
  candidatoId: string;
  setorId: string;            // "transporte" | "economia" | ...
  scores: {
    rigorPO: number;          // 0-10
    implementabilidade: number;
    clarezaMetrica: number;
    viabilidadePolitica: number;
  };
  northStar?: string;         // ausência = lacuna, não "N/A" escondido
  okrs: string[];
  hipoteses: { se: string; porque: string; entao: string; medicao: string }[];
  lacunas: string[];
  analise: string;             // gerado por IA + revisado por humano contra a rubrica, sem viés partidário
  opiniaoCurador?: string;     // opinião pessoal do curador — sempre exibida separada e rotulada, nunca junto do score
  fontes: { titulo: string; url: string; dataAcesso: string }[];  // obrigatório por dado
  ultimaAtualizacao: string;  // ISO date
}

interface Setor {
  id: string;
  nome: string;
  northStarDefinicao: string; // a métrica-referência do setor, do framework
}
```

Mudança chave versus o doc original: **`fontes` é obrigatório em `PropostaSetor`**, não opcional — é o que garante o compromisso de neutralidade/responsabilidade do checklist do CONCEITO_PROJETO.md ("fontes citadas", "dados públicos e verificáveis").

---

## 8. Fontes de dados e plano de coleta

| Fonte | Uso | Confiabilidade |
|---|---|---|
| Sites oficiais dos partidos/candidatos | Programa de governo primário | Alta, mas precisa checar links do doc original (não validados nesta sessão) |
| **DivulgaCandContas / sistema de candidaturas do TSE** | Dados formais de registro, coligação, vice | Alta, fonte primária |
| Cobertura jornalística (Poder360, JOTA, G1, Estadão) | Contextualização e verificação cruzada | Média-alta, sempre citar |
| Redes sociais dos candidatos | Posicionamentos recentes não presentes no programa oficial | Baixa — usar só como complemento, nunca como única fonte de um score |

Fluxo de atualização (do CONCEITO_PROJETO.md): checagem semanal + atualização após debates/pronunciamentos relevantes, cada mudança vira commit no Git.

---

## 9. Decisões do PO (resolvidas em 17/ago/2026)

| # | Decisão | Resolução |
|---|---|---|
| 1 | Marçal no MVP? | **✅ Entra**, com destaque de status jurídico (sub judice/inelegível) no card, avaliado normalmente nas 4 dimensões |
| 2 | Quem atribui os scores? | **✅ IA assistida com revisão humana**, seguindo estritamente a rubrica neutra da seção 4.3 — opinião pessoal isolada no campo `opiniaoCurador`, nunca misturada ao score (ver 4.4) |
| 5 | Setor único do MVP | **✅ Economia**, no lugar de Transporte — maior diferenciação entre candidatos |

**Ainda em aberto:**

3. **Risco jurídico-eleitoral**: o site pode ser lido como **"pesquisa eleitoral"** (que exige registro prévio no TSE sob a Lei 9.504/97, art. 33) se comunicar como ranking/enquete de intenção de voto. Mitigação: deixar claríssimo — em toda tela, não só num rodapé — que é **análise de conteúdo programático**, não pesquisa de opinião nem projeção de resultado. Isso fica mais fácil de defender agora que os scores são formalmente neutros (decisão 2), mas ainda recomendo revisão jurídica leve antes do lançamento público, dado o período eleitoral ativo (menos de 2 meses da eleição).
4. **Nome/domínio**: `candidatos-2026.vercel.app` é genérico o bastante para não soar como propriedade oficial de nenhum candidato/partido — bom para neutralidade, mas verificar disponibilidade e se não colide com marca registrada.

---

## 10. Métricas de sucesso do produto (do CONCEITO_PROJETO.md, mantidas)

| Métrica | Target |
|---|---|
| Visitantes únicos/mês | 10.000+ |
| Taxa de engajamento | 60%+ |
| Compartilhamentos sociais | 500+ |
| Tempo médio no site | 5–10 min |
| Tráfego mobile | 70%+ |

---

## 11. Roadmap

```
Fase 1 (MVP, ~2 semanas — URGENTE dado outubro/2026):
  6 candidatos, 1 setor (Economia), 4 dimensões neutras + opinião do curador separada, radar chart, deploy Vercel

Fase 2 (pós-MVP):
  +2 setores (Transporte, Infraestrutura — os 3 do doc original), export PDF, dark mode

Fase 3 (pós-eleição / escalabilidade):
  Autenticação, comentários, Supabase, Claude API para apoio à análise automática
```

---

## 12. Próximos passos imediatos

1. Resolver acesso de push ao GitHub para este repositório (bloqueado — ver nota abaixo).
2. Fazer o research real de Economia para os 6 candidatos (North Star, OKRs, hipóteses e os 4 scores, com fontes), já que — diferente de Transporte — não há caso de uso pré-modelado em `po_politica_brasil.md`.
3. Decidir os 2 itens ainda em aberto da seção 9 (risco jurídico-eleitoral e domínio).
4. Scaffold do repositório: Vite + React + estrutura de pastas + JSON inicial + GitHub Actions + primeiro deploy Vercel.

**Nota de execução**: o push deste discovery pela sessão web do Claude Code foi bloqueado — a integração recebeu `403 Resource not accessible by integration` tanto via `git push` quanto via GitHub MCP (`create_branch`/`push_files`), por falta de permissão de escrita (`contents: write`) no repositório. Este commit chegou ao remoto via push manual do PO a partir de uma máquina local, enquanto a instalação do GitHub App para esta sessão segue pendente.