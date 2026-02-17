"use client";

import React from 'react';
import { ChevronRight, Truck } from 'lucide-react';
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
    title: productTitle
  } = product;

  // Função para calcular a data de entrega
  const getDeliveryDateRange = () => {
    const today = new Date();
    
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    
    const end = new Date(today);
    end.setDate(today.getDate() + 9);
    
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    const months = [
      "jan", "fev", "mar", "abr", "mai", "jun",
      "jul", "ago", "set", "out", "nov", "dez"
    ];
    
    const endMonth = months[end.getMonth()];
    
    // Formato: Receba até DD-DD de MMM
    return `Receba até ${startDay}-${endDay} de ${endMonth}`;
  };

  const deliveryText = getDeliveryDateRange();

  return (
    <div className="bg-white">
      <div className="p-4 space-y-2">
        {/* Preço e Desconto alinhados pela base (items-baseline) */}
        <div className="flex items-baseline space-x-1.5 mb-1">
          {/* Porcentagem de desconto (Reduzido para base) */}
          <span className="bg-red-600 text-white text-base font-bold px-1 py-0.5 rounded leading-none">
            -{discountPercentage}%
          </span>
          
          {/* Preço Atual (Reduzido para xl) */}
          <span className="text-xl font-bold text-red-600 leading-none">
            R$ {currentPrice}
          </span>
          
          {/* Preço Original (Reduzido para xs e alinhado pela base) */}
          <span className="text-xs text-gray-400 line-through leading-none">
            R$ {originalPrice}
          </span>
        </div>

        {/* Título do Produto */}
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>

        {/* Vendas */}
        <div className="flex items-center text-[10px] text-gray-500 pb-2 border-b border-gray-100">
          <span>{salesCount} vendidos</span>
        </div>

        {/* Seção de Frete Grátis com data dinâmica */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Truck size={16} className="text-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="bg-teal-100 text-teal-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  Frete grátis
                </span>
                <span className="text-[11px] text-gray-800 font-bold">
                  {deliveryText}
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