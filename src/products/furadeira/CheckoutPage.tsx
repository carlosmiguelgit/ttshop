"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight, Plus, Minus, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { showError } from '@/utils/toast';

const FuradeiraCheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const product = {
    title: "DEWALT Parafusadeira e Furaderia de Impacto de 1/2 Pol. (13mm) Brushless Motor a Bateria 20V MAX* Ion-Litio com 2 Baterias 2.0Ah Carregador Bivolt e Mala DCD7781D2",
    media: [{ src: "https://m.media-amazon.com/images/I/51NuTLIhp7L._AC_SX679_.jpg" }]
  };

  const [quantity, setQuantity] = useState(location.state?.initialQuantity || 1);
  const [addressData, setAddressData] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: addr } = await supabase.from('addresses').select('*').order('created_at', { ascending: false }).limit(1);
      if (addr?.length) setAddressData(addr[0]);
      const { data: cards } = await supabase.from('cards').select('*').order('created_at', { ascending: false }).limit(1);
      if (cards?.length) { setCardData(cards[0]); setPaymentMethod('card'); }
    };
    fetchData();
  }, []);

  const finalTotal = (97.94 * quantity) - 5;

  const handlePlaceOrder = async () => {
    if (!addressData) { navigate('/furadeira/endereco'); return; }
    if (paymentMethod === 'pix') { navigate('/furadeira/pix', { state: { product, total: finalTotal } }); }
    else {
      if (!cardData) { navigate('/furadeira/cartao'); return; }
      setIsProcessing(true);
      setTimeout(() => { setIsProcessing(false); showError("Pagamento recusado pela operadora."); }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[100px]">
      <div className="bg-white h-12 flex items-center px-4 border-b sticky top-0 z-50">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1 className="flex-grow text-center font-bold">Resumo do Pedido</h1>
      </div>
      <div className="max-w-[600px] mx-auto p-4 space-y-3">
        <div className="bg-white p-4 rounded-xl flex items-center justify-between" onClick={() => navigate('/furadeira/endereco')}>
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-[#00BFA5]" />
            <span className="text-[14px] font-bold">{addressData ? addressData.address : "Adicionar endereço"}</span>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>
        <div className="bg-white p-4 rounded-xl space-y-4">
          <div className="flex space-x-3">
            <img src={product.media[0].src} className="w-20 h-20 rounded-lg border object-contain" />
            <div className="flex-grow">
              <h4 className="text-[14px] font-bold line-clamp-2">{product.title}</h4>
              <div className="flex justify-between items-end mt-2">
                <span className="text-[18px] font-bold text-[#FF2C55]">R$ 97,94</span>
                <div className="flex items-center bg-[#F1F1F1] rounded-md h-8">
                  <button className="px-3" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                  <span className="font-bold">{quantity}</span>
                  <button className="px-3" onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl space-y-4">
          <h3 className="font-bold">Pagamento</h3>
          <div className="flex items-center justify-between" onClick={() => setPaymentMethod('pix')}>
            <div className="flex items-center space-x-3">
              <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-5 w-5" />
              <span className="font-medium">Pix</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'pix' ? 'border-[#FF2C55] bg-[#FF2C55]' : ''}`} />
          </div>
          <div className="flex items-center justify-between" onClick={() => { setPaymentMethod('card'); if(!cardData) navigate('/furadeira/cartao'); }}>
            <div className="flex items-center space-x-3">
              <CreditCard size={20} className="text-gray-400" />
              <span className="font-medium">{cardData ? `Cartão final ${cardData.last4}` : "Cartão de Crédito"}</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'card' ? 'border-[#FF2C55] bg-[#FF2C55]' : ''}`} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-[600px] mx-auto flex justify-between items-center mb-3">
          <span className="font-bold">Total</span>
          <span className="text-xl font-bold text-[#FF2C55]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <Button className="w-full bg-[#FF2C55] h-12 rounded-full font-bold" onClick={handlePlaceOrder} disabled={isProcessing}>
          {isProcessing ? <Loader2 className="animate-spin" /> : "Fazer pedido"}
        </Button>
      </div>
    </div>
  );
};

export default FuradeiraCheckoutPage;