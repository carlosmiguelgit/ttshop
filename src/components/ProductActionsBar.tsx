import React from 'react';
import { Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsBarProps {
  onAddToCartClick: () => void;
  onBuyWithCouponClick: () => void;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({ onAddToCartClick, onBuyWithCouponClick }) => {
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
          {/* Botão Adicionar ao Carrinho */}
          <Button 
            variant="outline" 
            className="bg-gray-100 text-gray-800 border-none rounded-full px-4 sm:px-6 h-10 text-sm sm:text-base font-semibold hover:bg-gray-200 flex-grow"
            onClick={onAddToCartClick}
          >
            Adicionar ao carrinho
          </Button>
          {/* Botão Comprar com Cupom (Vermelho) */}
          <Button 
            className="bg-red-600 text-white rounded-full px-4 sm:px-6 h-10 text-sm sm:text-base font-semibold hover:bg-red-700 flex-grow"
            onClick={onBuyWithCouponClick}
          >
            Comprar com cupom
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;