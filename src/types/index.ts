// Modelo de dados definido em docs/DISCOVERY.md, seção 7.

export type StatusCandidatura = "oficializada" | "homologada" | "sub-judice";

export interface Foto {
  url: string;
  credito: string; // ex: "Ricardo Stuckert/PR"
  licenca: string; // ex: "CC BY 3.0 BR"
  paginaOrigem: string; // URL da página de descrição no Wikimedia Commons
}

export interface Candidato {
  id: string; // slug, ex: "romeu-zema"
  nome: string;
  partido: string;
  vice?: string;
  coligacao?: string[];
  statusCandidatura: StatusCandidatura;
  observacaoStatus?: string; // ex: texto do disclaimer de inelegibilidade
  foto?: Foto; // ausência = fallback de iniciais no avatar
}

export interface Scores {
  rigorPO: number; // 0-10
  implementabilidade: number;
  clarezaMetrica: number;
  viabilidadePolitica: number;
}

export interface Hipotese {
  se: string;
  porque: string;
  entao: string;
  medicao: string;
}

export interface Fonte {
  titulo: string;
  url: string;
  dataAcesso: string; // ISO date
}

export interface PropostaSetor {
  candidatoId: string;
  setorId: string; // "economia" | ...
  scores: Scores;
  northStar?: string; // ausência = lacuna, não "N/A" escondido
  okrs: string[];
  hipoteses: Hipotese[];
  lacunas: string[];
  analise: string; // gerado por IA + revisado por humano contra a rubrica, sem viés partidário
  opiniaoCurador?: string; // opinião pessoal do curador — sempre exibida separada e rotulada
  documentoOficial?: { titulo: string; url: string }; // link/PDF do plano de governo, quando localizado
  fontes: Fonte[]; // obrigatório por dado
  ultimaAtualizacao: string; // ISO date
}

export interface Setor {
  id: string;
  nome: string;
  northStarDefinicao: string; // a métrica-referência do setor, do framework
}

export const DIMENSOES_SCORE: {
  key: keyof Scores;
  label: string;
  pergunta: string;
}[] = [
  {
    key: "rigorPO",
    label: "Rigor PO",
    pergunta:
      "Tem North Star? OKRs derivam logicamente? Hipóteses são testáveis?",
  },
  {
    key: "implementabilidade",
    label: "Implementabilidade",
    pergunta: "Tem base parlamentar/poder de execução? Orçamento viável?",
  },
  {
    key: "clarezaMetrica",
    label: "Clareza de Métricas",
    pergunta: 'Números específicos e prazos, ou "melhorar"/"fortalecer"?',
  },
  {
    key: "viabilidadePolitica",
    label: "Viabilidade Política",
    pergunta:
      "Apoio de eleitorado e aliados é suficiente para aprovar?",
  },
];
