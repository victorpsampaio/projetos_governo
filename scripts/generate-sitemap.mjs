import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../src/data");
const publicDir = resolve(__dirname, "../public");

const SITE_URL = "https://projetosgoverno.vercel.app";

function lerJson(nome) {
  return JSON.parse(readFileSync(resolve(dataDir, nome), "utf-8"));
}

const setores = lerJson("setores.json");
const temas = lerJson("temas.json");
const propostasArquivos = ["propostas-economia.json", "propostas-saude.json"];
const propostas = propostasArquivos.flatMap((arquivo) => {
  try {
    return lerJson(arquivo);
  } catch {
    return [];
  }
});

const urls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/sobre", changefreq: "monthly", priority: "0.5" },
  { loc: "/privacidade", changefreq: "yearly", priority: "0.3" },
  { loc: "/busca", changefreq: "weekly", priority: "0.6" },
  { loc: "/temas", changefreq: "monthly", priority: "0.6" },
  { loc: "/quiz", changefreq: "monthly", priority: "0.7" },
  { loc: "/quiz/guia", changefreq: "monthly", priority: "0.4" },
];

for (const tema of temas) {
  urls.push({ loc: `/tema/${tema.id}`, changefreq: "monthly", priority: "0.5" });
}

for (const setor of setores) {
  urls.push({ loc: `/${setor.id}`, changefreq: "weekly", priority: "0.9" });
}

const candidatosComProposta = new Set();
for (const proposta of propostas) {
  urls.push({
    loc: `/candidato/${proposta.setorId}/${proposta.candidatoId}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: proposta.ultimaAtualizacao,
  });
  candidatosComProposta.add(proposta.candidatoId);
}

for (const candidatoId of candidatosComProposta) {
  urls.push({
    loc: `/candidato/${candidatoId}`,
    changefreq: "monthly",
    priority: "0.6",
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    const lines = [
      `  <url>`,
      `    <loc>${SITE_URL}${url.loc}</loc>`,
      url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : null,
      `    <changefreq>${url.changefreq}</changefreq>`,
      `    <priority>${url.priority}</priority>`,
      `  </url>`,
    ].filter(Boolean);
    return lines.join("\n");
  })
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(publicDir, "sitemap.xml"), xml);
console.log(`sitemap.xml gerado com ${urls.length} URLs.`);
