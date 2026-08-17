import Selo from "./Selo";

export default function AvisoMetodologico() {
  return (
    <div className="aviso-metodologico" role="note">
      <Selo texto="Não é pesquisa eleitoral" variante="carimbo" rotacao={-4} />
      <strong>O que este site é — e o que não é:</strong> esta é uma análise
      técnica do conteúdo programático dos candidatos, aplicando um framework
      público de Product Ownership (North Star, OKRs, hipóteses testáveis).
      Os 4 scores avaliam rigor, clareza e viabilidade de execução das
      propostas — não expressam preferência por nenhum candidato. Toda
      afirmação cita fonte pública verificável.
    </div>
  );
}
