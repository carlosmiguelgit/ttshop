import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Tag, Zap, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products'; // Importando o tipo Product

// Componente para exibir o tempo restante (com contagem regressiva simulada)
const FlashSaleTimer: React.FC<{ initialSeconds: number }> = ({ initialSeconds }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);

  useEffect(() => {
    // Se o tempo for 0 ou menos, para o timer
    if (timeRemaining <= 0) return;

    const timerId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <span className="text-white text-sm font-medium">
      Termina em 
      <span className="font-bold ml-1">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </span>
  );
};

const CouponBadge: React.FC<{ text: string }> = ({ text }) => (
  <div className={cn(
    "flex items-center bg-pink-50/80 text-sm text-[#FF3399] font-semibold px-2 py-1 rounded-md whitespace-nowrap",
    "animate-pulse-slow" // Mantendo o efeito de pulso no cupom (opacidade)
  )}>
    <Tag size={14} className="mr-1 fill-[#FF3399]" />
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
    flashSaleTimeSeconds,
    title: productTitle
  } = product;

  return (
    <div className="bg-white space-y-0">
      
      {/* Seção de Oferta Relâmpago (Flash Sale) */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#FF5722] p-4">
        <div className="flex justify-between items-start">
          
          {/* Preço e Desconto (Lado Esquerdo) */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-1">
              {/* Badge de Desconto Branco */}
              <span className="bg-white text-[#D32F2F] text-lg font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                -{discountPercentage}%
              </span>
              
              {/* Preço Atual */}
              <span className="text-4xl font-bold text-white">
                R$ {currentPrice}
              </span>
            </div>
            
            {/* Preço Original Riscado */}
            <span className="text-white/80 text-base line-through ml-2">
              R$ {originalPrice}
            </span>
          </div>

          {/* Timer da Oferta (Lado Direito) */}
          <div className="flex flex-col items-end text-white text-sm font-medium pt-1">
            <div className="flex items-center space-x-1 font-bold mb-1">
                <Zap size={16} className="text-white fill-white" />
                <span>Oferta Relâmpago</span>
            </div>
            {/* Exibição do Timer em uma única linha */}
            <FlashSaleTimer initialSeconds={flashSaleTimeSeconds} />
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Linha 2: Banners de Cupom e Urgência */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {/* Badge de Cupom com Pulse */}
          <CouponBadge text={`R$ ${discountAmount} de desconto`} />
          
          {/* Mensagem de Urgência com Pulse */}
          <div className={cn(
            "flex items-center bg-pink-50/80 text-sm text-[#FF3399] font-semibold px-2 py-1 rounded-md whitespace-nowrap border border-[#FF3399]",
            "animate-border-pulse-pink" // Nova animação de pulso de borda
          )}>
            <Zap size={14} className="mr-1 fill-[#FF3399]" />
            <span>Restam somente 3 unidades</span>
          </div>
        </div>

        {/* Linha 3: Título do Produto */}
        <div className="flex justify-between items-start pt-2">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
              {productTitle}
            </h2>
          </div>
        </div>
        
        {/* Linha 4: Avaliação e Vendas */}
        <div className="flex items-center space-x-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
            {/* Exibindo a contagem de avaliações da loja (9,6 mil) */}
            <span className="text-gray-500 ml-1">({(reviewCount / 1000).toFixed(1)} mil)</span>
          </div>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">{salesCount} vendidos</span>
        </div>
        
        {/* Seção de Frete Grátis (Estilizada conforme a imagem) */}
        <div className="flex justify-between items-center py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Truck size={20} className="text-gray-600" />
              <div className="flex items-center space-x-2">
                {/* Badge Frete Grátis */}
                <span className="bg-teal-100 text-teal-700 text-sm font-semibold px-2 py-0.5 rounded-md">
                  Frete grátis
                </span>
                <span className="text-sm text-gray-800 font-medium">
                  Receba até 4–11 de nov
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 ml-7">
              Taxa de envio: R$ 10,80
            </span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductPriceSection;