import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MediaItem } from "@/types/product";

interface ProductImageGalleryProps {
  media: MediaItem[];
  onCartClick: () => void;
  cartItemCount: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ media }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative bg-white pt-[44px]">
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
      
      <div className="absolute bottom-4 right-4 bg-black/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
        {selectedIndex + 1}/{media.length}
      </div>
    </div>
  );
};

export default ProductImageGallery;