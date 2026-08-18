import { Link } from "react-router-dom";
import { NOME_BENEFICIARIO } from "../lib/apoio";

export default function Privacidade() {
  return (
    <div className="pagina-landing">
      <Link to="/" className="link-voltar">
        ← Início
      </Link>

      <header className="cabecalho">
        <span className="eyebrow">Privacidade</span>
        <h1>Cookies e anúncios</h1>
      </header>

      <section className="secao-problema">
        <p>
          Este site não tem cadastro, login ou coleta de dados pessoais.
          Quando exibe anúncios (Google AdSense), o Google pode usar cookies
          para personalização e medição — você pode recusar isso no aviso de
          cookies, sem perder acesso a nenhum conteúdo do site.
        </p>
        <p>
          Os anúncios existem porque {NOME_BENEFICIARIO}, que mantém este
          projeto sozinho, está tentando gerar alguma renda com o tráfego do
          site — isso está detalhado na página{" "}
          <Link to="/sobre">Sobre</Link>. Recusar cookies não afeta o acesso
          à análise, aos scores ou às fontes.
        </p>
        <p>
          Para mais informações sobre como o Google usa dados em produtos
          de anúncio, consulte a{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noreferrer"
          >
            política de anúncios do Google
          </a>
          .
        </p>
      </section>
    </div>
  );
}
