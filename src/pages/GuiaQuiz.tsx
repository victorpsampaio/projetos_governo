import { Link } from "react-router-dom";
import { perguntasQuiz } from "../lib/quiz";
import { useSeo } from "../lib/seo";

export default function GuiaQuiz() {
  useSeo({
    title: "Guia do quiz",
    description:
      "O contexto por trás de cada uma das perguntas do quiz de proximidade: o que está em disputa, por que a pergunta existe e que lei ou mecanismo está envolvido — sem indicar qual resposta é 'certa'.",
    path: "/quiz/guia",
  });

  return (
    <div className="pagina-lista">
      <div className="nav-topo">
        <Link to="/quiz" className="link-voltar">
          ← Voltar para o quiz
        </Link>
        <nav className="nav-setores">
          <Link to="/busca">Buscar</Link>
          <Link to="/temas">Temas</Link>
        </nav>
      </div>

      <header className="cabecalho">
        <span className="eyebrow">Quiz de proximidade</span>
        <h1>Guia das perguntas</h1>
        <p className="subtitulo">
          O que está em disputa em cada pergunta do quiz — pra ajudar a
          responder informado, não pra indicar qual resposta é "certa".
        </p>
      </header>

      <section className="secao-guia-quiz">
        {perguntasQuiz.map((pergunta) => (
          <div key={pergunta.id} className="guia-quiz-item">
            <span className="eyebrow">{pergunta.tema}</span>
            <h2>{pergunta.pergunta}</h2>
            <p>{pergunta.contexto}</p>
          </div>
        ))}
      </section>

      <p className="link-busca-landing">
        <Link to="/quiz">← Voltar e responder o quiz</Link>
      </p>
    </div>
  );
}
