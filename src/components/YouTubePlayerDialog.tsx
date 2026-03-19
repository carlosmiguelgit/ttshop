"use client";

import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface YouTubePlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const YouTubePlayerDialog: React.FC<YouTubePlayerDialogProps> = ({ isOpen, onClose, videoId }) => {
  if (!videoId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] max-h-[90vh] p-0 border-none bg-black flex items-center justify-center overflow-hidden rounded-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-full aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubePlayerDialog;