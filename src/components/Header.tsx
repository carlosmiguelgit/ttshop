import React from 'react';
import { ArrowLeft, Search, ShoppingCart, MoreHorizontal, Redo2 } from "lucide-react";
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
      {/* Altura reduzida para h-11 e paddings mínimos para ser bem fino */}
      <div className="w-full max-w-[600px] bg-white border-b px-3 h-11 flex items-center justify-between">
        
        <div className="flex items-center flex-1">
          {/* Botão Voltar */}
          <button 
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 mr-1"
          >
            <ArrowLeft size={22} className="text-gray-800" strokeWidth={1.5} />
          </button>

          {/* Barra de Busca estilo Pílula */}
          <div className="flex-grow max-w-[220px] flex items-center bg-[#F2F3F5] rounded-full px-3 h-7 space-x-2">
            <Search size={14} className="text-gray-400" />
            <span className="text-[12px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
              {productTitle}
            </span>
          </div>
        </div>

        {/* Ícones de Ação da Direita */}
        <div className="flex items-center space-x-3 ml-2">
          <button onClick={handleShare} className="p-1">
            <Redo2 size={20} className="text-gray-800" />
          </button>
          
          <button onClick={onCartClick} className="p-1 relative">
            <ShoppingCart size={20} className="text-gray-800" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <button className="p-1">
            <MoreHorizontal size={20} className="text-gray-800" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;