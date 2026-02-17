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
      <div className="w-full max-w-[600px] bg-white border-t shadow-lg p-2 flex items-center justify-between">
        
        {/* Ícones da Esquerda */}
        <div className="flex space-x-5 px-2">
          <button className="flex flex-col items-center text-[10px] text-gray-500 hover:text-red-500 transition-colors">
            <Home size={18} className="mb-0.5 text-gray-700" />
            <span>Loja</span>
          </button>
          <button className="flex flex-col items-center text-[10px] text-gray-500 hover:text-red-500 transition-colors">
            <MessageSquare size={18} className="mb-0.5 text-gray-700" />
            <span>Chat</span>
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-2 flex-grow justify-end pr-2">
          {/* Adicionar ao Carrinho */}
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-900 border-none rounded-xl h-11 text-[12px] font-bold hover:bg-gray-200 leading-tight flex-1 max-w-[140px] px-1"
            onClick={onAddToCartClick}
          >
            Adicionar ao<br />carrinho
          </Button>

          {/* Comprar Agora com Frete Grátis dentro */}
          <Button
            className="flex flex-col items-center justify-center bg-[#FF3366] text-white rounded-xl h-11 flex-1 max-w-[140px] hover:bg-[#E02E5C] transition-colors"
            onClick={onBuyWithCouponClick}
          >
            <span className="text-[12px] font-bold leading-tight">Comprar Agora</span>
            <span className="text-[10px] font-medium leading-tight opacity-90">Frete grátis</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;