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
    slug: "robo-aspirador-wap-w1000",
    title: "WAP Robô Aspirador de Pó ROBOT W1000 Mapeamento de Tempo Real GYRO, Base de Carregamento, Compatível com Alexa e Google",
    currentPrice: "197,00",
    originalPrice: "899,00",
    discountPercentage: 78,
    discountAmount: "702,00",
    rating: 4.8,
    reviewCount: 12450,
    salesCount: 15800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61PFw76v+FL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61PFw76v+FL._AC_SL1500_.jpg" },
    ],
    specifications: [
      { label: "Bateria (mAh)", value: "2600" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Autonomia", value: "Até 2h40min" },
      { label: "Potência (W)", value: "32" },
      { label: "Tipo de filtro", value: "HEPA" },
      { label: "Comando de voz", value: "Alexa e Google" },
    ],
    descriptionText: "Imagine ter um ajudante versátil, que varre, aspira e passa pano como você deseja, quando precisar, mesmo estando longe? Com o Robô Aspirador WAP ROBOT W1000, você economiza tempo e pode acompanhar a limpeza dos ambientes diretamente na tela do seu celular.\n\nPronto para oferecer uma nova experiência de limpeza, o robô aspirador com mapeamento é equipado com a exclusiva navegação Gyro. Ela calcula de forma precisa sua posição e orientação em tempo real para uma movimentação segura, que evita obstáculos, para uma ação otimizada na rotina do lar.\n\nO Robô Aspirador WAP ROBOT W1000 torna a limpeza do dia a dia contínua e sem esforço, retornando sozinho até à base. Acompanhado de um controle remoto com funções pré-programadas, é possível escolher os modos de operação que direcionam a aspiração para áreas específicas.\n\nCom o aplicativo WAP CONNECT, o controle do aspirador está nas suas mãos. Atualize o software, agende limpezas e monitore tudo pelo celular, ou ainda solicite à Alexa ou Google Assistant com um simples comando de voz.",
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-wap-robot-w1000",
    reviews: [
      {
        username: "Fernanda Lima",
        avatarSrc: "/mulher/mulher (10).jpg",
        comment: "Simplesmente maravilhoso! Mapeia a casa certinho e o pano úmido limpa de verdade. Recomendo muito.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/71ctuiejCeL.jpg", "https://m.media-amazon.com/images/I/61kP5qidrUL.jpg"]
      },
      {
        username: "João Pedro",
        avatarSrc: "/homem/homem (12).jpg",
        comment: "O sistema gyro faz muita diferença, ele não fica batendo em tudo. Chegou rápido.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/712ddY7esJL.jpg"]
      },
      {
        username: "Patrícia M.",
        avatarSrc: "/mulher/mulher (15).jpg",
        comment: "Melhor investimento para quem tem pet em casa. Aspira todos os pelos sem esforço.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/61KouOv4ThL.jpg", "https://m.media-amazon.com/images/I/711iKkVIaYL.jpg"]
      },
      {
        username: "Carlos Eduardo",
        avatarSrc: "/homem/homem (20).jpg",
        comment: "Conectei na Alexa super fácil. Agora é só falar pra ele limpar a sala e pronto.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/718pxLy67TL.jpg", "https://m.media-amazon.com/images/I/71YkAuDHo4L.jpg"]
      },
      {
        username: "Juliana Silva",
        avatarSrc: "/mulher/mulher (25).jpg",
        comment: "A bateria dura muito, consigo limpar o apartamento todo de 80m² e ainda sobra carga.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/71FYRSH0xnL.jpg", "https://m.media-amazon.com/images/I/61Z8OTkLJfL.jpg"]
      }
    ]
  }
];