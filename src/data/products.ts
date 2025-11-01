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
}

export const products: Product[] = [
  {
    slug: "patinete-eletrico-scooter-bluetooth",
    title: "Patinete Elétrico Scooter De Alumínio Com Bluetooth 30km/h",
    currentPrice: "67,90",
    originalPrice: "619,90",
    discountPercentage: 89,
    discountAmount: "552,00",
    rating: 4.8,
    reviewCount: 9600,
    salesCount: 4348,
    flashSaleTimeSeconds: 3 * 60, // 3 minutos
    media: [
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_971780-MLB94758468933_102025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_971780-MLB94758468933_102025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_939429-MLB92436307100_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_939429-MLB92436307100_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_694773-MLB92845535377_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_694773-MLB92845535377_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_817055-MLB92435483774_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_817055-MLB92435483774_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_707877-MLB92436356940_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_707877-MLB92436356940_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_600092-MLB92845535605_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_600092-MLB92845535605_092025-F-patinete-eletrico-scooter-de-aluminio-com-bluetooth-30kmh.webp" },
    ],
    specifications: [
      { label: "Faixa etária", value: "Adulto" },
      { label: "Modelo", value: "XM-BLK-SRK15" },
      { label: "Número do modelo", value: "XM-BLK-SRK15" },
      { label: "Tipo de freios", value: "Freio regenerativo" },
      { label: "Cor", value: "Vermelho e Preto" },
      { label: "Material da armação ou moldura", value: "Alumínio" },
      { label: "Peso", value: "14,7 Kilograms" },
      { label: "Recursos especiais", value: "Dobrável" },
      { label: "Tamanho da roda", value: "8,5 Polegadas" },
      { label: "Funciona com baterias", value: "Não" },
      { label: "Marca", value: "Foston" },
      { label: "Número do modelo", value: "XM-BLK-SRK15" },
      { label: "Dimensões do produto", value: "109 x 15 x 51 cm; 13 quilogramas" },
      { label: "ASIN", value: "B099JG7TLB" },
    ],
  },
  {
    slug: "airfryer-super-potente",
    title: "Air Fryer Super Potente 5 Litros - Frita sem Óleo",
    currentPrice: "199,90",
    originalPrice: "499,90",
    discountPercentage: 60,
    discountAmount: "300,00",
    rating: 4.5,
    reviewCount: 1200,
    salesCount: 850,
    flashSaleTimeSeconds: 10 * 60, // 10 minutos
    media: [
      { type: 'image', src: "https://images.unsplash.com/photo-1622430858000-192222222222?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", thumbnailSrc: "https://images.unsplash.com/photo-1622430858000-192222222222?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { type: 'image', src: "https://images.unsplash.com/photo-1622430858000-192222222222?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", thumbnailSrc: "https://images.unsplash.com/photo-1622430858000-192222222222?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    specifications: [
      { label: "Capacidade", value: "5 Litros" },
      { label: "Potência", value: "1500W" },
      { label: "Cor", value: "Preto Fosco" },
      { label: "Recursos", value: "Timer e Controle de Temperatura Digital" },
    ],
  },
];