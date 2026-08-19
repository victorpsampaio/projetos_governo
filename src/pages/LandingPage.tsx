import { Fragment } from "react";
import { Link } from "react-router-dom";
import ApoioProjeto from "../components/ApoioProjeto";
import AvatarCandidato from "../components/AvatarCandidato";
import { candidatos } from "../lib/dados";
import { useSeo } from "../lib/seo";
import { DIMENSOES_SCORE } from "../types";

const CONCEITOS = [
  {
    titulo: "North Star Metric",
    resumo: "A métrica-bússola de um setor",
    texto:
      "Antes de julgar qualquer proposta, o método pergunta: qual é o único número que resume se esse setor está indo bem? Para Economia, é a combinação de renda real per capita crescendo, dívida pública sob controle e desigualdade caindo.",
  },
  {
    titulo: "OKRs",
    resumo: "Objetivo + Resultados-Chave mensuráveis",
    texto:
      '"Vamos melhorar a economia" não é um plano — é um desejo. Um OKR de verdade tem objetivo claro e resultados-chave com número e prazo, como "reduzir a dívida pública para X% do PIB até Y".',
  },
  {
    titulo: "Hipóteses testáveis",
    resumo: "SE / PORQUE / ENTÃO / MEDIÇÃO",
    texto:
      "Toda proposta de governo é, na prática, uma aposta. Quando falta o PORQUE (evidência), o ENTÃO (resultado esperado) ou a MEDIÇÃO (como verificar), isso é uma lacuna real da proposta, não um detalhe.",
  },
  {
    titulo: "Os 4 scores",
    resumo: "A mesma rubrica para todo mundo",
    texto:
      "Cada candidato recebe 4 notas de 0 a 10, sempre pela mesma pergunta objetiva — sem espaço para simpatia ou antipatia política.",
    lista: DIMENSOES_SCORE,
  },
];

export default function LandingPage() {
  useSeo({
    title: "Auditoria de propostas de governo com Product Ownership",
    description:
      "Compare as propostas de governo dos 7 candidatos à Presidência do Brasil em 2026 com o rigor de Product Ownership: North Star, OKRs, hipóteses testáveis e 4 scores neutros.",
    path: "/",
  });

  return (
    <div className="pagina-landing">
      <header className="hero-landing">
        <span className="eyebrow">Auditoria de programas de governo</span>
        <h1>Candidatos 2026</h1>
        <p className="hero-lead">
          Propostas de governo costumam ser vagas. Este site aplica o rigor
          de <mark className="termo-po">Product Ownership</mark> pra separar
          plano de promessa.
        </p>

        <div className="hero-detalhes">
          <p className="hero-apoio">
            A disciplina que times de produto usam para não prometer o que
            não conseguem medir — aqui aplicada para comparar, de forma
            sistemática e auditável, o que os 7 candidatos à Presidência do
            Brasil em 2026 realmente propõem: <mark className="termo-po">
              North Star
            </mark>
            , <mark className="termo-po">OKRs</mark>,{" "}
            <mark className="termo-po">hipóteses testáveis</mark> e 4{" "}
            <mark className="termo-po">scores neutros</mark>.
          </p>

          <div className="hero-exemplo">
            <span className="hero-exemplo-eyebrow">
              Exemplo real — Economia, Lula
            </span>
            <div className="hero-exemplo-linha">
              <strong>SE</strong>
              <span>o crédito subsidiado via NIB continuar para setores estratégicos</span>
            </div>
            <div className="hero-exemplo-linha">
              <strong>PORQUE</strong>
              <span>o ciclo já mobilizou R$ 860 bilhões, segundo o governo</span>
            </div>
            <div className="hero-exemplo-linha">
              <strong>ENTÃO</strong>
              <span>mais indústria no PIB — sem meta numérica nem prazo até 2030</span>
            </div>
            <div className="hero-exemplo-linha">
              <strong>MEDIÇÃO</strong>
              <span>não especificada no plano</span>
            </div>
            <Link to="/candidato/economia/lula" className="hero-exemplo-link">
              → ver a ficha completa
            </Link>
          </div>
        </div>

        <div className="cta-grupo">
          <Link to="/economia" className="cta-grande">
            Ver análise de Economia →
          </Link>
          <Link to="/saude" className="cta-grande cta-secundaria">
            Ver análise de Saúde →
          </Link>
        </div>
      </header>

      <nav className="faixa-candidatos" aria-label="Candidatos auditados">
        {candidatos.map((candidato) => (
          <Link
            key={candidato.id}
            to={`/candidato/economia/${candidato.id}`}
            className="faixa-candidatos-item"
          >
            <AvatarCandidato candidato={candidato} tamanho={52} />
            <span>{candidato.nome.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>

      <section className="secao-problema">
        <h2>O problema</h2>
        <p>
          Eleitor não tem como comparar rigor técnico entre candidatos — só
          narrativa e marketing. Um discurso convincente e uma proposta bem
          planejada soam parecidos até alguém perguntar: qual é a{" "}
          <mark className="termo-po">meta exata</mark>? Com que prazo? Medida
          como? Aprovável com que apoio no Congresso? Este site faz essas
          quatro perguntas para cada candidato, no mesmo formato, com a
          mesma régua.
        </p>
      </section>

      <section className="secao-metodologia">
        <h2>A metodologia</h2>
        <div className="fluxo-metodologia">
          {CONCEITOS.map((conceito, i) => (
            <Fragment key={conceito.titulo}>
              {i > 0 && (
                <span className="fluxo-seta" aria-hidden="true">
                  →
                </span>
              )}
              <div className="fluxo-item">
                <div className="card-metodologia">
                  <span className="fluxo-numero">{i + 1}</span>
                  <h3>{conceito.titulo}</h3>
                  <p className="card-metodologia-resumo">{conceito.resumo}</p>
                  <p>{conceito.texto}</p>
                  {conceito.lista && (
                    <dl className="lista-dimensoes">
                      {conceito.lista.map((dimensao) => (
                        <div key={dimensao.key}>
                          <dt>{dimensao.label}</dt>
                          <dd>{dimensao.pergunta}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="secao-problema">
        <h2>Quem faz isso</h2>
        <p>
          Este site é feito por mim, Victor Sampaio, Product Owner — e os
          scores são neutros, mas eu não sou.{" "}
          <Link to="/sobre">Conheça quem está por trás do projeto →</Link>
        </p>
      </section>

      <section className="secao-neutralidade">
        <h2>O que este site não é</h2>
        <p>
          <strong>Não é pesquisa eleitoral, enquete ou projeção de intenção
          de voto.</strong> Os 4 scores avaliam rigor, clareza e viabilidade
          de execução das propostas — nunca preferência por um candidato.
          Toda afirmação cita uma fonte pública verificável, e a mesma
          rubrica é aplicada igualmente a todos, independentemente de
          espectro político.
        </p>
      </section>

      <ApoioProjeto />

      <footer className="cta-final">
        <div className="cta-grupo">
          <Link to="/economia" className="cta-grande">
            Ver análise de Economia →
          </Link>
          <Link to="/saude" className="cta-grande cta-secundaria">
            Ver análise de Saúde →
          </Link>
        </div>
      </footer>
    </div>
  );
}
