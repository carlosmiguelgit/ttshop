import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Importando useParams
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductPriceSection from "@/components/ProductPriceSection";
import ProductActionsBar from "@/components/ProductActionsBar";
import ProductReviewCard from "@/components/ProductReviewCard";
import StoreInfoSection from "@/components/StoreInfoSection";
import ProductReviewsList from "@/components/ProductReviewsList";
import ProductDescription from "@/components/ProductDescription";
import CartDrawer from "@/components/CartDrawer";
import { Star, ChevronRight, Truck } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Separator } from "@/components/ui/separator";
import { showSuccess } from "@/utils/toast";
import { products, Product } from "@/data/products"; // Importa os dados

type TabName = 'overview' | 'description';

// Componente auxiliar para as abas de navegação
const Tab: React.FC<{ title: string; name: TabName; isActive: boolean; onClick: (name: TabName) => void }> = ({ title, name, isActive, onClick }) => (
  <div 
    className="flex flex-col items-center cursor-pointer px-4 py-3 relative"
    onClick={() => onClick(name)}
  >
    <span className={`text-base font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
      {title}
    </span>
    {isActive && <div className="w-full h-0.5 bg-gray-900 mt-2 absolute bottom-0"></div>}
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Obtém o slug da URL
  
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // 1. Carregar o produto:
  // Se houver um slug na URL, busca o produto correspondente.
  // Se não houver slug (rota /), usa o primeiro produto como padrão.
  const product: Product | undefined = slug 
    ? products.find(p => p.slug === slug)
    : products[0];

  // Se o produto não for encontrado, exibe um erro simples
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Produto não encontrado para o slug: {slug}</p>
      </div>
    );
  }
  
  // Extrai a URL da thumbnail do primeiro item de mídia
  const productThumbnailUrl = product.media[0]?.thumbnailSrc || "public/placeholder.svg";

  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleViewAllReviews = () => {
    setShowAllReviews(true);
  };

  const CHECKOUT_URL = 'https://comprasonlinedigital.top/c/461d072943';

  const handleBuyWithCoupon = () => {
    // Redireciona para a URL externa
    window.location.href = CHECKOUT_URL;
  };
  
  const handleAddToCart = () => {
    setCartItemCount(prevCount => prevCount + 1);
    showSuccess("Produto adicionado ao carrinho!");
  };
  
  const handleOpenCartDrawer = () => {
    setIsCartOpen(true);
  };

  const renderOverviewContent = () => (
    <div ref={reviewsRef}> 
      {/* Seção de Avaliações */}
      <div className="p-4 bg-white">
        {/* Título Atualizado */}
        <h3 className="text-xl font-bold mb-4">Avaliações da loja ({(product.reviewCount / 1000).toFixed(1)} mil)</h3>
        
        {/* Média de Avaliação */}
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold mr-1">{product.rating.toFixed(1)}</span>
          <span className="text-lg text-gray-500 mr-4">/5</span>
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>

        {/* Avaliação 1 (Mais recente) - carlos.santos */}
        <ProductReviewCard
          username="carlos.santos"
          date="31 de out"
          avatarSrc="https://randomuser.me/api/portraits/men/7.jpg"
          verified={true}
          attributes="Custo-benefício: excelente | Parecido com anúncio: sim"
          comment={product.slug === 'tv-tcl-55' ? "A TV é simplesmente inacreditável por esse preço! A imagem QLED é perfeita, sem vazamento de luz. Chegou em 2 dias. Melhor compra da vida!" : "Patinete chegou super rápido e funciona perfeitamente! A bateria dura bastante e a velocidade máxima é incrível. Bluetooth conecta fácil no celular."}
          reviewImages={[
            "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg334zdzpyx0b2.webp", // Nova Imagem 1
            "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg334ze040lg97.webp", // Nova Imagem 2
            "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg334zdund3958.webp", // Nova Imagem 3
          ]}
        />
        
        <Separator className="my-4" />

        {/* Avaliação 2 (Próxima) - ana.ribeiro */}
        {!showAllReviews && (
          <>
            <ProductReviewCard
              username="ana.ribeiro"
              date="30 de out"
              avatarSrc="https://randomuser.me/api/portraits/women/6.jpg"
              verified={true}
              attributes="Custo-benefício: ótimo | Qualidade: superior"
              comment={product.slug === 'tv-tcl-55' ? "Qualidade de cinema em casa! O Google TV é muito rápido e a tela antirreflexo faz toda a diferença. Não acreditei no preço de R$ 79,90, mas é real!" : "Produto de altíssima qualidade, superou minhas expectativas. A montagem foi simples e o desempenho na rua é excelente. Recomendo a todos!"}
              reviewImages={[
                "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg334zeax3wke5.webp", // Nova Imagem 4
              ]}
            />
            <Separator className="my-4" />
          </>
        )}

        {/* Lista Completa de Avaliações (Condicional) */}
        {showAllReviews ? (
          <ProductReviewsList />
        ) : (
          /* Botão Ver Avaliações Atualizado */
          <div className="flex justify-center pt-2 pb-4">
            <button 
              onClick={handleViewAllReviews}
              className="flex items-center justify-between w-full text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors px-0"
            >
              <span>Avaliações da loja ({(product.reviewCount / 1000).toFixed(1)} mil)</span>
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        )}
      </div>
      
      {/* Seção de Informações da Loja */}
      <StoreInfoSection />
    </div>
  );

  const renderDescriptionContent = () => (
    <>
      <ProductDescription 
        specifications={product.specifications} 
        descriptionText={product.descriptionText} // Passando o novo prop
      />
      {/* Seção de Informações da Loja (Mantida abaixo da descrição também) */}
      <StoreInfoSection />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container principal limitado para simular a visualização móvel */}
      <div className="max-w-[600px] mx-auto bg-white shadow-md">
        
        {/* Galeria de Imagens e Cabeçalho */}
        <ProductImageGallery 
          media={product.media} // Passando a mídia
          onCartClick={handleOpenCartDrawer} 
          cartItemCount={cartItemCount}
        />
        
        {/* Nova Seção de Preços e Descontos */}
        <ProductPriceSection 
          product={product} // Passando o objeto produto
        />
        
        <div className="bg-white p-4 space-y-4">
          
          {/* Informações de Envio (Mantidas) */}
          <div className="border-t border-gray-100 pt-4">
            {/* Frete Grátis (Atualizado) */}
            <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                {/* Ícone de Caminhão */}
                <Truck size={24} className="text-cyan-500 mt-1" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded text-xs font-semibold">
                      Frete grátis
                    </span>
                    <p className="font-semibold text-gray-800">Receba até <span className="font-extrabold text-cyan-500">AMANHÃ</span></p>
                  </div>
                  <p className="text-xs text-gray-500 line-through mt-1">Taxa de envio: R$ 39,45</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Abas de Navegação */}
        <div className="border-t border-gray-100 mt-4">
          <div className="flex justify-start relative border-b border-gray-200">
            <Tab 
              title="Visão geral" 
              name="overview" 
              isActive={activeTab === 'overview'} 
              onClick={setActiveTab} 
            />
            <Tab 
              title="Descrição" 
              name="description" 
              isActive={activeTab === 'description'} 
              onClick={setActiveTab} 
            />
          </div>
        </div>

        {/* Conteúdo Principal baseado na aba ativa */}
        {activeTab === 'overview' ? renderOverviewContent() : renderDescriptionContent()}
        
        {/* Preenchimento para garantir que o conteúdo acima da barra fixa seja visível */}
        <div className="h-20 bg-white"></div>
        
        <MadeWithDyad />
      </div>
      
      {/* Barra de Ação Fixa Inferior */}
      <ProductActionsBar 
        onAddToCartClick={handleAddToCart}
        onBuyWithCouponClick={handleBuyWithCoupon}
      />
      
      {/* Drawer do Carrinho */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutClick={handleBuyWithCoupon} // Usando handleBuyWithCoupon para redirecionar
        product={product} // Passando o objeto product
        cartItemCount={cartItemCount} // Passando a contagem de itens
      />
    </div>
  );
};

export default ProductDetailPage;