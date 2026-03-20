import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductReviewsHeaderProps {
  rating: number; 
  reviewCount: number;
  onViewMoreClick: () => void;
  showViewMore: boolean;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ rating, reviewCount, onViewMoreClick, showViewMore }) => {
  
  const formatReviewCount = (count: number): string => {
    return count.toString();
  };
  
  const renderStars = () => (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-200 fill-gray-200"} 
        />
      ))}
    </div>
  );

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <h3 className="text-sm font-bold text-gray-900">Avaliações dos clientes</h3>
          <span className="text-sm text-gray-500">
            (
            <span className="font-bold">
              {formatReviewCount(reviewCount)}
            </span>
            )
          </span>
        </div>
        
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
      
      <div className="flex items-center mt-1 space-x-1.5">
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-gray-900 leading-none">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500 font-normal ml-0.5">/5</span>
        </div>
        {renderStars()}
      </div>
    </div>
  );
};

export default ProductReviewsHeader;