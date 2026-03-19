"use client";

import React from 'react';
import { ChevronRight, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StoreSection: React.FC = () => {
  const CustomCameraIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z" fill="black" />
      <circle cx="12" cy="13" r="3" fill="white" />
    </svg>
  );

  return (
    <div className="bg-[#F8F8F8] space-y-2.5">
      {/* Bloco 1: Avaliações da Loja */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[16px] font-bold text-gray-900">Avaliações da loja (46M)</h3>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-1.5 bg-[#F1F1F1] px-3 py-2 rounded-md shrink-0">
            <CustomCameraIcon />
            <span className="text-[12px] font-medium text-gray-900">Inclui imagens ou vídeos (16M)</span>
          </div>
          <div className="flex items-center space-x-1 bg-[#F1F1F1] px-3 py-2 rounded-md shrink-0">
            <span className="text-[12px] font-medium text-gray-900">5</span>
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[12px] font-medium text-gray-900">(42M)</span>
          </div>
          <div className="flex items-center space-x-1 bg-[#F1F1F1] px-3 py-2 rounded-md shrink-0">
            <span className="text-[12px] font-medium text-gray-900">4</span>
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[12px] font-medium text-gray-900">(4M)</span>
          </div>
        </div>
      </div>

      {/* Bloco 2: Info da Loja e Produtos */}
      <div className="bg-white">
        {/* Cabeçalho da Loja */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-white">
                <img 
                  src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" 
                  alt="Havan" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-gray-900">Havan</h4>
                <p className="text-[13px] text-gray-400">122M vendido(s)</p>
              </div>
            </div>
            <Button 
              className="bg-[#F1F1F1] hover:bg-gray-200 text-gray-900 font-bold rounded-full h-9 px-6 text-[14px] border-none shadow-none"
            >
              Visitar
            </Button>
          </div>

          <div className="flex space-x-4 text-[12px] mb-6">
            <p><span className="font-bold text-gray-900">95%</span> <span className="text-gray-400">responde em 24 horas</span></p>
            <p><span className="font-bold text-gray-900">100%</span> <span className="text-gray-400">envios pontuais</span></p>
          </div>

          {/* Banner da Havan */}
          <div className="mb-6 rounded-xl overflow-hidden">
            <img 
              src="/havan.jpg" 
              alt="Banner Havan" 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Mais desta loja */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-bold text-gray-900">Mais desta loja</h3>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
            {/* Card de Oferta Relâmpago */}
            <div className="min-w-[130px] bg-[#FFF5F1] rounded-xl p-4 flex flex-col items-center justify-center text-center border border-[#FFE4D6] h-[170px]">
              <Zap size={24} className="text-[#FF6633] fill-[#FF6633] mb-2" />
              <p className="text-[16px] font-bold text-[#FF6633] leading-tight">Até<br/>64% de<br/>desconto</p>
              <p className="text-[10px] text-gray-400 mt-4">Termina em 2 dias</p>
            </div>

            {/* Produtos */}
            {[
              { price: "31,98", off: "-62%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp" },
              { price: "29,99", off: "-62%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp" },
              { price: "45,57", off: "-73%", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp" }
            ].map((p, i) => (
              <div key={i} className="min-w-[130px] space-y-2">
                <div className="aspect-square bg-[#F8F8F8] rounded-xl overflow-hidden border border-gray-50">
                  <img src={p.img} className="w-full h-full object-cover" alt="Product" />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-bold text-gray-900">R$ {p.price}</p>
                  <span className="text-[10px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-1.5 py-0.5 rounded-sm inline-block">
                    {p.off}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSection;