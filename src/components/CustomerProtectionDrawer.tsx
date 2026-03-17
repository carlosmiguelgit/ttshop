import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X } from 'lucide-react';

interface CustomerProtectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerProtectionDrawer: React.FC<CustomerProtectionDrawerProps> = ({ isOpen, onClose }) => {
  const brownColor = "#8B5E3C";

  const IconReturn = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="3" fill={brownColor} />
      <path d="M14 10H10V12H14V14L17 12L14 10Z" fill="white" />
      <path d="M7 10V14H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const IconCardCheck = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="3" fill={brownColor} />
      <rect x="2" y="9" width="20" height="3" fill="rgba(255,255,255,0.2)" />
      <path d="M15 14L17 16L20 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const IconBoxDollar = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="3" fill={brownColor} />
      <path d="M12 9V17M10 11.5C10 11.5 10.5 10.5 12 10.5C13.5 10.5 14 11.5 14 11.5C14 11.5 14 12.5 12 12.5C10 12.5 10 13.5 10 13.5C10 13.5 10.5 14.5 12 14.5C13.5 14.5 14 13.5 14 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const IconRefreshDollar = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3" stroke={brownColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21" stroke={brownColor} strokeWidth="2.5" strokeDasharray="4 4" />
      <path d="M12 8V16M10 10C10 10 10.5 9 12 9C13.5 9 14 10 14 10C14 10 14 11 12 11C10 11 10 12 10 12C10 12 10.5 13 12 13C13.5 13 14 12 14 12" stroke={brownColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18L12 21L9 24" stroke={brownColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh] p-0 rounded-t-[20px] border-none overflow-hidden">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white relative">
          <button onClick={onClose} className="absolute right-4 top-4 z-50 p-1">
            <X size={24} className="text-gray-900" />
          </button>

          <div className="flex-grow overflow-y-auto p-6 pt-8 space-y-8">
            <h2 className="text-[26px] font-bold text-[#8B5E3C] leading-tight mb-2">
              Proteção do cliente
            </h2>

            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <IconReturn />
              </div>
              <div className="space-y-1">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Devoluções gratuitas em 30 dias</h4>
                <p className="text-[13px] text-gray-700 leading-tight">
                  Devolução gratuita em até 30 dias após o recebimento do seu produto. Os Termos e Condições se aplicam.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <IconCardCheck />
              </div>
              <div className="space-y-4 w-full">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Pagamento seguro</h4>
                <div className="space-y-3 text-[13px] text-gray-700 leading-tight">
                  <p>Para garantir a segurança, as informações do seu cartão são criptografadas e protegidas contra acesso não autorizado.</p>
                  <p>O TikTok Shop não vende, aluga ou cede suas informações pessoais a terceiros para fins de marketing.</p>
                </div>

                <div className="pt-2 space-y-3">
                  <p className="text-[12px] font-medium text-gray-800">Aceitamos pagamento de:</p>
                  <div className="flex flex-wrap gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 px-1 border rounded bg-white" alt="Mastercard" />
                    <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-6 px-1 border rounded bg-white" alt="Visa" />
                    <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-6 px-1 border rounded bg-white" alt="Elo" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-6 px-1 border rounded bg-white" alt="Amex" />
                    <div className="h-6 px-2 border rounded bg-white flex items-center justify-center">
                      <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-4" alt="Pix" />
                    </div>
                    <img src="https://images.seeklogo.com/logo-png/32/1/google-pay-logo-png_seeklogo-324563.png" className="h-6 px-1 border rounded bg-white" alt="GPay" />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="text-[12px] font-medium text-gray-800">Certificações de segurança:</p>
                  <div className="flex gap-2">
                    <div className="h-10 border rounded overflow-hidden bg-white">
                      <img src="https://logowik.com/content/uploads/images/mastercard-securecode6659.jpg" className="h-full w-auto object-contain" alt="Mastercard SecureCode" />
                    </div>
                    <div className="h-10 border rounded overflow-hidden bg-white">
                      <img src="https://www.3dsecure.com.br/wp-content/uploads/2023/05/verified-by-visa-3d-secure-3ds-autenticacao-150x150.webp" className="h-full w-auto object-contain" alt="Verified by Visa" />
                    </div>
                  </div>
                </div>

                <p className="text-[12px] text-gray-500 pt-1">
                  Para obter informações sobre como o TikTok Shop usa seus dados pessoais, consulte nossa <span className="underline">Privacy Policy</span>.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <IconBoxDollar />
              </div>
              <div className="space-y-1">
                <h4 className="text-[17px] font-bold text-[#8B5E3C]">Reembolso automático por danos</h4>
                <p className="text-[13px] text-gray-700 leading-tight">
                  Obtenha um reembolso total se seu pedido for perdido ou danificado. Você não precisa enviar uma solicitação de reembolso.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <IconRefreshDollar />
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