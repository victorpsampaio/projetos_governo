import type { Scores } from "../types";
import { LABEL_NIVEL, nivelPorPontuacao } from "../lib/confianca";

interface ScoreFingerprintProps {
  scores: Scores;
  tamanho?: number;
  cor?: string;
  confianca?: number; // 0-10; quando ausente, opacidade fixa (comportamento atual)
}

function opacidadePorConfianca(confianca: number): number {
  const OPACIDADE_MIN = 0.12;
  const OPACIDADE_MAX = 0.32;
  const fracao = Math.min(Math.max(confianca / 10, 0), 1);
  return OPACIDADE_MIN + fracao * (OPACIDADE_MAX - OPACIDADE_MIN);
}

const ORDEM: (keyof Scores)[] = [
  "rigorPO",
  "implementabilidade",
  "clarezaMetrica",
  "viabilidadePolitica",
];

// 4 eixos em N / L / S / O — mesma orientação do radar grande da lista.
const ANGULOS = [-90, 0, 90, 180];

function ponto(cx: number, cy: number, raio: number, anguloDeg: number) {
  const rad = (anguloDeg * Math.PI) / 180;
  return [cx + raio * Math.cos(rad), cy + raio * Math.sin(rad)];
}

export default function ScoreFingerprint({
  scores,
  tamanho = 40,
  cor = "#6d28d9",
  confianca,
}: ScoreFingerprintProps) {
  const cx = tamanho / 2;
  const cy = tamanho / 2;
  const raioMax = tamanho / 2 - 3;

  const pontosGrade = ANGULOS.map((a) => ponto(cx, cy, raioMax, a));
  const pontosDado = ORDEM.map((chave, i) => {
    const valor = scores[chave] / 10;
    return ponto(cx, cy, raioMax * Math.max(valor, 0.04), ANGULOS[i]);
  });

  const paraPath = (pts: number[][]) =>
    pts.map((p) => p.join(",")).join(" ");

  const fillOpacity =
    confianca !== undefined ? opacidadePorConfianca(confianca) : 0.22;

  const labelConfianca =
    confianca !== undefined
      ? `. Confiança da análise: ${LABEL_NIVEL[nivelPorPontuacao(confianca)]}`
      : "";

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox={`0 0 ${tamanho} ${tamanho}`}
      role="img"
      aria-label={`Perfil de scores: Rigor PO ${scores.rigorPO}, Implementabilidade ${scores.implementabilidade}, Clareza de Métricas ${scores.clarezaMetrica}, Viabilidade Política ${scores.viabilidadePolitica}${labelConfianca}`}
    >
      <polygon
        points={paraPath(pontosGrade)}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.15}
        strokeWidth={1}
      />
      <polygon
        points={paraPath(pontosDado)}
        fill={cor}
        fillOpacity={fillOpacity}
        stroke={cor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
