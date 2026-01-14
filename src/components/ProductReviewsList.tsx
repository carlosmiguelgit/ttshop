import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const allReviews = [
  {
    username: "ana.ribeiro",
    date: "30 de out",
    avatarSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393",
    verified: true,
    attributes: "Custo-benefício: ótimo | Qualidade: superior",
    comment: "Inacreditável! Esta furadeira/parafusadeira é simplesmente incrível! Pensei que por esse preço não teria qualidade, mas me surpreendi. A potência é excelente, as baterias duram muito e o conjunto completo com maleta é perfeito para quem precisa de uma ferramenta versátil. Melhor compra que já fiz!",
    reviewImages: [
      "https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61MK6YHkNUL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61UVqQqA3yL._AC_SX569_.jpg",
    ],
  },
  {
    username: "joao.melo",
    date: "29 de out",
    avatarSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393",
    verified: true,
    attributes: "Bateria: dura muito | Desempenho: excelente",
    comment: "A bateria dura muito mais do que eu imaginava, mesmo usando bastante. O torque é excelente e a ferramenta é muito versátil. A maleta com todos os acessórios é um grande diferencial. Valeu cada centavo, a promoção é real e a qualidade é profissional!",
    reviewImages: [
      "https://m.media-amazon.com/images/I/71y8MFy+2CL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/51pSY9nmu6L._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61aEc1+4tYL._AC_SL1200_.jpg",
    ],
  },
  {
    username: "carlos.silva",
    date: "28 de out",
    avatarSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393",
    verified: true,
    attributes: "Potência: impressionante | Durabilidade: excelente",
    comment: "Fiquei impressionado com a potência desta furadeira! Consegui fazer furos em alvenaria com facilidade, algo que minha antiga ferramenta não conseguia. As baterias duram o dia todo de trabalho e o carregamento é rápido. A maleta é resistente e organiza todos os acessórios perfeitamente.",
    reviewImages: [
      "https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61MK6YHkNUL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61UVqQqA3yL._AC_SX569_.jpg",
    ],
  },
  {
    username: "maria.oliveira",
    date: "27 de out",
    avatarSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dca235c49d1e4eb895d4fe4237e7684d~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393",
    verified: true,
    attributes: "Versatilidade: incrível | Preço: imbatível",
    comment: "Comprei para uso doméstico e estou encantada! A furadeira é leve, fácil de manusear e tem força suficiente para todos os trabalhos em casa. O fato de ser bi-volt é um grande vantagem. Os acessórios que acompanham são de ótima qualidade. Super recomendo!",
    reviewImages: [
      "https://m.media-amazon.com/images/I/71y8MFy+2CL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/51pSY9nmu6L._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/61aEc1+4tYL._AC_SL1200_.jpg",
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