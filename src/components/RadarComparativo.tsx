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

const INK = "#5b584c";
const BORDA = "#d9d4c4";

const CORES = [
  "#4a3172", // carimbo
  "#2f6b3f", // verde-tinta
  "#96601a", // âmbar-tinta
  "#9b2c2c", // vermelho-tinta
  "#2b5b6b", // azul-petróleo-tinta
  "#6b4226", // marrom-tinta
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
    <ResponsiveContainer width="100%" height={420}>
      <RadarChart
        data={dados}
        outerRadius="52%"
        margin={{ top: 10, right: 55, bottom: 10, left: 55 }}
      >
        <PolarGrid stroke={BORDA} />
        <PolarAngleAxis
          dataKey="dimensao"
          tick={{ fill: INK, fontSize: 11, fontFamily: "Public Sans, sans-serif" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 10]}
          tick={{ fill: INK, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        {candidatos.map((candidato, i) => (
          <Radar
            key={candidato.id}
            name={candidato.nome}
            dataKey={candidato.nome}
            stroke={CORES[i % CORES.length]}
            fill={CORES[i % CORES.length]}
            fillOpacity={0.13}
            strokeWidth={2}
          />
        ))}
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.78rem",
          }}
        />
        <Tooltip
          contentStyle={{
            background: "#faf8f1",
            border: "1px solid #201e1a",
            borderRadius: 4,
            fontFamily: "Public Sans, sans-serif",
            fontSize: "0.85rem",
          }}
          labelStyle={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: INK,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
