import React from 'react';
import { Clock, ChevronRight, Star, Tag, Bookmark, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Componente para exibir o tempo restante (simulado)
const FlashSaleTimer: React.FC = () => {
  // Simulação de tempo restante: 10 horas, 25 minutos, 17 segundos (baseado na imagem)
  const hours = 10;
  const minutes = 25;
  const seconds = 17;

  const TimeSegment: React.FC<{ value: number }> = ({ value }) => (
    <span className="text-white text-sm font-bold">
      {String(value).padStart(2, '0')}
    </span>
  );

  return (
    <div className="flex items-center space-x-1">
      <TimeSegment value={hours} />
      <span className="text-white font-bold">:</span>
      <TimeSegment value={minutes} />
      <span className="text-white font-bold">:</span>
      <TimeSegment value={seconds} />
    </div>
  );
};

const DiscountBadge: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <span className={cn(
    "bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-sm flex-shrink-0",
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
  const discountPercentage = 89; // (619.90 - 67.90) / 619.90 ≈ 89%
  const currentPrice = "67,90"; 
  const originalPrice = "619,90"; // Preço original riscado
  const rating = 4.8; 
  const reviewCount = 9600; 
  const salesCount = 4348;
  const productTitle = "Patinete Elétrico Scooter De Alumínio Com Bluetooth 30km/h";
  
  // Cálculo do parcelamento (2x sem juros)
  const installmentPrice = (67.90 / 2).toFixed(2).replace('.', ',');

  return (
    <div className="bg-white space-y-0">
      
      {/* Seção de Oferta Relâmpago (Flash Sale) - Novo Design */}
      <div className="bg-gradient-to-r from-[#FF66B2] to-[#FF3399] p-4">
        <div className="flex justify-between items-center">
          
          {/* Preço e Desconto */}
          <div className="flex items-end space-x-2">
            {/* Desconto */}
            <span className="bg-black/20 text-white text-lg font-bold px-2 py-1 rounded-sm flex-shrink-0">
              -{discountPercentage}%
            </span>
            
            {/* Preço Atual */}
            <span className="text-4xl font-bold text-white">
              R$ {currentPrice}
            </span>
            
            {/* Preço Original Riscado */}
            <div className="flex flex-col justify-end h-full pb-1">
              <span className="text-white/80 text-sm line-through">
                R$ {originalPrice}
              </span>
            </div>
          </div>

          {/* Timer da Oferta */}
          <div className="flex flex-col items-end text-white text-sm font-medium">
            <div className="flex items-center space-x-1">
                <Zap size={16} className="text-white fill-white" />
                <span>Oferta Relâmpago</span>
            </div>
            <div className="mt-1">
                <span className="text-xs">Termina em </span>
                <FlashSaleTimer />
            </div>
          </div>
        </div>
      </div>
      
      {/* Linha de Parcelamento */}
      <div className="p-4 pt-2 pb-0">
        <div className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-gray-900">
          <span className="mr-1">
            2x R$ {installmentPrice} sem juros
          </span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Linha 2: Banners de Cupom */}
        <div className="flex space-x-2 overflow-x-auto py-1 border-t border-gray-100 pt-4">
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
    </div>
  );
};

export default ProductPriceSection;