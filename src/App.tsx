import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import AspiradorProductPage from "./products/aspirador-de-po/ProductPage";
import FuradeiraProductPage from "./products/furadeira/ProductPage";
import Checkout from "./pages/Checkout";
import AddCard from "./pages/AddCard";
import AddAddress from "./pages/AddAddress";
import PixPayment from "./pages/PixPayment";
import Admin from "./pages/Admin";
import PaymentSummary from "./pages/PaymentSummary";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Rotas Aspirador */}
        <Route path="/aspirador-de-po" element={<AspiradorProductPage />} />
        <Route path="/aspirador-de-po/checkout" element={<Checkout />} />
        <Route path="/aspirador-de-po/cartao" element={<AddCard />} />
        <Route path="/aspirador-de-po/endereco" element={<AddAddress />} />
        <Route path="/aspirador-de-po/pix" element={<PixPayment />} />
        
        {/* Rotas Furadeira */}
        <Route path="/furadeira" element={<FuradeiraProductPage />} />
        <Route path="/furadeira/checkout" element={<Checkout />} />
        <Route path="/furadeira/cartao" element={<AddCard />} />
        <Route path="/furadeira/endereco" element={<AddAddress />} />
        <Route path="/furadeira/pix" element={<PixPayment />} />

        {/* Rotas Gerais */}
        <Route path="/resumo-pagamento" element={<PaymentSummary />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Fallback */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;