import React, { useState } from 'react';
import ProductReviewsHeader from './ProductReviewsHeader';
import ProductReviewsList from './ProductReviewsList';
import { useAnalytics } from '@/hooks/useAnalytics'; // Importando useAnalytics
import { useParams } from 'react-router-dom';

interface ProductReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ rating, reviewCount }) => {
  const { trackEvent } = useAnalytics();
  const { slug } = useParams<{ slug: string }>();
  
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleViewMore = () => {
    setShowAllReviews(true);
    trackEvent('Avaliacoes', 'Ver_Mais_Avaliacoes', slug);
  };

  return (
    <div className="bg-white p-4 mt-4">
      <ProductReviewsHeader 
        rating={rating} 
        reviewCount={reviewCount} 
        onViewMoreClick={handleViewMore}
        showViewMore={!showAllReviews} // Mostra 'Ver mais' apenas se não estiver expandido
      />
      <ProductReviewsList 
        showAll={showAllReviews} 
      />
    </div>
  );
};

export default ProductReviewsSection;