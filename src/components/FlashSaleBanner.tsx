import React, { useState, useEffect } from 'react';
import { Zap, Clock } from "lucide-react";

const FlashSaleBanner: React.FC = () => {
  // Simulação de cronômetro regressivo (começa em 5 minutos)
  const initialTime = 5 * 60; // 5 minutes in seconds
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
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    
    // Mantendo o formato MM:SS, mas adicionando 00 para simular H:MM:SS se necessário
    return `00:${m}:${s}`;
  };

  return (
    <div className="bg-[#FF6600] text-white p-4 flex flex-col space-y-2">
      
      {/* Linha 1: Oferta Relâmpago e Cronômetro */}
      <div className="flex justify-between items-center">
        {/* Indicador de Oferta Relâmpago */}
        <div className="flex items-center text-sm">
            <Zap size={16} className="text-yellow-300 fill-yellow-300 mr-1" />
            <span className="font-semibold">OFERTA RELÂMPAGO</span>
        </div>
        
        {/* Cronômetro */}
        <div className="flex items-center text-sm font-medium">
          <Clock size={16} className="mr-1" />
          <span>Termina em {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Linha 2: Preços e Economia */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline space-x-2">
          {/* Preço Original */}
          <span className="text-sm opacity-70 line-through">R$ 619,90</span>
          {/* Preço Atual */}
          <span className="text-3xl font-bold">R$ 67,90</span>
        </div>
        
        {/* Mensagem de Economia */}
        <span className="text-sm font-medium">Economize até 89%</span>
      </div>
    </div>
  );
};

export default FlashSaleBanner;