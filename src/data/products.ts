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
    slug: "furadeira",
    title: "Furadeira e Parafusadeira de Impacto Sem Fio 48V com LED 2 Baterias Recarregáveis Bi-volt e Acessórios Maleta Completa para Uso Profissional e Doméstico",
    currentPrice: "47,00",
    originalPrice: "249,00",
    discountPercentage: 81,
    discountAmount: "202,00",
    rating: 4.9,
    reviewCount: 5118,
    salesCount: 5287,
    flashSaleTimeSeconds: 4 * 60,
    media: [
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp" },
    ],
    specifications: [
      { label: "Marca", value: "SOARFLY" },
      { label: "Voltagem", value: "Bi-volt" },
      { label: "Tensão", value: "48V" },
    ],
    descriptionText: "🚀 Potente, Leve e Ergonômica! Design compacto e confortável, ideal para longas jornadas de trabalho.",
    safeRedirectUrl: "https://www.lojadomecanico.com.br/produto/128695",
    reviews: [
      {
        username: "Ricardo Oliveira",
        avatarSrc: "/homem/homem (1).jpg",
        comment: "Produto excelente! A bateria dura muito e tem bastante força para furar parede.",
        variation: "2 Baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71IkV-JO1AL._AC_SX569_.jpg"]
      },
      {
        username: "Amanda Souza",
        avatarSrc: "/mulher/mulher (2).jpg",
        comment: "Fiquei surpresa com a qualidade pelo preço. O kit é muito completo.",
        variation: "1 Bateria",
        reviewImages: ["https://m.media-amazon.com/images/I/71y8MFy+2CL._AC_SX569_.jpg"]
      }
    ]
  },
  {
    slug: "robo-aspirador-philco",
    title: "Robô Aspirador Philco PAS08P Smart Life Wi-Fi Varre Aspira e Passa Pano Sensores Antiqueda e Anticolisão 120min de Autonomia",
    currentPrice: "89,90",
    originalPrice: "899,00",
    discountPercentage: 90,
    discountAmount: "809,10",
    rating: 4.8,
    reviewCount: 12450,
    salesCount: 15800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://philco.vteximg.com.br/arquivos/ids/206981-1000-1000/054903061.jpg", thumbnailSrc: "https://philco.vteximg.com.br/arquivos/ids/206981-1000-1000/054903061.jpg" },
      { type: 'image', src: "https://philco.vteximg.com.br/arquivos/ids/206982-1000-1000/054903061_1.jpg", thumbnailSrc: "https://philco.vteximg.com.br/arquivos/ids/206982-1000-1000/054903061_1.jpg" },
    ],
    specifications: [
      { label: "Marca", value: "Philco" },
      { label: "Modelo", value: "PAS08P" },
      { label: "Autonomia", value: "120 minutos" },
    ],
    descriptionText: "🧹 Limpeza inteligente na palma da sua mão! O Robô Aspirador Philco PAS08P é o aliado perfeito.",
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-philco",
    reviews: [
      {
        username: "Marcos Vinicius",
        avatarSrc: "/homem/homem (5).jpg",
        comment: "Sensacional! Ele aspira muito bem os pelos do meu cachorro. Facilita demais a vida.",
        variation: "Preto",
        reviewImages: ["https://m.media-amazon.com/images/I/71Y-tC66PmL._AC_SL1500_.jpg"]
      },
      {
        username: "Carla Ferreira",
        avatarSrc: "/mulher/mulher (8).jpg",
        comment: "Melhor compra que fiz esse ano. Ele passa pano direitinho e volta sozinho pra base.",
        variation: "Preto",
        reviewImages: ["https://m.media-amazon.com/images/I/61Nl8A1i3-L._AC_SL1500_.jpg"]
      }
    ]
  }
];