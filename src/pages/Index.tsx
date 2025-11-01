import ProductDetailPage from "./ProductDetailPage";
import { useParams } from "react-router-dom";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();

  // O ProductDetailPage agora será responsável por carregar os dados com base no slug
  return (
    <ProductDetailPage productSlug={slug} />
  );
};

export default Index;