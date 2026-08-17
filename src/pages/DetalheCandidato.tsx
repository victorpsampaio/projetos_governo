import { Link, useParams } from "react-router-dom";
import ScoreBadge from "../components/ScoreBadge";
import Selo from "../components/Selo";
import { getCandidato, getProposta, getSetor } from "../lib/dados";
import { DIMENSOES_SCORE } from "../types";

export default function DetalheCandidato() {
  const { candidatoId } = useParams<{ candidatoId: string }>();
  const candidato = candidatoId ? getCandidato(candidatoId) : undefined;
  const proposta = candidatoId
    ? getProposta(candidatoId, "economia")
    : undefined;
  const setor = getSetor("economia");

  if (!candidato) {
    return (
      <div className="pagina-detalhe">
        <p>Candidato não encontrado.</p>
        <Link to="/">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="pagina-detalhe">
      <Link to="/" className="link-voltar">
        ← Voltar para a lista
      </Link>

      <header className="cabecalho-detalhe">
        <span className="eyebrow">Ficha de auditoria — Economia</span>
        <h1>{candidato.nome}</h1>
        <p className="candidato-card-partido">
          {candidato.partido}
          {candidato.vice ? ` · vice: ${candidato.vice}` : ""}
        </p>
        {candidato.statusCandidatura === "sub-judice" && (
          <Selo texto="Sub judice" variante="alerta" rotacao={-4} />
        )}
        {candidato.observacaoStatus && (
          <div className="aviso-status">{candidato.observacaoStatus}</div>
        )}
      </header>

      {!proposta ? (
        <p>Análise de Economia ainda não publicada para este candidato.</p>
      ) : (
        <>
          <section className="secao-scores">
            <h2>Scores</h2>
            <div className="grid-scores">
              {DIMENSOES_SCORE.map((dimensao) => (
                <ScoreBadge
                  key={dimensao.key}
                  label={dimensao.label}
                  valor={proposta.scores[dimensao.key]}
                />
              ))}
            </div>
          </section>

          <section className="secao-north-star">
            <h2>North Star do setor (Economia)</h2>
            <p className="north-star-definicao">{setor?.northStarDefinicao}</p>
            <h3>North Star do candidato</h3>
            {proposta.northStar ? (
              <p>{proposta.northStar}</p>
            ) : (
              <p className="lacuna">
                Lacuna: o candidato não articula um North Star claro para
                economia.
              </p>
            )}
          </section>

          <section className="secao-okrs">
            <h2>OKRs derivados das propostas</h2>
            <ol>
              {proposta.okrs.map((okr, i) => (
                <li key={i}>{okr}</li>
              ))}
            </ol>
          </section>

          <section className="secao-hipoteses">
            <h2>Hipóteses (SE / PORQUE / ENTÃO / MEDIÇÃO)</h2>
            {proposta.hipoteses.map((h, i) => (
              <div key={i} className="hipotese">
                <p>
                  <strong>SE</strong> {h.se}
                </p>
                <p>
                  <strong>PORQUE</strong> {h.porque}
                </p>
                <p>
                  <strong>ENTÃO</strong> {h.entao}
                </p>
                <p>
                  <strong>MEDIÇÃO</strong> {h.medicao}
                </p>
              </div>
            ))}
          </section>

          <section className="secao-lacunas">
            <h2>Lacunas identificadas</h2>
            <ul>
              {proposta.lacunas.map((lacuna, i) => (
                <li key={i}>{lacuna}</li>
              ))}
            </ul>
          </section>

          <section className="secao-analise">
            <h2>Análise</h2>
            <p>{proposta.analise}</p>
          </section>

          {proposta.opiniaoCurador && (
            <section className="secao-opiniao">
              <h2>Opinião do curador</h2>
              <p className="rotulo-opiniao">
                Comentário pessoal e interpretativo — não faz parte do score.
              </p>
              <p>{proposta.opiniaoCurador}</p>
            </section>
          )}

          <section className="secao-fontes">
            <h2>Fontes</h2>
            <ol>
              {proposta.fontes.map((fonte, i) => (
                <li key={i}>
                  <a href={fonte.url} target="_blank" rel="noreferrer">
                    {fonte.titulo}
                  </a>{" "}
                  <span className="fonte-data">
                    (acesso em {fonte.dataAcesso})
                  </span>
                </li>
              ))}
            </ol>
            <p className="ultima-atualizacao">
              Última atualização: {proposta.ultimaAtualizacao}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
