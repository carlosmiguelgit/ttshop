"use client";

import React, { useState, useRef } from 'react';
import { Gift, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnlockGateProps {
  onUnlock: () => void;
}

const UnlockGate: React.FC<UnlockGateProps> = ({ onUnlock }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Lista de prêmios (8 segmentos)
  const prizes = [
    "90% OFF",
    "R$ 50 OFF",
    "FRETE GRÁTIS", // O Alvo (Index 2)
    "CUPOM R$ 10",
    "70% OFF",
    "R$ 100 OFF",
    "FRETE GRÁTIS", // O Alvo Alternativo (Index 6)
    "BRINDE"
  ];

  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);
    
    // Rotação: 5 voltas completas (1800deg) + ajuste para cair no "FRETE GRÁTIS"
    // Segmento 2 (FRETE GRÁTIS) está entre 90deg e 135deg (considerando sentido horário)
    // Para alinhar o topo (seta) com o segmento, calculamos:
    const baseSpins = 5 * 360; 
    const targetSegmentAngle = 360 - 90; // Alinha o índice 2 no topo
    const finalRotation = baseSpins + targetSegmentAngle;

    setRotation(finalRotation);

    // Tempo da animação de suspense: 4 segundos
    setTimeout(() => {
      setIsSpinning(false);
      setHasWon(true);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF2C55] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00F2EA] rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[420px] z-10 flex flex-col items-center text-center space-y-8">
        {!hasWon ? (
          <>
            <div className="space-y-2 px-6">
              <div className="inline-flex items-center space-x-2 bg-[#FF2C55]/10 text-[#FF2C55] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-2">
                <Zap size={14} className="fill-[#FF2C55]" />
                <span>Oferta de Boas-vindas</span>
              </div>
              <h1 className="text-[26px] font-black text-gray-900 leading-tight">
                Gire a roleta e ganhe <br />
                <span className="text-[#FF2C55]">um benefício extra!</span>
              </h1>
              <p className="text-[14px] text-gray-500">
                Temos 3 ofertas exclusivas para você. Gire agora para descobrir qual será a sua!
              </p>
            </div>

            {/* Container da Roleta */}
            <div className="relative w-[320px] h-[320px] mt-4">
              {/* Seta Indicadora */}
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-30 drop-shadow-lg">
                <div className="w-8 h-10 bg-gray-900 clip-path-polygon-[50%_100%,0_0,100_0] rounded-t-sm"></div>
                <div className="w-8 h-8 bg-gray-900 rotate-45 -mt-6 rounded-sm"></div>
              </div>

              {/* A Roleta em si */}
              <div 
                className={cn(
                  "w-full h-full rounded-full border-[8px] border-gray-900 relative shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-transform ease-out duration-[4500ms] overflow-hidden bg-gray-900",
                )}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {prizes.map((prize, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-center"
                    style={{ 
                      transform: `rotate(${i * 45}deg)`,
                      backgroundColor: i % 2 === 0 ? (i % 4 === 0 ? '#FF2C55' : '#111111') : (i === 1 || i === 5 ? '#00F2EA' : '#FFFFFF')
                    }}
                  >
                    <span 
                      className={cn(
                        "text-[10px] font-black uppercase tracking-tighter -rotate-90 ml-16 whitespace-nowrap",
                        (i % 2 !== 0 && i !== 1 && i !== 5) ? "text-gray-900" : "text-white"
                      )}
                    >
                      {prize}
                    </span>
                  </div>
                ))}
                
                {/* Miolo da Roleta */}
                <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-4 border-gray-900 z-20 flex items-center justify-center shadow-inner">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Botão de Giro */}
            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className={cn(
                "w-full max-w-[280px] h-14 rounded-full font-black text-[16px] uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2",
                isSpinning ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#FF2C55] text-white hover:bg-[#E0254B]"
              )}
            >
              <Gift size={20} />
              <span>{isSpinning ? "Girando..." : "Girar Roleta"}</span>
            </button>
          </>
        ) : (
          /* Tela de Vitória */
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 bg-[#00BFA5] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00BFA5]/20">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full animate-bounce">
                <Zap size={20} className="fill-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-[28px] font-black text-gray-900 leading-tight">
                PARABÉNS! <br />
                <span className="text-[#00BFA5]">VOCÊ GANHOU!</span>
              </h2>
              <div className="bg-[#EFFFFD] border border-[#CCF7F2] p-4 rounded-2xl mt-4">
                <p className="text-[13px] text-[#00BFA5] font-bold uppercase tracking-widest mb-1">Seu prêmio:</p>
                <p className="text-[24px] font-black text-gray-900">FRETE GRÁTIS</p>
                <p className="text-[12px] text-gray-500 mt-1">Válido para todo o Brasil em qualquer produto da loja.</p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={onUnlock}
                className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-black h-16 rounded-full text-[18px] uppercase tracking-wide shadow-2xl flex items-center justify-center space-x-3 active:scale-95 transition-transform"
              >
                <span>Acessar Site</span>
                <ArrowRight size={22} />
              </button>
              <p className="text-[11px] text-gray-400 italic">O prêmio será aplicado automaticamente no seu checkout.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockGate;