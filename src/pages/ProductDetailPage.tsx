import React from 'react';
import ProductImageGallery from "@/components/ProductImageGallery";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import DiscountBanner from "@/components/DiscountBanner";
import ProductActionsBar from "@/components/ProductActionsBar";
import { Star, Package, ChevronRight } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const ProductDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container principal limitado para simular a visualização móvel */}
      <div className="max-w-[600px] mx-auto bg-white shadow-md">
        
        {/* Galeria de Imagens e Cabeçalho */}
        <ProductImageGallery />
        
        {/* Banner de Oferta Relâmpago */}
        <FlashSaleBanner />
        
        {/* Banner de Desconto */}
        <DiscountBanner />
        
        <div className="bg-white p-4 space-y-4">
          
          {/* Título do Produto */}
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            Patinete Elétrico Scooter De Alumínio Com Bluetooth 30km/h
          </h2>
          
          {/* Informações de Avaliação e Vendas */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-bold text-lg text-black">4.8</span>
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-500">(892)</span>
            <span className="text-gray-500">8.547 vendidos</span>
          </div>
          
          {/* Seção de Informações de Envio */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                {/* Ícone de Pacote (Azul/Ciano) */}
                <Package size={24} className="text-cyan-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Frete grátis</p>
                  <p className="text-sm text-gray-700">Receba até 22 de out - 25 de out</p>
                  <p className="text-xs text-gray-500 line-through">Taxa de envio: R$ 15,90</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Preenchimento para garantir que o conteúdo acima da barra fixa seja visível */}
        <div className="h-20 bg-white"></div>
        
        <MadeWithDyad />
      </div>
      
      {/* Barra de Ação Fixa Inferior */}
      <ProductActionsBar />
    </div>
  );
};

export default ProductDetailPage;