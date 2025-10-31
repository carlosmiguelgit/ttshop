import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Tag, Bookmark, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Componente para exibir o tempo restante (com contagem regressiva simulada)
const FlashSaleTimer: React.FC = () => {
  // Começa em 3 minutos (180 segundos)
  const initialTime = 3 * 60; 
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

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

const ProductPriceSection: React.FC = () => {
  // Dados simulados
  const discountPercentage = 89; // (619.90 - 67.90) / 619.90 ≈ 89%
  const currentPrice = "67,90"; 
  const originalPrice = "619,90"; // Preço original riscado
  const rating = 4.8; 
  const reviewCount = 9600; 
  const salesCount = 4348;
  const productTitle = "Patinete Elétrico Scooter De Alumínio Com Bluetooth 30km/h";
  
  // Cálculo do desconto em reais: 619.90 - 67.90 = 552.00
  const discountAmount = "552,00";

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
            <FlashSaleTimer />
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Linha 2: Banners de Cupom e Urgência */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1 border-t border-gray-100 pt-4">
          {/* Badge de Cupom com Pulse */}
          <CouponBadge text={`R$ ${discountAmount} de desconto`} />
          
          {/* Mensagem de Urgência com Pulse (Usando Zap) */}
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