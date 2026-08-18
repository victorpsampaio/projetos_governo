import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AvisoMetodologico from "../components/AvisoMetodologico";
import CandidatoCard from "../components/CandidatoCard";
import RadarComparativo from "../components/RadarComparativo";
import BarrasPorDimensao from "../components/BarrasPorDimensao";
import MatrizIdeiaExecucao from "../components/MatrizIdeiaExecucao";
import TransparenciaCandidatos from "../components/TransparenciaCandidatos";
import AdSlot from "../components/AdSlot";
import ApoioProjeto from "../components/ApoioProjeto";
import { candidatos, propostas, mediaScore } from "../lib/dados";
import { DIMENSOES_SCORE, type Scores } from "../types";

type CriterioOrdenacao = "nome" | "media" | keyof Scores;

const OPCOES_ORDENACAO: { valor: CriterioOrdenacao; label: string }[] = [
  { valor: "media", label: "Média geral" },
  { valor: "nome", label: "Nome" },
  ...DIMENSOES_SCORE.map((d) => ({ valor: d.key, label: d.label })),
];

export default function ListaCandidatos() {
  const [ordenacao, setOrdenacao] = useState<CriterioOrdenacao>("media");

  const candidatosOrdenados = useMemo(() => {
    return [...candidatos].sort((a, b) => {
      if (ordenacao === "nome") return a.nome.localeCompare(b.nome);

      const propostaA = propostas.find((p) => p.candidatoId === a.id);
      const propostaB = propostas.find((p) => p.candidatoId === b.id);
      const valorA =
        ordenacao === "media"
          ? propostaA
            ? mediaScore(propostaA)
            : -1
          : propostaA
            ? propostaA.scores[ordenacao]
            : -1;
      const valorB =
        ordenacao === "media"
          ? propostaB
            ? mediaScore(propostaB)
            : -1
          : propostaB
            ? propostaB.scores[ordenacao]
            : -1;
      return valorB - valorA;
    });
  }, [ordenacao]);

  const candidatosComProposta = candidatos.filter((c) =>
    propostas.some((p) => p.candidatoId === c.id),
  );

  return (
    <div className="pagina-lista">
      <Link to="/" className="link-voltar">
        ← Início
      </Link>

      <header className="cabecalho">
        <span className="eyebrow">
          Auditoria de programas de governo — Setor Economia
        </span>
        <h1>Candidatos 2026</h1>
        <p className="subtitulo">
          Propostas econômicas dos 7 candidatos à Presidência, avaliadas com
          metodologia de Product Ownership.
        </p>
      </header>

      <AvisoMetodologico />

      {candidatosComProposta.length >= 2 && (
        <>
          <section className="secao-radar">
            <h2>Comparativo por dimensão</h2>
            <p className="secao-contexto">
              O "formato" de cada candidato nas 4 dimensões — quanto mais
              área preenchida, mais forte o desempenho geral.
            </p>
            <RadarComparativo
              candidatos={candidatosComProposta}
              propostas={propostas}
            />
          </section>

          <section className="secao-radar">
            <h2>Nota por dimensão</h2>
            <p className="secao-contexto">
              O mesmo comparativo, mas em barras — melhor para ler o valor
              exato de cada candidato em cada dimensão.
            </p>
            <BarrasPorDimensao
              candidatos={candidatosComProposta}
              propostas={propostas}
            />
          </section>

          <section className="secao-radar">
            <h2>Matriz ideia vs. execução</h2>
            <p className="secao-contexto">
              Eixo horizontal: qualidade da proposta em si (Rigor PO +
              Clareza de Métrica). Eixo vertical: capacidade real de tirar do
              papel (Implementabilidade + Viabilidade Política). Canto
              superior direito = proposta rigorosa e executável; inferior
              esquerdo = nem bem formulada, nem viável.
            </p>
            <MatrizIdeiaExecucao
              candidatos={candidatosComProposta}
              propostas={propostas}
            />
          </section>

          <section className="secao-radar">
            <h2>Transparência da análise</h2>
            <p className="secao-contexto">
              Quantas fontes públicas embasam a análise de cada candidato e
              quantas lacunas foram identificadas nas propostas dele.
            </p>
            <TransparenciaCandidatos
              candidatos={candidatosComProposta}
              propostas={propostas}
            />
          </section>
        </>
      )}

      <AdSlot slot="lista-economia" />

      <section className="secao-lista">
        <div className="controles-ordenacao">
          <label htmlFor="ordenacao">Ordenar por</label>
          <select
            id="ordenacao"
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(e.target.value as CriterioOrdenacao)
            }
          >
            {OPCOES_ORDENACAO.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid-candidatos">
          {candidatosOrdenados.map((candidato) => (
            <CandidatoCard
              key={candidato.id}
              candidato={candidato}
              proposta={propostas.find((p) => p.candidatoId === candidato.id)}
            />
          ))}
        </div>
      </section>

      <ApoioProjeto />
    </div>
  );
}
