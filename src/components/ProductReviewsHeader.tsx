import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number;
  reviewCount: number;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ rating, reviewCount }) => {
  
  // Formata a contagem de avaliações para 'X mil' se for maior que 1000
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)} mil`;
    }
    return count.toString();
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        {/* Título atualizado com fonte menor */}
        <h3 className="text-lg font-bold text-gray-900">Avaliações dos clientes</h3>
        
        {/* Média de Avaliação e Contagem */}
        <div className="flex items-center bg-yellow-500/10 text-yellow-700 px-2 py-1 rounded-full text-sm font-semibold">
          <Star size={14} className="fill-yellow-500 text-yellow-500 mr-1" />
          {/* Exibindo a nota 4.9 */}
          <span>{rating.toFixed(1)}</span>
          {/* Contagem de avaliações adicionada */}
          <span className="ml-1 text-gray-700 font-normal">({formatReviewCount(reviewCount)})</span>
        </div>
      </div>
      
      {/* Botão Ver Mais (Cor alterada para preto) */}
      <Button 
        variant="ghost" 
        className="text-sm text-gray-900 hover:text-gray-700 p-0 h-auto"
      >
        Ver mais
        <ChevronRight size={16} className="ml-1" />
      </Button>
    </div>
  );
};

export default ProductReviewsHeader;