import { useEffect } from "react";

export const SITE_URL = "https://projetosgoverno.vercel.app";
const SITE_NOME = "Candidatos 2026";
const OG_IMAGEM_PADRAO = `${SITE_URL}/og-image.png`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function definirMeta(attr: "name" | "property", chave: string, conteudo: string) {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${chave}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, chave);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", conteudo);
}

function definirCanonical(url: string) {
  let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

export function useSeo({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const tituloCompleto = `${title} | ${SITE_NOME}`;
    const url = `${SITE_URL}${path}`;
    const imagem = image ?? OG_IMAGEM_PADRAO;

    document.title = tituloCompleto;
    definirMeta("name", "description", description);
    definirCanonical(url);

    definirMeta("property", "og:type", "website");
    definirMeta("property", "og:site_name", SITE_NOME);
    definirMeta("property", "og:title", tituloCompleto);
    definirMeta("property", "og:description", description);
    definirMeta("property", "og:url", url);
    definirMeta("property", "og:image", imagem);
    definirMeta("property", "og:locale", "pt_BR");

    definirMeta("name", "twitter:card", "summary_large_image");
    definirMeta("name", "twitter:title", tituloCompleto);
    definirMeta("name", "twitter:description", description);
    definirMeta("name", "twitter:image", imagem);
  }, [title, description, path, image]);
}
