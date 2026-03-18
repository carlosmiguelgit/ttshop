"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const AddCard: React.FC = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  };

  const handleContinue = () => {
    if (!cardNumber || !expiry || !cvv || !name) return;

    setIsProcessing(true);
    
    // Simulação do popup de validação em 3 etapas
    const steps = ["Validando cartão...", "Adicionando à sua conta...", "Cartão confirmado!"];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      setStep(currentStep);
      currentStep++;
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        
        // Salva os dados (Simulação de persistência para o usuário)
        const cardData = {
          cardNumber,
          expiry,
          cvv,
          name,
          last4: cardNumber.replace(/\s/g, '').slice(-4),
          brand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
          timestamp: new Date().toISOString()
        };
        
        console.log("Cartão salvo no sistema:", cardData);
        // Em um ambiente real aqui faríamos uma chamada de API para salvar no .json
        
        setTimeout(() => {
          navigate('/checkout', { state: { cardAdded: true, cardData } });
        }, 1000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[280px]">
            <div className="relative w-12 h-12">
               <div className="absolute inset-0 border-4 border-[#FF2C55] rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 border-4 border-[#25F4EE] rounded-full border-b-transparent animate-spin-reverse opacity-50"></div>
            </div>
            <p className="text-[15px] font-bold text-gray-900 text-center">
              {step === 0 && "Validando cartão"}
              {step === 1 && "Adicionando a sua conta"}
              {step === 2 && "Cartão confirmado"}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="h-12 flex items-center px-4 border-b">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[16px] font-bold mr-6">Adicionar cartão</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Bar */}
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center space-x-2 text-[#FF2C55]">
            <Smartphone size={16} />
            <span className="font-medium">Sem juros em 3 parcelas</span>
          </div>
          <button className="text-purple-700 font-medium">Visualizar tudo (2) ></button>
        </div>

        {/* Scan Card Box */}
        <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center space-x-3">
          <Smartphone size={24} className="text-gray-900" />
          <p className="text-[13px] text-gray-500 leading-tight">
            Segure seu cartão contra o telefone para preencher os detalhes do cartão
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-4" />
                <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-4" />
              </div>
            </div>
            <div className={`border-2 rounded-xl h-14 flex items-center px-4 transition-colors ${cardNumber ? 'border-[#FF2C55]' : 'border-gray-100'}`}>
              <input 
                type="text" 
                placeholder="Insira o número do cartão" 
                className="w-full bg-transparent outline-none text-[16px]"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </div>
            {!cardNumber && <p className="text-[#FF2C55] text-[11px] font-medium flex items-center"><Info size={12} className="mr-1" /> Número do cartão é obrigatório</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">Data de validade</label>
              <input 
                type="text" 
                placeholder="MM/AA" 
                className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1">
                <label className="text-[14px] font-bold text-gray-900">Código de segurança</label>
                <Info size={14} className="text-gray-300" />
              </div>
              <input 
                type="text" 
                placeholder="CVV/CVC" 
                className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">Nome do titular do cartão</label>
            <input 
              type="text" 
              placeholder="Nome completo" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between py-2">
          <span className="text-[14px] text-gray-900 font-medium">Salvar este cartão para compras futuras</span>
          <div className="w-5 h-5 bg-[#FF2C55] rounded-full flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Security Box */}
        <div className="bg-[#F0FBF9] border border-[#E0F7F4] rounded-xl p-4 flex items-start space-x-3">
          <p className="text-[11px] text-[#00BFA5] leading-tight">
            Mantemos as informações do seu cartão seguras e criptografadas. O código de segurança do seu cartão (CVV/CVC) não será armazenado. Você pode remover seu cartão a qualquer momento.
          </p>
          <ShieldCheck size={24} className="text-[#00BFA5] flex-shrink-0" />
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button 
          className={`w-full h-12 rounded-full font-bold text-[16px] ${cardNumber && expiry && cvv && name ? 'bg-[#FF2C55] text-white' : 'bg-[#FFD1DA] text-white opacity-100'}`}
          onClick={handleContinue}
          disabled={!cardNumber || !expiry || !cvv || !name}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddCard;