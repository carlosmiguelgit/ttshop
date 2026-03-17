import React from 'react';
import { Store, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsBarProps {
  onAddToCartClick: () => void;
  onBuyWithCouponClick: () => void;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({ onAddToCartClick, onBuyWithCouponClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
      <div className="w-full max-w-[600px] bg-white border-t px-3 py-2 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        
        {/* Ícones da Esquerda com o ícone de LOJA correto */}
        <div className="flex space-x-4 mr-4">
          <button className="flex flex-col items-center text-[10px] text-gray-700">
            <Store size={22} className="text-gray-900" />
            <span className="mt-0.5">Loja</span>
          </button>
          <button className="flex flex-col items-center text-[10px] text-gray-700">
            <MessageCircle size={22} className="text-gray-900" />
            <span className="mt-0.5">Chat</span>
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-2 flex-grow">
          <Button
            className="bg-[#F1F1F1] text-gray-900 border-none rounded-full h-11 text-sm font-bold hover:bg-gray-200 flex-1 px-1"
            onClick={onAddToCartClick}
          >
            Adicionar ao<br />carrinho
          </Button>

          <Button
            className="flex flex-col items-center justify-center bg-[#FF2C55] text-white rounded-full h-11 flex-1 hover:bg-[#E0254B] transition-colors px-1"
            onClick={onBuyWithCouponClick}
          >
            <span className="text-sm font-bold leading-none">Comprar agora</span>
            <span className="text-[10px] font-medium leading-none mt-0.5">Frete grátis</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;