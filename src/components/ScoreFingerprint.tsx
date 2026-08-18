import type { Scores } from "../types";

interface ScoreFingerprintProps {
  scores: Scores;
  tamanho?: number;
  cor?: string;
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

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox={`0 0 ${tamanho} ${tamanho}`}
      role="img"
      aria-label={`Perfil de scores: Rigor PO ${scores.rigorPO}, Implementabilidade ${scores.implementabilidade}, Clareza de Métricas ${scores.clarezaMetrica}, Viabilidade Política ${scores.viabilidadePolitica}`}
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
        fillOpacity={0.22}
        stroke={cor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
