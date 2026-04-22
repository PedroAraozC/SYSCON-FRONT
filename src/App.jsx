// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Movimientos from "./pages/Movimientos";
import Caja from "./pages/Caja";
import Categorias from "./pages/Categorias";
import MetodosDePago from "./pages/MetodosDePago";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/Caja" element={<Caja />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/MetodosDePago" element={<MetodosDePago />} />
      </Routes>
    </BrowserRouter>
  );
}
