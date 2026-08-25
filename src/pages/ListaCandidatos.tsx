import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AvisoMetodologico from "../components/AvisoMetodologico";
import CandidatoCard from "../components/CandidatoCard";
import RadarComparativo from "../components/RadarComparativo";
import BarrasPorDimensao from "../components/BarrasPorDimensao";
import MatrizIdeiaExecucao from "../components/MatrizIdeiaExecucao";
import TransparenciaCandidatos from "../components/TransparenciaCandidatos";
import ApoioProjeto from "../components/ApoioProjeto";
import {
  candidatos,
  getPropostasPorSetor,
  getSetor,
  mediaScore,
  scorePersonalizado,
  setores,
} from "../lib/dados";
import { useSeo } from "../lib/seo";
import { DIMENSOES_SCORE, type Scores } from "../types";

interface ListaCandidatosProps {
  setorId: string;
}

type CriterioOrdenacao = "nome" | "media" | "personalizado" | keyof Scores;

const OPCOES_ORDENACAO: { valor: CriterioOrdenacao; label: string }[] = [
  { valor: "media", label: "Média geral" },
  { valor: "nome", label: "Nome" },
  ...DIMENSOES_SCORE.map((d) => ({ valor: d.key, label: d.label })),
  { valor: "personalizado", label: "Personalizado (defina os pesos)" },
];

const PESO_PADRAO: Scores = {
  rigorPO: 2,
  implementabilidade: 2,
  clarezaMetrica: 2,
  viabilidadePolitica: 2,
};

const LABEL_PESO: Record<number, string> = {
  1: "Baixo",
  2: "Médio",
  3: "Alto",
};

export default function ListaCandidatos({ setorId }: ListaCandidatosProps) {
  const [ordenacao, setOrdenacao] = useState<CriterioOrdenacao>("media");
  const [pesos, setPesos] = useState<Scores>(PESO_PADRAO);

  const setor = getSetor(setorId);
  const propostasDoSetor = useMemo(
    () => getPropostasPorSetor(setorId),
    [setorId],
  );

  useSeo({
    title: `Candidatos 2026 — ${setor?.nome ?? setorId}`,
    description: `Propostas de ${setor?.nome.toLowerCase() ?? setorId} dos 7 candidatos à Presidência do Brasil em 2026, avaliadas com metodologia de Product Ownership: North Star, OKRs, hipóteses testáveis e 4 scores neutros.`,
    path: `/${setorId}`,
  });

  const candidatosOrdenados = useMemo(() => {
    const valorDeOrdenacao = (
      proposta: (typeof propostasDoSetor)[number] | undefined,
    ) => {
      if (!proposta) return -1;
      if (ordenacao === "nome") return 0;
      if (ordenacao === "media") return mediaScore(proposta);
      if (ordenacao === "personalizado")
        return scorePersonalizado(proposta, pesos);
      return proposta.scores[ordenacao];
    };

    return [...candidatos].sort((a, b) => {
      if (ordenacao === "nome") return a.nome.localeCompare(b.nome);

      const propostaA = propostasDoSetor.find((p) => p.candidatoId === a.id);
      const propostaB = propostasDoSetor.find((p) => p.candidatoId === b.id);
      return valorDeOrdenacao(propostaB) - valorDeOrdenacao(propostaA);
    });
  }, [ordenacao, propostasDoSetor, pesos]);

  const candidatosComProposta = candidatos.filter((c) =>
    propostasDoSetor.some((p) => p.candidatoId === c.id),
  );

  return (
    <div className="pagina-lista">
      <div className="nav-topo">
        <Link to="/" className="link-voltar">
          ← Início
        </Link>
        <nav className="nav-setores">
          {setores.map((s) => (
            <Link
              key={s.id}
              to={`/${s.id}`}
              className={s.id === setorId ? "nav-setor-ativo" : ""}
            >
              {s.nome}
            </Link>
          ))}
          <Link to="/busca">Buscar</Link>
          <Link to="/temas">Temas</Link>
          <Link to="/quiz">Quiz</Link>
        </nav>
      </div>

      <header className="cabecalho">
        <span className="eyebrow">
          Auditoria de programas de governo — Setor {setor?.nome ?? setorId}
        </span>
        <h1>Candidatos 2026</h1>
        <p className="subtitulo">
          Propostas de {setor?.nome.toLowerCase() ?? setorId} dos 7
          candidatos à Presidência, avaliadas com metodologia de Product
          Ownership.
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
              propostas={propostasDoSetor}
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
              propostas={propostasDoSetor}
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
              propostas={propostasDoSetor}
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
              propostas={propostasDoSetor}
            />
          </section>
        </>
      )}

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

        {ordenacao === "personalizado" && (
          <div className="pesos-personalizados">
            <p className="pesos-personalizados-aviso">
              Dê peso a cada dimensão e veja a lista reordenar com os
              <strong> mesmos scores neutros</strong> de sempre — isto não é
              uma recomendação de voto, é uma forma de explorar o dado pela
              sua prioridade.
            </p>
            <div className="pesos-personalizados-grid">
              {DIMENSOES_SCORE.map((dimensao) => (
                <label key={dimensao.key} className="peso-item">
                  <span className="peso-item-label">{dimensao.label}</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={pesos[dimensao.key]}
                    onChange={(e) =>
                      setPesos((atual) => ({
                        ...atual,
                        [dimensao.key]: Number(e.target.value),
                      }))
                    }
                    aria-valuetext={LABEL_PESO[pesos[dimensao.key]]}
                  />
                  <span className="peso-item-valor">
                    {LABEL_PESO[pesos[dimensao.key]]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="grid-candidatos">
          {candidatosOrdenados.map((candidato) => (
            <CandidatoCard
              key={candidato.id}
              candidato={candidato}
              setorId={setorId}
              proposta={propostasDoSetor.find(
                (p) => p.candidatoId === candidato.id,
              )}
            />
          ))}
        </div>
      </section>

      <ApoioProjeto />
    </div>
  );
}
