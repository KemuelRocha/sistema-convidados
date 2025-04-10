import { Routes, Route, Navigate } from "react-router-dom";
import Apresentacao from "./pages/Apresentacao";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Atualizacao from "./pages/Atualizacao";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/atualizacao" element={<Atualizacao />} />
      <Route path="/apresentacao" element={<Apresentacao />} />
    </Routes>
  );
}
