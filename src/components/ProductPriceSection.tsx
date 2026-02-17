"use client";

import React from 'react';
import { ChevronRight, Tag, Zap, Truck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';

const CouponBadge: React.FC<{ text: string }> = ({ text }) => (
  <div className={cn(
    "flex items-center bg-pink-50/80 text-xs text-[#FF3399] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap",
    "animate-pulse-slow"
  )}>
    <Tag size={12} className="mr-1 fill-[#FF3399]" />
    {text}
  </div>
);

interface ProductPriceSectionProps {
  product: Product;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({ product }) => {
  const { 
    currentPrice, 
    originalPrice, 
    discountPercentage, 
    discountAmount, 
    rating, 
    reviewCount, 
    salesCount,
    title: productTitle
  } = product;

  const discountText = `R$ ${discountAmount} de desconto`;
  const urgencyText = "Restam somente 3 unidades";

  return (
    <div className="bg-white">
      <div className="p-4 space-y-3">
        {/* Preço e Desconto integrados */}
        <div className="flex flex-col mb-1">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-red-600">
              R$ {currentPrice}
            </span>
            <span className="bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-lg">
              -{discountPercentage}%
            </span>
          </div>
          <span className="text-gray-400 text-sm line-through ml-1">
            R$ {originalPrice}
          </span>
        </div>

        {/* Banners de Cupom e Urgência */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <CouponBadge text={discountText} />

          <div className={cn(
            "flex items-center bg-pink-50/80 text-xs text-[#FF3399] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap border border-[#FF3399]",
            "animate-border-pulse-pink"
          )}>
            <Zap size={12} className="mr-1 fill-[#FF3399]" />
            <span>{urgencyText}</span>
          </div>
        </div>

        {/* Título do Produto */}
        <div className="flex justify-between items-start pt-1">
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>

        {/* Avaliação e Vendas */}
        <div className="flex items-center space-x-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">({(reviewCount / 1000).toFixed(1)} mil)</span>
          </div>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">{salesCount} vendidos</span>
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