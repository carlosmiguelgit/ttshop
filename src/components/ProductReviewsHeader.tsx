"use client";

import React, { useState } from 'react';
import { ChevronRight, Star, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface ProductReviewsHeaderProps {
  rating: number; 
  reviewCount: number;
  onViewMoreClick: () => void;
  showViewMore: boolean;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ rating, reviewCount, onViewMoreClick, showViewMore }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) return (count / 1000).toFixed(1) + ' mil';
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
          <h3 className="text-[15px] font-bold text-gray-900">Avaliações da loja ({formatReviewCount(reviewCount)})</h3>
        </div>
        
        {showViewMore && (
          <Button 
            variant="ghost" 
            className="text-[13px] text-gray-400 hover:text-gray-700 p-0 h-auto font-medium"
            onClick={onViewMoreClick}
          >
            <ChevronRight size={18} className="text-gray-300" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center mt-1 space-x-1.5">
        <div className="flex items-baseline">
          <span className="text-[15px] font-bold text-gray-900 leading-none">{rating.toFixed(1)}</span>
          <span className="text-[11px] text-gray-400 font-normal ml-0.5">/5</span>
        </div>
        {renderStars()}
        <button onClick={() => setIsDrawerOpen(true)} className="p-0.5 ml-1">
          <Info size={14} className="text-gray-900" />
        </button>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[85vh] p-0 rounded-t-[32px] border-none bg-white">
          <div className="mx-auto w-full max-w-[600px] flex flex-col items-center p-6 pt-12 text-center">
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="absolute right-6 top-6 text-gray-900"
            >
              <X size={24} />
            </button>

            <h3 className="text-[22px] font-bold text-gray-900 leading-tight mb-4 px-4">
              Como a classificação do produto é calculada?
            </h3>

            <p className="text-[15px] text-gray-500 leading-relaxed mb-10 px-2">
              A classificação do produto é a média de todas as classificações de clientes verificados. Para garantir equidade e confiabilidade, as avaliações que mencionam apenas a logística da plataforma são excluídas do cálculo.
            </p>

            <Button 
              className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold h-[52px] rounded-full text-[16px]"
              onClick={() => setIsDrawerOpen(false)}
            >
              Entendi
            </Button>
            <div className="h-4"></div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProductReviewsHeader;