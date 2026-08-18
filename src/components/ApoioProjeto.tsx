import { useState } from "react";
import { CHAVE_PIX, LINK_APOIO, NOME_BENEFICIARIO } from "../lib/apoio";

export default function ApoioProjeto() {
  const [copiado, setCopiado] = useState(false);

  if (!CHAVE_PIX && !LINK_APOIO) return null;

  async function copiarChave() {
    if (!CHAVE_PIX) return;
    await navigator.clipboard.writeText(CHAVE_PIX);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <section className="apoio-projeto">
      <h2>Apoie o {NOME_BENEFICIARIO}</h2>
      <p>
        Esse site é meu, e mantê-lo no ar — pesquisa, dados, atualizações —
        tem custo de tempo. Se ele te ajudou de alguma forma, um apoio
        voluntário é bem-vindo, mas nunca necessário: a análise completa
        continua de graça para todo mundo.
      </p>
      <div className="apoio-projeto-acoes">
        {CHAVE_PIX && (
          <button type="button" onClick={copiarChave}>
            {copiado
              ? "Chave copiada!"
              : `Copiar chave Pix de ${NOME_BENEFICIARIO}`}
          </button>
        )}
        {LINK_APOIO && (
          <a href={LINK_APOIO} target="_blank" rel="noreferrer">
            Apoiar em {new URL(LINK_APOIO).hostname}
          </a>
        )}
      </div>
    </section>
  );
}
