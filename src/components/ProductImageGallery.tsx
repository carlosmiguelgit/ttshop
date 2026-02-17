import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MediaItem } from "@/types/product";

interface ProductImageGalleryProps {
  media: MediaItem[];
  onCartClick: () => void;
  cartItemCount: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ media }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' });

  return (
    <div className="relative bg-white pt-[44px]"> {/* Altura do Header fixo */}
      {/* Container do Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {media.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-[360px] flex items-center justify-center bg-white">
              <img 
                src={item.src} 
                alt={`Product ${index + 1}`} 
                className="max-h-full object-contain w-full" 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicador de página simples (opcional, estilo TikTok) */}
      <div className="absolute bottom-4 right-4 bg-black/20 text-white text-[10px] px-2 py-0.5 rounded-full">
        1/{media.length}
      </div>
    </div>
  );
};

export default ProductImageGallery;