import { useEffect } from "react";
import { ADSENSE_CLIENT_ID, adsenseConfigurado } from "../lib/adsense";

interface AdSlotProps {
  slot: string;
}

export default function AdSlot({ slot }: AdSlotProps) {
  useEffect(() => {
    if (!adsenseConfigurado()) return;
    try {
      (
        window as typeof window & { adsbygoogle?: unknown[] }
      ).adsbygoogle ??= [];
      (
        window as typeof window & { adsbygoogle: unknown[] }
      ).adsbygoogle.push({});
    } catch {
      // Anúncio ainda não carregou (ex: sem consentimento) — sem problema,
      // tenta de novo na próxima renderização deste componente.
    }
  }, []);

  if (!adsenseConfigurado()) return null;

  return (
    <div className="ad-slot">
      <span className="ad-slot-rotulo">
        Publicidade — assim tento tirar uma renda do tráfego do site.
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
