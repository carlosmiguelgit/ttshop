"use client";

import React, { useState, useRef } from 'react';
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
    // 64 é o novo tamanho da área do botão para facilitar o clique
    const handleSize = 60; 
    const trackWidth = containerRect.width - handleSize;
    let newPos = clientX - containerRect.left - (handleSize / 2);

    if (newPos < 0) newPos = 0;
    if (newPos > trackWidth) newPos = trackWidth;

    setSliderPos(newPos);

    if (newPos >= trackWidth * 0.95) {
      setIsUnlocked(true);
      isDragging.current = false;
      setTimeout(onUnlock, 200);
    }
  };

  const handleEnd = () => {
    if (isUnlocked) return;
    isDragging.current = false;
    setSliderPos(0);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-[400px] space-y-10 text-center">
        {/* Ícone de Segurança */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center relative border border-gray-100">
            <ShieldCheck size={48} className="text-[#FF2C55]" />
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border shadow-sm">
               <Lock size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Verificação Necessária</h1>
          <p className="text-[15px] text-gray-500 px-4">
            Para garantir uma navegação segura, arraste o botão abaixo para confirmar que você é um humano.
          </p>
        </div>

        {/* Track do Slider - Aumentei a altura para facilitar o toque */}
        <div 
          ref={containerRef}
          className="relative h-16 bg-[#F8F8F8] border border-gray-200 rounded-full p-1 overflow-hidden touch-none"
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchEnd={handleEnd}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Texto de fundo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-12">
              Arraste para entrar
            </span>
          </div>

          {/* Botão de Arraste - Área de contato aumentada (h-14 w-14) */}
          <div 
            className="h-14 w-14 bg-[#FF2C55] rounded-full flex items-center justify-center text-white shadow-xl cursor-grab active:cursor-grabbing z-20 transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${sliderPos}px)` }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <ChevronRight size={32} className={isUnlocked ? "animate-ping" : ""} />
          </div>

          {/* Preenchimento de cor acompanhando o botão */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-[#FF2C55]/10 rounded-l-full"
            style={{ width: `${sliderPos + 28}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default UnlockGate;