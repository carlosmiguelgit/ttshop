"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';

interface UnlockGateProps {
  onUnlock: () => void;
}

const UnlockGate: React.FC<UnlockGateProps> = ({ onUnlock }) => {
  const [sliderPos, setSliderPos] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || isUnlocked || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const trackWidth = containerRect.width - 56; // 56 é o tamanho do botão (h-14)
    let newPos = clientX - containerRect.left - 28; // centraliza o toque

    if (newPos < 0) newPos = 0;
    if (newPos > trackWidth) newPos = trackWidth;

    setSliderPos(newPos);

    // Se chegar no final (90% do caminho)
    if (newPos >= trackWidth * 0.95) {
      setIsUnlocked(true);
      isDragging.current = false;
      setTimeout(onUnlock, 300);
    }
  };

  const handleEnd = () => {
    if (isUnlocked) return;
    isDragging.current = false;
    setSliderPos(0); // Volta pro início se não completou
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px] space-y-8 text-center">
        {/* Ícone de Segurança */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[#F1F1F1] rounded-full flex items-center justify-center relative">
            <ShieldCheck size={40} className="text-[#FF2C55]" />
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border shadow-sm">
               <Lock size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Verificação de Segurança</h1>
          <p className="text-[14px] text-gray-500">Arraste o botão para validar seu acesso e visualizar nossas ofertas exclusivas.</p>
        </div>

        {/* Track do Slider */}
        <div 
          ref={containerRef}
          className="relative h-14 bg-[#F8F8F8] border border-gray-100 rounded-full p-1 select-none overflow-hidden"
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchEnd={handleEnd}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Texto de fundo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[14px] font-bold text-gray-300 uppercase tracking-widest pl-12">
              Arraste para entrar
            </span>
          </div>

          {/* Botão de Arraste */}
          <div 
            className="h-12 w-12 bg-[#FF2C55] rounded-full flex items-center justify-center text-white shadow-lg cursor-grab active:cursor-grabbing transition-transform duration-75 ease-out z-10"
            style={{ transform: `translateX(${sliderPos}px)` }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <ChevronRight size={28} className={isUnlocked ? "animate-ping" : ""} />
          </div>

          {/* Preenchimento de cor acompanhando o botão */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-[#FF2C55]/5 rounded-l-full"
            style={{ width: `${sliderPos + 28}px` }}
          />
        </div>

        <div className="pt-8">
          <p className="text-[11px] text-gray-400 uppercase tracking-tighter">
            Distribuído por <span className="font-bold">Havan</span> em parceria com <span className="font-bold">TikTok Shop</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnlockGate;