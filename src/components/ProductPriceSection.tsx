"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Truck, Timer, Star } from 'lucide-react';
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
      {/* Faixa de Oferta Relâmpago Laranja */}
      <div className="bg-[#FF7A00] px-4 py-2 flex justify-between items-center text-white">
        <div className="flex items-center space-x-2">
          <Timer size={18} className="animate-pulse" />
          <span className="font-bold text-sm uppercase tracking-tight">Oferta Relâmpago</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-medium opacity-90">Termina em</span>
          <span className="bg-white text-[#FF7A00] px-1.5 py-0.5 rounded font-bold text-xs tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-baseline space-x-1.5 mb-1">
          <span className="bg-red-600 text-white text-base font-bold px-1 py-0.5 rounded leading-none">
            -{discountPercentage}%
          </span>
          <span className="text-xl font-bold text-red-600 leading-none">
            R$ {currentPrice}
          </span>
          <span className="text-xs text-gray-400 line-through leading-none">
            R$ {originalPrice}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>

        <div className="flex items-center text-[10px] text-gray-500 pb-2 border-b border-gray-100 space-x-3">
          <div className="flex items-center space-x-1">
            <Star size={11} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-black text-[11px]">5</span>
          </div>
          <span>{salesCount} vendidos</span>
        </div>

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