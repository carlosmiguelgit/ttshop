import React, { useState } from 'react';
import { Share2, ShoppingCart, MoreVertical } from "lucide-react";
import MediaViewerDialog from './MediaViewerDialog';
import { showSuccess } from "@/utils/toast";
import { MediaItem } from "@/types/product";

interface ProductImageGalleryProps {
  media: MediaItem[];
  onCartClick: () => void;
  cartItemCount: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ media, onCartClick, cartItemCount }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeItem = media[0]; // Mostra apenas a primeira imagem

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

  if (!activeItem) return null;

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
          alt="Product" 
          className="max-h-full object-contain w-full" 
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;