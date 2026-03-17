import React, { useState, useEffect, useMemo } from 'react';
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
import CreatorVideosSection from '@/components/CreatorVideosSection';
import CustomerProtectionDrawer from '@/components/CustomerProtectionDrawer';
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
  const [isProtectionDrawerOpen, setIsProtectionDrawerOpen] = useState(false);

  // Timer regressivo de 5 minutos (300 segundos)
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 99)).toString().padStart(2, '0')}`;
  };

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
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header 
        productTitle={product.title}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="fixed top-12 left-0 right-0 z-40 bg-white border-b flex justify-center">
        <div className="w-full max-w-[600px] flex px-4">
          {['Visão geral', 'Avaliações', 'Descrição', 'Recomendações'].map((tab, i) => (
            <button key={tab} className={`flex-1 py-3 text-[14px] font-bold ${i === 0 ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
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
        
        <CustomerProtectionSection onClick={() => setIsProtectionDrawerOpen(true)} />

        <div className="bg-white p-4 border-t border-gray-50 flex justify-between items-center cursor-pointer">
          <h3 className="text-[15px] font-bold text-gray-900">Ofertas</h3>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div className="px-4 pb-4 flex space-x-3 overflow-x-auto no-scrollbar bg-white">
          <div className="min-w-[200px] bg-[#EFFFFD] border border-[#CCF7F2] rounded-xl p-3 relative overflow-hidden">
             <div className="flex justify-between items-start mb-1">
               <span className="text-[14px] font-bold text-gray-900">Cupom de envio</span>
               <div className="bg-[#00BFA5] text-white text-[9px] font-bold px-1 rounded-sm">x12</div>
             </div>
             <p className="text-[11px] text-gray-500 leading-tight">Desconto de R$ 10 no frete em pedidos acima de R$ 15</p>
             <button className="absolute right-3 bottom-3 border border-[#00BFA5] text-[#00BFA5] text-[12px] font-bold px-4 py-1 rounded-full">Usar</button>
          </div>
          <div className="min-w-[200px] bg-[#FFF8F9] border border-[#FFD9E0] rounded-xl p-3">
             <span className="text-[14px] font-bold text-gray-900">Desconto de R$ 5</span>
             <p className="text-[11px] text-gray-500 mt-1 leading-tight">nos pedidos acima de R$ 80</p>
          </div>
        </div>

        <CreatorVideosSection />
        
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

      <div className="fixed bottom-[60px] left-0 right-0 z-20 flex justify-center">
        <div className="w-full max-w-[600px] bg-white border-t border-gray-100 h-10 px-4 flex items-center justify-between shadow-[0_-2px_5px_rgba(0,0,0,0.02)]">
          <div className="flex items-center space-x-2 text-[#00BFA5]">
            <Truck size={16} className="fill-[#00BFA5]/10" />
            <span className="text-[12px] font-medium">O <span className="font-bold">frete grátis</span> expira em breve</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#00BFA5] text-[13px] font-bold font-mono">{formatTimer(timeLeft)}</span>
            <X size={16} className="text-gray-300" />
          </div>
        </div>
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
        onClaim={(amt) => {}}
      />

      <ShippingDrawer
        isOpen={isShippingDrawerOpen}
        onClose={() => setIsShippingDrawerOpen(false)}
        deliveryDate={deliveryDateRange}
      />

      <CustomerProtectionDrawer
        isOpen={isProtectionDrawerOpen}
        onClose={() => setIsProtectionDrawerOpen(false)}
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