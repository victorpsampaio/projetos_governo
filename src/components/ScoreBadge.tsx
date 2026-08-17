interface ScoreBadgeProps {
  label: string;
  valor: number;
}

function corPorValor(valor: number): string {
  if (valor >= 7) return "score-alto";
  if (valor >= 4) return "score-medio";
  return "score-baixo";
}

export default function ScoreBadge({ label, valor }: ScoreBadgeProps) {
  return (
    <div className={`score-badge ${corPorValor(valor)}`}>
      <span className="score-badge-label">{label}</span>
      <span className="score-badge-valor">{valor.toFixed(1)}</span>
    </div>
  );
}
