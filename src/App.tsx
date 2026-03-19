import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSummary from "./pages/PaymentSummary";
import PixPayment from "./pages/PixPayment";
import Checkout from "./pages/Checkout";
import AddCard from "./pages/AddCard";
import AddAddress from "./pages/AddAddress";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/adminhavan" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Checkout Routes */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adicionar-cartao" element={<AddCard />} />
          <Route path="/adicionar-endereco" element={<AddAddress />} />
          <Route path="/resumo-pagamento" element={<PaymentSummary />} />
          <Route path="/pix-pagamento" element={<PixPayment />} />
          
          {/* Rota dinâmica para produtos do banco de dados */}
          <Route path="/:slug" element={<Index />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate replace to="/furadeira" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;