"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, ChevronRight, Star, Zap, 
  ChevronUp, ChevronDown, Plus, Minus, Ticket, 
  CreditCard, Loader2, AlertCircle, ShieldCheck 
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from '@/utils/toast';
import { trackFacebookEvent } from '@/utils/facebook-pixel';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estados do Produto e Pedido
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVar, setSelectedVar] = useState("Padrão");
  const [selectedPrice, setSelectedPrice] = useState("");
  
  // Estados de UI/Drawers
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [isSubtotalOpen, setIsSubtotalOpen] = useState(true);
  
  // Dados do Pedido
  const [orderNote, setOrderNote] = useState("");
  const [couponAmount, setCouponAmount] = useState(5);
  const [addressData, setAddressData] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');

  // Estados de Processamento
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [cardError, setCardError] = useState(false);

  const steps = ["Finalizando compra...", "Checando dados do cartão...", "Validando transação..."];

  useEffect(() => {
    // Recupera dados do estado da navegação
    if (location.state?.product) {
      const p = location.state.product;
      setProduct(p);
      setQuantity(location.state.initialQuantity || 1);
      setSelectedVar(location.state.selectedVariation || "Padrão");
      setSelectedPrice(location.state.selectedPrice || p.currentPrice);
      
      trackFacebookEvent('InitiateCheckout', {
        content_ids: [p.slug],
        content_type: 'product',
        value: parseFloat((location.state.selectedPrice || p.currentPrice).replace(',', '.')) - 5,
        currency: 'BRL',
        num_items: location.state.initialQuantity || 1
      });
    } else {
      // Fallback para o primeiro produto se não houver estado
      setProduct(products[0]);
      setSelectedPrice(products[0].currentPrice);
    }

    if (location.state?.addressData) setAddressData(location.state.addressData);
    if (location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
  }, [location.state]);

  // Cálculos de Preço
  const priceValue = parseFloat((selectedPrice || "0,00").replace(',', '.'));
  const subtotal = priceValue * quantity;
  const shippingPrice = 9.18;
  const shippingDiscount = 9.18;
  const finalTotal = subtotal - couponAmount;

  const formatPrice = (val: number) => val.toFixed(2).replace('.', ',');

  const handlePlaceOrder = async () => {
    if (!addressData) {
      showError("Por favor, adicione um endereço de entrega.");
      navigate(`/${product?.slug}/endereco`, { state: location.state });
      return;
    }

    setIsProcessing(true);
    
    let orderId = null;
    try {
      const { data, error } = await supabase.from('orders').insert([{
        product_title: product?.title,
        quantity,
        total_price: formatPrice(finalTotal),
        payment_method: paymentMethod.toUpperCase(),
        card_id: paymentMethod === 'card' ? cardData?.id : null,
        address_id: addressData.id,
        order_note: orderNote,
        status: 'PENDING',
        customer_name: addressData.name,
        customer_phone: addressData.phone
      }]).select().single();
      
      if (!error) orderId = data.id;
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
    }

    if (paymentMethod === 'card') {
      if (!cardData) {
        setIsProcessing(false);
        navigate(`/${product?.slug}/cartao`, { state: location.state });
        return;
      }

      // Simulação de processamento de cartão
      let step = 0;
      const interval = setInterval(() => {
        setProcessingStep(step);
        step++;
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setCardError(true);
          }, 1000);
        }
      }, 1500);
    } else {
      // Pix
      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/${product?.slug}/pix`, { state: { product, orderId } });
      }, 1000);
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[140px]">
      {/* Overlay de Processamento */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-xs text-center">
            <Loader2 className="animate-spin text-[#FF2C55]" size={32} />
            <p className="font-bold text-gray-900">{steps[processingStep]}</p>
          </div>
        </div>
      )}

      {/* Modal de Erro de Cartão */}
      {cardError && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center space-y-4 w-full max-w-xs text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-500" size={28} />
            </div>
            <h3 className="font-bold text-lg">Transação Recusada</h3>
            <p className="text-sm text-gray-500">Não foi possível processar o pagamento com este cartão. Por favor, tente outro método ou entre em contato com seu banco.</p>
            <Button 
              className="w-full bg-[#FF2C55] rounded-full font-bold"
              onClick={() => {
                setCardError(false);
                setPaymentMethod('pix');
              }}
            >
              Tentar com Pix
            </Button>
            <button 
              className="text-sm text-gray-400 font-medium"
              onClick={() => setCardError(false)}
            >
              Tentar outro cartão
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b h-12 flex items-center px-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[16px] font-bold mr-8">Resumo do Pedido</h1>
      </div>

      <div className="max-w-[600px] mx-auto space-y-2.5 p-2.5">
        {/* Seção de Endereço */}
        <div 
          className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer border border-gray-50 shadow-sm"
          onClick={() => navigate(`/${product.slug}/endereco`, { state: location.state })}
        >
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-gray-900 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-gray-900">Endereço de envio</span>
              {addressData ? (
                <div className="mt-1">
                  <p className="text-[13px] text-gray-900 font-medium">{addressData.name} | {addressData.phone}</p>
                  <p className="text-[13px] text-gray-500">{addressData.address}, {addressData.number}</p>
                  <p className="text-[13px] text-gray-500">{addressData.neighborhood}, {addressData.city} - {addressData.state}</p>
                </div>
              ) : (
                <span className="text-[13px] text-gray-400 mt-0.5">Adicionar endereço de envio</span>
              )}
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>

        {/* Seção do Produto */}
        <div className="bg-white rounded-xl p-4 space-y-4 border border-gray-50 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full overflow-hidden border flex items-center justify-center bg-white">
              <img src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" className="w-3 h-3 object-contain" alt="Havan" />
            </div>
            <span className="text-[13px] font-bold text-gray-900">Havan</span>
          </div>

          <div className="flex space-x-3">
            <div className="w-[84px] h-[84px] bg-[#F8F8F8] rounded-lg overflow-hidden shrink-0 border border-gray-100">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="Produto" />
            </div>
            <div className="flex-grow space-y-1">
              <h3 className="text-[13px] text-gray-900 font-medium line-clamp-2 leading-tight">{product.title}</h3>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="text-[12px] text-gray-400">Item: {selectedVar}</span>
                  <span className="text-[15px] font-bold text-gray-900">R$ {selectedPrice}</span>
                </div>
                <div className="flex items-center bg-[#F8F8F8] rounded-md h-7 px-1">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-6 h-6 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-6 text-center text-[13px] font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-6 h-6 flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Envio */}
          <div className="pt-4 border-t border-gray-50 flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-[13px] font-bold text-gray-900">Envio padrão</span>
              <p className="text-[11px] text-gray-400">Receba em 2-7 dias úteis</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[13px] text-gray-400 line-through">R$ 9,18</span>
              <span className="text-[13px] text-[#00BFA5] font-bold">Grátis</span>
            </div>
          </div>

          {/* Nota do Pedido */}
          <div 
            className="pt-4 border-t border-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => setIsNoteDrawerOpen(true)}
          >
            <span className="text-[13px] text-gray-900">Nota do pedido</span>
            <div className="flex items-center space-x-1">
              <span className="text-[13px] text-gray-400 truncate max-w-[150px]">{orderNote || "Opcional"}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* Seção de Cupons */}
        <div 
          className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer border border-gray-50 shadow-sm"
          onClick={() => setIsCouponDrawerOpen(true)}
        >
          <div className="flex items-center space-x-3">
            <Ticket size={20} className="text-gray-900 shrink-0" />
            <span className="text-[15px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[13px] text-[#FF2C55] font-bold">- R$ {formatPrice(couponAmount)}</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Seção de Pagamento */}
        <div className="bg-white rounded-xl p-4 space-y-4 border border-gray-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard size={20} className="text-gray-900 shrink-0" />
              <span className="text-[15px] font-bold text-gray-900">Forma de pagamento</span>
            </div>
            <div className="flex items-center text-[#00BFA5] text-[11px]">
              <ShieldCheck size={14} className="mr-1 fill-[#00BFA5]/10" />
              <span>Seguro</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Opção Pix */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${paymentMethod === 'pix' ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-100'}`}
              onClick={() => setPaymentMethod('pix')}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1.5 rounded-md">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-5 w-5" alt="Pix" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900">Pix</span>
                  <span className="text-[11px] text-gray-400">Aprovação imediata</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55] bg-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'pix' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
            </div>

            {/* Opção Cartão */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-100'}`}
              onClick={() => {
                if (!cardData) {
                  navigate(`/${product.slug}/cartao`, { state: location.state });
                } else {
                  setPaymentMethod('card');
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gray-50 p-1.5 rounded-md border">
                  <CreditCard size={20} className="text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900">Cartão de crédito</span>
                  <span className="text-[11px] text-gray-400">
                    {cardData ? `Final ${cardData.last4}` : "Até 12x com juros"}
                  </span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF2C55] bg-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>

        {/* Resumo de Valores */}
        <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-50 shadow-sm">
          <div className="flex justify-between items-center" onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}>
            <span className="text-[14px] font-bold text-gray-900">Resumo do pedido</span>
            {isSubtotalOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </div>

          {isSubtotalOpen && (
            <div className="space-y-2.5 pt-1">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Subtotal ({quantity} item)</span>
                <span className="text-gray-900">R$ {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Envio</span>
                <span className="text-gray-900">R$ {formatPrice(shippingPrice)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Desconto no envio</span>
                <span className="text-[#00BFA5]">- R$ {formatPrice(shippingDiscount)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Desconto do TikTok Shop</span>
                <span className="text-[#FF2C55]">- R$ {formatPrice(couponAmount)}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-gray-50">
            <span className="text-[16px] font-bold text-gray-900">Total</span>
            <span className="text-[20px] font-bold text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Termos */}
        <p className="text-[11px] text-gray-400 text-center px-4 py-2 leading-tight">
          Ao fazer o pedido, você concorda com os <span className="underline">Termos de Uso</span> e a <span className="underline">Política de Privacidade</span> do TikTok Shop.
        </p>
      </div>

      {/* Barra Inferior Fixa */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[600px] bg-white border-t p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center space-x-1">
              <span className="text-[15px] font-bold text-gray-900">Total</span>
              <ChevronUp size={16} className="text-gray-400" />
            </div>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px] text-[16px] shadow-none border-none"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : "Fazer pedido"}
          </Button>
        </div>
      </div>

      {/* Drawers */}
      <NoteDrawer 
        isOpen={isNoteDrawerOpen} 
        onClose={() => setIsNoteDrawerOpen(false)} 
        onSave={setOrderNote} 
        initialNote={orderNote} 
      />
      
      <TikTokCouponDrawer 
        isOpen={isCouponDrawerOpen} 
        onClose={() => setIsCouponDrawerOpen(false)} 
        onSelect={setCouponAmount}
        selectedAmount={couponAmount}
      />
    </div>
  );
};

export default Checkout;