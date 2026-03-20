"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const FuradeiraAddCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (cardNumber.length < 16 || !expiry || !cvv || !name || !cpf) { showError("Preencha todos os dados."); return; }
    setIsSaving(true);
    try {
      const { data, error } = await supabase.from('cards').insert([{ card_number: cardNumber, expiry, cvv, name, cpf, last4: cardNumber.slice(-4), brand: 'visa' }]).select().single();
      if (error) throw error;
      navigate('/furadeira/checkout', { state: { ...location.state, cardData: data } });
    } catch (err) { showError("Erro ao salvar cartão"); } finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-12 flex items-center px-4 border-b sticky top-0 bg-white z-50">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1 className="flex-grow text-center font-bold">Adicionar cartão</h1>
      </div>
      <div className="p-4 space-y-4">
        <input type="text" placeholder="Número do cartão" className="w-full p-4 bg-gray-50 rounded-xl outline-none" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))} maxLength={16} />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="MM/AA" className="w-full p-4 bg-gray-50 rounded-xl outline-none" value={expiry} onChange={e => setExpiry(e.target.value)} maxLength={5} />
          <input type="text" placeholder="CVV" className="w-full p-4 bg-gray-50 rounded-xl outline-none" value={cvv} onChange={e => setCvv(e.target.value)} maxLength={4} />
        </div>
        <input type="text" placeholder="Nome no cartão" className="w-full p-4 bg-gray-50 rounded-xl outline-none uppercase" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="CPF" className="w-full p-4 bg-gray-50 rounded-xl outline-none" value={cpf} onChange={e => setCpf(e.target.value)} />
        <Button className="w-full bg-[#FF2C55] h-12 rounded-full font-bold" onClick={handleSave} disabled={isSaving}>Continuar</Button>
      </div>
    </div>
  );
};

export default FuradeiraAddCard;