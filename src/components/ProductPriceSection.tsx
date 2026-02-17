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

  return (
    <div className="bg-white">
      <div className="p-4 space-y-3">
        {/* Preço e Desconto em uma única linha */}
        <div className="flex items-baseline space-x-2 mb-1">
          {/* Porcentagem de desconto (2px menor que o preço principal) */}
          <span className="text-2xl font-bold text-red-600">
            -{discountPercentage}%
          </span>
          
          {/* Preço Atual */}
          <span className="text-3xl font-bold text-red-600">
            R$ {currentPrice}
          </span>
          
          {/* Preço Original (fonte menor, riscado) */}
          <span className="text-base text-gray-400 line-through">
            R$ {originalPrice}
          </span>
        </div>

        {/* Título do Produto */}
        <div className="flex justify-between items-start pt-1">
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>

        {/* Vendas (Estrelas removidas) */}
        <div className="flex items-center text-sm text-gray-500 pb-3 border-b border-gray-100">
          <span>{salesCount} vendidos</span>
        </div>

        {/* Seção de Frete Grátis */}
        <div className="flex justify-between items-center py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Truck size={20} className="text-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="bg-teal-100 text-teal-700 text-sm font-semibold px-2 py-0.5 rounded-md">
                  Frete grátis
                </span>
                <span className="text-sm text-gray-800 font-medium">
                  <span className="font-bold text-gray-800">RECEBA AMANHÃ</span>
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 ml-7">
              Taxa de envio: <span className="line-through">R$ 43,60</span>
            </span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductPriceSection;