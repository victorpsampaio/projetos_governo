import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, Routes } from "react-router-dom";
import ConsentBanner from "./components/ConsentBanner";
import TemaToggle from "./components/TemaToggle";
import LandingPage from "./pages/LandingPage";
import Sobre from "./pages/Sobre";
import Privacidade from "./pages/Privacidade";
import ListaCandidatos from "./pages/ListaCandidatos";
import DetalheCandidato from "./pages/DetalheCandidato";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route
          path="/economia"
          element={<ListaCandidatos setorId="economia" />}
        />
        <Route path="/saude" element={<ListaCandidatos setorId="saude" />} />
        <Route
          path="/candidato/:setorId/:candidatoId"
          element={<DetalheCandidato />}
        />
      </Routes>
      <TemaToggle />
      <ConsentBanner />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
