import React, { useState } from 'react';
import ProductImageGallery from "@/components/ProductImageGallery";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import DiscountBanner from "@/components/DiscountBanner";
import ProductActionsBar from "@/components/ProductActionsBar";
import ProductReviewCard from "@/components/ProductReviewCard";
import StoreInfoSection from "@/components/StoreInfoSection";
import ProductReviewsList from "@/components/ProductReviewsList";
import { Star, ChevronRight, CheckCircle, Trash2 } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Separator } from "@/components/ui/separator";

// Componente auxiliar para as abas de navegação
const Tab: React.FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => (
  <div className="flex flex-col items-center cursor-pointer px-4 py-3">
    <span className={`text-base font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
      {title}
    </span>
    {isActive && <div className="w-full h-0.5 bg-gray-900 mt-2 absolute bottom-0"></div>}
  </div>
);

const ProductDetailPage: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleViewAllReviews = () => {
    setShowAllReviews(true);
  };

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
            {/* Frete Grátis (Existente) */}
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                {/* Ícone de Pacote (Azul/Ciano) */}
                <Trash2 size={24} className="text-cyan-500 mt-1" /> {/* Usando Trash2 para simular o ícone de caixa/entrega */}
                <div>
                  <p className="font-semibold text-gray-800">Frete grátis</p>
                  <p className="text-sm text-gray-700">Receba até 22 de out - 25 de out</p>
                  <p className="text-xs text-gray-500 line-through">Taxa de envio: R$ 15,90</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            {/* Devoluções Gratuitas em 30 dias (Novo) */}
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <CheckCircle size={24} className="text-green-500 fill-white mt-1" />
                <p className="font-semibold text-gray-800">Devoluções gratuitas em 30 dias</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Abas de Navegação */}
        <div className="border-t border-gray-100 mt-4">
          <div className="flex justify-start relative border-b border-gray-200">
            <Tab title="Visão geral" isActive={true} />
            <Tab title="Descrição" isActive={false} />
          </div>
        </div>

        {/* Seção de Avaliações */}
        <div className="p-4 bg-white">
          <h3 className="text-xl font-bold mb-4">Avaliações dos clientes (892)</h3>
          
          {/* Média de Avaliação */}
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold mr-1">4.8</span>
            <span className="text-lg text-gray-500 mr-4">/5</span>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </div>

          {/* Filtros de Estrelas */}
          <div className="flex space-x-2 mb-4">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              5 <Star size={12} className="text-yellow-500 fill-yellow-500 ml-1 mr-1" /> (765)
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              4 <Star size={12} className="text-yellow-500 fill-yellow-500 ml-1 mr-1" /> (102)
            </div>
          </div>

          {/* Avaliação 1 (Mais recente) */}
          <ProductReviewCard
            username="carlos.santos"
            date="31 de out"
            avatarSrc="/placeholder.svg"
            verified={true}
            attributes="Custo-benefício: excelente | Parecido com anúncio: sim"
            comment="Patinete chegou super rápido e funciona perfeitamente! A bateria dura bastante e a velocidade máxima é incrível. Bluetooth conecta fácil no celular."
          />
          
          <Separator className="my-4" />

          {/* Avaliação 2 (Próxima) */}
          {!showAllReviews && (
            <>
              <ProductReviewCard
                username="ana.ribeiro"
                date="30 de out"
                avatarSrc="/placeholder.svg"
                verified={true}
                attributes="Custo-benefício: ótimo | Qualidade: superior"
                comment="Produto de altíssima qualidade, superou minhas expectativas. A montagem foi simples e o desempenho na rua é excelente. Recomendo a todos!"
              />
              <Separator className="my-4" />
            </>
          )}

          {/* Lista Completa de Avaliações (Condicional) */}
          {showAllReviews ? (
            <ProductReviewsList />
          ) : (
            /* Botão Ver Avaliações */
            <div className="flex justify-center pt-2 pb-4">
              <button 
                onClick={handleViewAllReviews}
                className="flex items-center text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Ver Avaliações <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
          
          {/* Paginação (Sempre visível abaixo das avaliações) */}
          <div className="text-center text-xs text-gray-500 pt-4">
            1/269
          </div>
        </div>
        
        {/* Seção de Informações da Loja */}
        <StoreInfoSection />

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