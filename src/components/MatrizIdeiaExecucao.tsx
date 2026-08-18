import {
  Scatter,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  ReferenceLine,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import type { Candidato, PropostaSetor } from "../types";
import { CORES_CANDIDATOS, TEXTO_GRAFICO, BORDA_GRAFICO } from "../lib/paleta";

interface MatrizIdeiaExecucaoProps {
  candidatos: Candidato[];
  propostas: PropostaSetor[];
}

// Nomes curtos só para caber no rótulo do gráfico de dispersão.
const NOME_CURTO: Record<string, string> = {
  lula: "Lula",
  zema: "Zema",
  "flavio-bolsonaro": "Flávio Bolsonaro",
  caiado: "Caiado",
  "renan-santos": "Renan Santos",
  marcal: "Marçal",
  "samara-martins": "Samara Martins",
};

export default function MatrizIdeiaExecucao({
  candidatos,
  propostas,
}: MatrizIdeiaExecucaoProps) {
  const pontos = candidatos
    .map((candidato, i) => {
      const proposta = propostas.find((p) => p.candidatoId === candidato.id);
      if (!proposta) return null;
      const qualidade =
        (proposta.scores.rigorPO + proposta.scores.clarezaMetrica) / 2;
      const execucao =
        (proposta.scores.implementabilidade +
          proposta.scores.viabilidadePolitica) /
        2;
      return {
        nome: NOME_CURTO[candidato.id] ?? candidato.nome,
        qualidade: Number(qualidade.toFixed(1)),
        execucao: Number(execucao.toFixed(1)),
        cor: CORES_CANDIDATOS[i % CORES_CANDIDATOS.length],
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <ResponsiveContainer width="100%" height={440}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
        <CartesianGrid stroke={BORDA_GRAFICO} />
        <XAxis
          type="number"
          dataKey="qualidade"
          name="Qualidade da proposta"
          domain={[0, 10]}
          label={{
            value: "Qualidade da proposta (Rigor PO + Clareza) →",
            position: "insideBottom",
            offset: -10,
            fontSize: 11,
            fill: TEXTO_GRAFICO,
          }}
          tick={{ fill: TEXTO_GRAFICO, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        <YAxis
          type="number"
          dataKey="execucao"
          name="Capacidade de execução"
          domain={[0, 10]}
          label={{
            value: "Capacidade de execução →",
            angle: -90,
            position: "insideLeft",
            fontSize: 11,
            fill: TEXTO_GRAFICO,
          }}
          tick={{ fill: TEXTO_GRAFICO, fontSize: 10, fontFamily: "IBM Plex Mono, monospace" }}
        />
        <ZAxis range={[140, 140]} />
        <ReferenceLine x={5} stroke={BORDA_GRAFICO} strokeDasharray="4 4" />
        <ReferenceLine y={5} stroke={BORDA_GRAFICO} strokeDasharray="4 4" />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            background: "#ffffff",
            border: "1px solid #e4e3ee",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(20,18,31,0.1)",
            fontFamily: "Public Sans, sans-serif",
            fontSize: "0.85rem",
          }}
          labelFormatter={() => ""}
        />
        {pontos.map((ponto) => (
          <Scatter key={ponto.nome} data={[ponto]} fill={ponto.cor}>
            <LabelList
              dataKey="nome"
              position="top"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "0.7rem",
                fill: TEXTO_GRAFICO,
              }}
            />
          </Scatter>
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
