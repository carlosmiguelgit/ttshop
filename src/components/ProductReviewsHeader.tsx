import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number; 
  reviewCount: number;
  onViewMoreClick: () => void;
  showViewMore: boolean;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ reviewCount, onViewMoreClick, showViewMore }) => {
  
  // Exibe o número bruto conforme solicitado
  const formatReviewCount = (count: number): string => {
    return count.toString();
  };
  
  // Renderiza 5 estrelas amarelas fixas com tamanho reduzido
  const renderStars = () => (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );

  return (
    <div className="mb-2">
      {/* Linha 1: Título e Contagem */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          {/* Título com fonte menor (text-sm) */}
          <h3 className="text-sm font-bold text-gray-900">Avaliações dos clientes</h3>
          
          {/* Contagem de Avaliações com fonte menor (text-sm) */}
          <span className="text-sm text-gray-500">
            (
            <span className="font-bold">
              {formatReviewCount(reviewCount)}
            </span>
            )
          </span>
        </div>
        
        {/* Botão Ver Mais com fonte menor (text-xs) */}
        {showViewMore && (
          <Button 
            variant="ghost" 
            className="text-xs text-gray-900 hover:text-gray-700 p-0 h-auto font-medium"
            onClick={onViewMoreClick}
          >
            Ver mais
            <ChevronRight size={14} className="ml-0.5" />
          </Button>
        )}
      </div>
      
      {/* Linha 2: Nota e Estrelas (Reduzidas significativamente) */}
      <div className="flex items-center mt-1 space-x-1.5">
        <div className="flex items-baseline">
          {/* 5.0 com tamanho reduzido (text-lg) */}
          <span className="text-lg font-bold text-gray-900 leading-none">5.0</span>
          {/* /5 com tamanho reduzido (text-xs) */}
          <span className="text-xs text-gray-500 font-normal ml-0.5">/5</span>
        </div>
        {renderStars()}
      </div>
    </div>
  );
};

export default ProductReviewsHeader;