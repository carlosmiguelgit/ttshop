import React from 'react';
import { Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsBarProps {
  onViewReviewsClick: () => void;
  onBuyNowClick: () => void;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({ onViewReviewsClick, onBuyNowClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
      <div className="w-full max-w-[600px] bg-white border-t shadow-lg p-2 flex items-center justify-around">
        {/* Ícones da Esquerda (Loja & Chat) */}
        <div className="flex space-x-4 sm:space-x-6">
          <button className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors">
            <Home size={20} />
            <span>Loja</span>
          </button>
          <button className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors">
            <MessageSquare size={20} />
            <span>Chat</span>
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-2">
          {/* Botão Ver Avaliações */}
          <Button 
            variant="outline" 
            className="bg-gray-100 text-gray-800 border-none rounded-full px-4 sm:px-6 h-10 text-sm sm:text-base font-semibold hover:bg-gray-200 flex-grow"
            onClick={onViewReviewsClick}
          >
            Ver Avaliações
          </Button>
          {/* Botão Comprar Agora (Gradiente Rosa) */}
          <Button 
            className="bg-gradient-to-r from-[#FF66B2] to-[#FF3399] text-white rounded-full px-4 sm:px-6 h-10 text-sm sm:text-base font-semibold hover:opacity-90 flex-grow"
            onClick={onBuyNowClick}
          >
            Comprar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;