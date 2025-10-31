import React, { useState } from 'react';
import { Share2, ShoppingCart, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailProps {
  isActive: boolean;
  src: string;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ isActive, src, onClick }) => (
  <div
    className={cn(
      "w-16 h-16 p-0.5 border-2 rounded-md flex-shrink-0 transition-colors cursor-pointer",
      isActive ? "border-cyan-500" : "border-transparent"
    )}
    onClick={onClick}
  >
    {/* Usando object-cover para imitar o estilo de corte da miniatura */}
    <img src={src} alt="Product thumbnail" className="w-full h-full object-cover rounded-[4px]" />
  </div>
);

const ProductImageGallery: React.FC = () => {
  // Caminhos de imagem fornecidos pelo usuário, simulados com placeholder.svg para garantir o funcionamento local.
  const images = [
    "/placeholder.svg", // main: https://ttshop-khaki.vercel.app/images/3773102472.webp
    "/placeholder.svg", // thumb1: https://ttshop-khaki.vercel.app/images/3043720495.webp
    "/placeholder.svg", // thumb2: https://ttshop-khaki.vercel.app/images/2878343680.webp
    "/placeholder.svg", // thumb3: https://ttshop-khaki.vercel.app/images/1008446112.webp
    "/placeholder.svg", // thumb4: https://ttshop-khaki.vercel.app/images/2829270982.webp
    "/placeholder.svg", // thumb5: https://ttshop-khaki.vercel.app/images/545675923.webp
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = images.length;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

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
        {/* Imagem Principal */}
        <img src={images[activeIndex]} alt={`Main product image ${activeIndex + 1}`} className="max-h-full object-contain w-full" />

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {activeIndex + 1}/{totalImages}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="px-4 py-2 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {images.map((src, index) => (
            <Thumbnail 
              key={index} 
              src={src} 
              isActive={index === activeIndex} 
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Carousel Dots (Refletindo o estado ativo) */}
      <div className="flex justify-center space-x-1 py-1">
        {images.map((_, index) => (
          <div 
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              index === activeIndex ? "bg-cyan-500" : "bg-gray-300"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;