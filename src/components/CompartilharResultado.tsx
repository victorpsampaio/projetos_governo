import { useEffect, useRef, useState } from "react";
import {
  gerarImagemResultado,
  linkWhatsApp,
  linkX,
  mensagemCompartilhamento,
  type ItemCompartilhavel,
} from "../lib/compartilhar";
import { SITE_URL } from "../lib/seo";

interface CompartilharResultadoProps {
  top3: ItemCompartilhavel[];
}

const NOME_ARQUIVO = "minha-proximidade-candidatos-2026.png";

function suportaCompartilharArquivo(blob: Blob | null): boolean {
  if (!blob) return false;
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.share !== "function") return false;
  if (typeof navigator.canShare !== "function") return false;
  const arquivo = new File([blob], NOME_ARQUIVO, { type: "image/png" });
  return navigator.canShare({ files: [arquivo] });
}

export default function CompartilharResultado({
  top3,
}: CompartilharResultadoProps) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);
  const [gerando, setGerando] = useState(true);
  const [podeCompartilharArquivo, setPodeCompartilharArquivo] =
    useState(false);
  const [copiado, setCopiado] = useState(false);
  const montadoRef = useRef(true);

  useEffect(() => {
    montadoRef.current = true;
    setGerando(true);
    gerarImagemResultado(top3).then((resultado) => {
      if (!montadoRef.current) return;
      setBlob(resultado);
      setImagemUrl(resultado ? URL.createObjectURL(resultado) : null);
      setPodeCompartilharArquivo(suportaCompartilharArquivo(resultado));
      setGerando(false);
    });
    return () => {
      montadoRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (imagemUrl) URL.revokeObjectURL(imagemUrl);
    };
  }, [imagemUrl]);

  async function compartilharNativo() {
    if (!blob) return;
    const arquivo = new File([blob], NOME_ARQUIVO, { type: "image/png" });
    try {
      await navigator.share({
        files: [arquivo],
        text: mensagemCompartilhamento(),
      });
    } catch {
      // usuário cancelou o menu de compartilhamento — nada a fazer
    }
  }

  function baixarImagem() {
    if (!imagemUrl) return;
    const a = document.createElement("a");
    a.href = imagemUrl;
    a.download = NOME_ARQUIVO;
    a.click();
  }

  async function copiarLink() {
    await navigator.clipboard.writeText(`${SITE_URL}/quiz`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <section className="compartilhar-resultado">
      <h2>Compartilhar</h2>
      <p className="compartilhar-texto">
        Mande pra um amigo comparar o resultado dele com o seu.
      </p>

      <div className="compartilhar-corpo">
        <div className="compartilhar-preview">
          {gerando && (
            <div className="compartilhar-preview-carregando">
              Gerando imagem…
            </div>
          )}
          {!gerando && imagemUrl && (
            <img
              src={imagemUrl}
              alt="Cartão com os 3 candidatos mais próximos do seu resultado"
            />
          )}
        </div>

        <div className="compartilhar-botoes">
          {podeCompartilharArquivo && (
            <button
              type="button"
              className="cta-grande compartilhar-botao-principal"
              onClick={compartilharNativo}
            >
              Compartilhar →
            </button>
          )}

          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
            className="compartilhar-botao"
          >
            WhatsApp
          </a>
          <a
            href={linkX()}
            target="_blank"
            rel="noreferrer"
            className="compartilhar-botao"
          >
            X
          </a>
          {(podeCompartilharArquivo || imagemUrl) && (
            <>
              <button
                type="button"
                className="compartilhar-botao"
                onClick={podeCompartilharArquivo ? compartilharNativo : baixarImagem}
              >
                Instagram
              </button>
              <button
                type="button"
                className="compartilhar-botao"
                onClick={podeCompartilharArquivo ? compartilharNativo : baixarImagem}
              >
                TikTok
              </button>
            </>
          )}
          {imagemUrl && (
            <button
              type="button"
              className="compartilhar-botao"
              onClick={baixarImagem}
            >
              Baixar imagem
            </button>
          )}
          <button
            type="button"
            className="compartilhar-botao"
            onClick={copiarLink}
          >
            {copiado ? "Link copiado!" : "Copiar link"}
          </button>
        </div>

        {!podeCompartilharArquivo && (
          <p className="compartilhar-dica">
            Instagram e TikTok não têm link de compartilhamento direto pela
            web — baixe a imagem acima e poste manualmente, ou abra esta
            página pelo celular pra usar o menu de compartilhar nativo.
          </p>
        )}
      </div>
    </section>
  );
}
