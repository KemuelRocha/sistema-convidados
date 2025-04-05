import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Apresentacao from "./pages/Apresentacao";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Atualizacao from "./pages/Atualizacao";
import Estatisticas from "./pages/Estatisticas";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/atualizacao" element={<Atualizacao />} />
        <Route path="/apresentacao" element={<Apresentacao />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
      </Routes>
    </Router>
  );
}
