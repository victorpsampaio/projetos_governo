import { Link } from "react-router-dom";
import type { Candidato, PropostaSetor } from "../types";
import { getSetor, mediaScore } from "../lib/dados";
import AvatarCandidato from "./AvatarCandidato";
import Selo from "./Selo";
import ScoreFingerprint from "./ScoreFingerprint";

interface CandidatoCardProps {
  candidato: Candidato;
  setorId: string;
  proposta?: PropostaSetor;
}

export default function CandidatoCard({
  candidato,
  setorId,
  proposta,
}: CandidatoCardProps) {
  const setor = getSetor(setorId);

  return (
    <Link
      to={`/candidato/${setorId}/${candidato.id}`}
      className="candidato-card"
      data-partido={candidato.partido}
    >
      {candidato.statusCandidatura === "sub-judice" && (
        <div className="candidato-card-alerta">
          <Selo texto="Sub judice" variante="alerta" tamanho="sm" />
        </div>
      )}
      <div className="candidato-card-topo">
        <AvatarCandidato candidato={candidato} tamanho={52} />
        {proposta && (
          <ScoreFingerprint scores={proposta.scores} tamanho={36} />
        )}
      </div>
      <h2>{candidato.nome}</h2>
      <p className="candidato-card-partido">
        {candidato.vice ? `vice: ${candidato.vice}` : "sem vice definido"}
      </p>
      {proposta ? (
        <p className="candidato-card-media">
          Média geral <strong>{mediaScore(proposta).toFixed(1)}</strong>/10
        </p>
      ) : (
        <p className="candidato-card-media candidato-card-sem-dados">
          Análise de {setor?.nome ?? setorId} ainda não publicada
        </p>
      )}
    </Link>
  );
}
