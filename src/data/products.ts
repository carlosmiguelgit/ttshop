import { MediaItem } from "@/types/product";

export interface Review {
  username: string;
  avatarSrc: string;
  comment: string;
  variation: string;
  reviewImages: string[];
}

export interface Product {
  slug: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
  discountPercentage: number;
  discountAmount: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  flashSaleTimeSeconds: number;
  media: MediaItem[];
  specifications: { label: string; value: string }[];
  descriptionText: string;
  safeRedirectUrl: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    slug: "aspirador-de-po",
    title: "WAP Robô Aspirador de Pó ROBOT W1000 Mapeamento de Tempo Real GYRO, Base de Carregamento, Compatível com Alexa e Google",
    currentPrice: "97,28",
    originalPrice: "899,00",
    discountPercentage: 89,
    discountAmount: "801,72",
    rating: 4.8,
    reviewCount: 12450,
    salesCount: 15800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg" },
    ],
    specifications: [
      { label: "Bateria (mAh)", value: "2600" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Autonomia", value: "Até 2h40min" },
    ],
    descriptionText: "O Robô Aspirador WAP ROBOT W1000 torna a limpeza do dia a dia contínua e sem esforço...",
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-wap-robot-w1000",
    reviews: []
  },
  {
    slug: "furadeira",
    title: "Furadeira de Impacto Profissional Havan Power 600W com Kit de Brocas e Maleta",
    currentPrice: "89,90",
    originalPrice: "349,00",
    discountPercentage: 74,
    discountAmount: "259,10",
    rating: 4.9,
    reviewCount: 8500,
    salesCount: 12000,
    flashSaleTimeSeconds: 10 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg" },
    ],
    specifications: [
      { label: "Potência", value: "600W" },
    ],
    descriptionText: "A Furadeira de Impacto Havan Power é a ferramenta ideal para seus projetos...",
    safeRedirectUrl: "https://www.havan.com.br/furadeira",
    reviews: []
  },
  {
    slug: "fritadeira-eletrica",
    title: "Fritadeira Elétrica Air Fryer Havan Family 4L - Preta 110V",
    currentPrice: "147,50",
    originalPrice: "499,00",
    discountPercentage: 70,
    discountAmount: "351,50",
    rating: 4.7,
    reviewCount: 5200,
    salesCount: 8900,
    flashSaleTimeSeconds: 15 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/618S7-v6v6L._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/618S7-v6v6L._AC_SL1500_.jpg" },
    ],
    specifications: [{ label: "Capacidade", value: "4L" }],
    descriptionText: "Cozinhe de forma saudável com a Air Fryer Havan...",
    safeRedirectUrl: "#",
    reviews: []
  },
  {
    slug: "jogo-de-panelas",
    title: "Jogo de Panelas Antiaderente Havan Cook 5 Peças - Vermelho",
    currentPrice: "79,90",
    originalPrice: "299,00",
    discountPercentage: 73,
    discountAmount: "219,10",
    rating: 4.6,
    reviewCount: 3100,
    salesCount: 5400,
    flashSaleTimeSeconds: 20 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg" },
    ],
    specifications: [{ label: "Material", value: "Alumínio Antiaderente" }],
    descriptionText: "Conjunto completo para sua cozinha...",
    safeRedirectUrl: "#",
    reviews: []
  }
];