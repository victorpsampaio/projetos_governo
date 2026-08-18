import { Link } from "react-router-dom";
import { DIMENSOES_SCORE } from "../types";

const CONCEITOS = [
  {
    titulo: "North Star Metric",
    resumo: "A métrica-bússola de um setor",
    texto:
      "Antes de julgar qualquer proposta, o método pergunta: qual é o único número que resume se esse setor está indo bem? Para Economia, é a combinação de renda real per capita crescendo, dívida pública sob controle e desigualdade caindo. Toda proposta deveria apontar para essa bússola — quando não aponta, isso já é uma lacuna.",
  },
  {
    titulo: "OKRs",
    resumo: "Objetivo + Resultados-Chave mensuráveis",
    texto:
      '"Vamos melhorar a economia" não é um plano — é um desejo. Um OKR de verdade tem um objetivo claro e resultados-chave com número e prazo, como "reduzir a dívida pública para X% do PIB até Y". O método extrai os OKRs reais de cada proposta e expõe quando eles não existem.',
  },
  {
    titulo: "Hipóteses testáveis",
    resumo: "SE / PORQUE / ENTÃO / MEDIÇÃO",
    texto:
      "Toda proposta de governo é, na prática, uma aposta: SE fizermos esta ação, PORQUE esta evidência sustenta isso, ENTÃO esperamos este resultado — e vamos MEDIR com esta fonte, nesta frequência. Quando falta uma dessas quatro partes, isso é uma lacuna real da proposta, não um detalhe.",
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
  return (
    <div className="pagina-landing">
      <header className="hero-landing">
        <span className="eyebrow">Auditoria de programas de governo</span>
        <h1>Candidatos 2026</h1>
        <p className="hero-subtitulo">
          Propostas de governo costumam ser vagas — "vamos revolucionar a
          economia" não diz nada sobre como, quanto ou até quando. Este
          projeto aplica o rigor de Product Ownership (a disciplina que
          times de produto usam para não prometer o que não conseguem medir)
          para comparar, de forma sistemática e auditável, o que os
          candidatos à Presidência do Brasil em 2026 realmente propõem.
        </p>
        <Link to="/economia" className="cta-grande">
          Ver análise de Economia →
        </Link>
      </header>

      <section className="secao-problema">
        <h2>O problema</h2>
        <p>
          Eleitor não tem como comparar rigor técnico entre candidatos — só
          narrativa e marketing. Um discurso convincente e uma proposta bem
          planejada soam parecidos até alguém perguntar: qual é a meta
          exata? Com que prazo? Medida como? Aprovável com que apoio no
          Congresso? Este site faz essas quatro perguntas para cada
          candidato, no mesmo formato, com a mesma régua.
        </p>
      </section>

      <section className="secao-metodologia">
        <h2>A metodologia</h2>
        <div className="grid-metodologia">
          {CONCEITOS.map((conceito) => (
            <div key={conceito.titulo} className="card-metodologia">
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
          ))}
        </div>
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

      <footer className="cta-final">
        <Link to="/economia" className="cta-grande">
          Ver análise de Economia →
        </Link>
      </footer>
    </div>
  );
}
