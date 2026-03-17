"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Truck, Star, CreditCard, Bookmark, Zap, Clock } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductPriceSectionProps {
  product: Product;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ product }) => {
  const { 
    currentPrice, 
    originalPrice,
    reviewCount,
    salesCount,
    title: productTitle,
  } = product;

  const [seconds, setSeconds] = useState(900); // 15 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white">
      {/* Faixa Oferta Relâmpago IDENTICA À FOTO com o raio de fundo */}
      <div className="relative bg-[#FF6633] h-[64px] flex items-center justify-between px-4 text-white overflow-hidden">
        {/* Raio estilizado de fundo (opaco) */}
        <div className="absolute right-1/4 top-0 h-full opacity-10 pointer-events-none">
           <Zap size={100} className="fill-white rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <div className="flex items-center space-x-1.5">
            {/* Tag -31% Rosa */}
            <div className="bg-white px-1 py-0.5 rounded-sm">
              <span className="text-[#E62E5D] font-bold text-[13px]">-31%</span>
            </div>
            <div className="flex items-baseline space-x-0.5">
              <span className="text-[11px] font-medium opacity-100">A partir de R$</span>
              <span className="text-3xl font-bold leading-none tracking-tight">
                {currentPrice.split(',')[0]}
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
        {/* Parcelamento com o micro relógio solicitado */}
        <div className="flex items-center text-[11px] text-gray-800">
          <div className="relative mr-1.5">
            <CreditCard size={15} className="text-gray-600" />
            <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full">
              <Clock size={8} className="text-gray-400" />
            </div>
          </div>
          <span>2x R$ 19,74 <span className="text-[#FF2C55] font-medium ml-1">sem juros</span></span>
          <ChevronRight size={14} className="text-gray-300 ml-1" />
        </div>

        {/* Cupons */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center whitespace-nowrap">
            <span className="mr-1 text-[12px]">🧧</span> Compre R$ 80 e ganhe R$ 5 de desconto
          </div>
          <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center whitespace-nowrap">
            Economize 3% com b...
          </div>
          <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
        </div>

        {/* Título e Bookmark */}
        <div className="flex justify-between items-start space-x-4">
          <h2 className="text-[16px] font-bold text-gray-900 leading-[1.2]">
            {productTitle}
          </h2>
          <Bookmark size={22} className="text-gray-900 flex-shrink-0" />
        </div>

        {/* Rating e Vendas */}
        <div className="flex items-center space-x-2 text-[12px]">
          <div className="flex items-center space-x-0.5">
            <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="font-bold text-gray-900">4.8</span>
            <span className="text-[#4A90E2] font-medium ml-0.5">({reviewCount / 1000} mil)</span>
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-gray-500 font-medium">28.0K vendidos</span>
        </div>

        {/* Entrega */}
        <div className="flex justify-between items-center py-3 border-t border-gray-100">
          <div className="flex items-start space-x-3">
            <Truck size={18} className="text-gray-600 mt-0.5" />
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap">
                <span className="text-[#00BFA5] font-bold text-[12px] mr-2">Frete grátis</span>
                <span className="text-[12px] font-bold text-gray-800">Receba até 19 – 24 de mar</span>
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