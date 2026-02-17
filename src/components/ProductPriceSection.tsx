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
        {/* Preço e Desconto em uma única linha */}
        <div className="flex items-center space-x-2 mb-1">
          {/* Porcentagem de desconto com fundo vermelho e texto branco */}
          <span className="bg-red-600 text-white text-lg font-bold px-1.5 py-0.5 rounded">
            -{discountPercentage}%
          </span>
          
          {/* Preço Atual */}
          <span className="text-2xl font-bold text-red-600">
            R$ {currentPrice}
          </span>
          
          {/* Preço Original */}
          <span className="text-sm text-gray-400 line-through">
            R$ {originalPrice}
          </span>
        </div>

        {/* Título do Produto */}
        <div className="flex justify-between items-start">
          <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>

        {/* Vendas */}
        <div className="flex items-center text-xs text-gray-500 pb-2 border-b border-gray-100">
          <span>{salesCount} vendidos</span>
        </div>

        {/* Seção de Frete Grátis com data dinâmica */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Truck size={18} className="text-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded">
                  Frete grátis
                </span>
                <span className="text-xs text-gray-800 font-bold uppercase">
                  {deliveryText}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 ml-6 mt-1">
              Taxa de envio: <span className="line-through">R$ 43,60</span>
            </span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductPriceSection;