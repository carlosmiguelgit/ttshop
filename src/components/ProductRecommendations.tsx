"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { products, Product } from '@/data/products';

interface ProductRecommendationsProps {
  currentSlug: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ currentSlug }) => {
  const navigate = useNavigate();
  
  // Filtra o produto atual da lista
  const recommendedProducts = products.filter(p => p.slug !== currentSlug);

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="bg-[#F8F8F8] p-4 pb-8">
      <h3 className="text-[16px] font-bold text-gray-900 mb-4">Você também pode gostar</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {recommendedProducts.map((product) => (
          <div 
            key={product.slug}
            className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => {
              navigate(`/${product.slug}`);
              window.scrollTo(0, 0);
            }}
          >
            {/* Imagem do Produto */}
            <div className="aspect-square bg-gray-50 relative">
              <img 
                src={product.media[0]?.src} 
                alt={product.title} 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info do Produto */}
            <div className="p-3 space-y-1.5">
              <h4 className="text-[13px] text-gray-800 line-clamp-2 leading-tight h-[32px]">
                {product.title}
              </h4>
              
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-[12px] font-bold text-[#FF2C55] mr-0.5">R$</span>
                  <span className="text-[18px] font-bold text-[#FF2C55] leading-none">
                    {product.currentPrice.split(',')[0]}
                    <span className="text-[14px]">,{product.currentPrice.split(',')[1]}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 line-through ml-1.5">
                    R$ {product.originalPrice}
                  </span>
                </div>
                
                <div className="mt-1">
                  <span className="text-[10px] font-bold text-[#00BFA5] bg-[#EFFFFD] px-1.5 py-0.5 rounded-sm">
                    Frete grátis
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-[11px] text-gray-400 pt-1">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-900 font-bold">{product.rating}</span>
                <span>|</span>
                <span>{product.salesCount > 1000 ? `${(product.salesCount/1000).toFixed(1)}k` : product.salesCount} vendidos</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;