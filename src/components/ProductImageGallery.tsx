import React, { useState } from 'react';
import MediaViewerDialog from './MediaViewerDialog';
import { MediaItem } from "@/types/product";

interface ProductImageGalleryProps {
  media: MediaItem[];
  onCartClick: () => void;
  cartItemCount: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ media }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeItem = media[0];

  const handleMediaClick = () => {
    if (activeItem) {
      setIsViewerOpen(true);
    }
  };

  if (!activeItem) return null;

  return (
    <div className="relative bg-white pt-[48px]"> {/* Espaço para o Header fixo */}
      <MediaViewerDialog 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        mediaItem={activeItem}
      />

      {/* Main Media Area */}
      <div 
        className="relative h-[360px] flex items-center justify-center bg-white cursor-pointer"
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