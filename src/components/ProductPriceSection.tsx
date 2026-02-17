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
    // Reduzindo de text-sm para text-xs e ajustando o padding
    "flex items-center bg-pink-50/80 text-xs text-[#FF3399] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap",
    "animate-pulse-slow" // Mantendo o efeito de pulso no cupom (opacidade)
  )}>
    <Tag size={12} className="mr-1 fill-[#FF3399]" /> {/* Reduzindo o ícone */}
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

  // Formatando o valor do desconto para o badge
  const discountText = `R$ ${discountAmount} de desconto`;
  // Texto de urgência
  const urgencyText = "Restam somente 3 unidades";

  return (
    <div className="bg-white space-y-0">

      {/* Seção de Oferta Relâmpago (Flash Sale) */}
      <div className="relative bg-gradient-to-r from-[#FF3366] to-[#FF7733] pt-3 pb-2 px-4">
        <div className="flex justify-between items-start">

          {/* Preço e Desconto (Lado Esquerdo) */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-0.5">
              {/* Badge de Desconto Branco (Ajustado para ser menor e mais arredondado) */}
              <span className="bg-white text-[#FF3366] text-sm font-bold px-2 py-0.5 rounded-lg flex-shrink-0">
                -{discountPercentage}%
              </span>

              {/* Preço Atual (Ajustado para R$ e valor em tamanhos diferentes) */}
              <span className="text-2xl font-bold text-white">
                {currentPrice.includes('-')
                  ? `R$ ${currentPrice.replace(' - ', ' - R$ ')}`
                  : `R$ ${currentPrice}`}
              </span>
              {/* Ícone de cupom removido daqui */}
            </div>

            {/* Preço Original Riscado (Ajustado para ser menor) */}
            <span className="text-white/80 text-sm line-through ml-2">
              R$ {originalPrice}
            </span>
          </div>

          {/* Timer da Oferta (Lado Direito) */}
          <div className="flex flex-col items-end text-white text-sm font-medium pt-1">
            <div className="flex items-center space-x-1 font-bold mb-0.5">
                <Zap size={16} className="text-white fill-white" />
                <span>Oferta Relâmpago</span>
            </div>
            {/* Exibição do Timer em uma única linha */}
            <FlashSaleTimer initialSeconds={2 * 60 * 60} /> {/* 2 horas em segundos */}
          </div>
        </div>

        {/* Recorte Inferior (Simulação de curva) */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white rounded-t-lg transform translate-y-full">
          {/* Este div simula o recorte, mas o efeito real é mais complexo com CSS puro.
          Para simplificar e manter a aparência, vamos usar um truque de borda. */}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Linha 2: Banners de Cupom e Urgência */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {/* Badge de Cupom com Pulse */}
          <CouponBadge text={discountText} />

          {/* Mensagem de Urgência com Pulse */}
          <div className={cn(
            // Reduzindo de text-sm para text-xs e ajustando o padding
            "flex items-center bg-pink-50/80 text-xs text-[#FF3399] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap border border-[#FF3399]",
            "animate-border-pulse-pink" // Nova animação de pulso de borda
          )}>
            <Zap size={12} className="mr-1 fill-[#FF3399]" /> {/* Reduzindo o ícone */}
            <span>{urgencyText}</span>
          </div>
        </div>

        {/* Linha 3: Título do Produto */}
        <div className="flex justify-between items-start pt-2">
          <div className="flex items-center">
            {/* NOVO: Badge 11.11 REMOVIDO */}
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