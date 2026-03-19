"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, CreditCard, Bookmark, Zap, Clock, Ticket } from 'lucide-react';
import { Product } from '@/data/products';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductPriceSectionProps {
  product: Product;
  onCouponsClick: () => void;
  onShippingClick: () => void;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ product, onCouponsClick, onShippingClick }) => {
  const { currentPrice, originalPrice, reviewCount, title: productTitle } = product;
  const [seconds, setSeconds] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Cálculo dinâmico da data (2 a 7 dias a partir de hoje)
  const deliveryDateRange = React.useMemo(() => {
    const today = new Date();
    const start = addDays(today, 2);
    const end = addDays(today, 7);
    return `${format(start, 'dd')} – ${format(end, 'dd')} de ${format(end, 'MMM', { locale: ptBR })}`;
  }, []);

  return (
    <div className="bg-white">
      {/* Faixa Oferta Relâmpago SEM 'A PARTIR' e com RAIO de fundo */}
      <div className="relative bg-[#FF6633] h-[64px] flex items-center justify-between px-4 text-white overflow-hidden">
        <div className="absolute right-1/4 top-0 h-full opacity-10 pointer-events-none">
           <Zap size={100} className="fill-white rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <div className="flex items-center space-x-1.5">
            <div className="bg-white px-1 py-0.5 rounded-sm">
              <span className="text-[#E62E5D] font-bold text-[13px]">-31%</span>
            </div>
            <div className="flex items-baseline space-x-0.5">
              <span className="text-3xl font-bold leading-none tracking-tight">
                R$ {currentPrice.split(',')[0]}
                <span className="text-xl">,{currentPrice.split(',')[1]}</span>
              </span>
            </div>
          </div>
          <span className="text-[11px] line-through opacity-60 ml-0.5">R$ {originalPrice}</span>
        </div>
        
        <div className="relative z-10 flex flex-col items-end justify-center">
          <div className="flex items-center text-[13px] font-bold">
            <Zap size={14} className="fill-white mr-1" />
            Oferta Relâmpago
          </div>
          <div className="text-[11px] opacity-100 mt-1">
            Termina em <span className="font-bold">{formatTime(seconds)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Parcelamento com MICRO RELÓGIO */}
        <div className="flex items-center text-[11px] text-gray-800">
          <div className="relative mr-1.5">
            <CreditCard size={15} className="text-gray-600" />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[1px]">
              <Clock size={8} className="text-gray-400 fill-gray-100" />
            </div>
          </div>
          <span>2x R$ 19,74 <span className="text-[#FF2C55] font-medium ml-1">sem juros</span></span>
          <ChevronRight size={14} className="text-gray-300 ml-1" />
        </div>

        {/* Cupons com TICKET e SETA */}
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={onCouponsClick}
        >
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center whitespace-nowrap">
              <Ticket size={12} className="mr-1 fill-[#FF2C55]/10" /> Compre R$ 80 e ganhe R$ 5 de desconto
            </div>
            <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center whitespace-nowrap">
              <Ticket size={12} className="mr-1 fill-[#FF2C55]/10" /> Economize 3% com b...
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
        </div>

        <div className="flex justify-between items-start space-x-4">
          <h2 className="text-[16px] font-bold text-gray-900 leading-[1.2]">{productTitle}</h2>
          <Bookmark size={22} className="text-gray-900 flex-shrink-0" />
        </div>

        <div className="flex items-center space-x-2 text-[12px]">
          <div className="flex items-center space-x-0.5">
            <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="font-bold text-gray-900">4.8</span>
            <span className="text-[#4A90E2] font-medium ml-0.5">({reviewCount / 1000} mil)</span>
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-gray-500 font-medium">28.0K vendidos</span>
        </div>

        {/* Entrega com CAMINHÃO COM LISTRAS (Custom SVG para precisão) */}
        <div 
          className="flex justify-between items-center py-3 border-t border-gray-100 cursor-pointer"
          onClick={onShippingClick}
        >
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 17h4M2 9h4M2 12h3M2 15h2" opacity="0.5" />
                <path d="M7 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0ZM17 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0Z" />
                <path d="M13 18h4M5 17h2M13 5H1v12h4m12 0h4v-7l-3-3h-4V5Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap">
                <span className="text-[#00BFA5] font-bold text-[12px] mr-2">Frete grátis</span>
                <span className="text-[12px] font-bold text-gray-800">Receba até {deliveryDateRange}</span>
              </div>
              <span className="text-[11px] text-gray-500 mt-1">
                Taxa de envio: <span className="line-through">R$ 9,18</span>
              </span>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductPriceSection;