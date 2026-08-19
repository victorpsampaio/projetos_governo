import type { PropostaSetor } from "../types";

export interface ResumoFicha {
  resumoExecutivo: string;
  destaques: string[];
}

const REGEX_FIM_FRASE = /^.*?[.!?](?=\s+[A-ZÀ-Ú"'])/s;
const TAMANHO_MAX_RESUMO = 260;

function truncarNaPalavra(texto: string, tamanho: number): string {
  if (texto.length <= tamanho) return texto;
  const cortado = texto.slice(0, tamanho);
  const ultimoEspaco = cortado.lastIndexOf(" ");
  return `${cortado.slice(0, ultimoEspaco > 0 ? ultimoEspaco : tamanho).trim()}…`;
}

function extrairPrimeiraFrase(texto: string): string {
  const match = texto.match(REGEX_FIM_FRASE);
  const primeiraFrase = match ? match[0].trim() : texto.trim();
  if (primeiraFrase.length <= TAMANHO_MAX_RESUMO) return primeiraFrase;
  return truncarNaPalavra(primeiraFrase, TAMANHO_MAX_RESUMO);
}

export function gerarResumo(proposta: PropostaSetor): ResumoFicha {
  return {
    resumoExecutivo: extrairPrimeiraFrase(proposta.analise),
    destaques: proposta.lacunas.slice(0, 3),
  };
}
