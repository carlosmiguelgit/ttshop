import React, { useState } from 'react';
import MediaViewerDialog from './MediaViewerDialog';
import { MediaItem } from '@/types/product';

interface ReviewImageGalleryProps {
  reviewImages: string[];
}

const ReviewImageGallery: React.FC<ReviewImageGalleryProps> = ({ reviewImages }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const handleImageClick = (src: string) => {
    // Assumimos que as imagens de avaliação são sempre do tipo 'image'
    setActiveMedia({ type: 'image', src: src, thumbnailSrc: src }); 
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setActiveMedia(null);
  };

  if (reviewImages.length === 0) return null;

  return (
    <>
      <div className="flex space-x-2 overflow-x-auto py-2">
        {reviewImages.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt={`Imagem da avaliação ${index + 1}`}
            className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>
      
      {/* Reutilizando o MediaViewerDialog para exibir a imagem em tela cheia */}
      <MediaViewerDialog
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        mediaItem={activeMedia}
      />
    </>
  );
};

export default ReviewImageGallery;