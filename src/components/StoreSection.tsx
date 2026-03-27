"use client";

import React from 'react';
import { ChevronRight, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useNavigate } from 'react-router-dom';

// Ícone de Câmera Clone 1:1
const CustomCameraIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 1H9.5L10.5 3H12.5C13.05 3 13.5 3.45 13.5 4V10.5C13.5 11.05 13.05 11.5 12.5 11.5H1.5C0.95 11.5 0.5 11.05 0.5 10.5V4C0.5 3.45 0.95 3 1.5 3H3.5L4.5 1Z" fill="black" />
    <circle cx="7" cy="7.25" r="2.25" fill="white" />
    <circle cx="7" cy="7.25" r="1.5" fill="black" />
  </svg>
);

const StoreSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F8F8] space-y-2.5">
      {/* Módulo de Avaliações da Loja */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-bold text-gray-900">Avaliações da loja (46M)</h3>
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
        </div>
      </div>

      {/* Módulo do Perfil da Loja */}
      <div className="bg-white">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-white shrink-0">
                <img src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" alt="Havan" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-gray-900 leading-tight">Havan</h4>
                <p className="text-[13px] text-gray-400">122M vendido(s)</p>
              </div>
            </div>
            <Button className="bg-[#F1F1F1] hover:bg-gray-200 text-gray-900 font-bold rounded-full h-9 px-6 text-[14px] border-none shadow-none">
              Visitar
            </Button>
          </div>

          {/* Métricas de Desempenho 1:1 da foto */}
          <div className="flex items-center space-x-4 mb-4 text-[12px]">
            <div className="flex items-center">
              <span className="font-bold text-gray-900 mr-1">96%</span>
              <span className="text-gray-400 font-medium">responde em 24 horas</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-gray-900 mr-1">95%</span>
              <span className="text-gray-400 font-medium">envios pontuais</span>
            </div>
          </div>

          {/* Separador Horizontal (Linha Preta conforme solicitado) */}
          <div className="h-[1px] bg-gray-100 w-full mb-5"></div>

          <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-50">
            <img src="/havan.jpg" alt="Banner Havan" className="w-full h-auto object-cover" />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-bold text-gray-900">Mais desta loja</h3>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-6">
            <div className="min-w-[130px] bg-[#FFF5F1] rounded-xl p-4 flex flex-col items-center justify-center text-center border border-[#FFE4D6] h-[170px]">
              <Zap size={24} className="text-[#FF6633] fill-[#FF6633] mb-2" />
              <p className="text-[15px] font-bold text-[#FF6633] leading-tight">Até<br/>89% de<br/>desconto</p>
              <p className="text-[11px] text-[#FF6633] mt-2 font-medium">Termina em 1 dia</p>
            </div>

            {products.map((p, i) => (
              <div key={i} className="min-w-[130px] space-y-2 cursor-pointer" onClick={() => navigate(`/${p.slug}`)}>
                <div className="aspect-square bg-[#F8F8F8] rounded-xl overflow-hidden border border-gray-50">
                  <img src={p.media[0].src} className="w-full h-full object-cover" alt="Product" />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-bold text-gray-900">R$ {p.currentPrice}</p>
                  <span className="text-[10px] font-bold text-[#FF2C55] bg-[#FFF1F3] px-1.5 py-0.5 rounded-sm inline-block">-89%</span>
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