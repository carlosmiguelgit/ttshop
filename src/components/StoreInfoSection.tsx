import React from 'react';
import { CheckCircle, ShoppingBag, ChevronRight } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface NavLinkProps {
  title: string;
  toastMessage: string;
}

const NavLink: React.FC<NavLinkProps> = ({ title, toastMessage }) => {
  const handleClick = () => {
    showSuccess(toastMessage);
  };

  return (
    <div 
      className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <span className="text-base text-gray-800">{title}</span>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );
};

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

      {/* Links de Navegação */}
      <div className="divide-y divide-gray-100">
        <NavLink 
          title="Informações da empresa" 
          toastMessage="A Tech Mobility Brasil é líder no mercado de mobilidade elétrica, focada em inovação e sustentabilidade. Oferecemos produtos de alta qualidade e tecnologia de ponta."
        />
        <NavLink 
          title="Suporte ao cliente" 
          toastMessage="Todo o suporte é feito pela equipe do Tiktok Shop."
        />
        <NavLink 
          title="Políticas e aspectos legais" 
          toastMessage="Nossas políticas de privacidade e termos de serviço estão em conformidade com a legislação brasileira. Consulte o site para detalhes sobre devoluções e garantias."
        />
      </div>
    </div>
  );
};

export default StoreInfoSection;