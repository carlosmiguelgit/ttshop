import React from 'react';
import { Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Importando cn para classes condicionais

interface ProductActionsBarProps {
  onAddToCartClick: () => void;
  onBuyWithCouponClick: () => void;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({ onAddToCartClick, onBuyWithCouponClick }) => {

  // Estilo do botão "Adicionar ao carrinho" (fundo claro, texto preto, quebra de linha)
  const AddToCartButton = (
    <Button
      variant="outline"
      className={cn(
        "bg-gray-100 text-gray-900 border-none rounded-xl h-10 text-sm font-bold hover:bg-gray-200", // Reduzido de h-12 para h-10
        "flex-grow w-full max-w-[135px] whitespace-normal leading-snug py-2" // Reduzido de 150px para 135px
      )}
      onClick={onAddToCartClick}
    >
      Adicionar ao <br /> carrinho
    </Button>
  );

  // Estilo do botão "Comprar Agora" (fundo vermelho vibrante, texto branco, uma linha)
  const BuyNowButton = (
    <Button
      className={cn(
        "bg-[#FF3366] text-white rounded-xl h-10 text-base font-bold hover:bg-[#E02E5C]", // Reduzido de h-12 para h-10
        "flex-grow w-full max-w-[135px] whitespace-nowrap" // Reduzido de 150px para 135px
      )}
      onClick={onBuyWithCouponClick}
    >
      Comprar Agora
    </Button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
      <div className="w-full max-w-[600px] bg-white border-t shadow-lg p-2 flex items-center justify-between">

        {/* Ícones da Esquerda (Loja & Chat) */}
        <div className="flex space-x-4 sm:space-x-6 px-2">
          <button className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors">
            <Home size={20} className="mb-1" /> {/* Reduzido de 24 para 20 */}
            <span>Loja</span>
          </button>
          <button className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors">
            <MessageSquare size={20} className="mb-1" /> {/* Reduzido de 24 para 20 */}
            <span>Chat</span>
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-2 flex-grow justify-end pr-2">
          {AddToCartButton}
          {BuyNowButton}
        </div>
      </div>
    </div>
  );
};

export default ProductActionsBar;