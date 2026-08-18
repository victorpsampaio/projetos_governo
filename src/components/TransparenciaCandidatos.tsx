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
import type { Candidato, PropostaSetor } from "../types";
import { TEXTO_GRAFICO, BORDA_GRAFICO } from "../lib/paleta";

interface TransparenciaCandidatosProps {
  candidatos: Candidato[];
  propostas: PropostaSetor[];
}

export default function TransparenciaCandidatos({
  candidatos,
  propostas,
}: TransparenciaCandidatosProps) {
  const dados = candidatos
    .map((candidato) => {
      const proposta = propostas.find((p) => p.candidatoId === candidato.id);
      if (!proposta) return null;
      return {
        nome: candidato.nome,
        Lacunas: proposta.lacunas.length,
        Fontes: proposta.fontes.length,
      };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null)
    .sort((a, b) => b.Fontes - a.Fontes);

  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart
        data={dados}
        layout="vertical"
        margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke={BORDA_GRAFICO} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: TEXTO_GRAFICO, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        <YAxis
          type="category"
          dataKey="nome"
          width={140}
          tick={{ fill: TEXTO_GRAFICO, fontSize: 11, fontFamily: "Public Sans, sans-serif" }}
        />
        <Bar dataKey="Fontes" fill="#0891b2" radius={[0, 4, 4, 0]} />
        <Bar dataKey="Lacunas" fill="#dc2626" radius={[0, 4, 4, 0]} />
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
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
