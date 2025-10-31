import React, { useState, useEffect } from 'react';
import { Share2, ShoppingCart, MoreVertical, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import MediaViewerDialog from './MediaViewerDialog';
import { showSuccess } from "@/utils/toast"; // Importando showSuccess

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnailSrc: string; // Usado para a miniatura, mesmo que seja um vídeo
}

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
    {/* Usando object-cover para imitar o estilo de corte da miniatura */}
    <img src={item.thumbnailSrc} alt="Product thumbnail" className="w-full h-full object-cover rounded-[4px]" />
    
    {item.type === 'video' && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[4px]">
        <Play size={16} className="text-white fill-white" />
      </div>
    )}
  </div>
);

interface ProductImageGalleryProps {
  onCartClick: () => void;
  cartItemCount: number; // Novo prop
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ onCartClick, cartItemCount }) => {
  // Definindo a lista de mídia (apenas imagens agora)
  const media: MediaItem[] = [
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_971780-MLB94758468933_102025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_971780-MLB94758468933_102025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_939429-MLB92436307100_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_939429-MLB92436307100_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_694773-MLB92845535377_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_694773-MLB92845535377_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_817055-MLB92435483774_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_817055-MLB92435483774_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_707877-MLB92436356940_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_707877-MLB92436356940_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_600092-MLB92845535605_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_600092-MLB92845535605_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  const totalMedia = media.length;
  const activeItem = media[activeIndex];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalMedia);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalMedia) % totalMedia);
  };
  
  const handleMediaClick = () => {
    setIsViewerOpen(true);
  };
  
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("Link da oferta copiado!");
    } catch (err) {
      console.error('Falha ao copiar o link:', err);
      // Fallback simples caso a API de clipboard falhe
      alert(`Falha ao copiar. Copie manualmente: ${url}`);
    }
  };
  
  // Efeito de carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalMedia);
    }, 3000); // Muda a cada 3 segundos

    // Limpa o intervalo quando o componente é desmontado ou o totalMedia muda
    return () => clearInterval(interval);
  }, [totalMedia]);


  return (
    <div className="relative bg-white">
      
      {/* Media Viewer Dialog */}
      <MediaViewerDialog 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        mediaItem={activeItem}
      />

      {/* Top Floating Header */}
      <div className="absolute top-0 right-0 p-4 flex space-x-2 z-10">
        <button 
          className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
          onClick={handleShare} // Agora copia o link
        >
          <Share2 size={16} />
        </button>
        
        {/* Botão do Carrinho com Badge (simulando 1 item) */}
        <button 
          className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm relative"
          onClick={onCartClick} // Este clique abre o Drawer
        >
          <ShoppingCart size={16} />
          {/* Badge de contagem condicional */}
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
        {/* Agora sempre será uma imagem */}
        <img 
          src={activeItem.src} 
          alt={`Main product image ${activeIndex + 1}`} 
          className="max-h-full object-contain w-full" 
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {activeIndex + 1}/{totalMedia}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="px-4 py-2 overflow-x-auto whitespace-nowrap">
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

      {/* Carousel Dots (Refletindo o estado ativo) */}
      <div className="flex justify-center space-x-1 py-1">
        {media.map((_, index) => (
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