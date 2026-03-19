"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ArrowLeft, Store, MoreHorizontal, ChevronRight, X, Smile, Plus, Bot } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose, product }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          text: 'Agradecemos por entrar em contato com a Havan. Como posso ajudar hoje?',
          time: '20:55'
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text?: string, isProductShare: boolean = false) => {
    const msgText = text || inputValue;
    if (!msgText.trim()) return;

    const newMsg = { 
      type: 'user', 
      text: msgText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");

    setTimeout(() => {
      const responseText = isProductShare 
        ? 'Obrigado por compartilhar este produto da Havan. Em que posso ajudar?'
        : 'Obrigado pela mensagem! Um de nossos atendentes Havan retornará em breve.';

      setMessages(prev => [...prev, {
        type: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="fixed inset-y-0 right-0 h-full w-full max-w-[600px] mt-0 rounded-none border-l bg-[#F8F8F8]">
        <div className="flex flex-col h-full relative">
          
          {/* Header */}
          <div className="bg-white border-b h-12 flex items-center px-4 shrink-0">
            <button onClick={onClose} className="mr-3">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <div className="w-8 h-8 flex items-center justify-center mr-2">
              <img 
                src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" 
                alt="Havan Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-[14px] font-bold text-gray-900 leading-none uppercase">HAVAN</h2>
              <span className="text-[10px] text-gray-500">Normalmente responde em até 24 horas</span>
            </div>
            <div className="flex items-center space-x-4">
              <Store size={20} className="text-gray-900" />
              <MoreHorizontal size={20} className="text-gray-900" />
            </div>
          </div>

          {/* Chat Content */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
            <div className="text-center text-[11px] text-gray-400 my-2">20:55</div>
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2`}>
                {msg.type === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-white border flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-gray-400" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-xl text-[14px] ${
                  msg.type === 'user' ? 'bg-[#FF2C55] text-white rounded-tr-none' : 'bg-white text-gray-900 rounded-tl-none border shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Options Card */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden mt-2">
              <div className="p-4 border-b">
                <h3 className="text-[15px] font-bold text-gray-900">Como a Havan pode ajudar você hoje?</h3>
              </div>
              <div className="divide-y">
                {[
                  "Você tem esse produto em estoque?",
                  "Estou tentando comprar",
                  "Já paguei",
                  "Como faço para usar?",
                  "O que está incluído no produto?"
                ].map((option, idx) => (
                  <button 
                    key={idx} 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleSendMessage(option)}
                  >
                    <span className="text-[14px] text-gray-900">{option}</span>
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>
              <div className="p-2 bg-gray-50 text-center">
                <span className="text-[10px] text-gray-400">Enviado por chatbot Havan</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="shrink-0 space-y-2 p-3 bg-white border-t">
            {/* Product Preview Bar */}
            <div className="bg-white border rounded-xl p-2 flex items-center relative shadow-sm">
              <button className="absolute top-1 right-1 text-gray-300">
                <X size={14} />
              </button>
              <img src={product.media[0].src} className="w-12 h-12 rounded object-cover mr-3 border" />
              <div className="flex-grow pr-16">
                <p className="text-[12px] font-medium text-gray-800 line-clamp-1">{product.title}</p>
                <p className="text-[11px] text-gray-400">{product.salesCount} vendidos</p>
              </div>
              <Button 
                className="bg-[#FF2C55] hover:bg-[#E0254B] text-white text-[12px] font-bold h-7 px-4 rounded-md"
                onClick={() => handleSendMessage(`Tenho interesse no produto: ${product.title}`, true)}
              >
                Enviar
              </Button>
            </div>

            {/* Input Row */}
            <div className="flex items-center space-x-2">
              <div className="flex-grow bg-[#F1F1F1] rounded-full h-10 px-4 flex items-center">
                <input 
                  type="text" 
                  placeholder="Enviar mensagem..." 
                  className="bg-transparent border-none outline-none w-full text-[14px]"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Smile size={24} className="text-gray-900" />
              <Plus size={24} className="text-gray-900" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;