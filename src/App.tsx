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
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Checkout Routes */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adicionar-cartao" element={<AddCard />} />
          <Route path="/adicionar-endereco" element={<AddAddress />} />
          <Route path="/resumo-pagamento" element={<PaymentSummary />} />
          <Route path="/pix-pagamento" element={<PixPayment />} />
          
          {/* Admin Route */}
          <Route path="/shopadmin" element={<Admin />} />
          
          {/* Main Product Page */}
          <Route path="/" element={<Index />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;