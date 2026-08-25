import quizJson from "../data/quiz.json";
import type { PerguntaQuiz } from "../types";

export const perguntasQuiz = quizJson as PerguntaQuiz[];

export type RespostaQuiz = "sim" | "nao" | "depende";

export interface ResultadoAfinidade {
  candidatoId: string;
  pontuacao: number; // 0-100
  totalRespondido: number; // perguntas em que esse candidato tinha posição real
}

export function calcularAfinidade(
  respostas: Record<string, RespostaQuiz>,
): ResultadoAfinidade[] {
  const acumulado = new Map<string, { pontos: number; total: number }>();

  for (const pergunta of perguntasQuiz) {
    const resposta = respostas[pergunta.id];
    if (!resposta) continue;

    for (const pos of pergunta.posicoes) {
      if (pos.posicao === "nao_localizada") continue;

      const acc = acumulado.get(pos.candidatoId) ?? { pontos: 0, total: 0 };
      acc.total += 1;
      if (pos.posicao === resposta) {
        acc.pontos += 1;
      } else if (pos.posicao === "depende" || resposta === "depende") {
        acc.pontos += 0.5;
      }
      acumulado.set(pos.candidatoId, acc);
    }
  }

  return Array.from(acumulado.entries())
    .map(([candidatoId, { pontos, total }]) => ({
      candidatoId,
      pontuacao: total === 0 ? 0 : Math.round((pontos / total) * 100),
      totalRespondido: total,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao);
}
