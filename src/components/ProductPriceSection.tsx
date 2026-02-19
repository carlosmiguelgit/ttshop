"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Truck, Timer, Zap, TicketCheck } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductPriceSectionProps {
  product: Product;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ product }) => {
  const { 
    currentPrice, 
    originalPrice, 
    discountPercentage, 
    salesCount,
    title: productTitle,
    flashSaleTimeSeconds
  } = product;

  const [timeLeft, setTimeLeft] = useState(flashSaleTimeSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDeliveryDateRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 9);
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    return `Receba até ${start.getDate()}-${end.getDate()} de ${months[end.getMonth()]}`;
  };

  return (
    <div className="bg-white">
      {/* Banner de Oferta Relâmpago Estilo TikTok */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FF3B30] to-[#FF2C55] h-[85px] flex items-center px-4 text-white">
        
        {/* Raio Decorativo no Fundo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Zap size={100} fill="white" stroke="none" />
        </div>

        <div className="relative z-10 w-full flex items-center justify-between">
          {/* Esquerda: Tag de Desconto e Preço Original */}
          <div className="flex flex-col">
            <div className="bg-white rounded-[4px] px-2 py-0.5 w-fit">
              <span className="text-[#FF2C55] text-sm font-bold">-{discountPercentage}%</span>
            </div>
            <span className="text-white/90 text-sm line-through mt-1">
              R$ {originalPrice}
            </span>
          </div>

          {/* Centro: Preço Atual (Grande) */}
          <div className="flex items-baseline font-bold">
            <span className="text-xl mr-0.5">R$</span>
            <span className="text-4xl tracking-tighter">{currentPrice}</span>
          </div>

          {/* Direita: Título Oferta e Contador */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-center mb-1">
              <TicketCheck size={18} className="mb-0.5" />
              <span className="text-[10px] font-bold uppercase leading-none">Oferta Relâmpago</span>
            </div>
            <div className="flex items-center space-x-1 text-[11px]">
              <span className="opacity-90">Termina em</span>
              <span className="font-bold tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {/* Título do Produto */}
        <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
          {productTitle}
        </h2>

        {/* Quantidade de Vendidos */}
        <div className="flex items-center text-[11px] text-gray-500 pb-2 border-b border-gray-100">
          <span>{salesCount} vendidos</span>
        </div>

        {/* Seção de Frete */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Truck size={16} className="text-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="bg-teal-100 text-teal-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  Frete grátis
                </span>
                <span className="text-[11px] text-gray-800 font-bold">
                  {getDeliveryDateRange()}
                </span>
              </div>
            </div>
            <span className="text-[9px] text-gray-500 ml-6 mt-0.5">
              Taxa de envio: <span className="line-through">R$ 43,60</span>
            </span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductPriceSection;