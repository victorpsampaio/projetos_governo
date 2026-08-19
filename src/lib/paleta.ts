// Paleta compartilhada entre os gráficos da página de Economia, para manter
// a mesma cor por posição de candidato em todos eles. Não muda por tema —
// são cores identificadoras (candidato X = cor Y), trocar geraria confusão
// ao alternar claro/escuro.
export const CORES_CANDIDATOS = [
  "#6d28d9", // brand
  "#16a34a", // verde
  "#d97706", // âmbar
  "#dc2626", // vermelho
  "#0891b2", // teal
  "#db2777", // magenta
  "#2563eb", // azul
];

// Cores de apoio dos gráficos (grid, eixo, tooltip) — essas sim precisam
// variar por tema pra continuar legíveis no fundo escuro.
import type { Tema } from "./tema";

interface PaletaGrafico {
  texto: string;
  borda: string;
  tooltipFundo: string;
  tooltipBorda: string;
  tooltipSombra: string;
}

const PALETA_GRAFICO: Record<Tema, PaletaGrafico> = {
  claro: {
    texto: "#64607a",
    borda: "#e4e3ee",
    tooltipFundo: "#ffffff",
    tooltipBorda: "#e4e3ee",
    tooltipSombra: "0 8px 24px rgba(20,18,31,0.1)",
  },
  escuro: {
    texto: "#a29cb8",
    borda: "#322f3d",
    tooltipFundo: "#1c1a24",
    tooltipBorda: "#322f3d",
    tooltipSombra: "0 8px 24px rgba(0,0,0,0.4)",
  },
};

export function paletaGrafico(tema: Tema): PaletaGrafico {
  return PALETA_GRAFICO[tema];
}
