import { useState } from "react";
import { Link } from "react-router-dom";
import { buscarPropostas } from "../lib/busca";
import { getCandidato, getSetor } from "../lib/dados";
import { useSeo } from "../lib/seo";

export default function Busca() {
  const [query, setQuery] = useState("");

  useSeo({
    title: "Busca",
    description:
      "Procure um tema em todas as fichas de todos os candidatos e setores já analisados — North Star, OKRs, hipóteses, lacunas e análise.",
    path: "/busca",
  });

  const termoLimpo = query.trim();
  const resultados = buscarPropostas(query);

  return (
    <div className="pagina-lista">
      <div className="nav-topo">
        <Link to="/" className="link-voltar">
          ← Início
        </Link>
      </div>

      <header className="cabecalho">
        <span className="eyebrow">Central de propostas</span>
        <h1>Busca</h1>
        <p className="subtitulo">
          Procure um tema em todas as fichas de todos os candidatos e
          setores já analisados — North Star, OKRs, hipóteses, lacunas e
          análise.
        </p>
      </header>

      <input
        type="search"
        className="busca-input"
        placeholder="ex: vacina, dívida pública, salário mínimo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        aria-label="Buscar em todas as propostas"
      />

      {termoLimpo && (
        <p className="busca-contador">
          {resultados.length === 0
            ? "Nenhum resultado"
            : `${resultados.length} resultado${resultados.length > 1 ? "s" : ""}`}
        </p>
      )}

      <div className="busca-resultados">
        {!termoLimpo && (
          <p className="busca-estado-vazio">
            Digite um termo pra buscar — ex: "vacina", "dívida pública",
            "6x1", "reforma tributária".
          </p>
        )}

        {termoLimpo && resultados.length === 0 && (
          <p className="busca-estado-vazio">
            Nenhuma proposta menciona "{termoLimpo}". Tente um termo mais
            genérico.
          </p>
        )}

        {resultados.map(({ proposta, trechos }) => {
          const candidato = getCandidato(proposta.candidatoId);
          const setor = getSetor(proposta.setorId);
          if (!candidato) return null;

          return (
            <Link
              key={`${proposta.candidatoId}-${proposta.setorId}`}
              to={`/candidato/${proposta.setorId}/${proposta.candidatoId}`}
              className="busca-resultado"
            >
              <span className="busca-resultado-cabecalho">
                {candidato.nome} · {setor?.nome ?? proposta.setorId}
              </span>
              <ul>
                {trechos.slice(0, 3).map((trecho, i) => (
                  <li key={i}>
                    <strong>{trecho.campo}:</strong> {trecho.texto}
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
