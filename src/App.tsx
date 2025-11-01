import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useAnalytics } from "./hooks/useAnalytics"; // Importando o hook

const queryClient = new QueryClient();

// Componente auxiliar para garantir que o hook useAnalytics seja chamado dentro do BrowserRouter
const AnalyticsTracker = () => {
  useAnalytics();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker /> {/* Chamando o rastreador aqui */}
        <Routes>
          {/* Rota dinâmica para a página de detalhes do produto */}
          <Route path="/produto/:slug" element={<Index />} />
          
          {/* Redireciona a rota raiz para o produto padrão (TV) */}
          <Route path="/" element={<Navigate replace to="/produto/tv-tcl-55" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;