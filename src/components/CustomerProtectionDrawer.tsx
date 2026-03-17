import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X } from 'lucide-react';

interface CustomerProtectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerProtectionDrawer: React.FC<CustomerProtectionDrawerProps> = ({ isOpen, onClose }) => {
  const brownColor = "#8B5E3C"; // Tom de marrom exato da imagem

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh] p-0 rounded-t-[20px] border-none overflow-hidden">
        {/* Marca d'água de escudo no fundo superior direito */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 24 24" fill={brownColor}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-3.13 8.16-7 9.42V12h-7V6.39l7-3.11v8.71z" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white relative">
          {/* Botão Fechar */}
          <button onClick={onClose} className="absolute right-4 top-4 z-50 p-1">
            <X size={24} className="text-gray-900" />
          </button>

          <div className="flex-grow overflow-y-auto p-6 pt-8 space-y-8">
            {/* Título Principal */}
            <h2 className="text-[26px] font-bold text-[#8B5E3C] leading-tight mb-2">
              Proteção do cliente
            </h2>

            {/* Benefício 1: Devoluções */}
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-[#8B5E3C] p-1.5 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8V21H3V8" /><path d="M1 3H23V8H1V3Z" /><path d="M10 12L7 15L10 18" /><path d="M7 15H17" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Devoluções gratuitas em 30 dias</h4>
                <p className="text-[13px] text-gray-700 leading-tight">
                  Devolução gratuita em até 30 dias após o recebimento do seu produto. Os Termos e Condições se aplicam.
                </p>
              </div>
            </div>

            {/* Benefício 2: Pagamento Seguro */}
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-[#8B5E3C] p-1.5 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="space-y-3">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Pagamento seguro</h4>
                <div className="space-y-3 text-[13px] text-gray-700 leading-tight">
                  <p>Para garantir a segurança, as informações do seu cartão são criptografadas e protegidas contra acesso não autorizado.</p>
                  <p>O TikTok Shop não vende, aluga ou cede suas informações pessoais a terceiros para fins de marketing.</p>
                </div>

                <div className="pt-2 space-y-3">
                  <p className="text-[12px] font-medium text-gray-800">Aceitamos pagamento de:</p>
                  <div className="flex flex-wrap gap-2">
                    {/* Logos de Pagamento */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 px-1 border rounded bg-white" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-6 px-1 border rounded bg-white" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Logo_Elo.svg" className="h-6 px-1 border rounded bg-white" alt="Elo" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-6 px-1 border rounded bg-white" alt="Amex" />
                    <div className="h-6 px-2 border rounded bg-white flex items-center">
                      <svg width="20" height="12" viewBox="0 0 24 24" fill="black"><path d="M2 4h2v16H2V4zm4 0h1v16H6V4zm3 0h3v16H9V4zm5 0h2v16h-2V4zm3 0h1v16h-1V4zm2 0h3v16h-3V4z"/></svg>
                    </div>
                    <div className="h-6 px-2 border rounded bg-white flex items-center">
                       <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4" alt="Pix" />
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg" className="h-6 px-1 border rounded bg-white" alt="GPay" />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="text-[12px] font-medium text-gray-800">Certificações de segurança:</p>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" className="h-6 px-1 border rounded bg-white grayscale" alt="SecureCode" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-6 px-1 border rounded bg-white grayscale" alt="Verified by Visa" />
                  </div>
                </div>

                <p className="text-[12px] text-gray-500 pt-1">
                  Para obter informações sobre como o TikTok Shop usa seus dados pessoais, consulte nossa <span className="underline">Privacy Policy</span>.
                </p>
              </div>
            </div>

            {/* Benefício 3: Reembolso Danos */}
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-[#8B5E3C] p-1.5 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8V21H3V8" /><path d="M1 3H23V8H1V3Z" /><path d="M12 12L12 21" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Reembolso automático por danos</h4>
                <p className="text-[13px] text-gray-700 leading-tight">
                  Obtenha um reembolso total se seu pedido for perdido ou danificado. Você não precisa enviar uma solicitação de reembolso.
                </p>
              </div>
            </div>

            {/* Benefício 4: Reembolso Atraso */}
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-[#8B5E3C] p-1.5 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /><path d="M12 12l2-2" />
                </svg>
              </div>
              <div className="space-y-1 pb-8">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Reembolso automático por atraso na coleta</h4>
                <p className="text-[13px] text-gray-700 leading-tight">
                  Receba um reembolso total se o entregador não retirar seu pedido com o vendedor em até 7 dias úteis após a confirmação do pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomerProtectionDrawer;