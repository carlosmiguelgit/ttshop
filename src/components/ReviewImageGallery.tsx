import React, { useState } from 'react';
import MediaViewerDialog from './MediaViewerDialog';
import { MediaItem } from '@/types/product';
import { Play } from 'lucide-react';

interface ReviewImageGalleryProps {
  reviewImages: string[];
  reviewVideos?: string[];
}

const ReviewImageGallery: React.FC<ReviewImageGalleryProps> = ({ reviewImages, reviewVideos = [] }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const handleImageClick = (src: string) => {
    setActiveMedia({ type: 'image', src: src, thumbnailSrc: src }); 
    setIsViewerOpen(true);
  };

  const handleVideoClick = (src: string) => {
    setActiveMedia({ type: 'video', src: src, thumbnailSrc: '' }); 
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setActiveMedia(null);
  };

  if (reviewImages.length === 0 && reviewVideos.length === 0) return null;

  return (
    <>
      <div className="flex space-x-2 overflow-x-auto py-2 no-scrollbar">
        {/* Renderiza Vídeos primeiro */}
        {reviewVideos.map((src, index) => (
          <div 
            key={`vid-${index}`}
            className="relative w-16 h-16 rounded-md border border-gray-200 flex-shrink-0 cursor-pointer overflow-hidden bg-black"
            onClick={() => handleVideoClick(src)}
          >
            <video 
              src={src} 
              className="w-full h-full object-cover opacity-60" 
              muted 
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={16} className="text-white fill-white" />
            </div>
          </div>
        ))}

        {/* Renderiza Imagens */}
        {reviewImages.map((src, index) => (
          <img 
            key={`img-${index}`}
            src={src}
            alt={`Imagem da avaliação ${index + 1}`}
            className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>
      
      <MediaViewerDialog
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        mediaItem={activeMedia}
      />
    </>
  );
};

export default ReviewImageGallery;