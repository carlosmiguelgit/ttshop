import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  username: string;
  date: string;
  avatarSrc: string;
  verified: boolean;
  attributes: string;
  comment: string;
  reviewImages?: string[]; // Novo campo para URLs de imagens
}

const ProductReviewCard: React.FC<ReviewCardProps> = ({
  username,
  date,
  avatarSrc,
  verified,
  attributes,
  comment,
  reviewImages,
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
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {comment}
      </p>
      
      {/* Galeria de Imagens da Avaliação (se houver) */}
      {reviewImages && reviewImages.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto py-2">
          {reviewImages.map((src, index) => (
            <img 
              key={index}
              src={src}
              alt={`Imagem da avaliação ${index + 1}`}
              className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviewCard;