import { Link } from "react-router-dom";
import { LINK_CONTATO, NOME_BENEFICIARIO } from "../lib/apoio";
import { useSeo } from "../lib/seo";

export default function Privacidade() {
  useSeo({
    title: "Privacidade e cookies",
    description:
      "Como este site usa cookies de anúncio (Google AdSense) e por que os anúncios existem — sem afetar o acesso às análises, scores ou fontes.",
    path: "/privacidade",
  });

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
          O Google atua como <strong>operador de dados</strong> nesse
          processo — é quem efetivamente processa os cookies e dados de
          navegação para exibir e medir os anúncios, seguindo as instruções
          e políticas descritas abaixo. Para mais informações sobre como o
          Google usa dados em produtos de anúncio, consulte a{" "}
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

      <section className="secao-problema">
        <h2>Seus direitos (LGPD)</h2>
        <p>
          Como titular dos seus dados, você pode a qualquer momento pedir
          para saber quais dados foram coletados sobre você, corrigi-los,
          excluí-los, ou revogar o consentimento dado para cookies de
          anúncio — mesmo que o site já não tenha nenhum dado seu, dado que
          não há cadastro nem coleta direta. Pra exercer qualquer um desses
          direitos, ou tirar dúvida sobre como os dados são tratados, fale
          comigo diretamente:{" "}
          <a href={LINK_CONTATO} target="_blank" rel="noreferrer">
            LinkedIn de {NOME_BENEFICIARIO}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
