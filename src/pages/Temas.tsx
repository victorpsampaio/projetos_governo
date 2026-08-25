import { Link } from "react-router-dom";
import { getHipotesesPorTema, temas } from "../lib/dados";
import { useSeo } from "../lib/seo";

export default function Temas() {
  useSeo({
    title: "Temas",
    description:
      "Cruze setores por tema: veja o que cada candidato propõe sobre financiamento público, papel do Estado ou desigualdade, em Economia e Saúde lado a lado.",
    path: "/temas",
  });

  return (
    <div className="pagina-lista">
      <div className="nav-topo">
        <Link to="/" className="link-voltar">
          ← Início
        </Link>
        <nav className="nav-setores">
          <Link to="/busca">Buscar</Link>
          <Link to="/quiz">Quiz</Link>
        </nav>
      </div>

      <header className="cabecalho">
        <span className="eyebrow">Central de propostas</span>
        <h1>Temas</h1>
        <p className="subtitulo">
          As mesmas propostas, cruzadas por assunto em vez de por setor — o
          que cada candidato disse sobre um tema, em Economia e em Saúde ao
          mesmo tempo.
        </p>
      </header>

      <div className="grid-temas">
        {temas.map((tema) => {
          const hipoteses = getHipotesesPorTema(tema.id);
          const candidatosUnicos = new Set(
            hipoteses.map((h) => h.proposta.candidatoId),
          );
          const setoresUnicos = new Set(
            hipoteses.map((h) => h.proposta.setorId),
          );
          return (
            <Link key={tema.id} to={`/tema/${tema.id}`} className="card-tema">
              <h2>{tema.nome}</h2>
              <p>{tema.descricao}</p>
              <p className="card-tema-contagem">
                {hipoteses.length}{" "}
                {hipoteses.length === 1 ? "hipótese" : "hipóteses"} ·{" "}
                {candidatosUnicos.size}{" "}
                {candidatosUnicos.size === 1 ? "candidato" : "candidatos"} ·{" "}
                {setoresUnicos.size}{" "}
                {setoresUnicos.size === 1 ? "setor" : "setores"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
