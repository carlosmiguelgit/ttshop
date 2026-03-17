import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

const CustomerProtectionSection: React.FC = () => {
  // Cores baseadas na nova imagem (marrom/dourado)
  const primaryColor = "#A0783A"; 

  return (
    <div className="p-4 bg-white border-t border-gray-50 cursor-pointer">
      {/* Linha 1: Título e Ícone de Escudo Sólido (Menores) */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center">
            <ShieldCheck size={18} className="text-[#A0783A] fill-[#A0783A]" />
            <Check size={8} className="absolute text-white stroke-[3]" />
          </div>
          <h3 className="text-[13px] font-bold text-[#A0783A]">
            Proteção do cliente
          </h3>
        </div>
        <ChevronRight size={14} className="text-gray-300" />
      </div>

      {/* Grid de benefícios fiel à imagem */}
      <div className="grid grid-cols-2 gap-y-1.5 pl-6">
        <div className="flex items-center space-x-1.5">
          <Check size={12} className="text-[#A0783A]" />
          <span className="text-[11px] text-gray-700">Devolução gratuita</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Check size={12} className="text-[#A0783A]" />
          <span className="text-[11px] text-gray-700">Reembolso automático por danos</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Check size={12} className="text-[#A0783A]" />
          <span className="text-[11px] text-gray-700">Pagamento seguro</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Check size={12} className="text-[#A0783A]" />
          <span className="text-[11px] text-gray-700">Reembolso automático por atraso...</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerProtectionSection;