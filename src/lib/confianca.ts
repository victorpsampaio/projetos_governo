import type { PropostaSetor } from "../types";

export type NivelConfianca = "alta" | "media" | "baixa";

export interface Confianca {
  pontuacao: number;
  nivel: NivelConfianca;
  documentoOficial: boolean;
  numFontes: number;
  hipotesesComMedicao: number;
  totalHipoteses: number;
}

function medicaoDefinida(medicao: string): boolean {
  const texto = medicao.trim().toLowerCase();
  return (
    !texto.includes("lacuna") &&
    !texto.includes("não especificad") &&
    !texto.includes("não declarad")
  );
}

export function nivelPorPontuacao(pontuacao: number): NivelConfianca {
  if (pontuacao >= 8) return "alta";
  if (pontuacao >= 4) return "media";
  return "baixa";
}

export function calcularConfianca(proposta: PropostaSetor): Confianca {
  const documentoOficial = Boolean(proposta.documentoOficial);
  const numFontes = proposta.fontes.length;
  const totalHipoteses = proposta.hipoteses.length;
  const hipotesesComMedicao = proposta.hipoteses.filter((h) =>
    medicaoDefinida(h.medicao),
  ).length;

  const pontosDocumento = documentoOficial ? 2 : 0;
  const pontosFontes = Math.min(numFontes, 4);
  const pontosMedicao =
    totalHipoteses > 0 ? (hipotesesComMedicao / totalHipoteses) * 4 : 0;

  const pontuacao = pontosDocumento + pontosFontes + pontosMedicao;

  return {
    pontuacao,
    nivel: nivelPorPontuacao(pontuacao),
    documentoOficial,
    numFontes,
    hipotesesComMedicao,
    totalHipoteses,
  };
}

export const LABEL_NIVEL: Record<NivelConfianca, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};
