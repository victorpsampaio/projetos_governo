import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DIMENSOES_SCORE, type Candidato, type PropostaSetor } from "../types";

interface RadarComparativoProps {
  candidatos: Candidato[];
  propostas: PropostaSetor[];
}

const TEXTO = "#64607a";
const BORDA = "#e4e3ee";

const CORES = [
  "#6d28d9", // brand
  "#16a34a", // verde
  "#d97706", // âmbar
  "#dc2626", // vermelho
  "#0891b2", // teal
  "#db2777", // magenta
  "#2563eb", // azul
];

export default function RadarComparativo({
  candidatos,
  propostas,
}: RadarComparativoProps) {
  const dados = DIMENSOES_SCORE.map((dimensao) => {
    const linha: Record<string, string | number> = {
      dimensao: dimensao.label,
    };
    for (const candidato of candidatos) {
      const proposta = propostas.find((p) => p.candidatoId === candidato.id);
      linha[candidato.nome] = proposta ? proposta.scores[dimensao.key] : 0;
    }
    return linha;
  });

  return (
    <ResponsiveContainer width="100%" height={440}>
      <RadarChart
        data={dados}
        outerRadius="52%"
        margin={{ top: 10, right: 55, bottom: 10, left: 55 }}
      >
        <PolarGrid stroke={BORDA} />
        <PolarAngleAxis
          dataKey="dimensao"
          tick={{ fill: TEXTO, fontSize: 11, fontFamily: "Public Sans, sans-serif" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 10]}
          tick={{ fill: TEXTO, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        {candidatos.map((candidato, i) => (
          <Radar
            key={candidato.id}
            name={candidato.nome}
            dataKey={candidato.nome}
            stroke={CORES[i % CORES.length]}
            fill={CORES[i % CORES.length]}
            fillOpacity={0.12}
            strokeWidth={2}
          />
        ))}
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.76rem",
          }}
        />
        <Tooltip
          contentStyle={{
            background: "#ffffff",
            border: "1px solid #e4e3ee",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(20,18,31,0.1)",
            fontFamily: "Public Sans, sans-serif",
            fontSize: "0.85rem",
          }}
          labelStyle={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: TEXTO,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
