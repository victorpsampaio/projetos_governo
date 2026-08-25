import { SITE_URL } from "./seo";
import type { Candidato } from "../types";

export interface ItemCompartilhavel {
  candidato: Candidato;
  pontuacao: number;
}

const LARGURA = 1080;
const ALTURA = 1350;

function corCss(variavel: string, fallback: string): string {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(variavel)
    .trim();
  return valor || fallback;
}

function iniciais(nome: string): string {
  const partes = nome.split(" ").filter(Boolean);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

function carregarImagem(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function retanguloArredondado(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  largura: number,
  altura: number,
  raio: number,
) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, largura, altura, raio);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + raio, y);
  ctx.arcTo(x + largura, y, x + largura, y + altura, raio);
  ctx.arcTo(x + largura, y + altura, x, y + altura, raio);
  ctx.arcTo(x, y + altura, x, y, raio);
  ctx.arcTo(x, y, x + largura, y, raio);
  ctx.closePath();
}

function fonteAjustada(
  ctx: CanvasRenderingContext2D,
  texto: string,
  larguraMax: number,
  tamanhoInicial: number,
  familia: string,
  peso = 700,
): string {
  let tamanho = tamanhoInicial;
  while (tamanho > 22) {
    const fonte = `${peso} ${tamanho}px "${familia}"`;
    ctx.font = fonte;
    if (ctx.measureText(texto).width <= larguraMax) return fonte;
    tamanho -= 2;
  }
  return `${peso} 22px "${familia}"`;
}

function desenharAvatar(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  nome: string,
  x: number,
  y: number,
  raio: number,
  corFundo: string,
  corTexto: string,
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (img) {
    const escala = Math.max((raio * 2) / img.width, (raio * 2) / img.height);
    const larguraDesenho = img.width * escala;
    const alturaDesenho = img.height * escala;
    ctx.drawImage(
      img,
      x - larguraDesenho / 2,
      y - alturaDesenho / 2,
      larguraDesenho,
      alturaDesenho,
    );
  } else {
    ctx.fillStyle = corFundo;
    ctx.fillRect(x - raio, y - raio, raio * 2, raio * 2);
    ctx.fillStyle = corTexto;
    ctx.font = `700 ${raio * 0.8}px "Space Grotesk"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(iniciais(nome), x, y + raio * 0.05);
  }
  ctx.restore();
}

export async function gerarImagemResultado(
  top3: ItemCompartilhavel[],
): Promise<Blob | null> {
  if (typeof document === "undefined" || top3.length === 0) return null;

  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const corBg = corCss("--bg", "#131217");
  const corSurface = corCss("--surface", "#1c1a24");
  const corBorder = corCss("--border", "#2c2938");
  const corBrand = corCss("--brand", "#a78bfa");
  const corBrandSoft = corCss("--brand-soft", "#2a2340");
  const corTexto = corCss("--text", "#f1eef7");
  const corTextoSoft = corCss("--text-soft", "#a39fb0");

  const gradiente = ctx.createLinearGradient(0, 0, 0, ALTURA);
  gradiente.addColorStop(0, corBg);
  gradiente.addColorStop(1, corSurface);
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  const margem = 72;

  ctx.fillStyle = corBrand;
  ctx.font = '600 30px "IBM Plex Mono"';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("QUIZ DE PROXIMIDADE", margem, 140);

  ctx.fillStyle = corTexto;
  ctx.font = '700 64px "Space Grotesk"';
  ctx.fillText("Candidatos 2026", margem, 220);

  const imagens = await Promise.all(
    top3.map((item) =>
      item.candidato.foto
        ? carregarImagem(item.candidato.foto.url)
        : Promise.resolve(null),
    ),
  );

  const raioAvatar = 70;
  const alturaLinha = 260;
  let y = 380;

  top3.forEach((item, i) => {
    const centroY = y + raioAvatar;
    const cardX = margem - 24;
    const cardY = y - 24;
    const cardLargura = LARGURA - margem * 2 + 48;
    const cardAltura = raioAvatar * 2 + 48;

    ctx.fillStyle = corSurface;
    ctx.strokeStyle = corBorder;
    ctx.lineWidth = 2;
    retanguloArredondado(ctx, cardX, cardY, cardLargura, cardAltura, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = corBrandSoft;
    ctx.beginPath();
    ctx.arc(margem + 24, cardY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = corBrand;
    ctx.font = '700 22px "IBM Plex Mono"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(i + 1), margem + 24, cardY + 1);

    const xAvatar = margem + 24 + raioAvatar + 56;
    desenharAvatar(
      ctx,
      imagens[i],
      item.candidato.nome,
      xAvatar,
      centroY,
      raioAvatar,
      corBrandSoft,
      corBrand,
    );

    const xTexto = xAvatar + raioAvatar + 44;
    const larguraTexto = LARGURA - margem - 24 - 170 - xTexto;

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = corTexto;
    ctx.font = fonteAjustada(
      ctx,
      item.candidato.nome,
      larguraTexto,
      40,
      "Space Grotesk",
    );
    ctx.fillText(item.candidato.nome, xTexto, centroY - 6);

    ctx.fillStyle = corTextoSoft;
    ctx.font = '400 26px "Public Sans"';
    ctx.fillText(item.candidato.partido, xTexto, centroY + 34);

    ctx.fillStyle = corBrand;
    ctx.font = '700 56px "Space Grotesk"';
    ctx.textAlign = "right";
    ctx.fillText(`${item.pontuacao}%`, LARGURA - margem - 24, centroY + 16);

    y += alturaLinha;
  });

  const rodapeY = ALTURA - 160;
  ctx.strokeStyle = corBorder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margem, rodapeY);
  ctx.lineTo(LARGURA - margem, rodapeY);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = corTextoSoft;
  ctx.font = '400 24px "Public Sans"';
  ctx.fillText(
    "Proximidade textual com posições documentadas — não é indicação de voto.",
    margem,
    rodapeY + 50,
  );

  ctx.fillStyle = corBrand;
  ctx.font = '600 30px "IBM Plex Mono"';
  ctx.fillText(SITE_URL.replace("https://", ""), margem, rodapeY + 100);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export function mensagemCompartilhamento(): string {
  return `Descobri minha proximidade com os candidatos à Presidência 2026 — faça o seu teste também: ${SITE_URL}/quiz`;
}

export function linkWhatsApp(): string {
  return `https://wa.me/?text=${encodeURIComponent(mensagemCompartilhamento())}`;
}

export function linkX(): string {
  const texto =
    "Descobri minha proximidade com os candidatos à Presidência 2026 — faça o seu teste também:";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(`${SITE_URL}/quiz`)}`;
}
