import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSummary from "./pages/PaymentSummary";
import PixPayment from "./pages/PixPayment";
import Checkout from "./pages/Checkout";
import AddCard from "./pages/AddCard";
import AddAddress from "./pages/AddAddress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            textAlign: 'center',
            backdropFilter: 'blur(4px)',
            maxWidth: 'fit-content',
            margin: '0 auto',
            top: '40vh'
          },
          className: 'tiktok-toast'
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* A raiz agora é a página do produto principal */}
          <Route path="/" element={<Index />} />
          <Route path="/produto/:slug" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adicionar-cartao" element={<AddCard />} />
          <Route path="/adicionar-endereco" element={<AddAddress />} />
          <Route path="/resumo-pagamento" element={<PaymentSummary />} />
          <Route path="/pix-pagamento" element={<PixPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;