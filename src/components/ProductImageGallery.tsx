import React, { useState, useEffect } from 'react';
import { Share2, ShoppingCart, MoreVertical, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import MediaViewerDialog from './MediaViewerDialog';
import { showSuccess } from "@/utils/toast";
import { MediaItem } from "@/types/product";

interface ThumbnailProps {
  isActive: boolean;
  item: MediaItem;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ isActive, item, onClick }) => (
  <div
    className={cn(
      "w-16 h-16 p-0.5 border-2 rounded-md flex-shrink-0 transition-colors cursor-pointer relative",
      isActive ? "border-cyan-500" : "border-transparent"
    )}
    onClick={onClick}
  >
    <img src={item.thumbnailSrc} alt="Product thumbnail" className="w-full h-full object-cover rounded-[4px]" />
    
    {item.type === 'video' && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[4px]">
        <Play size={16} className="text-white fill-white" />
      </div>
    )}
  </div>
);

interface ProductImageGalleryProps {
  media: MediaItem[];
  onCartClick: () => void;
  cartItemCount: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ media, onCartClick, cartItemCount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  const totalMedia = media.length;
  const activeItem = media[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [media]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalMedia);
  };
  
  const handleMediaClick = () => {
    if (activeItem) {
      setIsViewerOpen(true);
    }
  };
  
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("Link da oferta copiado!");
    } catch (err) {
      console.error('Falha ao copiar o link:', err);
    }
  };
  
  useEffect(() => {
    if (totalMedia === 0) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [totalMedia]);

  if (totalMedia === 0) return null;

  return (
    <div className="relative bg-white">
      <MediaViewerDialog 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        mediaItem={activeItem}
      />

      {/* Top Floating Header */}
      <div className="absolute top-0 right-0 p-4 flex space-x-2 z-10">
        <button 
          className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
          onClick={handleShare}
        >
          <Share2 size={16} />
        </button>
        
        <button 
          className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm relative"
          onClick={onCartClick}
        >
          <ShoppingCart size={16} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
        
        <button className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Main Media Area */}
      <div 
        className="relative h-[400px] flex items-center justify-center bg-white cursor-pointer"
        onClick={handleMediaClick}
      >
        <img 
          src={activeItem.src} 
          alt={`Main product image ${activeIndex + 1}`} 
          className="max-h-full object-contain w-full" 
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {activeIndex + 1}/{totalMedia}
        </div>
      </div>

      {/* Thumbnail Gallery - Hidden Scrollbar */}
      <div className="px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex space-x-2 pb-2">
          {media.map((item, index) => (
            <Thumbnail 
              key={index} 
              item={item} 
              isActive={index === activeIndex} 
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;