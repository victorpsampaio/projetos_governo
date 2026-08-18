import { Link, useParams } from "react-router-dom";
import AvatarCandidato from "../components/AvatarCandidato";
import ScoreBadge from "../components/ScoreBadge";
import ScoreFingerprint from "../components/ScoreFingerprint";
import Selo from "../components/Selo";
import ApoioProjeto from "../components/ApoioProjeto";
import { getCandidato, getProposta, getSetor } from "../lib/dados";
import { useSeo } from "../lib/seo";
import { DIMENSOES_SCORE } from "../types";

export default function DetalheCandidato() {
  const { candidatoId, setorId } = useParams<{
    candidatoId: string;
    setorId: string;
  }>();
  const candidato = candidatoId ? getCandidato(candidatoId) : undefined;
  const proposta =
    candidatoId && setorId ? getProposta(candidatoId, setorId) : undefined;
  const setor = setorId ? getSetor(setorId) : undefined;
  const linkLista = setorId ? `/${setorId}` : "/economia";

  useSeo({
    title: candidato
      ? `${candidato.nome} — ${setor?.nome ?? setorId}`
      : "Candidato não encontrado",
    description: candidato
      ? `Análise das propostas de ${setor?.nome.toLowerCase() ?? setorId} de ${candidato.nome} (${candidato.partido}): North Star, OKRs, hipóteses testáveis e 4 scores neutros de Product Ownership.`
      : "Candidato não encontrado.",
    path: `/candidato/${setorId}/${candidatoId}`,
    image: candidato?.foto?.url,
  });

  if (!candidato) {
    return (
      <div className="pagina-detalhe">
        <p>Candidato não encontrado.</p>
        <Link to={linkLista}>Voltar</Link>
      </div>
    );
  }

  return (
    <div className="pagina-detalhe">
      <Link to={linkLista} className="link-voltar">
        ← Voltar para a lista
      </Link>

      <header className="cabecalho-detalhe">
        <AvatarCandidato candidato={candidato} tamanho={128} mostrarCredito />
        <div className="cabecalho-detalhe-info">
          <span className="eyebrow">
            Ficha de auditoria — {setor?.nome ?? setorId}
          </span>
          <h1>{candidato.nome}</h1>
          <p className="candidato-card-partido">
            {candidato.partido}
            {candidato.vice ? ` · vice: ${candidato.vice}` : ""}
          </p>
          {candidato.statusCandidatura === "sub-judice" && (
            <Selo texto="Sub judice" variante="alerta" />
          )}
          {candidato.observacaoStatus && (
            <div className="aviso-status">{candidato.observacaoStatus}</div>
          )}
        </div>
        {proposta && (
          <div className="cabecalho-detalhe-fingerprint">
            <ScoreFingerprint scores={proposta.scores} tamanho={72} />
          </div>
        )}
      </header>

      {!proposta ? (
        <p>
          Análise de {setor?.nome ?? setorId} ainda não publicada para este
          candidato.
        </p>
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

          {proposta.documentoOficial && (
            <section className="secao-documento">
              <a
                href={proposta.documentoOficial.url}
                target="_blank"
                rel="noreferrer"
                className="documento-oficial"
              >
                <svg
                  className="documento-oficial-icone"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 2v5h5M8 12h8M8 16h8M8 8h3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span>
                  <strong>Documento oficial</strong>
                  <br />
                  {proposta.documentoOficial.titulo}
                </span>
              </a>
            </section>
          )}

          <section className="secao-north-star">
            <h2>North Star do setor ({setor?.nome ?? setorId})</h2>
            <p className="north-star-definicao">{setor?.northStarDefinicao}</p>
            <h3>North Star do candidato</h3>
            {proposta.northStar ? (
              <p>{proposta.northStar}</p>
            ) : (
              <p className="lacuna">
                Lacuna: o candidato não articula um North Star claro para{" "}
                {setor?.nome.toLowerCase() ?? setorId}.
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

          <ApoioProjeto />
        </>
      )}
    </div>
  );
}
