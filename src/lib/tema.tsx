import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Tema = "claro" | "escuro";

const CHAVE_ARMAZENAMENTO = "tema-preferido";

interface TemaContextValor {
  tema: Tema;
  alternar: () => void;
}

const TemaContext = createContext<TemaContextValor | undefined>(undefined);

function lerTemaSalvo(): Tema | null {
  const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
  return salvo === "claro" || salvo === "escuro" ? salvo : null;
}

function temaPreferidoDoSistema(): Tema {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "escuro"
    : "claro";
}

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(
    () => lerTemaSalvo() ?? temaPreferidoDoSistema(),
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      tema === "escuro" ? "dark" : "light",
    );
  }, [tema]);

  const valor = useMemo<TemaContextValor>(
    () => ({
      tema,
      alternar: () => {
        setTema((atual) => {
          const proximo = atual === "claro" ? "escuro" : "claro";
          localStorage.setItem(CHAVE_ARMAZENAMENTO, proximo);
          return proximo;
        });
      },
    }),
    [tema],
  );

  return (
    <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>
  );
}

export function useTema(): TemaContextValor {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error("useTema deve ser usado dentro de TemaProvider");
  }
  return contexto;
}
