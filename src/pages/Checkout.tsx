"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Ticket, 
  Star, 
  Zap, 
  CheckCircle2, 
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [locationStr, setLocationStr] = useState("Carregando localização...");
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/');
    }

    // Busca localização por IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const city = data.city || "";
        const region = data.region_code || "";
        const neighborhood = data.org?.split(' ')[0] || "Bairro";
        setLocationStr(`${neighborhood}, ${city} - ${region}`);
      })
      .catch(() => setLocationStr("Centro, São Paulo - SP"));
  }, [location, navigate]);

  if (!product) return null;

  // Cálculos baseados na imagem
  const unitPrice = 37.82;
  const originalUnitPrice = 57.12;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalUnitPrice * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const couponDiscount = 5.00;
  const finalTotal = subtotal - couponDiscount;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[120px]">
      {/* Header */}
      <div className="bg-white border-b h-14 flex flex-col items-center justify-center sticky top-0 z-50 px-4">
        <div className="w-full flex items-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div className="w-full text-center">
            <h1 className="text-[17px] font-bold text-gray-900">Resumo do Pedido</h1>
            <div className="flex items-center justify-center text-[#00BFA5] text-[10px] mt-0.5">
              <ShieldCheck size={12} className="mr-1 fill-[#00BFA5]/10" />
              <span>Seus dados estão seguros conosco</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Endereço */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <div>
              <span className="text-[14px] text-gray-900 font-medium">Endereço de envio</span>
              <p className="text-[12px] text-gray-400 font-normal">{locationStr}</p>
            </div>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium">+ Adicionar endereço</button>
        </div>

        {/* Card do Produto */}
        <div className="bg-white mt-3 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[13px] font-bold text-gray-900">MAIS MAKE BRASIL</h3>
            <button 
              className="flex items-center text-[12px] text-gray-400"
              onClick={() => setIsNoteDrawerOpen(true)}
            >
              {orderNote ? <span className="truncate max-w-[100px] mr-1">{orderNote}</span> : "Adicionar nota"}
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>

          <div className="flex items-center space-x-1 mb-3">
            <Star size={12} className="text-[#A0783A] fill-[#A0783A]" />
            <span className="text-[11px] text-[#A0783A] font-medium">
              Melhor escolha! 28.0K vendido(s) e com nota 4.8/5,0
            </span>
          </div>

          <div className="flex space-x-3">
            <div className="w-[88px] h-[88px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="Produto" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-[13px] text-gray-900 line-clamp-2 leading-snug mb-0.5">
                  {product.title}
                </h4>
                <p className="text-[11px] text-gray-400 mb-1">SEM faixa e polvo</p>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  <div className="bg-[#FFF1F3] text-[#FF2C55] text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center">
                    <Zap size={10} className="mr-0.5 fill-[#FF2C55]" />
                    Oferta Relâmpago
                  </div>
                  <div className="bg-[#FFF9E6] text-[#FFA800] text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center">
                    <CheckCircle2 size={10} className="mr-0.5" />
                    Devolução gratuita
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="text-[16px] font-bold text-[#FF2C55]">R$ {unitPrice.toFixed(2).replace('.', ',')}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#FF2C55]"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor"/></svg>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] text-gray-400 line-through">R$ {originalUnitPrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-[10px] text-[#FF2C55] font-bold bg-[#FFF1F3] px-1 rounded-sm">-34%</span>
                  </div>
                </div>

                {/* Seletor Qtd */}
                <div className="flex items-center bg-[#F1F1F1] rounded-sm h-7">
                  <button 
                    className="w-8 h-full flex items-center justify-center text-gray-500"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-medium border-x border-white">{quantity}</span>
                  <button 
                    className="w-8 h-full flex items-center justify-center text-gray-500"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desconto TikTok */}
        <div className="bg-white mt-3 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-[#FF2C55]">
              <Ticket size={20} className="rotate-[-10deg]" />
            </div>
            <span className="text-[14px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center text-[#FF2C55] space-x-1">
            <span className="text-[13px] font-medium">- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-white mt-3 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1.5">
                <span className="text-[14px] text-gray-900 font-bold">Subtotal do produto</span>
                <ChevronUp size={16} className="text-gray-900" />
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <div className="flex justify-between items-center pl-4">
              <span className="text-[13px] text-gray-500">Preço original</span>
              <span className="text-[13px] text-gray-900">R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-[13px] text-gray-500">Desconto no produto</span>
              <span className="text-[13px] text-[#FF2C55]">- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-[13px] text-gray-500">Cupons do TikTok Shop</span>
              <span className="text-[13px] text-[#FF2C55]">- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="pt-2 flex flex-col items-end">
              <div className="flex items-center space-x-4 w-full justify-between">
                <span className="text-[16px] font-bold text-gray-900">Total</span>
                <span className="text-[16px] font-bold text-gray-900">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <span className="text-[11px] text-gray-400 mt-0.5">Impostos inclusos</span>
            </div>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="bg-white mt-3 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4">Forma de pagamento</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-1 rounded-sm border">
                <Plus size={14} className="text-gray-400" />
              </div>
              <span className="text-[14px] text-gray-900 font-medium">Cartão de crédito</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
          <div className="flex gap-2 mt-3 ml-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
            <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" alt="Visa" />
            <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-4" alt="Elo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4" alt="Amex" />
          </div>
        </div>

        {/* Faixa Economia */}
        <div className="bg-[#FFF1F3] p-3 flex items-center space-x-2 mt-3 mb-4">
          <span className="text-[14px]">😊</span>
          <span className="text-[12px] text-[#FF2C55] font-medium">
            Você está economizando R$ {(discountTotal + couponDiscount).toFixed(2).replace('.', ',')} nesse pedido.
          </span>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex flex-col items-center z-50">
        <div className="w-full max-w-[600px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[15px] font-bold text-gray-900">Total ({quantity} item)</span>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px] flex flex-col items-center justify-center border-none shadow-none"
            onClick={() => navigate('/pix-pagamento', { state: { product } })}
          >
            <span className="text-[16px] leading-tight">Fazer pedido</span>
            <span className="text-[11px] font-medium opacity-90 mt-0.5">O cupom expira em 02:43:46</span>
          </Button>
        </div>
      </div>

      <NoteDrawer 
        isOpen={isNoteDrawerOpen} 
        onClose={() => setIsNoteDrawerOpen(false)} 
        onSave={setOrderNote}
        initialNote={orderNote}
      />
    </div>
  );
};

export default Checkout;