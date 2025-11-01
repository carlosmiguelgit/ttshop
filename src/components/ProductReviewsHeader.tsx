import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number; // Mantido, mas não usado visualmente nesta seção
  reviewCount: number;
  onViewMoreClick: () => void;
  showViewMore: boolean;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ reviewCount, onViewMoreClick, showViewMore }) => {
  
  // Formata a contagem de avaliações para 'X mil' se for maior que 1000
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)} mil`;
    }
    return count.toString();
  };
  
  // Renderiza 5 estrelas amarelas fixas
  const renderStars = () => (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );

  return (
    <div className="mb-4">
      {/* Linha 1: Título e Contagem */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Título com fonte menor (text-base) */}
          <h3 className="text-base font-bold text-gray-900">Avaliações dos clientes</h3>
          
          {/* Contagem de Avaliações (text-base e negrito no número) */}
          <span className="text-base text-gray-500">
            (
            <span className="font-bold">
              {formatReviewCount(reviewCount)}
            </span>
            )
          </span>
        </div>
        
        {/* Botão Ver Mais (Cor preta) */}
        {showViewMore && (
          <Button 
            variant="ghost" 
            className="text-sm text-gray-900 hover:text-gray-700 p-0 h-auto"
            onClick={onViewMoreClick}
          >
            Ver mais
            <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
      
      {/* Linha 2: Nota 5.0/5 e Estrelas */}
      <div className="flex items-center mt-2 space-x-2">
        {/* 5.0 em negrito e grande */}
        <span className="text-2xl font-bold text-gray-900">5.0</span>
        {/* /5 em fonte menor e normal */}
        <span className="text-base text-gray-500 font-normal">/5</span>
        {renderStars()}
      </div>
    </div>
  );
};

export default ProductReviewsHeader;