import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

interface CustomerProtectionSectionProps {
  onClick: () => void;
}

const CustomerProtectionSection: React.FC<CustomerProtectionSectionProps> = ({ onClick }) => {
  return (
    <div className="p-4 bg-white border-t border-gray-50 cursor-pointer" onClick={onClick}>
      {/* Linha 1: Título e Ícone */}
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

      {/* Grid de benefícios com fontes reduzidas e efeito de fade no último item */}
      <div className="grid grid-cols-2 gap-y-1.5 pl-6">
        <div className="flex items-center space-x-1.5 overflow-hidden whitespace-nowrap">
          <Check size={12} className="text-[#A0783A] flex-shrink-0" />
          <span className="text-[10px] text-gray-700">Devolução gratuita</span>
        </div>
        <div className="flex items-center space-x-1.5 overflow-hidden whitespace-nowrap">
          <Check size={12} className="text-[#A0783A] flex-shrink-0" />
          <span className="text-[10px] text-gray-700">Reembolso automático por danos</span>
        </div>
        <div className="flex items-center space-x-1.5 overflow-hidden whitespace-nowrap">
          <Check size={12} className="text-[#A0783A] flex-shrink-0" />
          <span className="text-[10px] text-gray-700">Pagamento seguro</span>
        </div>
        <div className="flex items-center space-x-1.5 overflow-hidden whitespace-nowrap relative">
          <Check size={12} className="text-[#A0783A] flex-shrink-0" />
          <span className="text-[10px] text-gray-700 truncate pr-4">
            Reembolso automático por atras...
          </span>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProtectionSection;