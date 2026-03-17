import React from 'react';
import { ArrowLeft, Search, ShoppingCart, MoreHorizontal, Share2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { showSuccess } from "@/utils/toast";

interface HeaderProps {
  productTitle: string;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ productTitle, cartItemCount, onCartClick }) => {
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccess("Link da oferta copiado!");
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[600px] bg-white border-b px-3 h-12 flex items-center">
        {/* Botão Voltar */}
        <button onClick={() => navigate(-1)} className="p-2 -ml-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>

        {/* Barra de Busca - Placeholder da imagem */}
        <div className="flex-grow flex items-center bg-[#F1F1F1] rounded-lg px-3 h-9 mx-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            produtos de 0 99 real
          </span>
        </div>

        {/* Ícones da Direita */}
        <div className="flex items-center space-x-2">
          <button onClick={handleShare} className="p-1 relative">
            <Share2 size={24} className="text-gray-900" />
            <div className="absolute -bottom-1 -right-4 bg-[#FF2C55] text-white text-[8px] px-1 rounded-sm whitespace-nowrap">
              Compre p...
            </div>
          </button>
          
          <button onClick={onCartClick} className="p-1 relative">
            <ShoppingCart size={24} className="text-gray-900" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2C55] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <button className="p-1">
            <MoreHorizontal size={24} className="text-gray-900" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;