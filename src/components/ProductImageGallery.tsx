import React from 'react';
import { Share2, ShoppingCart, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailProps {
  isActive: boolean;
  src: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ isActive, src }) => (
  <div
    className={cn(
      "w-16 h-16 p-0.5 border-2 rounded-md flex-shrink-0 transition-colors",
      isActive ? "border-cyan-500" : "border-transparent"
    )}
  >
    {/* Usando object-cover para imitar o estilo de corte da miniatura */}
    <img src={src} alt="Product thumbnail" className="w-full h-full object-cover rounded-[4px]" />
  </div>
);

const ProductImageGallery: React.FC = () => {
  // Dados de placeholder para imagens (usando public/placeholder.svg)
  const images = Array(6).fill("/placeholder.svg");
  const activeIndex = 0;

  return (
    <div className="relative bg-white">
      {/* Top Floating Header */}
      <div className="absolute top-0 right-0 p-4 flex space-x-2 z-10">
        <button className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
          <Share2 size={16} />
        </button>
        <button className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
          <ShoppingCart size={16} />
        </button>
        <button className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="relative h-[400px] flex items-center justify-center bg-white">
        {/* Imagem Placeholder */}
        <img src={images[activeIndex]} alt="Main product image" className="max-h-full object-contain w-full" />

        {/* Navigation Arrows */}
        <button className="absolute left-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white">
          <ChevronRight size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {activeIndex + 1}/6
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {/* Usando overflow-x-auto para rolagem horizontal */}
      <div className="px-4 py-2 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {images.map((src, index) => (
            <Thumbnail key={index} src={src} isActive={index === activeIndex} />
          ))}
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center space-x-1 py-1">
        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductImageGallery;