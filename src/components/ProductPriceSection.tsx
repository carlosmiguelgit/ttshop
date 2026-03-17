"use client";

import React from 'react';
import { ChevronRight, Truck, Star, CreditCard, Bookmark } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductPriceSectionProps {
  product: Product;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ product }) => {
  const { 
    currentPrice, 
    salesCount,
    reviewCount,
    title: productTitle,
  } = product;

  const getDeliveryDateRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 9);
    const months = ["mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", "jan", "fev"];
    return `${start.getDate()} – ${end.getDate()} de ${months[end.getMonth()]}`;
  };

  return (
    <div className="bg-white">
      {/* Seção de Preço (Omitindo a barra laranja conforme solicitado anteriormente) */}
      <div className="p-4 space-y-3">
        {/* Parcelamento e Cupons */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-xs text-gray-800 space-x-1">
            <CreditCard size={14} className="text-gray-600" />
            <span>2x R$ 23,50 <span className="text-[#FF2C55]">sem juros</span></span>
            <ChevronRight size={14} className="text-gray-400" />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded border border-[#FFD9E0] whitespace-nowrap">
              🧧 Compre R$ 80 e ganhe R$ 5 de desconto
            </div>
            <div className="bg-[#FFF1F3] text-[#FF2C55] text-[10px] px-2 py-0.5 rounded border border-[#FFD9E0] whitespace-nowrap">
              Economize 3% com b...
            </div>
            <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>

        {/* Título e Ícone de Salvar */}
        <div className="flex justify-between items-start space-x-2">
          <h2 className="text-sm font-semibold text-gray-900 leading-tight">
            {productTitle}
          </h2>
          <button className="flex-shrink-0 mt-1">
            <Bookmark size={20} className="text-gray-900" />
          </button>
        </div>

        {/* Avaliação e Vendas */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-0.5">
            <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="font-bold">5.0</span>
            <span className="text-blue-500">({reviewCount})</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">{salesCount} vendidos</span>
        </div>

        {/* Entrega */}
        <div className="flex justify-between items-center py-2 border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <Truck size={18} className="text-gray-600" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-[#00BFA5] font-bold text-xs">Frete grátis</span>
                <span className="text-xs font-semibold">Receba até {getDeliveryDateRange()}</span>
              </div>
              <span className="text-[11px] text-gray-400">
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