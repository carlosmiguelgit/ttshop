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
    slug: "parafusadeira-furadeira-completa-com-maleta-2-baterias",
    title: "Furadeira e Parafusadeira de Impacto Sem Fio 48V com LED 2 Baterias Recarregáveis Bi-volt e Acessórios Maleta Completa para Uso Profissional e Doméstico",
    currentPrice: "47,00",
    originalPrice: "249,00",
    discountPercentage: 81,
    discountAmount: "202,00",
    rating: 4.9,
    reviewCount: 5118,
    salesCount: 5287,
    flashSaleTimeSeconds: 4 * 60, // 4 minutos
    media: [
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea2c34a6b70d4e3f80e67cabb80a5bac~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36ae405ac5544aa2b8a9a6a0252782e6~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f67585a059d74169b110b05d7a92d14c~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dca235c49d1e4eb895d4fe4237e7684d~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dca235c49d1e4eb895d4fe4237e7684d~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c9a09fb2a81b4982b92b880811cd0585~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c9a09fb2a81b4982b92b880811cd0585~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
      { type: 'image', src: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/931e7b76b8264713abfd055a7e41f921~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393", thumbnailSrc: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/931e7b76b8264713abfd055a7e41f921~tplv-o3syd03w52-resize-webp:800:1443.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
    ],
    specifications: [
      { label: "Marca", value: "SOARFLY" },
      { label: "Modelo", value: "GSB 18V-60 C" },
      { label: "Voltagem", value: "Bi-volt (110V/220V)" },
      { label: "Tensão da bateria", value: "48V" },
      { label: "Capacidade da bateria", value: "2.0Ah" },
      { label: "Torque máximo", value: "60 Nm" },
      { label: "Velocidade sem carga", value: "0-400 / 0-1.500 rpm" },
      { label: "Funções", value: "Perfuração, parafusamento, impacto" },
      { label: "Níveis de torque", value: "25 + 1" },
      { label: "Peso", value: "1,8 kg (com bateria)" },
      { label: "Inclui", value: "2 baterias, carregador, maleta, acessórios" },
    ],
    descriptionText: "🚀 Potente, Leve e Ergonômica! Design compacto e confortável, ideal para longas jornadas de trabalho. Oferece potência e praticidade em qualquer ambiente — perfeita para uso doméstico, oficinas e serviços gerais.\n\n🛠️ 3 Funções em 1 – Perfura, Parafusa e Impacta! Versátil e eficiente, essa ferramenta atua com precisão em madeira, metal e alvenaria. Substitui várias ferramentas em uma única solução completa.\n\n⚙️ Torque Ajustável + 2 Velocidades! Tenha controle total sobre força e rotação. São 25 níveis de torque, seletor de impacto e função reversa para máxima precisão em cada tarefa.\n\n🔋 2 Baterias 48V – Muito Mais Autonomia! Acompanha duas baterias recarregáveis de alta capacidade para você trabalhar por mais tempo, sem interrupções ou perda de desempenho.\n\n🎯 Maleta Completa com Acessórios! Tudo o que você precisa em um só kit: soquetes, bits, mandril adaptador, carregador e uma maleta rígida para transporte e organização prática.\n\n⚡ Bi-volt Automático (110V/220V)! Use em qualquer tomada, sem se preocupar com a voltagem. Liberdade total para trabalhar em casa, na oficina ou em qualquer lugar.",
  },
  {
    slug: "patinete-eletrico-scooter-bluetooth",
    title: "Patinete Elétrico Scooter De Alumínio Com Bluetooth",
    currentPrice: "67,90",
    originalPrice: "619,90",
    discountPercentage: 89,
    discountAmount: "552,00",
    rating: 4.8,
    reviewCount: 9600,
    salesCount: 3521,
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
    descriptionText: "O Patinete Elétrico Scooter De Alumínio Com Bluetooth é a solução perfeita para mobilidade urbana. Leve, dobrável e com bateria de longa duração, ele atinge até 30km/h e possui conectividade Bluetooth para você ouvir suas músicas enquanto se desloca. Ideal para quem busca eficiência e diversão no dia a dia.",
  },
  {
    slug: "tv-tcl-55",
    title: "Smart TV TCL 55P7K 55\" QLED 4K UHD Google TV",
    currentPrice: "75,00",
    originalPrice: "2.279,00",
    discountPercentage: 97,
    discountAmount: "2.204,00",
    rating: 4.9,
    reviewCount: 1200,
    salesCount: 3521,
    flashSaleTimeSeconds: 5 * 60, // 5 minutos
    media: [
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/1xg.png?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/1xg.png?imwidth=100" },
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/2xg.png?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/2xg.png?imwidth=100" },
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/3xg.jpg?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/3xg.jpg?imwidth=100" },
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/4xg.jpg?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/4xg.jpg?imwidth=100" },
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/1c.jpg?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/1c.jpg?imwidth=100" },
      { type: 'image', src: "https://imgs.casasbahia.com.br/55069451/9xg.jpg?imwidth=500", thumbnailSrc: "https://imgs.casasbahia.com.br/55069451/9xg.jpg?imwidth=100" },
    ],
    specifications: [
      { label: "Código", value: "kbh03bg72b" },
      { label: "Marca", value: "TCL" },
      { label: "Referência", value: "55P7K" },
      { label: "Modelo", value: "55P7K" },
      { label: "Polegadas", value: "55\"" },
      { label: "Resolução", value: "4K UHD" },
      { label: "Painel da Tela", value: "VA" },
      { label: "Tipo de Display", value: "QLED" },
      { label: "Tipo", value: "Smart" },
      { label: "Taxa de Atualização da Tela", value: "60Hz" },
      { label: "Sistema Operacional", value: "Google TV" },
      { label: "Conectividade", value: "Wi-Fi e Bluetooth" },
      { label: "Conexões", value: "1 Porta LAN, 3 HDMI, 1 USB 3.0, 1 entrada para antena/cabo e 1 saída Áudio digital (óptica)" },
      { label: "Processador", value: "AiPQ" },
      { label: "Controle Remoto", value: "RC813" },
      { label: "Assistente Virtual", value: "Google Assistente" },
      { label: "Formato da Tela", value: "16:09" },
      { label: "Ângulo de Visão", value: "178º" },
      { label: "Número de Cores", value: "16 Milhões" },
      { label: "Sistema de Color", value: "NTSC" },
      { label: "Ambiente", value: "Interno" },
      { label: "Tecnologia da TV", value: "Tela antirreflexo" },
      { label: "Distância Recomendada de Visualização", value: "1,9m" },
      { label: "Aplicativos Pré-instalados", value: "YouTube, Netflix, GloboPlay, YouTube Music, Disney+, Directv GO, Prime Video, Apple TV, Spotify, HBO Max, Twitch, Deezer, Star+ (Os aplicativos são passíveis de alteração pelo fornecedor sem aviso prévio)" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Consumo Aproximado de Energia", value: "Máximo: 180W" },
      { label: "Aviso Importante", value: "A exposição ao ruído na potência acima de 85 decibéis pode causar danos ao sistema auditivo" },
      { label: "Cor da Base", value: "Preto" },
      { label: "Cor da Borda", value: "Preto" },
      { label: "Padrão de Furação", value: "VESA 300x300mm" },
      { label: "Ano de Lançamento", value: "2025" },
      { label: "Certificado Homologado pela Anatel Número", value: "00738-24-06714" },
      { label: "Certificado Homologado pelo Inmetro Número", value: "005816/2018" },
      { label: "Peso do Produto", value: "10,8kg" },
      { label: "Peso do Produto com Embalagem", value: "14,1kg" },
      { label: "Dimensões do Produto", value: "Largura 122,6cm Altura 77,6cm Profundidade com os pés 28cm" },
      { label: "Dimensões do Produto com Embalagem", value: "Largura 135,3cm Altura 81,9cm Profundidade 12,5cm" },
      { label: "Prazo de Garantia", value: "01 ano (3 meses de garantia legal e mais 9 meses de garantia especial concedida pelo fabricante)" },
      { label: "Conteúdo da Embalagem", value: "1 Smart TV, 1 Controle remoto, 2 Pés, 1 Par de pilhas e Manual" },
    ],
    descriptionText: "A Smart TV TCL 55P7K de 55\" oferece uma experiência visual. Ela combina tecnologia com recursos, elevando o entretenimento doméstico. Com a resolução 4K UHD, desfrute de imagens nítidas e detalhadas. Cada cena ganha vida com detalhes e uma clareza. A tecnologia QLED oferece cores e um brilho. Os pontos quânticos proporcionam uma gama de cores mais ampla, resultando em imagens. A tela antirreflexo garante que você desfrute do seu conteúdo sem distrações, mesmo em ambientes com luz. A taxa de atualização de 60Hz garante uma reprodução suave de imagens em movimento, para assistir a filmes, séries e programas de TV. O processador AiPQ otimiza cada cena, aprimorando a qualidade da imagem em tempo real. Através de inteligência artificial, o processador ajusta o brilho, o contraste e as cores. O sistema operacional Google TV reúne seus filmes, séries e aplicativos em um só lugar. Com Google Assistente, controle a sua TV e outros dispositivos domésticos inteligentes com a sua voz. Com 3 entradas HDMI e 1 USB, conecte diversos dispositivos à sua TV, como consoles de videogame, players de Blu-ray e dispositivos de streaming.",
  },
];