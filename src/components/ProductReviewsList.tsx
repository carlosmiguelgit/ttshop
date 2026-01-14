import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const allReviews = [
  {
    username: "ana.ribeiro",
    date: "30 de out",
    avatarSrc: "https://m.media-amazon.com/images/I/71GnxWXeaPL._AC_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews",
    verified: true,
    attributes: "Custo-benefício: ótimo | Qualidade: superior",
    comment: "Inacreditável! Esta furadeira/parafusadeira é simplesmente incrível! Pensei que por esse preço não teria qualidade, mas me surpreendi. A potência é excelente, as baterias duram muito e o conjunto completo com maleta é perfeito para quem precisa de uma ferramenta versátil. Melhor compra que já fiz!",
    reviewImages: [
      "https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg",
    ],
  },
  {
    username: "joao.melo",
    date: "29 de out",
    avatarSrc: "https://m.media-amazon.com/images/I/61PoLDvYhGL._AC_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews",
    verified: true,
    attributes: "Bateria: dura muito | Desempenho: excelente",
    comment: "A bateria dura muito mais do que eu imaginava, mesmo usando bastante. O torque é excelente e a ferramenta é muito versátil. A maleta com todos os acessórios é um grande diferencial. Valeu cada centavo, a promoção é real e a qualidade é profissional!",
    reviewImages: [
      "https://m.media-amazon.com/images/I/61MK6YHkNUL._AC_SX569_.jpg",
    ],
  },
  {
    username: "fernanda.paz",
    date: "29 de out",
    avatarSrc: "https://evento-ttk.shop/assets/review-profile-3-DIYsgiJG.jpg",
    verified: true,
    attributes: "Câmera: modo cinema | Design: lindo",
    comment: "Chegou perfeito, na caixa lacrada. O design é lindo e o celular é super potente. O modo cinema da câmera é incrível. Recomendo demais, podem comprar sem medo.",
    reviewImages: [
      "https://evento-ttk.shop/assets/review-iphone13-photo-3-real-CoFlflMf.jpg",
    ],
  },
  {
    username: "rodrigo.alves",
    date: "28 de out",
    avatarSrc: "https://evento-ttk.shop/assets/review-profile-4-CeGu1IFj.jpg",
    verified: false,
    attributes: "Entrega: pontual | Qualidade: Apple",
    comment: "Qualidade Apple por um preço que nunca imaginei. O celular voa, os apps abrem na hora. A entrega foi super rápida. Muito satisfeito com a compra.",
    reviewImages: [
      "https://www.actualidadiphone.com/wp-content/uploads/2021/09/iPhone-13-Pro-Max-02-1024x555.jpg.webp",
    ],
  },
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
          {/* Adiciona separador apenas entre os itens, e não após o último */}
          {index < reviewsToDisplay.length - 1 && <Separator className="my-4" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default ProductReviewsList;