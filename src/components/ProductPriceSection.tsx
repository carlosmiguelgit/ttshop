import React from 'react';
import { Clock, ChevronRight, Star, Tag, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const DiscountBadge: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <span className={cn(
    "bg-[#FF3399] text-white text-xs font-bold px-2 py-0.5 rounded-sm flex-shrink-0",
    className
  )}>
    {text}
  </span>
);

const CouponBadge: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center bg-pink-50/80 text-sm text-[#FF3399] font-semibold px-2 py-1 rounded-md whitespace-nowrap">
    <Tag size={14} className="mr-1 fill-[#FF3399]" />
    {text}
  </div>
);

const ProductPriceSection: React.FC = () => {
  // Dados simulados
  const discountPercentage = 58;
  const currentPrice = "36,20";
  const originalPrice = "87,00";
  const installmentCount = 7;
  const installmentValue = "5,64";
  const rating = 4.0;
  const reviewCount = 536;
  const salesCount = 4348;
  const productTitle = "Avião de controle remoto, helicóptero de levitação bidirecional por indução, resistente ...";

  return (
    <div className="bg-white p-4 space-y-3">
      
      {/* Linha 1: Preço e Desconto */}
      <div className="flex items-center space-x-2">
        <DiscountBadge text={`-${discountPercentage}%`} className="bg-red-600" />
        
        <span className="text-3xl font-bold text-red-600">
          R$ {currentPrice}
        </span>
        
        {/* Preço Original Riscado (com ícone de verificação simulado) */}
        <div className="flex items-center text-gray-500 text-sm line-through">
          <span className="mr-1">R$ {originalPrice}</span>
        </div>
      </div>

      {/* Linha 2: Parcelamento */}
      <div className="flex items-center text-sm text-gray-700 cursor-pointer">
        <Clock size={16} className="mr-1 text-gray-500" />
        <span>{installmentCount}x R$ {installmentValue}</span>
        <ChevronRight size={16} className="ml-1 text-gray-400" />
      </div>
      
      {/* Linha 3: Banners de Cupom */}
      <div className="flex space-x-2 overflow-x-auto py-1">
        <CouponBadge text="Desconto de R$ 5" />
        <CouponBadge text="R$15 off no Google Pay" />
      </div>

      {/* Linha 4: Título do Produto e Bookmark */}
      <div className="flex justify-between items-start pt-2">
        <div className="flex items-center">
          {/* Badge 11.11 simulado */}
          <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm mr-2 flex-shrink-0">
            11.11
          </span>
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>
        <button className="p-1 text-gray-500 hover:text-gray-700 flex-shrink-0">
          <Bookmark size={24} />
        </button>
      </div>
      
      {/* Linha 5: Avaliação e Vendas */}
      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({reviewCount})</span>
        </div>
        <span className="text-gray-500">|</span>
        <span className="text-gray-500">{salesCount} vendidos</span>
      </div>
    </div>
  );
};

export default ProductPriceSection;