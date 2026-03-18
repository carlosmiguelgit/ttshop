import React from 'react';
import { ArrowLeft, Search, ShoppingCart, MoreHorizontal } from "lucide-react";
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

        {/* Barra de Busca */}
        <div className="flex-grow flex items-center bg-[#F1F1F1] rounded-lg px-3 h-9 mx-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            produtos de 0 99 real
          </span>
        </div>

        {/* Ícones da Direita */}
        <div className="flex items-center space-x-1.5">
          {/* Botão Compartilhar Ajustado */}
          <button 
            onClick={handleShare} 
            className="relative flex flex-col items-center justify-center p-1 translate-x-1 -translate-y-0.5"
          >
            <img src="/seta.png" alt="Compartilhar" className="w-6 h-6 object-contain" />
            <div className="absolute -bottom-1.5 bg-[#FF2C55] text-white text-[7px] px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium">
              Compre p...
            </div>
          </button>
          
          {/* Carrinho */}
          <button onClick={onCartClick} className="p-1 relative">
            <ShoppingCart size={24} className="text-gray-900" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2C55] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Menu */}
          <button className="p-1">
            <MoreHorizontal size={24} className="text-gray-900" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;