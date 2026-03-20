import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin & Global
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Componentes de Fluxo (Reutilizáveis)
import Checkout from "./pages/Checkout";
import AddAddress from "./pages/AddAddress";
import AddCard from "./pages/AddCard";
import PixPayment from "./pages/PixPayment";

// Páginas de Produto
import AspiradorProductPage from "./products/aspirador-de-po/ProductPage";
import FuradeiraProductPage from "./products/furadeira/ProductPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path="/shopadmin" element={<Admin />} />
          
          {/* Rotas Dinâmicas por Produto (Garante que futuros produtos funcionem) */}
          <Route path="/:productSlug/checkout" element={<Checkout />} />
          <Route path="/:productSlug/endereco" element={<AddAddress />} />
          <Route path="/:productSlug/cartao" element={<AddCard />} />
          <Route path="/:productSlug/pix" element={<PixPayment />} />
          
          {/* Páginas Específicas de Produto */}
          <Route path="/aspirador-de-po" element={<AspiradorProductPage />} />
          <Route path="/furadeira" element={<FuradeiraProductPage />} />
          
          {/* Home */}
          <Route path="/" element={<AspiradorProductPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;