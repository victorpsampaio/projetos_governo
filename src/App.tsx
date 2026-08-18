import { Route, Routes } from "react-router-dom";
import ConsentBanner from "./components/ConsentBanner";
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
        <Route path="/economia" element={<ListaCandidatos />} />
        <Route path="/candidato/:candidatoId" element={<DetalheCandidato />} />
      </Routes>
      <ConsentBanner />
    </>
  );
}
