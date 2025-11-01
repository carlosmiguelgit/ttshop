import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number; // Mantido, mas não usado visualmente nesta seção
  reviewCount: number;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ reviewCount }) => {
  
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