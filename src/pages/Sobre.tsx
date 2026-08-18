import { Link } from "react-router-dom";
import ApoioProjeto from "../components/ApoioProjeto";

export default function Sobre() {
  return (
    <div className="pagina-landing">
      <Link to="/" className="link-voltar">
        ← Início
      </Link>

      <header className="cabecalho">
        <span className="eyebrow">Quem faz isso</span>
        <h1>Victor Sampaio</h1>
      </header>

      <section className="secao-problema">
        <p>
          Sou Victor Sampaio, Product Owner. Esse site nasceu de um problema
          pessoal: eu precisava decidir meu voto em 2026 e não queria fazer
          isso só na base de narrativa e simpatia — queria aplicar o mesmo
          rigor que uso no trabalho pra julgar se um roadmap é sério ou só um
          conjunto de boas intenções.
        </p>
        <p>
          Os 4 scores de cada candidato (Rigor PO, Implementabilidade,
          Clareza de Métrica, Viabilidade Política) seguem uma rubrica
          pública e objetiva, aplicada da mesma forma para os 7 candidatos —
          de Lula a Marçal, de Zema à Samara Martins. Essa parte não carrega
          minha opinião.
        </p>
        <p>
          Mas eu tenho opinião, e prefiro deixar isso explícito a fingir que
          não tenho: sou de esquerda. Isso influencia como eu vejo
          prioridades de política econômica — distribuição de renda, papel
          do Estado, direitos trabalhistas — mesmo quando não influencia a
          nota técnica que uma proposta recebe. Por isso, cada candidato tem,
          além da análise neutra, uma seção separada e rotulada chamada
          "Opinião do curador": é onde eu digo o que eu realmente penso, sem
          fingir uma neutralidade que eu não tenho nesse campo específico.
          Leia a análise e os scores pra entender o rigor de cada proposta.
          Leia minha opinião pra entender o que eu, pessoalmente, faria com
          essa informação.
        </p>
        <p>
          Também não vou fingir que não estou tentando ganhar algum dinheiro
          com isso: o site tem anúncios (Google AdSense) e um jeito de me
          apoiar via Pix, os dois em meu nome. Estou tentando tirar uma
          renda do tráfego do site — se isso te incomoda, os scores, a
          metodologia e as fontes continuam de graça e completos do mesmo
          jeito, com ou sem anúncio.
        </p>
      </section>

      <ApoioProjeto />

      <footer className="cta-final">
        <Link to="/economia" className="cta-grande">
          Ver análise de Economia →
        </Link>
      </footer>
    </div>
  );
}
