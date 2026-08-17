import { Link } from "react-router-dom";
import type { Candidato, PropostaSetor } from "../types";
import { mediaScore } from "../lib/dados";
import Selo from "./Selo";

interface CandidatoCardProps {
  candidato: Candidato;
  proposta?: PropostaSetor;
}

export default function CandidatoCard({
  candidato,
  proposta,
}: CandidatoCardProps) {
  return (
    <Link
      to={`/candidato/${candidato.id}`}
      className="candidato-card"
      data-partido={candidato.partido}
    >
      {candidato.statusCandidatura === "sub-judice" && (
        <div className="candidato-card-alerta">
          <Selo texto="Sub judice" variante="alerta" tamanho="sm" />
        </div>
      )}
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
          Análise de Economia ainda não publicada
        </p>
      )}
    </Link>
  );
}
