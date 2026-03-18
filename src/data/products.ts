import { MediaItem } from "@/types/product";

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
      { type: 'image', src: "https://philco.vteximg.com.br/arquivos/ids/206983-1000-1000/054903061_2.jpg", thumbnailSrc: "https://philco.vteximg.com.br/arquivos/ids/206983-1000-1000/054903061_2.jpg" },
    ],
    specifications: [
      { label: "Marca", value: "Philco" },
      { label: "Modelo", value: "PAS08P" },
      { label: "Autonomia", value: "120 minutos" },
      { label: "Funções", value: "Varre, Aspira, Passa Pano" },
      { label: "Conectividade", value: "Wi-Fi / Google Home / Alexa" },
    ],
    descriptionText: "🧹 Limpeza inteligente na palma da sua mão! O Robô Aspirador Philco PAS08P é o aliado perfeito para manter sua casa limpa sem esforço.\n\n📱 Controle por App – Agende limpezas e monitore tudo pelo seu smartphone.\n\n✨ 3 em 1 – Ele varre, aspira e passa pano, garantindo uma limpeza completa em diversos tipos de piso.\n\n🛡️ Sensores Inteligentes – Sistema antiqueda e anticolisão que protege seus móveis e o próprio aparelho.\n\n🔋 Bateria de Longa Duração – Até 2 horas de autonomia para limpar grandes áreas com uma única carga.",
  }
];