import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSummary from "./pages/PaymentSummary";
import PixPayment from "./pages/PixPayment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota dinâmica para a página de detalhes do produto */}
          <Route path="/produto/:slug" element={<Index />} />

          {/* Rota para o resumo de pagamento */}
          <Route path="/resumo-pagamento" element={<PaymentSummary />} />

          {/* Rota para pagamento PIX */}
          <Route path="/pix-pagamento" element={<PixPayment />} />

          {/* Redireciona a rota raiz para o novo produto padrão (furadeira/parafusadeira) */}
          <Route path="/" element={<Navigate replace to="/produto/parafusadeira-furadeira-completa-com-maleta-2-baterias" />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;