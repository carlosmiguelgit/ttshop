"use client";

import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Clone 1:1 do raio da imagem
const CustomZapIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 2L18 2L12 11h5L6 22l3-10H4L11 2z" />
  </svg>
);

const StoreSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CustomCameraIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" fill="white"/>
      <circle cx="12" cy="13" r="2.5" fill="black"/>
    </svg>
  );

  return (
    <div className="bg-white mt-4">
      <div className="p-4 border-b border-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[15px] font-bold text-gray-900">Avaliações da loja (39M)</h3>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center space-x-1 bg-[#F8F8F8] px-3 py-1.5 rounded-full shrink-0">
            <CustomCameraIcon />
            <span className="text-[12px] font-medium text-gray-900">Inclui imagens ou vídeos (19M)</span>
          </div>
          <div className="flex items-center space-x-1 bg-[#F8F8F8] px-3 py-1.5 rounded-full shrink-0">
            <span className="text-[12px] font-medium text-gray-900">5</span>
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[12px] font-medium text-gray-900">(35.1M)</span>
          </div>
          <div className="flex items-center space-x-1 bg-[#F8F8F8] px-3 py-1.5 rounded-full shrink-0">
            <span className="text-[12px] font-medium text-gray-900">4</span>
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[12px] font-medium text-gray-900">(3.9M)</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full border border-gray-100 p-1 flex items-center justify-center overflow-hidden bg-white">
              <img 
                src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" 
                alt="Havan" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-gray-900">Havan</h4>
              <p className="text-[12px] text-gray-500">132M vendido(s)</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full h-8 px-6 text-[13px] font-bold border-gray-200 hover:bg-gray-50"
            onClick={scrollToTop}
          >
            Visitar
          </Button>
        </div>

        <div className="flex space-x-4 text-[11px] text-gray-500">
          <p><span className="font-bold text-gray-900">95%</span> responde em 24 horas</p>
          <p><span className="font-bold text-gray-900">100%</span> envios pontuais</p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[14px] font-bold text-gray-900">Mais desta loja</h3>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div className="flex space-x-3 overflow-x-auto no-scrollbar">
          <div className="min-w-[120px] bg-[#FFF7F0] rounded-xl p-3 flex flex-col items-center justify-between text-center border border-[#FFEDD5] h-[160px]">
            <div className="flex flex-col items-center">
              <CustomZapIcon className="w-6 h-6 text-[#FF6633] mb-1" />
              <p className="text-[16px] font-bold text-[#FF6633] leading-tight">Até<br/>64% de<br/>desconto</p>
            </div>
            
            <div className="w-full border-t border-dotted border-gray-200 my-2"></div>
            
            <p className="text-[11px] text-gray-500 font-medium">Termina em 2 dias</p>
          </div>

          {[
            { price: "31,98", off: "-62%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp" },
            { price: "29,99", off: "-62%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp" },
            { price: "45,57", off: "-73%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp" }
          ].map((p, i) => (
            <div key={i} className="min-w-[120px] space-y-2">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <img src={p.img} className="w-full h-full object-cover" alt="Product" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-900">R$ {p.price}</p>
                <span className="text-[10px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-1 rounded-sm">{p.off}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSection;