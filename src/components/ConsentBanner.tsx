import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adsenseConfigurado, carregarScriptAdSense } from "../lib/adsense";

const CHAVE_ARMAZENAMENTO = "consentimento-cookies-anuncios";

export default function ConsentBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!adsenseConfigurado()) return;
    const decisao = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (decisao === "aceito") {
      carregarScriptAdSense();
    } else if (!decisao) {
      setVisivel(true);
    }
  }, []);

  function aceitar() {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, "aceito");
    carregarScriptAdSense();
    setVisivel(false);
  }

  function recusar() {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, "recusado");
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Aviso de cookies">
      <p>
        Este site usa cookies para exibir anúncios (Google AdSense). Veja
        detalhes na <Link to="/privacidade">política de privacidade</Link>.
      </p>
      <div className="consent-banner-acoes">
        <button type="button" onClick={recusar} className="consent-recusar">
          Recusar
        </button>
        <button type="button" onClick={aceitar} className="consent-aceitar">
          Aceitar
        </button>
      </div>
    </div>
  );
}
