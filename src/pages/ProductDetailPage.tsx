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
import VariationSelectorDrawer from '@/components/VariationSelectorDrawer';
import CouponsDrawer from '@/components/CouponsDrawer';
import ShippingDrawer from '@/components/ShippingDrawer';
import { LayoutGrid, ChevronRight, Truck, X } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isVariationDrawerOpen, setIsVariationDrawerOpen] = useState(false);
  const [isCouponsDrawerOpen, setIsCouponsDrawerOpen] = useState(false);
  const [isShippingDrawerOpen, setIsShippingDrawerOpen] = useState(false);

  const product: Product | undefined = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [slug]);

  const deliveryDateRange = useMemo(() => {
    const today = new Date();
    const start = addDays(today, 2);
    const end = addDays(today, 7);
    return `${format(start, 'dd')} – ${format(end, 'dd')} de ${format(end, 'MMM', { locale: ptBR })}`;
  }, []);

  if (!product) {
    return <div className="p-4 text-center text-red-500">Produto não encontrado.</div>;
  }
  
  const firstImageSrc = product.media[0]?.src || 'public/placeholder.svg';

  const handleOpenVariations = () => {
    setIsVariationDrawerOpen(true);
  };
  
  const handleVariationConfirm = (qty: number, action: 'cart' | 'buy') => {
    if (action === 'cart') {
      setCartItemCount(prev => prev + qty);
      showSuccess(`Adicionado ao carrinho`);
      setIsVariationDrawerOpen(false);
    } else {
      setCartItemCount(prev => (prev === 0 ? qty : prev));
      setIsVariationDrawerOpen(false);
      setIsCheckoutModalOpen(true);
    }
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
        
        <ProductPriceSection 
          product={product} 
          onCouponsClick={() => setIsCouponsDrawerOpen(true)}
          onShippingClick={() => setIsShippingDrawerOpen(true)}
        />

        <div 
          className="bg-white p-4 border-t border-gray-50 flex items-center justify-between cursor-pointer"
          onClick={handleOpenVariations}
        >
          <div className="flex items-center space-x-3">
            <LayoutGrid size={20} className="text-gray-900" />
            <div className="flex space-x-1">
              <img src={firstImageSrc} className="w-8 h-8 rounded border border-gray-100 object-cover" />
              {product.media[1] && <img src={product.media[1].src} className="w-8 h-8 rounded border border-gray-100 object-cover" />}
            </div>
            <span className="text-[12px] text-gray-500">2 opções disponíveis</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div className="bg-[#EFFFFD] px-4 py-2 flex justify-between items-center text-[#00BFA5] border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <Truck size={18} />
            <span className="text-[11px] font-bold">O frete grátis expira em breve</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[12px] font-bold font-mono">03:58:39</span>
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
        onAddToCartClick={handleOpenVariations}
        onBuyWithCouponClick={handleOpenVariations}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutClick={() => setIsCheckoutModalOpen(true)}
        product={product}
        cartItemCount={cartItemCount}
      />

      <VariationSelectorDrawer 
        isOpen={isVariationDrawerOpen}
        onClose={() => setIsVariationDrawerOpen(false)}
        product={product}
        onConfirm={handleVariationConfirm}
      />

      <CouponsDrawer
        isOpen={isCouponsDrawerOpen}
        onClose={() => setIsCouponsDrawerOpen(false)}
        onClaim={(amt) => {
          showSuccess(`Cupom de R$ ${amt} resgatado!`);
          setIsCouponsDrawerOpen(false);
        }}
      />

      <ShippingDrawer
        isOpen={isShippingDrawerOpen}
        onClose={() => setIsShippingDrawerOpen(false)}
        deliveryDate={deliveryDateRange}
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