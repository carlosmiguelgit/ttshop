import React, { useState } from 'react';
import ProductReviewsHeader from './ProductReviewsHeader';
import ProductReviewsList from './ProductReviewsList';
import { useParams } from 'react-router-dom';

interface ProductReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ rating, reviewCount }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleViewMore = () => {
    setShowAllReviews(true);
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