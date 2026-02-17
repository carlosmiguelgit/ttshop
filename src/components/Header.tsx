import React from 'react';
import { ArrowLeft, Search, Share2, ShoppingCart, MoreHorizontal } from "lucide-react";
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
      <div className="w-full max-w-[600px] bg-white border-b px-2 py-1.5 flex items-center space-x-2">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>

        {/* Barra de Busca Simbolizada */}
        <div className="flex-grow flex items-center bg-gray-100 rounded-full px-3 py-1.5 space-x-2">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            readOnly
            value={productTitle}
            className="bg-transparent border-none text-xs text-gray-700 w-full focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
          />
        </div>

        {/* Ícones de Ação */}
        <div className="flex items-center space-x-1">
          <button onClick={handleShare} className="p-1.5 hover:bg-gray-100 rounded-full">
            <Share2 size={18} className="text-gray-700" />
          </button>
          
          <button onClick={onCartClick} className="p-1.5 hover:bg-gray-100 rounded-full relative">
            <ShoppingCart size={18} className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <button className="p-1.5 hover:bg-gray-100 rounded-full">
            <MoreHorizontal size={18} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;