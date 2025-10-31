import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import StoreInfoCollapsibleItem from './StoreInfoCollapsibleItem';

interface NavLinkData {
  title: string;
  content: string;
}

const linksData: NavLinkData[] = [
  {
    title: "Informações da empresa",
    content: "A Tech Mobility Brasil é líder no mercado de mobilidade elétrica, focada em inovação e sustentabilidade. Oferecemos produtos de alta qualidade e tecnologia de ponta. Nossa missão é transformar a maneira como as pessoas se movem nas cidades, promovendo um futuro mais verde e eficiente. Fundada em 2018, já atendemos mais de 500 mil clientes em todo o Brasil."
  },
  {
    title: "Suporte ao cliente",
    content: "Todo o suporte é feito pela equipe do Tiktok Shop. Para questões relacionadas a pedidos, pagamentos ou devoluções, utilize o chat de suporte dentro do aplicativo. Nossa equipe de atendimento está disponível 24 horas por dia, 7 dias por semana."
  },
  {
    title: "Políticas e aspectos legais",
    content: "Nossas políticas de privacidade e termos de serviço estão em conformidade com a legislação brasileira (LGPD). Consulte o site para detalhes sobre devoluções, garantias e direitos do consumidor. Garantimos a segurança dos seus dados e a transparência em todas as transações."
  },
];

const StoreInfoSection: React.FC = () => {
  return (
    <div className="bg-white p-4 space-y-4 border-t border-gray-100 mt-4">
      {/* Nome da Loja e Verificação */}
      <div className="flex items-center">
        <h3 className="text-lg font-bold text-gray-900 mr-2">Tech Mobility Brasil</h3>
        <CheckCircle size={18} className="text-blue-500 fill-white" />
      </div>
      <p className="text-sm text-gray-500 mb-4">Loja verificada por Mercado Livre</p>

      {/* Ícone Shop */}
      <div className="flex items-center space-x-3 py-2">
        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
          <ShoppingBag size={18} className="text-white fill-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">Shop</span>
      </div>

      {/* Links de Navegação (Collapsible Items) */}
      <div className="divide-y divide-gray-100">
        {linksData.map((link, index) => (
          <StoreInfoCollapsibleItem 
            key={index}
            title={link.title}
            content={link.content}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreInfoSection;