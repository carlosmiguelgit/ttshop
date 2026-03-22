import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PixPayment from "./pages/PixPayment";
import AddAddress from "./pages/AddAddress";
import AddCard from "./pages/AddCard";
import Checkout from "./pages/Checkout";
import AspiradorProductPage from "./products/aspirador-de-po/ProductPage";
import FuradeiraProductPage from "./products/furadeira/ProductPage";

const App = () => (
  <BrowserRouter>
    <Toaster position="top-center" richColors />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/aspirador-de-po" element={<AspiradorProductPage />} />
      <Route path="/furadeira" element={<FuradeiraProductPage />} />
      
      {/* Rotas do Aspirador */}
      <Route path="/aspirador-de-po/checkout" element={<Checkout />} />
      <Route path="/aspirador-de-po/endereco" element={<AddAddress />} />
      <Route path="/aspirador-de-po/cartao" element={<AddCard />} />
      <Route path="/aspirador-de-po/pix" element={<PixPayment />} />

      {/* Rotas da Furadeira */}
      <Route path="/furadeira/checkout" element={<Checkout />} />
      <Route path="/furadeira/endereco" element={<AddAddress />} />
      <Route path="/furadeira/cartao" element={<AddCard />} />
      <Route path="/furadeira/pix" element={<PixPayment />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;