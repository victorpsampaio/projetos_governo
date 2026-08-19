import { propostas } from "./dados";
import type { PropostaSetor } from "../types";

export interface Trecho {
  campo: string;
  texto: string;
}

export interface ResultadoBusca {
  proposta: PropostaSetor;
  trechos: Trecho[];
}

const REGEX_DIACRITICOS = new RegExp("[̀-ͯ]", "g");

function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(REGEX_DIACRITICOS, "").toLowerCase();
}

function contemTermo(texto: string, termo: string): boolean {
  return normalizar(texto).includes(termo);
}

function extrairTrecho(texto: string, termo: string, janela = 60): string {
  const normalizado = normalizar(texto);
  const idx = normalizado.indexOf(termo);
  if (idx === -1) {
    return texto.length > 140 ? `${texto.slice(0, 140)}…` : texto;
  }
  const inicio = Math.max(0, idx - janela);
  const fim = Math.min(texto.length, idx + termo.length + janela);
  return `${inicio > 0 ? "…" : ""}${texto.slice(inicio, fim)}${fim < texto.length ? "…" : ""}`;
}

const CAMPOS_HIPOTESE = ["se", "porque", "entao", "medicao"] as const;
const LABEL_HIPOTESE: Record<(typeof CAMPOS_HIPOTESE)[number], string> = {
  se: "SE",
  porque: "PORQUE",
  entao: "ENTÃO",
  medicao: "MEDIÇÃO",
};

export function buscarPropostas(query: string): ResultadoBusca[] {
  const termo = normalizar(query.trim());
  if (!termo) return [];

  return propostas
    .map((proposta): ResultadoBusca => {
      const trechos: Trecho[] = [];

      if (proposta.northStar && contemTermo(proposta.northStar, termo)) {
        trechos.push({
          campo: "North Star",
          texto: extrairTrecho(proposta.northStar, termo),
        });
      }

      proposta.okrs.forEach((okr) => {
        if (contemTermo(okr, termo)) {
          trechos.push({ campo: "OKR", texto: extrairTrecho(okr, termo) });
        }
      });

      proposta.hipoteses.forEach((hipotese, i) => {
        CAMPOS_HIPOTESE.forEach((campo) => {
          const valor = hipotese[campo];
          if (contemTermo(valor, termo)) {
            trechos.push({
              campo: `Hipótese ${i + 1} (${LABEL_HIPOTESE[campo]})`,
              texto: extrairTrecho(valor, termo),
            });
          }
        });
      });

      proposta.lacunas.forEach((lacuna) => {
        if (contemTermo(lacuna, termo)) {
          trechos.push({ campo: "Lacuna", texto: extrairTrecho(lacuna, termo) });
        }
      });

      if (contemTermo(proposta.analise, termo)) {
        trechos.push({
          campo: "Análise",
          texto: extrairTrecho(proposta.analise, termo),
        });
      }

      return { proposta, trechos };
    })
    .filter((r) => r.trechos.length > 0);
}
