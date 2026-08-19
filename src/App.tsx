import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, Routes } from "react-router-dom";
import ConsentBanner from "./components/ConsentBanner";
import TemaToggle from "./components/TemaToggle";
import ScrollParaTopo from "./components/ScrollParaTopo";
import LandingPage from "./pages/LandingPage";
import Sobre from "./pages/Sobre";
import Privacidade from "./pages/Privacidade";
import ListaCandidatos from "./pages/ListaCandidatos";
import DetalheCandidato from "./pages/DetalheCandidato";
import PerfilCandidato from "./pages/PerfilCandidato";
import Busca from "./pages/Busca";

export default function App() {
  return (
    <>
      <ScrollParaTopo />
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
        <Route path="/candidato/:candidatoId" element={<PerfilCandidato />} />
        <Route path="/busca" element={<Busca />} />
      </Routes>
      <TemaToggle />
      <ConsentBanner />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
