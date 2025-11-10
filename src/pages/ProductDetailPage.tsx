import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import CheckoutDialog from '@/components/CheckoutDialog';

// Links de checkout genéricos por capacidade
const CHECKOUT_URLS: { [key: string]: string } = {
  "128GB": "https://hub.payevo.com.br/pay/128gb-link-generico",
  "256GB": "https://hub.payevo.com.br/pay/256gb-link-generico",
  "512GB": "https://hub.payevo.com.br/pay/512gb-link-generico",
  "1TB": "https://hub.payevo.com.br/pay/1tb-link-generico",
};

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const product: Product | undefined = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [slug]);

  if (!product) {
    return <div className="p-4 text-center text-red-500">Produto não encontrado.</div>;
  }
  
  const firstImageSrc = product.media[0]?.src || 'public/placeholder.svg';

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
    setIsCheckoutModalOpen(true);
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Redireciona para o link correto com base na capacidade
  const handleFinalizePurchase = (capacity: string) => {
    const url = CHECKOUT_URLS[capacity] || CHECKOUT_URLS["128GB"]; // Usa 128GB como padrão
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      <div className="max-w-[600px] mx-auto bg-white shadow-md">
        
        <ProductImageGallery 
          media={product.media} 
          onCartClick={() => setIsCartOpen(true)}
          cartItemCount={cartItemCount}
        />
        
        <ProductPriceSection product={product} />
        
        <CustomerProtectionSection />
        
        <ProductReviewsSection 
          rating={product.rating} 
          reviewCount={product.reviewCount} 
        />
        
        <div className="mt-4">
          <ProductDescription 
            specifications={product.specifications} 
            descriptionText={product.descriptionText}
            firstImageSrc={firstImageSrc}
          />
        </div>
        
        <MadeWithDyad />
      </div>
      
      <ProductActionsBar 
        onAddToCartClick={handleAddToCart}
        onBuyWithCouponClick={handleBuyNow}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutClick={handleCheckout}
        product={product}
        cartItemCount={cartItemCount}
      />

      <CheckoutDialog
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        product={product}
        onFinalize={handleFinalizePurchase}
      />
    </div>
  );
};

export default ProductDetailPage;