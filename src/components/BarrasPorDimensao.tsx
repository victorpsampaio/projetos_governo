import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DIMENSOES_SCORE, type Candidato, type PropostaSetor } from "../types";
import { CORES_CANDIDATOS, TEXTO_GRAFICO, BORDA_GRAFICO } from "../lib/paleta";

interface BarrasPorDimensaoProps {
  candidatos: Candidato[];
  propostas: PropostaSetor[];
}

export default function BarrasPorDimensao({
  candidatos,
  propostas,
}: BarrasPorDimensaoProps) {
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
      <BarChart data={dados} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
        <CartesianGrid stroke={BORDA_GRAFICO} vertical={false} />
        <XAxis
          dataKey="dimensao"
          tick={{ fill: TEXTO_GRAFICO, fontSize: 11, fontFamily: "Public Sans, sans-serif" }}
        />
        <YAxis
          domain={[0, 10]}
          tick={{ fill: TEXTO_GRAFICO, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        {candidatos.map((candidato, i) => (
          <Bar
            key={candidato.id}
            dataKey={candidato.nome}
            fill={CORES_CANDIDATOS[i % CORES_CANDIDATOS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.76rem",
          }}
        />
        <Tooltip
          cursor={{ fill: "rgba(109, 40, 217, 0.05)" }}
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
            color: TEXTO_GRAFICO,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
