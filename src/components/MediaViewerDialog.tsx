import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface MediaViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItem: MediaItem | null;
}

const MediaViewerDialog: React.FC<MediaViewerDialogProps> = ({ isOpen, onClose, mediaItem }) => {
  if (!mediaItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-full h-full w-full p-0 border-none bg-black/90 flex items-center justify-center">
        
        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          aria-label="Fechar visualizador"
        >
          <X size={24} />
        </button>

        {/* Conteúdo da Mídia */}
        <div className="w-full h-full flex items-center justify-center p-4">
          {mediaItem.type === 'image' ? (
            <img 
              src={mediaItem.src} 
              alt="Visualização em tela cheia" 
              className="max-w-full max-h-full object-contain" 
            />
          ) : (
            <video 
              src={mediaItem.src} 
              controls 
              autoPlay 
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewerDialog;