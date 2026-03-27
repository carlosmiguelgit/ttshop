import React, { useEffect, useState } from "react";
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

const App = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|iphone|kindle|ipad|playbook|silk/i;
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth < 768;
      
      if (!isMobileDevice) {
        // Redireciona para a página "white" se não for mobile
        window.location.href = '/checkout.html';
      } else {
        setIsMobile(true);
      }
    };

    checkDevice();
  }, []);

  // Enquanto verifica o dispositivo, não renderiza nada para evitar "flash" de conteúdo
  if (isMobile === null) {
    return <div className="min-h-screen bg-white" />;
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