import type { Candidato } from "../types";

interface AvatarCandidatoProps {
  candidato: Candidato;
  tamanho?: number;
  mostrarCredito?: boolean;
}

function iniciais(nome: string): string {
  const partes = nome.split(" ").filter(Boolean);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

export default function AvatarCandidato({
  candidato,
  tamanho = 56,
  mostrarCredito = false,
}: AvatarCandidatoProps) {
  return (
    <div>
      <div
        className="avatar-candidato"
        style={{ width: tamanho, height: tamanho }}
      >
        {candidato.foto ? (
          <img
            src={candidato.foto.url}
            alt={candidato.nome}
            width={tamanho}
            height={tamanho}
            loading="lazy"
          />
        ) : (
          <span
            className="avatar-candidato-iniciais"
            style={{ fontSize: tamanho * 0.36 }}
          >
            {iniciais(candidato.nome)}
          </span>
        )}
      </div>
      {mostrarCredito && candidato.foto && (
        <p className="avatar-credito">
          Foto: {candidato.foto.credito} ({candidato.foto.licenca})
        </p>
      )}
    </div>
  );
}
