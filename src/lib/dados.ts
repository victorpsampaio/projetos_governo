import candidatosJson from "../data/candidatos.json";
import setoresJson from "../data/setores.json";
import propostasEconomiaJson from "../data/propostas-economia.json";
import propostasSaudeJson from "../data/propostas-saude.json";
import type { Candidato, PropostaSetor, Scores, Setor } from "../types";

export const candidatos = candidatosJson as Candidato[];
export const setores = setoresJson as Setor[];
export const propostas = [
  ...(propostasEconomiaJson as PropostaSetor[]),
  ...(propostasSaudeJson as PropostaSetor[]),
];

export function getCandidato(id: string): Candidato | undefined {
  return candidatos.find((c) => c.id === id);
}

export function getSetor(id: string): Setor | undefined {
  return setores.find((s) => s.id === id);
}

export function getPropostasPorSetor(setorId: string): PropostaSetor[] {
  return propostas.filter((p) => p.setorId === setorId);
}

export function getPropostasPorCandidato(candidatoId: string): PropostaSetor[] {
  return propostas.filter((p) => p.candidatoId === candidatoId);
}

export function getProposta(
  candidatoId: string,
  setorId: string,
): PropostaSetor | undefined {
  return propostas.find(
    (p) => p.candidatoId === candidatoId && p.setorId === setorId,
  );
}

export function mediaScore(p: PropostaSetor): number {
  const { rigorPO, implementabilidade, clarezaMetrica, viabilidadePolitica } =
    p.scores;
  return (
    (rigorPO + implementabilidade + clarezaMetrica + viabilidadePolitica) / 4
  );
}

// Reordena pelos MESMOS 4 scores neutros, só pondera por quanto peso o
// usuário deu a cada dimensão — não é um "match" nem uma recomendação,
// é uma média ponderada configurável sobre dado que já existe.
export function scorePersonalizado(p: PropostaSetor, pesos: Scores): number {
  const { rigorPO, implementabilidade, clarezaMetrica, viabilidadePolitica } =
    p.scores;
  const somaPesos =
    pesos.rigorPO +
    pesos.implementabilidade +
    pesos.clarezaMetrica +
    pesos.viabilidadePolitica;
  if (somaPesos === 0) return 0;
  return (
    (rigorPO * pesos.rigorPO +
      implementabilidade * pesos.implementabilidade +
      clarezaMetrica * pesos.clarezaMetrica +
      viabilidadePolitica * pesos.viabilidadePolitica) /
    somaPesos
  );
}
