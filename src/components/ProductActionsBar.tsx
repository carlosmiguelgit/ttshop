import React from 'react';
import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsBarProps {
  onAddToCartClick: () => void;
  onBuyWithCouponClick: () => void;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({ onAddToCartClick, onBuyWithCouponClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
      <div className="w-full max-w-[600px] bg-white border-t shadow-lg px-3 py-2 flex items-center justify-between">
        
        {/* Ícones da Esquerda */}
        <div className="flex space-x-6 mr-4">
          <button className="flex flex-col items-center text-[10px] text-gray-600">
            <Home size={22} className="text-gray-800" />
            <span className="mt-0.5">Loja</span>
          </button>
          <button className="flex flex-col items-center text-[10px] text-gray-600">
            {/* Ícone de chat bubble redondo com ponta na direita */}
            <MessageCircle size={22} className="text-gray-800 transform scale-x-[-1]" />
            <span className="mt-0.5">Chat</span>
          </button>
        </div>

        {/* Botões de Ação estilo Pílula */}
        <div className="flex items-center space-x-2 flex-grow">
          <Button
            variant="outline"
            className="bg-[#F2F3F5] text-gray-900 border-none rounded-full h-10 text-[12px] font-bold hover:bg-gray-200 leading-[1.1] flex-1 px-1"
            onClick={onAddToCartClick}
          >
            Adicionar ao<br />carrinho
          </Button>

          <Button
            className="flex flex-col items-center justify-center bg-[#FF2C55] text-white rounded-full h-10 flex-1 hover:bg-[#E0254B] transition-colors px-1"
            onClick={onBuyWithCouponClick}
          >
            <span className="text-[12px] font-bold leading-none">Comprar Agora</span>
            <span className="text-[9px] font-medium leading-none mt-0.5 opacity-90">Frete grátis</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;