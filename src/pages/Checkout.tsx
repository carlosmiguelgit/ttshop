"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight, MessageSquareText, ShieldCheck, Ticket } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [locationStr, setLocationStr] = useState("Carregando localização...");
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/');
    }

    // Busca localização por IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const city = data.city || "";
        const region = data.region || "";
        const country = data.country_name || "Brasil";
        setLocationStr(`${city}, ${region}, ${country}`);
      })
      .catch(() => setLocationStr("São Paulo, SP, Brasil"));
  }, [location, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-24">
      {/* Header */}
      <div className="bg-white border-b h-12 flex items-center px-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-[16px] font-bold text-gray-900 flex-grow text-center mr-8">Resumo do pedido</h1>
      </div>

      <div className="max-w-[600px] mx-auto space-y-3 p-3">
        {/* Endereço */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer">
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-gray-900 mt-1" />
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">+ Adicionar endereço</h3>
              <p className="text-[12px] text-gray-500">{locationStr}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>

        {/* Produto */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex space-x-3">
            <img src={product.media[0].src} className="w-20 h-20 rounded-lg object-cover border" alt="Produto" />
            <div className="flex-grow flex flex-col justify-between">
              <h4 className="text-[14px] text-gray-900 line-clamp-2 leading-tight">{product.title}</h4>
              <div className="flex justify-between items-end">
                <span className="text-[13px] text-gray-400">Qtd: 1</span>
                <span className="text-[15px] font-bold text-gray-900">R$ {product.currentPrice}</span>
              </div>
            </div>
          </div>

          {/* Opções extras */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsNoteDrawerOpen(true)}>
              <div className="flex items-center space-x-2">
                <MessageSquareText size={18} className="text-gray-900" />
                <span className="text-[14px] text-gray-900">Adicionar nota</span>
              </div>
              <div className="flex items-center">
                <span className="text-[12px] text-gray-400 truncate max-w-[120px]">{orderNote}</span>
                <ChevronRight size={18} className="text-gray-300 ml-1" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Ticket size={18} className="text-gray-900" />
                <span className="text-[14px] text-gray-900">Cupons</span>
              </div>
              <div className="flex items-center text-[#FF2C55]">
                <span className="text-[12px] font-bold">R$ -5,00</span>
                <ChevronRight size={18} className="text-gray-300 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Resumo de Preços */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">R$ {product.currentPrice}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-500">Taxa de envio</span>
            <span className="text-gray-900">R$ 9,18</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-500">Desconto de envio</span>
            <span className="text-[#00BFA5]">-R$ 9,18</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-500">Desconto de cupons</span>
            <span className="text-[#FF2C55]">-R$ 5,00</span>
          </div>
          <div className="pt-2 border-t flex justify-between items-center">
            <span className="text-[16px] font-bold text-gray-900">Total</span>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ 42,00</span>
          </div>
        </div>

        {/* Segurança */}
        <div className="flex items-center justify-center space-x-1.5 py-4">
          <ShieldCheck size={16} className="text-[#00BFA5]" />
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Pagamento Seguro</span>
        </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-center z-50">
        <div className="w-full max-w-[600px] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] text-gray-500">Total</span>
            <span className="text-[18px] font-bold text-[#FF2C55]">R$ 42,00</span>
          </div>
          <Button 
            className="bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[48px] px-10 text-[15px]"
            onClick={() => navigate('/pix-pagamento', { state: { product } })}
          >
            Fazer pedido
          </Button>
        </div>
      </div>

      <NoteDrawer 
        isOpen={isNoteDrawerOpen} 
        onClose={() => setIsNoteDrawerOpen(false)} 
        onSave={setOrderNote}
        initialNote={orderNote}
      />
    </div>
  );
};

export default Checkout;