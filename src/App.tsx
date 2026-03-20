import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin & Global
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Produto: Aspirador de Pó
import AspiradorIndex from "./products/aspirador-de-po/ProductPage";
import AspiradorCheckout from "./products/aspirador-de-po/CheckoutPage";
import AspiradorAddress from "./products/aspirador-de-po/AddAddressPage";
import AspiradorCard from "./products/aspirador-de-po/AddCardPage";
import AspiradorPix from "./products/aspirador-de-po/PixPaymentPage";

// Produto: Furadeira
import FuradeiraIndex from "./products/furadeira/ProductPage";
import FuradeiraCheckout from "./products/furadeira/CheckoutPage";
import FuradeiraAddress from "./products/furadeira/AddAddressPage";
import FuradeiraCard from "./products/furadeira/AddCardPage";
import FuradeiraPix from "./products/furadeira/PixPaymentPage";

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
          <Route path="/aspirador-de-po/endereco" element={<AspiradorAddress />} />
          <Route path="/aspirador-de-po/cartao" element={<AspiradorCard />} />
          <Route path="/aspirador-de-po/pix" element={<AspiradorPix />} />
          
          {/* Fluxo Furadeira */}
          <Route path="/furadeira" element={<FuradeiraIndex />} />
          <Route path="/furadeira/checkout" element={<FuradeiraCheckout />} />
          <Route path="/furadeira/endereco" element={<FuradeiraAddress />} />
          <Route path="/furadeira/cartao" element={<FuradeiraCard />} />
          <Route path="/furadeira/pix" element={<FuradeiraPix />} />
          
          {/* Home */}
          <Route path="/" element={<AspiradorIndex />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;