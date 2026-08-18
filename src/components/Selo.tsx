interface SeloProps {
  texto: string;
  variante?: "carimbo" | "alerta" | "alto" | "medio" | "baixo";
  tamanho?: "sm" | "md";
}

export default function Selo({
  texto,
  variante = "carimbo",
  tamanho = "md",
}: SeloProps) {
  return (
    <span
      className={`selo selo-${variante} ${tamanho === "sm" ? "selo-sm" : ""}`}
    >
      {texto}
    </span>
  );
}
