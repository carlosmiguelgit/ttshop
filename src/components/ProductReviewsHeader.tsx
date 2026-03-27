"use client";

import React, { useState } from 'react';
import { ChevronRight, Star, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductReviewsHeaderProps {
  rating: number; 
  reviewCount: number;
  onViewMoreClick: () => void;
  showViewMore: boolean;
}

const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({ rating, reviewCount, onViewMoreClick, showViewMore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
          <h3 className="text-[15px] font-bold text-gray-900">Avaliações dos clientes ({formatReviewCount(reviewCount)})</h3>
        </div>
        
        {showViewMore && (
          <Button 
            variant="ghost" 
            className="text-[13px] text-gray-400 hover:text-gray-700 p-0 h-auto font-medium"
            onClick={onViewMoreClick}
          >
            Ver mais
            <ChevronRight size={14} className="ml-0.5" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center mt-1 space-x-1.5">
        <div className="flex items-baseline">
          <span className="text-[15px] font-bold text-gray-900 leading-none">{rating.toFixed(1)}</span>
          <span className="text-[11px] text-gray-400 font-normal ml-0.5">/5</span>
        </div>
        {renderStars()}
        <button onClick={() => setIsModalOpen(true)} className="p-0.5 ml-1">
          <Info size={14} className="text-gray-900" />
        </button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[90vw] w-[90vw] p-0 rounded-3xl overflow-hidden border-none shadow-2xl">
          <div className="bg-white p-6 relative flex flex-col items-center">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-900 p-1"
            >
              <X size={24} />
            </button>

            <h3 className="text-[24px] font-bold text-gray-900 text-center leading-[1.1] mb-6 mt-4">
              Como a classificação do produto é calculada?
            </h3>

            <p className="text-[15px] text-gray-600 text-center leading-relaxed mb-8 px-2">
              A classificação do produto é a média de todas as classificações de clientes verificados. Para garantir equidade e confiabilidade, as avaliações que mencionam apenas a logística da plataforma são excluídas do cálculo.
            </p>

            <Button 
              className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold h-[54px] rounded-full text-[17px]"
              onClick={() => setIsModalOpen(false)}
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviewsHeader;