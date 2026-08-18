export const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as
  | string
  | undefined;

let scriptCarregado = false;

export function adsenseConfigurado(): boolean {
  return Boolean(ADSENSE_CLIENT_ID);
}

export function carregarScriptAdSense(): void {
  if (scriptCarregado || !ADSENSE_CLIENT_ID) return;
  scriptCarregado = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}
