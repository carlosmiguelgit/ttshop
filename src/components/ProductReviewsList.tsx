import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const allReviews = [
  {
    username: "Ricardo Silva",
    avatarSrc: "public/homem/imgi_12_468027410_1887532388321590_4211239713202834932_n.jpg",
    comment: "Produto excelente! A bateria dura muito e tem bastante força. Recomendo demais, chegou rápido em casa.",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg"]
  },
  {
    username: "Amanda Souza",
    avatarSrc: "public/mulher/imgi_42_613309228_17853960396603612_221627828203468728_n.jpg",
    comment: "Fiquei surpresa com a qualidade. O kit é muito completo e a maleta ajuda muito na organização. Super prático!",
    variation: "1 Bateria",
    reviewImages: ["https://m.media-amazon.com/images/I/71y8MFy+2CL._AC_SX569_.jpg"]
  },
  {
    username: "Carlos Alberto",
    avatarSrc: "public/homem/imgi_11_468340318_18473303854011790_4217472225478858480_n.jpg",
    comment: "Melhor custo benefício que já vi. A entrega foi muito rápida e o produto é de primeira linha.",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/61MK6YHkNUL._AC_SX569_.jpg"]
  },
  {
    username: "Beatriz Lima",
    avatarSrc: "public/mulher/imgi_36_610810492_18549935995062790_7169237004236532779_n.jpg",
    comment: "Comprei para meu marido e ele adorou. Usa todos os dias no trabalho e não teve problemas.",
    variation: "2 Baterias",
    reviewImages: ["https://m.media-amazon.com/images/I/51pSY9nmu6L._AC_SX569_.jpg"]
  }
];

interface ProductReviewsListProps {
  showAll: boolean;
}

const ProductReviewsList: React.FC<ProductReviewsListProps> = ({ showAll }) => {
  const reviewsToDisplay = showAll ? allReviews : allReviews.slice(0, 1);

  return (
    <>
      {reviewsToDisplay.map((review, index) => (
        <React.Fragment key={index}>
          <ProductReviewCard {...review} />
          {index < reviewsToDisplay.length - 1 && <Separator className="my-4" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default ProductReviewsList;