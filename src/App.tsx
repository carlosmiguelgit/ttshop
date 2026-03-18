import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSummary from "./pages/PaymentSummary";
import PixPayment from "./pages/PixPayment";
import Checkout from "./pages/Checkout";
import AddCard from "./pages/AddCard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/produto/:slug" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adicionar-cartao" element={<AddCard />} />
          <Route path="/resumo-pagamento" element={<PaymentSummary />} />
          <Route path="/pix-pagamento" element={<PixPayment />} />
          <Route path="/" element={<Navigate replace to="/produto/parafusadeira-furadeira-completa-com-maleta-2-baterias" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;