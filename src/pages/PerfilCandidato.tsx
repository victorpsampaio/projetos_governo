import { Link, useParams } from "react-router-dom";
import AvatarCandidato from "../components/AvatarCandidato";
import Selo from "../components/Selo";
import {
  getCandidato,
  getPropostasPorCandidato,
  getSetor,
  mediaScore,
} from "../lib/dados";
import { useSeo } from "../lib/seo";

export default function PerfilCandidato() {
  const { candidatoId } = useParams<{ candidatoId: string }>();
  const candidato = candidatoId ? getCandidato(candidatoId) : undefined;
  const propostasDoCandidato = candidatoId
    ? getPropostasPorCandidato(candidatoId)
    : [];

  useSeo({
    title: candidato ? `${candidato.nome} — Perfil completo` : "Candidato não encontrado",
    description: candidato
      ? `Todos os setores já analisados de ${candidato.nome} (${candidato.partido}), com metodologia de Product Ownership.`
      : "Candidato não encontrado.",
    path: `/candidato/${candidatoId}`,
    image: candidato?.foto?.url,
  });

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
        ← Início
      </Link>

      <header className="cabecalho-detalhe">
        <AvatarCandidato candidato={candidato} tamanho={128} mostrarCredito />
        <div className="cabecalho-detalhe-info">
          <span className="eyebrow">Perfil completo</span>
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
      </header>

      <section className="secao-perfil-setores">
        <h2>Setores analisados</h2>
        {propostasDoCandidato.length === 0 ? (
          <p>Nenhum setor analisado ainda para este candidato.</p>
        ) : (
          <div className="grid-perfil-setores">
            {propostasDoCandidato.map((proposta) => {
              const setor = getSetor(proposta.setorId);
              return (
                <Link
                  key={proposta.setorId}
                  to={`/candidato/${proposta.setorId}/${candidato.id}`}
                  className="card-perfil-setor"
                >
                  <h3>{setor?.nome ?? proposta.setorId}</h3>
                  <p>
                    Média geral <strong>{mediaScore(proposta).toFixed(1)}</strong>/10
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
