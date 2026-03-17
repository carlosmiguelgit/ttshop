import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, ShieldCheck, Check, RotateCcw, CreditCard, Box, Clock } from 'lucide-react';

interface CustomerProtectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerProtectionDrawer: React.FC<CustomerProtectionDrawerProps> = ({ isOpen, onClose }) => {
  const primaryColor = "#A0783A";

  const benefits = [
    {
      title: "Devolução gratuita",
      description: "Você pode devolver o item por qualquer motivo em até 30 dias após a entrega.",
      icon: <RotateCcw size={20} className="text-[#A0783A]" />
    },
    {
      title: "Pagamento seguro",
      description: "Suas informações de pagamento são processadas com segurança. Não armazenamos detalhes do cartão nem temos acesso aos seus dados bancários.",
      icon: <CreditCard size={20} className="text-[#A0783A]" />
    },
    {
      title: "Reembolso automático por danos",
      description: "Se o item chegar danificado, o reembolso será processado automaticamente após a verificação.",
      icon: <Box size={20} className="text-[#A0783A]" />
    },
    {
      title: "Reembolso por atraso",
      description: "Se o seu pedido não for entregue na data prevista, você receberá um cupom de desconto como compensação.",
      icon: <Clock size={20} className="text-[#A0783A]" />
    }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] p-0 rounded-t-[16px] border-none">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[16px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-center relative">
            <h2 className="text-[16px] font-bold text-gray-900">Proteção do cliente</h2>
            <button onClick={onClose} className="absolute right-4 p-1">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative flex items-center justify-center w-12 h-12">
                <ShieldCheck size={48} className="text-[#A0783A] fill-[#A0783A]/10" />
                <Check size={20} className="absolute text-[#A0783A] stroke-[4]" />
              </div>
              <p className="text-[14px] text-gray-500 max-w-[80%]">
                Compre com confiança. O TikTok Shop protege sua compra do clique à entrega.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="mt-1 bg-[#FDF8F1] p-2 rounded-full">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-bold text-gray-900">{benefit.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4">
            <button 
              onClick={onClose}
              className="w-full bg-gray-900 text-white font-bold h-12 rounded-full text-[15px]"
            >
              Entendi
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomerProtectionDrawer;