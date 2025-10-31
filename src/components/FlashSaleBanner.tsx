import React, { useState, useEffect } from 'react';
import { Zap } from "lucide-react";

const FlashSaleBanner: React.FC = () => {
  // Simulação de cronômetro regressivo (começa em 10 horas, 25 minutos e 17 segundos)
  const initialTime = 10 * 3600 + 25 * 60 + 17; 
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#FF6600] to-[#FF3399] text-white p-3 flex justify-between items-center">
      
      {/* Lado Esquerdo: Desconto e Preços */}
      <div className="flex items-center space-x-2">
        
        {/* Balão de Desconto */}
        <span className="bg-white text-[#FF3399] text-xs font-bold px-1.5 py-0.5 rounded-sm flex-shrink-0">
          -52%
        </span>
        
        {/* Preço Atual e Preço Original */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-xl font-bold">R$ 95,00</span>
          <span className="text-xs opacity-70 line-through mt-0.5">R$ 198,99</span>
        </div>
      </div>

      {/* Lado Direito: Oferta Relâmpago e Cronômetro */}
      <div className="flex flex-col items-end text-right leading-tight">
        <div className="flex items-center text-sm font-semibold">
            <Zap size={14} className="text-yellow-300 fill-yellow-300 mr-1" />
            <span>Oferta Relâmpago</span>
        </div>
        <span className="text-xs font-medium mt-0.5">
          Termina em {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default FlashSaleBanner;