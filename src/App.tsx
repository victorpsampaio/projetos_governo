import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ListaCandidatos from "./pages/ListaCandidatos";
import DetalheCandidato from "./pages/DetalheCandidato";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/economia" element={<ListaCandidatos />} />
      <Route path="/candidato/:candidatoId" element={<DetalheCandidato />} />
    </Routes>
  );
}
