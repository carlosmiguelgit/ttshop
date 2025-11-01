import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number;
  reviewCount: number;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ rating, reviewCount }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-xl font-bold text-gray-900">Avaliações</h3>
        
        {/* Média de Avaliação */}
        <div className="flex items-center bg-yellow-500/10 text-yellow-700 px-2 py-1 rounded-full text-sm font-semibold">
          <Star size={14} className="fill-yellow-500 text-yellow-500 mr-1" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Botão Ver Todas */}
      <Button 
        variant="ghost" 
        className="text-sm text-cyan-600 hover:text-cyan-700 p-0 h-auto"
      >
        Ver todas ({reviewCount})
        <ChevronRight size={16} className="ml-1" />
      </Button>
    </div>
  );
};

export default ProductReviewsHeader;