import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarCandidato from "../components/AvatarCandidato";
import ApoioProjeto from "../components/ApoioProjeto";
import { getCandidato } from "../lib/dados";
import { calcularAfinidade, perguntasQuiz, type RespostaQuiz } from "../lib/quiz";
import { useSeo } from "../lib/seo";

type Fase = "intro" | "perguntas" | "resultado";

const LABEL_RESPOSTA: Record<RespostaQuiz, string> = {
  nao: "NÃO",
  depende: "DEPENDE",
  sim: "SIM",
};

function corPorPontuacao(pontuacao: number): string {
  if (pontuacao >= 70) return "quiz-alto";
  if (pontuacao >= 40) return "quiz-medio";
  return "quiz-baixo";
}

export default function Quiz() {
  const [fase, setFase] = useState<Fase>("intro");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, RespostaQuiz>>({});

  const totalPerguntas = perguntasQuiz.length;
  const pergunta = perguntasQuiz[indice];

  useSeo({
    title: "Quiz de proximidade",
    description:
      "Responda perguntas de SIM, NÃO ou DEPENDE sobre temas reais da campanha de 2026 e veja o quanto suas respostas se aproximam, em texto, da posição documentada de cada candidato — não é uma recomendação de voto.",
    path: "/quiz",
  });

  const resultado = fase === "resultado" ? calcularAfinidade(respostas) : [];

  function responder(valor: RespostaQuiz) {
    setRespostas((atual) => ({ ...atual, [pergunta.id]: valor }));
  }

  function avancar() {
    if (indice + 1 < totalPerguntas) {
      setIndice((i) => i + 1);
    } else {
      setFase("resultado");
    }
  }

  function voltar() {
    setIndice((i) => Math.max(0, i - 1));
  }

  function reiniciar() {
    setRespostas({});
    setIndice(0);
    setFase("intro");
  }

  return (
    <div className="pagina-lista">
      <div className="nav-topo">
        <Link to="/" className="link-voltar">
          ← Início
        </Link>
        <nav className="nav-setores">
          <Link to="/busca">Buscar</Link>
          <Link to="/temas">Temas</Link>
        </nav>
      </div>

      {fase === "intro" && (
        <div className="quiz-intro">
          <header className="cabecalho">
            <span className="eyebrow">Central de propostas</span>
            <h1>Quiz de proximidade</h1>
            <p className="subtitulo">
              {totalPerguntas} perguntas de SIM, NÃO ou DEPENDE sobre temas
              reais da campanha de 2026. No fim, você vê o quanto suas
              respostas se aproximam, em texto, da posição já documentada de
              cada um dos 7 candidatos.
            </p>
          </header>
          <div className="quiz-aviso">
            Isto <strong>não é</strong> um teste vocacional nem uma
            recomendação de voto — é uma comparação textual entre suas
            respostas e posições públicas de cada candidato, sempre com
            fonte. Os 4 scores neutros e a opinião pessoal do curador, em
            cada ficha, continuam completamente separados disso.
          </div>
          <button
            type="button"
            className="cta-grande"
            onClick={() => setFase("perguntas")}
          >
            Começar →
          </button>
        </div>
      )}

      {fase === "perguntas" && pergunta && (
        <div className="quiz-pergunta-tela">
          <div className="quiz-progresso">
            <div className="quiz-progresso-barra">
              <div
                className="quiz-progresso-preenchido"
                style={{ width: `${((indice + 1) / totalPerguntas) * 100}%` }}
              />
            </div>
            <span className="quiz-progresso-texto">
              {indice + 1}/{totalPerguntas}
            </span>
          </div>

          <span className="eyebrow">{pergunta.tema}</span>
          <p className="quiz-pergunta-texto">{pergunta.pergunta}</p>

          <div className="quiz-respostas">
            {(["nao", "depende", "sim"] as RespostaQuiz[]).map((valor) => (
              <button
                key={valor}
                type="button"
                className={`quiz-resposta-botao quiz-resposta-${valor}${
                  respostas[pergunta.id] === valor ? " selecionada" : ""
                }`}
                onClick={() => responder(valor)}
              >
                {LABEL_RESPOSTA[valor]}
              </button>
            ))}
          </div>

          <div className="quiz-navegacao">
            <button
              type="button"
              className="quiz-botao-voltar"
              onClick={voltar}
              disabled={indice === 0}
            >
              ← Voltar
            </button>
            <button
              type="button"
              className="cta-grande"
              onClick={avancar}
              disabled={!respostas[pergunta.id]}
            >
              {indice + 1 < totalPerguntas ? "Próxima" : "Ver resultado"} →
            </button>
          </div>
        </div>
      )}

      {fase === "resultado" && (
        <div className="quiz-resultado">
          <header className="cabecalho">
            <span className="eyebrow">Resultado</span>
            <h1>Sua proximidade com cada candidato</h1>
          </header>

          <div className="quiz-aviso">
            Isto mede o quanto suas respostas se aproximam, em texto, das
            posições já documentadas de cada candidato — não é indicação de
            voto, pesquisa eleitoral nem teste vocacional. O score neutro
            (rigor/execução) e a opinião pessoal do curador, em cada ficha,
            continuam sendo coisas completamente separadas disso.
          </div>

          <div className="quiz-ranking">
            {resultado.map((r) => {
              const candidato = getCandidato(r.candidatoId);
              if (!candidato) return null;
              return (
                <div key={r.candidatoId} className="quiz-ranking-item">
                  <AvatarCandidato candidato={candidato} tamanho={48} />
                  <div className="quiz-ranking-info">
                    <div className="quiz-ranking-nome">
                      <span>{candidato.nome}</span>
                      <span
                        className={`quiz-ranking-pontuacao ${corPorPontuacao(r.pontuacao)}`}
                      >
                        {r.pontuacao}%
                      </span>
                    </div>
                    <div className="quiz-ranking-barra">
                      <div
                        className={`quiz-ranking-barra-preenchida ${corPorPontuacao(r.pontuacao)}`}
                        style={{ width: `${r.pontuacao}%` }}
                      />
                    </div>
                    <p className="quiz-ranking-detalhe">
                      {r.totalRespondido}/{totalPerguntas} perguntas com
                      posição documentada para{" "}
                      {candidato.nome.split(" ")[0]} ·{" "}
                      <Link to={`/candidato/${r.candidatoId}`}>
                        ver perfil →
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <details className="quiz-detalhe-perguntas">
            <summary>
              Ver como cada candidato respondeu, pergunta a pergunta
            </summary>
            {perguntasQuiz.map((p) => (
              <div key={p.id} className="quiz-detalhe-pergunta">
                <p className="quiz-detalhe-pergunta-texto">
                  <span className="eyebrow">{p.tema}</span>
                  {p.pergunta}
                  {respostas[p.id] && (
                    <span className="quiz-detalhe-sua-resposta">
                      {" "}
                      — sua resposta: {LABEL_RESPOSTA[respostas[p.id]]}
                    </span>
                  )}
                </p>
                <ul className="quiz-detalhe-posicoes">
                  {p.posicoes.map((pos) => {
                    const candidatoPos = getCandidato(pos.candidatoId);
                    if (!candidatoPos) return null;
                    return (
                      <li key={pos.candidatoId}>
                        <strong>{candidatoPos.nome.split(" ")[0]}</strong>
                        {": "}
                        {pos.posicao === "nao_localizada"
                          ? "posição não localizada"
                          : LABEL_RESPOSTA[pos.posicao]}
                        {" — "}
                        {pos.justificativa}
                        {pos.fonte && (
                          <>
                            {" "}
                            <a
                              href={pos.fonte.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              (fonte)
                            </a>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </details>

          <button
            type="button"
            className="cta-grande cta-secundaria"
            onClick={reiniciar}
          >
            Refazer o quiz
          </button>

          <ApoioProjeto />
        </div>
      )}
    </div>
  );
}
