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

const CORES = [
  "#c0392b",
  "#2980b9",
  "#27ae60",
  "#8e44ad",
  "#d35400",
  "#16a085",
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
      <RadarChart data={dados} outerRadius="70%">
        <PolarGrid />
        <PolarAngleAxis dataKey="dimensao" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        {candidatos.map((candidato, i) => (
          <Radar
            key={candidato.id}
            name={candidato.nome}
            dataKey={candidato.nome}
            stroke={CORES[i % CORES.length]}
            fill={CORES[i % CORES.length]}
            fillOpacity={0.15}
          />
        ))}
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
