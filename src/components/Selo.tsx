import type { CSSProperties } from "react";

interface SeloProps {
  texto: string;
  variante?: "carimbo" | "alerta" | "alto" | "medio" | "baixo";
  tamanho?: "sm" | "md";
  rotacao?: number;
}

export default function Selo({
  texto,
  variante = "carimbo",
  tamanho = "md",
  rotacao = -6,
}: SeloProps) {
  return (
    <span
      className={`selo selo-${variante} ${tamanho === "sm" ? "selo-sm" : ""}`}
      style={{ "--selo-rotacao": `${rotacao}deg` } as CSSProperties}
    >
      {texto}
    </span>
  );
}
