"use client";

import React, { useState, useEffect } from 'react';
import { Gift, Zap, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface UnlockGateProps {
  onUnlock: () => void;
}

const prizes = [
  { label: "90% OFF", color: "#FF2C55" },
  { label: "R$ 50 OFF", color: "#111111" },
  { label: "FRETE GRÁTIS", color: "#00F2EA" }, // Alvo: Índice 2
  { label: "CUPOM R$ 10", color: "#FF2C55" },
  { label: "70% OFF", color: "#111111" },
  { label: "PIX R$ 5", color: "#00F2EA" },
  { label: "FRETE GRÁTIS", color: "#FF2C55" }, // Alvo Alternativo: Índice 6
  { label: "BRINDE", color: "#111111" }
];

const UnlockGate: React.FC<UnlockGateProps> = ({ onUnlock }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);
    
    // Rotação: 6 voltas completas (2160deg) + ajuste para o índice 2 (Frete Grátis)
    // O ponteiro está no topo (0deg). 
    // Cada fatia tem 45deg (360/8).
    // Para o índice 2 ficar no topo, precisamos rotacionar:
    // 360 - (2 * 45) = 270deg. 
    // Adicionamos um pequeno offset aleatório para não parecer robótico (ex: +22deg para ficar no meio da fatia)
    const baseSpins = 8 * 360; 
    const targetAngle = 360 - (2 * 45) - 22.5; 
    const finalRotation = baseSpins + targetAngle;

    setRotation(finalRotation);

    // Tempo de suspense: 5 segundos
    setTimeout(() => {
      setIsSpinning(false);
      setHasWon(true);
      
      // Efeito de Confete
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2C55', '#00F2EA', '#FFD700']
      });
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Luzes de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FF2C55]/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00F2EA]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-[420px] z-10 flex flex-col items-center text-center">
        {!hasWon ? (
          <div className="animate-in fade-in duration-700">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center space-x-2 bg-yellow-400/10 text-yellow-600 px-4 py-1.5 rounded-full text-[13px] font-black uppercase tracking-widest mb-2 border border-yellow-400/20">
                <Star size={14} className="fill-yellow-500" />
                <span>Oferta Especial Ativada</span>
              </div>
              <h1 className="text-[28px] font-black text-gray-900 leading-tight">
                Gire e Ganhe seu <br />
                <span className="text-[#FF2C55] uppercase">Benefício Extra</span>
              </h1>
              <p className="text-[14px] text-gray-500 font-medium max-w-[300px] mx-auto">
                Você foi selecionado para uma oferta exclusiva do TikTok Shop!
              </p>
            </div>

            {/* A ROLETA VISUAL */}
            <div className="relative w-[340px] h-[340px] mb-8">
              {/* Seta / Pointer */}
              <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <div className="w-8 h-12 bg-gray-900 clip-path-polygon-[0_0,100%_0,50%_100%] rounded-b-lg"></div>
              </div>

              {/* Corpo da Roleta */}
              <div 
                className="w-full h-full rounded-full border-[10px] border-gray-900 relative shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-gray-900 overflow-hidden transition-transform duration-[5000ms]"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transitionTimingFunction: 'cubic-bezier(0.15, 0, 0.15, 1)' 
                }}
              >
                {prizes.map((prize, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end"
                    style={{ 
                      transform: `rotate(${i * 45}deg)`,
                      backgroundColor: prize.color,
                      clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                      borderLeft: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <span 
                      className="text-[11px] font-black text-white uppercase tracking-tighter absolute right-6 text-center leading-none"
                      style={{ 
                        transform: 'rotate(90deg)',
                        width: '60px'
                      }}
                    >
                      {prize.label}
                    </span>
                  </div>
                ))}
                
                {/* Center Circle */}
                <div className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-full border-[6px] border-gray-900 z-20 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-[#FF2C55] rounded-full animate-pulse"></div>
                </div>

                {/* Linhas Divisoras */}
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 45, 90, 135].map(deg => (
                    <div key={deg} className="absolute inset-0 border-r border-white/10" style={{ transform: `rotate(${deg}deg)` }}></div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className={cn(
                "group relative w-full max-w-[280px] h-16 rounded-full font-black text-[18px] uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(255,44,85,0.3)] active:scale-95 flex items-center justify-center space-x-3",
                isSpinning ? "bg-gray-200 text-gray-400" : "bg-[#FF2C55] text-white hover:bg-[#E0254B]"
              )}
            >
              <Gift size={24} className={isSpinning ? "" : "group-hover:animate-bounce"} />
              <span>{isSpinning ? "SORTEANDO..." : "QUERO MEU PRÊMIO"}</span>
              
              {/* Efeito de brilho no botão */}
              {!isSpinning && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              )}
            </button>
          </div>
        ) : (
          /* TELA DE VITÓRIA */
          <div className="animate-in zoom-in slide-in-from-bottom-10 duration-700 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-[#00BFA5] rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,191,165,0.3)] border-8 border-white">
                <CheckCircle2 size={64} className="text-white" />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-full animate-bounce shadow-lg">
                <Star size={24} className="fill-white" />
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <h2 className="text-[32px] font-black text-gray-900 leading-tight">
                ESTÁ COM SORTE! <br />
                <span className="text-[#00BFA5]">PRÊMIO LIBERADO!</span>
              </h2>
              
              <div className="bg-[#EFFFFD] border-2 border-[#00BFA5]/20 p-6 rounded-[24px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 rotate-12 group-hover:rotate-45 transition-transform">
                   <Zap size={100} className="fill-[#00BFA5]" />
                </div>
                <p className="text-[14px] text-[#00BFA5] font-black uppercase tracking-widest mb-1 relative z-10">Você ganhou:</p>
                <p className="text-[36px] font-black text-gray-900 relative z-10 leading-none">FRETE GRÁTIS</p>
                <p className="text-[13px] text-gray-500 mt-2 relative z-10 font-medium">Aplicado automaticamente para todo o Brasil!</p>
              </div>
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={onUnlock}
                className="w-full bg-gray-900 hover:bg-black text-white font-black h-16 rounded-full text-[18px] uppercase tracking-widest shadow-2xl flex items-center justify-center space-x-3 active:scale-95 transition-transform"
              >
                <span>APROVEITAR AGORA</span>
                <ArrowRight size={22} />
              </button>
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">
                Oferta expira em 15 minutos
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .clip-path-polygon {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
      `}</style>
    </div>
  );
};

export default UnlockGate;