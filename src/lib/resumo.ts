import type { PropostaSetor } from "../types";

export interface ResumoFicha {
  resumoExecutivo: string;
  destaques: string[];
}

const REGEX_FIM_FRASE = /^.*?[.!?](?=\s+[A-ZÀ-Ú"'])/s;
const REGEX_QUEBRA_CLAUSULA = /[,;:)]\s/g;
const TAMANHO_MAX_RESUMO = 420;

// Corta na última pontuação de pausa (vírgula, dois-pontos, parêntese
// fechado) dentro da janela, em vez de num ponto arbitrário no meio de
// uma cláusula — evita terminar o resumo numa conjunção solta ("e…").
function truncarEmClausula(texto: string, tamanho: number): string {
  if (texto.length <= tamanho) return texto;
  const janela = texto.slice(0, tamanho);

  let melhorFim = -1;
  let match: RegExpExecArray | null;
  REGEX_QUEBRA_CLAUSULA.lastIndex = 0;
  while ((match = REGEX_QUEBRA_CLAUSULA.exec(janela))) {
    melhorFim = match.index + 1;
  }

  if (melhorFim > tamanho * 0.5) {
    const corte = janela.slice(0, melhorFim).trim();
    const semPontuacaoSolta = /[,;:]$/.test(corte) ? corte.slice(0, -1) : corte;
    return `${semPontuacaoSolta}…`;
  }

  const ultimoEspaco = janela.lastIndexOf(" ");
  return `${janela.slice(0, ultimoEspaco > 0 ? ultimoEspaco : tamanho).trim()}…`;
}

function extrairPrimeiraFrase(texto: string): string {
  const match = texto.match(REGEX_FIM_FRASE);
  const primeiraFrase = match ? match[0].trim() : texto.trim();
  if (primeiraFrase.length <= TAMANHO_MAX_RESUMO) return primeiraFrase;
  return truncarEmClausula(primeiraFrase, TAMANHO_MAX_RESUMO);
}

export function gerarResumo(proposta: PropostaSetor): ResumoFicha {
  return {
    resumoExecutivo: extrairPrimeiraFrase(proposta.analise),
    destaques: proposta.lacunas.slice(0, 3),
  };
}
