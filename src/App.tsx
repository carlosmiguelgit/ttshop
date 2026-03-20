import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin & Global
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Produto: Aspirador de Pó
import AspiradorIndex from "./products/aspirador-de-po/ProductPage";
import AspiradorCheckout from "./products/aspirador-de-po/CheckoutPage";
// Nota: Você pode criar AddCardPage, AddAddressPage e PixPaymentPage dentro da pasta do produto conforme necessário

// Produto: Furadeira
import FuradeiraIndex from "./products/furadeira/ProductPage";

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
          
          {/* Fluxo Aspirador de Pó */}
          <Route path="/aspirador-de-po" element={<AspiradorIndex />} />
          <Route path="/aspirador-de-po/checkout" element={<AspiradorCheckout />} />
          
          {/* Fluxo Furadeira */}
          <Route path="/furadeira" element={<FuradeiraIndex />} />
          
          {/* Home (Redireciona para o primeiro produto ou lista) */}
          <Route path="/" element={<AspiradorIndex />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;