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
  bannerImage?: string;
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
      { label: "Nível de ruído", value: "65 dB(A)" },
      { label: "Tipo de filtro", value: "HEPA + Espuma + Tela" },
      { label: "Níveis de filtragem", value: "3" },
      { label: "Aspira água?", value: "Não" },
      { label: "Capacidade para pó", value: "600 ml" },
      { label: "Voltagem", value: "BIVOLT" },
      { label: "Potência elétrica", value: "36W" },
      { label: "Frequência", value: "60Hz" },
      { label: "Capacidade útil", value: "350ml (água) + 260ml (pó)" },
      { label: "Tipo de bateria", value: "Li-Ion" },
      { label: "Capacidade da bateria", value: "2600 (mAh)" },
      { label: "Autonomia", value: "Até 2h40" },
      { label: "Tempo de carga", value: "Até 5 horas" },
      { label: "Base carregadora", value: "Sim" },
      { label: "Controle remoto", value: "Sim" },
      { label: "Conectividade APP", value: "Sim" },
      { label: "Peso líquido", value: "3 kg" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Dimensões", value: "32 x 32 x 8 cm" },
    ],
    descriptionText: `Direção inteligente para uma limpeza eficiente!

Imagine ter um ajudante versátil, que varre, aspira e passa pano como você deseja, quando precisar, mesmo estando longe? Com o Robô Aspirador WAP ROBOT W1000, você economiza tempo e pode acompanhar a limpeza dos ambientes diretamente na tela do seu celular. 

Pronto para oferecer uma nova experiência de limpeza, o robô aspirador com mapeamento é equipado com a exclusiva navegação Gyro. Ela calcula de forma precisa sua posição e orientação em tempo real para uma movimentação segura, que evita obstáculos, para uma ação otimizada na rotina do lar. 

O Robô Aspirador WAP ROBOT W1000 torna a limpeza do dia a dia contínua e sem esforço, retornando sozinho até à base. Acompanhado de um controle remoto com funções pré-programadas, é possível escolher os modos de operação que direcionam a aspiração para áreas específicas. 

Com o aplicativo WAP CONNECT, o controle do aspirador está nas suas mãos. Atualize o software, agende limpezas e monitore tudo pelo celular, ou ainda solicite à Alexa ou Google Assistant com um simples comando de voz.

Ideal para famílias com pets, o ROBOT W1000 oferece três modos de sucção e é eficaz na remoção de pelos, cabelos, poeira e sujeira em diferentes tipos de pisos, incluindo madeira, carpete e pisos frios. Suas rodas emborrachadas e as duas escovas giratórias promovem uma limpeza profunda. 

Além do design sofisticado, com acabamento em vidro de fácil manutenção, o robô aspirador com mapeamento possui recipiente duplo, para água e pó. Assim, ele não apenas aspira o pó, mas também realiza a limpeza completa dos cômodos, enquanto o tanque inteligente gerencia a umidade do piso durante a passagem do MOP, liberando água em 3 níveis de umidade. 

Escolha entre os cinco modos de limpeza disponíveis, incluindo as opções de Cantos, Aleatória, Espiral, Inteligente e Umedecida. Com até 2h40 de autonomia de bateria, você pode renovar toda a casa sem interrupções ou obstáculos. Isso é possível graças aos sensores antiqueda e de redirecionamento.  

O melhor caminho para o seu conforto está aqui! Adicione um toque de sofisticação e alta performance à sua rotina de limpeza com o Robô Aspirador WAP ROBOT W1000.  
 
WAP | Deixa tudo mais fácil`,
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-wap-robot-w1000",
    reviews: []
  },
  {
    slug: "furadeira",
    title: "DEWALT Parafusadeira e Furaderia de Impacto de 1/2 Pol. (13mm) Brushless Motor a Bateria 20V MAX* Ion-Litio com 2 Baterias 2.0Ah Carregador Bivolt e Mala DCD7781D2",
    currentPrice: "97,94",
    originalPrice: "897,00",
    discountPercentage: 89,
    discountAmount: "799,06",
    rating: 4.8,
    reviewCount: 306,
    salesCount: 3504,
    flashSaleTimeSeconds: 10 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/51NuTLIhp7L._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51NuTLIhp7L._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51ZclRWxMFL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51ZclRWxMFL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51xJArXXCYL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51xJArXXCYL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51C9aON0llL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51C9aON0llL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51xqB0lPNWL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51xqB0lPNWL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61uR63dk2xL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61uR63dk2xL._AC_SX679_.jpg" },
    ],
    specifications: [
      { label: "Fabricante", value: "Dewalt" },
      { label: "Modelo", value: "DCD7781D2-BR" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Tipo de bateria", value: "Íon-lítio" },
      { label: "Capacidade da bateria", value: "4 Amperes Horas" },
      { label: "Peso", value: "2,21 kg" },
      { label: "Dimensões", value: "32 x 10 x 44 cm" },
      { label: "Mandril", value: "1/2\" (13mm)" },
      { label: "Motor", value: "Brushless (Sem escovas)" },
    ],
    descriptionText: `Parafusadeira e Furadeira DEWALT de Impacto com a tecnologia sem escovas de carvão (BRUSHLESS) sem fio de 20V MAX** com 2 Baterias e Carregador Bivolt que pode ser usado com 220V e 127V. Conta com muito mais eficiência através de mais tempo de uso e menos manutenções.`,
    bannerImage: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/01bfda1f-fac1-4ad9-a34f-2b30a5248653.__CR0,0,970,300_PT0_SX970_V1___.jpg",
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