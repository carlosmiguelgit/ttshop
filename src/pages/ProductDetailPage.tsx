import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, Product } from '@/data/products';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductPriceSection from '@/components/ProductPriceSection';
import ProductActionsBar from '@/components/ProductActionsBar';
import CartDrawer from '@/components/CartDrawer';
import { showSuccess } from '@/utils/toast';
import { MadeWithDyad } from '@/components/made-with-dyad';
import CustomerProtectionSection from '@/components/CustomerProtectionSection';
import ProductReviewsSection from '@/components/ProductReviewsSection';
import ProductDescription from '@/components/ProductDescription';

const CHECKOUT_URL = 'https://comprasonlinedigital.top/c/461d072943';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // 0 ou 1 item (simples)

  // 1. Carregar o produto baseado no slug
  const product: Product | undefined = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [slug]);

  // Redirecionar se o produto não for encontrado
  if (!product) {
    // Se o slug não for encontrado, redireciona para a página 404
    return <div className="p-4 text-center text-red-500">Produto não encontrado.</div>;
  }
  
  // Obter a URL da primeira imagem para a seção de descrição
  const firstImageSrc = product.media[0]?.src || 'public/placeholder.svg';

  // 2. Handlers de Ação
  const handleAddToCart = () => {
    if (cartItemCount === 0) {
      setCartItemCount(1);
      showSuccess(`1 item adicionado ao carrinho: ${product.title}`);
    } else {
      showSuccess(`O item já está no carrinho.`);
    }
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    // Redireciona para o URL externo
    window.location.href = CHECKOUT_URL;
  };
  
  const handleCheckout = () => {
    // Redireciona para o URL externo a partir do drawer
    setIsCartOpen(false);
    handleBuyNow();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Conteúdo Principal (limitado para simular a interface mobile) */}
      <div className="max-w-[600px] mx-auto bg-white shadow-md">
        
        {/* 1. Galeria de Imagens */}
        <ProductImageGallery 
          media={product.media} 
          onCartClick={() => {
            setIsCartOpen(true);
          }}
          cartItemCount={cartItemCount}
        />
        
        {/* 2. Seção de Preço e Título */}
        <ProductPriceSection product={product} />
        
        {/* NOVO: Seção de Proteção do Cliente */}
        <CustomerProtectionSection />
        
        {/* 3. Seção de Avaliações (Agora usando o componente de seção) */}
        <ProductReviewsSection 
          rating={product.rating} 
          reviewCount={product.reviewCount} 
        />
        
        {/* 4. Seção de Descrição */}
        <div className="mt-4">
          <ProductDescription 
            specifications={product.specifications} 
            descriptionText={product.descriptionText}
            firstImageSrc={firstImageSrc}
          />
        </div>
        
        {/* Footer Dyad */}
        <MadeWithDyad />
      </div>
      
      {/* Barra de Ações Flutuante (Adicionar ao Carrinho / Comprar Agora) */}
      <ProductActionsBar 
        onAddToCartClick={handleAddToCart}
        onBuyWithCouponClick={handleBuyNow}
      />
      
      {/* Drawer do Carrinho */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutClick={handleCheckout}
        product={product}
        cartItemCount={cartItemCount}
      />
    </div>
  );
};

export default ProductDetailPage;