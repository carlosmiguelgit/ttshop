import React from 'react';
import { Zap, Clock } from "lucide-react";

const FlashSaleBanner: React.FC = () => {
  return (
    <div className="bg-[#FF6600] text-white p-4 flex flex-col space-y-1">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline space-x-2">
          {/* Preço Original */}
          <span className="text-sm opacity-70 line-through">R$ 619,90</span>
          {/* Preço Atual */}
          <span className="text-3xl font-bold">R$ 67,90</span>
        </div>
        
        {/* Cronômetro */}
        <div className="flex items-center text-sm font-medium">
          <Clock size={16} className="mr-1" />
          <span>Termina em 00:04:54</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 text-sm">
        {/* Indicador de Oferta Relâmpago */}
        <div className="flex items-center">
            <Zap size={16} className="text-yellow-300 fill-yellow-300 mr-1" />
            <span className="font-semibold">Oferta Relâmpago</span>
        </div>
        
        {/* Mensagem de Economia */}
        <span className="ml-auto">Economize até 89%</span>
      </div>
    </div>
  );
};

export default FlashSaleBanner;