export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnailSrc: string;
}

// O tipo Product será importado do src/data/products.ts
// export interface Product { ... }
</dyad-file>

<dyad-write path="src/App.tsx" description="Revertendo as rotas para o estado original.">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
          
          {/* Redireciona a rota raiz para o produto padrão (patinete) */}
          <Route path="/" element={<Navigate replace to="/produto/patinete-eletrico-scooter-bluetooth" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;