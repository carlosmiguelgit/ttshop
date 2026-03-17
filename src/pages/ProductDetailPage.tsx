import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { products, Product } from '@/data/products';
import Header from '@/components/Header';
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
import { LayoutGrid, ChevronRight, Truck, X } from 'lucide-react';

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
      showSuccess(`Item adicionado ao carrinho`);
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

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-24">
      <Header 
        productTitle={product.title}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="max-w-[600px] mx-auto bg-white shadow-sm">
        <ProductImageGallery 
          media={product.media} 
          onCartClick={() => setIsCartOpen(true)}
          cartItemCount={cartItemCount}
        />
        
        <ProductPriceSection product={product} />

        {/* Opções de Variação (Layout da Imagem) */}
        <div className="bg-white p-4 border-t border-gray-50 flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-3">
            <LayoutGrid size={20} className="text-gray-900" />
            <div className="flex space-x-1">
              <img src={firstImageSrc} className="w-8 h-8 rounded border object-cover" />
              <img src={product.media[1]?.src} className="w-8 h-8 rounded border object-cover" />
            </div>
            <span className="text-xs text-gray-500">2 opções disponíveis</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        {/* Banner de Frete Grátis Expirando */}
        <div className="bg-[#EFFFFD] px-4 py-2 flex justify-between items-center text-[#00BFA5] border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <Truck size={18} />
            <span className="text-xs font-bold">O frete grátis expira em breve</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold font-mono">03:58:39</span>
            <X size={14} className="text-gray-400" />
          </div>
        </div>
        
        <CustomerProtectionSection />
        
        <ProductReviewsSection 
          rating={product.rating} 
          reviewCount={product.reviewCount} 
        />
        
        <ProductDescription 
          specifications={product.specifications} 
          descriptionText={product.descriptionText}
          firstImageSrc={firstImageSrc}
        />
        
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
        onFinalize={() => {}}
      />
    </div>
  );
};

export default ProductDetailPage;