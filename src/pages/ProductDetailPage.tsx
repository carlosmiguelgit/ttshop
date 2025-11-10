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
import CheckoutDialog from '@/components/CheckoutDialog'; // Import the new component

const CHECKOUT_URL = 'https://hub.payevo.com.br/pay/57c8467a-beea-4d2e-aa9a-46e7466ff2d8';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false); // New state for the modal

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

  // Opens the checkout modal
  const handleBuyNow = () => {
    setIsCheckoutModalOpen(true);
  };
  
  // Opens the checkout modal from the cart
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Finalizes the purchase by redirecting
  const handleFinalizePurchase = () => {
    window.location.href = CHECKOUT_URL;
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

      {/* Render the new Checkout Dialog */}
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