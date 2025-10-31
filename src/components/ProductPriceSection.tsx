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
  const currentPrice = "67,90"; // Preço do patinete
  const originalPrice = "161,67"; // Preço original do patinete
  const rating = 4.8; // Nota da loja
  const reviewCount = 9600; // 9,6 mil avaliações
  const salesCount = 4348;
  const productTitle = "Patinete Elétrico Scooter De Alumínio Com Bluetooth 30km/h";

  return (
    <div className="bg-white p-4 space-y-3">
      
      {/* Linha 1: Preço e Desconto */}
      <div className="flex items-center space-x-2">
        <DiscountBadge text={`-${discountPercentage}%`} className="bg-red-600" />
        
        <span className="text-3xl font-bold text-red-600">
          R$ {currentPrice}
        </span>
        
        {/* Preço Original Riscado */}
        <div className="flex items-center text-gray-500 text-sm line-through">
          <span className="mr-1">R$ {originalPrice}</span>
        </div>
      </div>

      {/* Linha 2: Banners de Cupom (Agora é a Linha 2) */}
      <div className="flex space-x-2 overflow-x-auto py-1">
        <CouponBadge text="Desconto de R$ 5" />
        <CouponBadge text="R$15 off no Google Pay" />
      </div>

      {/* Linha 3: Título do Produto e Bookmark */}
      <div className="flex justify-between items-start pt-2">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
            {productTitle}
          </h2>
        </div>
        <button className="p-1 text-gray-500 hover:text-gray-700 flex-shrink-0">
          <Bookmark size={24} />
        </button>
      </div>
      
      {/* Linha 4: Avaliação e Vendas */}
      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
          {/* Exibindo a contagem de avaliações da loja (9,6 mil) */}
          <span className="text-gray-500 ml-1">({(reviewCount / 1000).toFixed(1)} mil)</span>
        </div>
        <span className="text-gray-500">|</span>
        <span className="text-gray-500">{salesCount} vendidos</span>
      </div>
    </div>
  );
};

export default ProductPriceSection;