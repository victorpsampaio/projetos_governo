import { Route, Routes } from "react-router-dom";
import ListaCandidatos from "./pages/ListaCandidatos";
import DetalheCandidato from "./pages/DetalheCandidato";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaCandidatos />} />
      <Route path="/candidato/:candidatoId" element={<DetalheCandidato />} />
    </Routes>
  );
}
