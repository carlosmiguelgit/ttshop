import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  username: string;
  date: string;
  avatarSrc: string;
  verified: boolean;
  attributes: string;
  comment: string;
}

const ProductReviewCard: React.FC<ReviewCardProps> = ({
  username,
  date,
  avatarSrc,
  verified,
  attributes,
  comment,
}) => {
  return (
    <div className="py-4">
      {/* Header da Avaliação (Usuário e Data) */}
      <div className="flex items-center mb-2">
        <img 
          src={avatarSrc} 
          alt={username} 
          className="w-8 h-8 rounded-full object-cover mr-2" 
        />
        <span className="font-semibold text-sm text-gray-900">{username}</span>
        <span className="text-xs text-cyan-500 ml-2">{date}</span>
      </div>

      {/* Compra Verificada */}
      {verified && (
        <p className="text-xs text-gray-500 mb-2">Compra Verificada</p>
      )}

      {/* Atributos da Avaliação */}
      <p className="text-sm font-medium text-gray-800 mb-2">
        {attributes}
      </p>

      {/* Comentário */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {comment}
      </p>
    </div>
  );
};

export default ProductReviewCard;