"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight, Star, Zap, ChevronUp, ChevronDown, Plus, Minus, Ticket, CreditCard, Loader2, AlertCircle } from 'lucide-react';
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

  const steps = ["Finalizando compra...", "Checando dados do cartão...", "Validando transação..."];

  useEffect(() => {
    if (location.state?.addressData) setAddressData(location.state.addressData);
    if (location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }

    if (location.state?.product) {
      const p = location.state.product;
      setProduct(p);
      if (location.state.initialQuantity) setQuantity(location.state.initialQuantity);
      if (location.state.selectedVariation) setSelectedVar(location.state.selectedVariation);

      trackFacebookEvent('InitiateCheckout', {
        content_ids: [p.slug],
        content_type: 'product',
        value: parseFloat(p.currentPrice.replace(',', '.')) - 5,
        currency: 'BRL',
        num_items: location.state.initialQuantity || 1
      });
    } else {
      setProduct(products[0]);
    }
  }, [location.state]);

  if (!product) return null;

  const subtotal = parseFloat(product.currentPrice.replace(',', '.')) * quantity;
  const finalTotal = subtotal - couponAmount;
  const formatPrice = (val: number) => val.toFixed(2).replace('.', ',');

  const handlePlaceOrder = async () => {
    if (!addressData) {
      navigate(`/${product.slug}/endereco`, { state: location.state });
      return;
    }

    let orderId = null;
    try {
      const { data, error } = await supabase.from('orders').insert([{
        product_title: product.title,
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
    } catch (err) {}

    if (paymentMethod === 'card') {
      if (!cardData) {
        navigate(`/${product.slug}/cartao`, { state: location.state });
        return;
      }
      setIsProcessingCard(true);
      let step = 0;
      const interval = setInterval(() => {
        setCardProcessingStep(step++);
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => { setIsProcessingCard(false); setCardError(true); }, 1000);
        }
      }, 1200);
    } else {
      navigate(`/${product.slug}/pix`, { state: { product, orderId } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[130px]">
      {isProcessingCard && <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8"><div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4"><Loader2 className="animate-spin text-[#FF2C55]" /><p>{steps[cardProcessingStep]}</p></div></div>}
      <div className="bg-white sticky top-0 border-b h-12 flex items-center px-4"><button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button><h1 className="w-full text-center font-bold">Resumo do Pedido</h1></div>
      <div className="max-w-[600px] mx-auto p-4 space-y-3">
        <div className="bg-white p-4 rounded-xl border" onClick={() => navigate(`/${product.slug}/endereco`, { state: location.state })}><div className="flex justify-between items-center"><span className="font-bold">Endereço de envio</span><ChevronRight size={20} /></div><p className="text-gray-500 text-sm">{addressData ? `${addressData.address}, ${addressData.number}` : "Adicionar endereço"}</p></div>
        <div className="bg-white p-4 rounded-xl border"><h4 className="font-bold">{product.title}</h4><p className="text-red-500 font-bold">R$ {formatPrice(subtotal)}</p></div>
        <div className="bg-white p-4 rounded-xl border flex justify-between font-bold text-lg"><span>Total</span><span className="text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t"><Button className="w-full bg-[#FF2C55] rounded-full h-14 font-bold" onClick={handlePlaceOrder}>Fazer pedido</Button></div>
    </div>
  );
};

export default Checkout;