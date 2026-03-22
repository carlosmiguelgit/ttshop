import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Review } from '@/data/products';

interface ProductReviewsListProps {
  showAll: boolean;
  reviews: Review[];
}

const ProductReviewsList: React.FC<ProductReviewsListProps> = ({ showAll, reviews }) => {
  // Mostra 2 comentários por padrão, ou todos se showAll for true
  const reviewsToDisplay = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="divide-y divide-gray-100">
      {reviewsToDisplay.map((review, index) => (
        <ProductReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ProductReviewsList;