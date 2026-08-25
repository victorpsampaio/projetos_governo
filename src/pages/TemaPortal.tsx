import { Link, useParams } from "react-router-dom";
import {
  getCandidato,
  getHipotesesPorTema,
  getSetor,
  getTema,
} from "../lib/dados";
import { useSeo } from "../lib/seo";
import type { PropostaSetor } from "../types";

interface GrupoCandidato {
  candidatoId: string;
  itens: { proposta: PropostaSetor; indice: number }[];
}

export default function TemaPortal() {
  const { temaId } = useParams<{ temaId: string }>();
  const tema = temaId ? getTema(temaId) : undefined;
  const hipoteses = temaId ? getHipotesesPorTema(temaId) : [];

  useSeo({
    title: tema ? tema.nome : "Tema não encontrado",
    description: tema
      ? `${tema.descricao} Veja lado a lado o que cada candidato propõe sobre isso, cruzando Economia e Saúde.`
      : "Tema não encontrado.",
    path: `/tema/${temaId}`,
  });

  if (!tema) {
    return (
      <div className="pagina-detalhe">
        <p>Tema não encontrado.</p>
        <Link to="/temas">Voltar</Link>
      </div>
    );
  }

  const grupos: GrupoCandidato[] = [];
  for (const { proposta, indice } of hipoteses) {
    let grupo = grupos.find((g) => g.candidatoId === proposta.candidatoId);
    if (!grupo) {
      grupo = { candidatoId: proposta.candidatoId, itens: [] };
      grupos.push(grupo);
    }
    grupo.itens.push({ proposta, indice });
  }

  return (
    <div className="pagina-detalhe">
      <div className="nav-topo">
        <Link to="/temas" className="link-voltar">
          ← Todos os temas
        </Link>
        <nav className="nav-setores">
          <Link to="/busca">Buscar</Link>
          <Link to="/quiz">Quiz</Link>
        </nav>
      </div>

      <header className="cabecalho">
        <span className="eyebrow">Tema</span>
        <h1>{tema.nome}</h1>
        <p className="subtitulo">{tema.descricao}</p>
      </header>

      {grupos.length === 0 ? (
        <p>Nenhuma hipótese marcada com este tema ainda.</p>
      ) : (
        <section className="secao-hipoteses">
          {grupos.map((grupo) => {
            const candidato = getCandidato(grupo.candidatoId);
            if (!candidato) return null;
            return (
              <div key={grupo.candidatoId} className="tema-grupo-candidato">
                <h2>{candidato.nome}</h2>
                {grupo.itens.map(({ proposta, indice }) => {
                  const h = proposta.hipoteses[indice];
                  const setor = getSetor(proposta.setorId);
                  return (
                    <div
                      key={`${proposta.setorId}-${indice}`}
                      className="hipotese"
                    >
                      <div className="hipotese-setor">
                        <span className="tema-pill tema-pill-setor">
                          {setor?.nome ?? proposta.setorId}
                        </span>
                        <Link
                          to={`/candidato/${proposta.setorId}/${proposta.candidatoId}`}
                        >
                          Ver ficha completa →
                        </Link>
                      </div>
                      <p>
                        <strong>SE</strong> {h.se}
                      </p>
                      <p>
                        <strong>PORQUE</strong> {h.porque}
                      </p>
                      <p>
                        <strong>ENTÃO</strong> {h.entao}
                      </p>
                      <p>
                        <strong>MEDIÇÃO</strong> {h.medicao}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
