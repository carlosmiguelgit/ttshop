import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const allReviews = [
  {
    username: "Ricardo Oliveira",
    avatarSrc: "/homem/homem (1).jpg",
    comment: "Produto excelente! A bateria dura muito e tem bastante força para furar parede. Recomendo demais, chegou em 3 dias.",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg"]
  },
  {
    username: "Amanda Souza",
    avatarSrc: "/mulher/mulher (2).jpg",
    comment: "Fiquei surpresa com a qualidade pelo preço. O kit é muito completo e a maleta é bem resistente. Super prático para o dia a dia!",
    variation: "1 Bateria",
    reviewImages: ["https://m.media-amazon.com/images/I/71y8MFy+2CL._AC_SX569_.jpg"]
  },
  {
    username: "Carlos Alberto",
    avatarSrc: "/homem/homem (10).jpg",
    comment: "Melhor custo benefício. Já usei para montar três guarda-roupas e a bateria ainda está cheia. Entrega nota 10.",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/61MK6YHkNUL._AC_SX569_.jpg"]
  },
  {
    username: "Beatriz Lima",
    avatarSrc: "/mulher/mulher (11).jpg",
    comment: "Comprei de presente para o meu pai e ele adorou. A lanterna de LED ajuda muito em lugares escuros. Recomendo!",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/51pSY9nmu6L._AC_SX569_.jpg"]
  },
  {
    username: "Fernando Costa",
    avatarSrc: "/homem/homem (15).jpg",
    comment: "Robusta e leve ao mesmo tempo. O controle de torque é bem preciso, não espana os parafusos. Vale cada centavo.",
    variation: "1 Bateria",
    reviewImages: []
  },
  {
    username: "Juliana Mendes",
    avatarSrc: "/mulher/mulher (16).jpg",
    comment: "Chegou super rápido aqui em SP. Produto idêntico ao anúncio, muito potente e fácil de manusear.",
    variation: "2 Baterias",
    reviewImages: []
  }
];

interface ProductReviewsListProps {
  showAll: boolean;
}

const ProductReviewsList: React.FC<ProductReviewsListProps> = ({ showAll }) => {
  // Mostra apenas 1 review por padrão ou todos se o usuário clicar em 'Ver mais'
  const reviewsToDisplay = showAll ? allReviews : allReviews.slice(0, 1);

  return (
    <div className="divide-y divide-gray-100">
      {reviewsToDisplay.map((review, index) => (
        <ProductReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ProductReviewsList;