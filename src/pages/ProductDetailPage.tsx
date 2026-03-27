import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, Product } from '@/data/products';
import Header from '@/components/Header';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductPriceSection from '@/components/ProductPriceSection';
import ProductActionsBar from '@/components/ProductActionsBar';
import CartDrawer from '@/components/CartDrawer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import CustomerProtectionSection from '@/components/CustomerProtectionSection';
import ProductReviewsSection from '@/components/ProductReviewsSection';
import ProductReviewsList from '@/components/ProductReviewsList';
import ProductDescription from '@/components/ProductDescription';
import CheckoutDialog from '@/components/CheckoutDialog';
import VariationSelectorDrawer from '@/components/VariationSelectorDrawer';
import CouponsDrawer from '@/components/CouponsDrawer';
import ShippingDrawer from '@/components/ShippingDrawer';
import CreatorVideosSection from '@/components/CreatorVideosSection';
import CustomerProtectionDrawer from '@/components/CustomerProtectionDrawer';
import ChatDrawer from '@/components/ChatDrawer';
import StoreSection from '@/components/StoreSection';
import { Truck, X, ChevronRight, LayoutGrid } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { trackFacebookEvent } from '@/utils/facebook-pixel';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const product = products[0];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isVariationDrawerOpen, setIsVariationDrawerOpen] = useState(false);
  const [variationDrawerMode, setVariationDrawerMode] = useState<'cart' | 'buy'>('cart');
  const [isCouponsDrawerOpen, setIsCouponsDrawerOpen] = useState(false);
  const [isShippingDrawerOpen, setIsShippingDrawerOpen] = useState(false);
  const [isProtectionDrawerOpen, setIsProtectionDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showShippingMsg, setShowShippingMsg] = useState(false);
  const [activeTab, setActiveTab] = useState('Visão geral');
  const [timeLeft, setTimeLeft] = useState(300);

  const sectionRefs = {
    'Visão geral': useRef<HTMLDivElement>(null),
    'Avaliações': useRef<HTMLDivElement>(null),
    'Descrição': useRef<HTMLDivElement>(null),
    'Recomendações': useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    if (product) {
      trackFacebookEvent('ViewContent', {
        content_ids: [product.slug],
        content_type: 'product',
        content_name: product.title,
        value: parseFloat(product.currentPrice.replace(',', '.')),
        currency: 'BRL'
      });
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      if (sectionRefs['Recomendações'].current && scrollPos >= sectionRefs['Recomendações'].current.offsetTop) {
        setActiveTab('Recomendações');
      } else if (sectionRefs['Descrição'].current && scrollPos >= sectionRefs['Descrição'].current.offsetTop) {
        setActiveTab('Descrição');
      } else if (sectionRefs['Avaliações'].current && scrollPos >= sectionRefs['Avaliações'].current.offsetTop) {
        setActiveTab('Avaliações');
      } else {
        setActiveTab('Visão geral');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (tabName: string) => {
    const ref = sectionRefs[tabName as keyof typeof sectionRefs];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (!product) return null;

  const firstImageSrc = product.media[0]?.src || 'public/placeholder.svg';

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header 
        productTitle={product.title}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="fixed top-12 left-0 right-0 z-40 bg-white border-b flex justify-center">
        <div className="w-full max-w-[600px] flex px-4">
          {['Visão geral', 'Avaliações', 'Descrição', 'Recomendações'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => scrollToSection(tab)}
              className={`flex-1 py-3 text-[14px] font-bold transition-colors ${
                activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
        <div ref={sectionRefs['Visão geral']}>
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
            onClick={() => setIsVariationDrawerOpen(true)}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <LayoutGrid size={20} className="text-gray-900 shrink-0" />
              <div className="flex space-x-1 shrink-0">
                <img src={product.media[1]?.src || product.media[0].src} className="w-10 h-10 rounded-md border border-gray-100 object-cover" alt="Opção Padrão" />
              </div>
              <span className="text-[13px] text-gray-400 whitespace-nowrap">1 opção disponível</span>
            </div>
            <ChevronRight size={18} className="text-gray-400 shrink-0" />
          </div>
          
          <CustomerProtectionSection onClick={() => setIsProtectionDrawerOpen(true)} />
          <CreatorVideosSection />
        </div>
        
        <div ref={sectionRefs['Avaliações']}>
          <ProductReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />
        </div>

        <StoreSection />
        <div className="h-2.5 bg-[#F8F8F8]"></div>
        <div ref={sectionRefs['Descrição']}><ProductDescription specifications={product.specifications} descriptionText={product.descriptionText} firstImageSrc={firstImageSrc} /></div>
        <div ref={sectionRefs['Recomendações']}><MadeWithDyad /></div>
      </div>

      <ProductActionsBar 
        onAddToCartClick={() => { setVariationDrawerMode('cart'); setIsVariationDrawerOpen(true); }}
        onBuyWithCouponClick={() => { setVariationDrawerMode('buy'); setIsVariationDrawerOpen(true); }}
        onChatClick={() => setIsChatOpen(true)}
      />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutClick={() => setIsCheckoutModalOpen(true)} product={product} cartItemCount={cartItemCount} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} product={product} />
      <VariationSelectorDrawer isOpen={isVariationDrawerOpen} onClose={() => setIsVariationDrawerOpen(false)} product={product} onConfirm={(qty) => { setCartItemCount(prev => prev + qty); setIsVariationDrawerOpen(false); }} mode={variationDrawerMode} />
      <CouponsDrawer isOpen={isCouponsDrawerOpen} onClose={() => setIsCouponsDrawerOpen(false)} onClaim={() => {}} />
      <ShippingDrawer isOpen={isShippingDrawerOpen} onClose={() => setIsShippingDrawerOpen(false)} deliveryDate="" />
      <CustomerProtectionDrawer isOpen={isProtectionDrawerOpen} onClose={() => setIsProtectionDrawerOpen(false)} />
    </div>
  );
};

export default ProductDetailPage;