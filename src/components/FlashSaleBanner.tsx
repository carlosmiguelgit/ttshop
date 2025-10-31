import React, { useState, useEffect } from 'react';
import { Zap } from "lucide-react";

const FlashSaleBanner: React.FC = () => {
  // Inicia o cronômetro em 3 minutos (180 segundos)
  const initialTime = 3 * 60; 
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
    // O formato agora será M:SS, mas mantendo H:MM:SS para consistência visual se o tempo for maior que 1 hora.
    // Para 3 minutos, o formato será 00:03:00 -> 00:02:59, etc.
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#FF6600] to-[#FF3399] text-white p-3 flex justify-between items-center">
      
      {/* Lado Esquerdo: Desconto e Preços */}
      <div className="flex items-center space-x-2">
        
        {/* Balão de Desconto (Ajustado para 89%) */}
        <span className="bg-white text-[#FF3399] text-xs font-bold px-1.5 py-0.5 rounded-sm flex-shrink-0">
          -89%
        </span>
        
        {/* Preço Atual e Preço Original */}
        <div className="flex flex-col items-start leading-none">
          {/* Preço Atual em destaque */}
          <span className="text-2xl font-bold">R$ 67,90</span>
          {/* Preço Original riscado */}
          <span className="text-xs opacity-70 line-through mt-0.5">R$ 619,90</span>
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