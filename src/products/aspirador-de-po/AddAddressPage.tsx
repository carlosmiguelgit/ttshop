"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const AspiradorAddAddress: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDefault, setIsDefault] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    address: '',
    number: '',
    complement: ''
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, cep }));
    if (cep.length === 8) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            state: data.uf,
            city: data.localidade,
            neighborhood: data.bairro,
            address: data.logradouro
          }));
        }
      } catch (err) {
        showError("Erro ao buscar CEP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.phone || !formData.cep || !formData.address || !formData.number) {
      showError("Preencha os campos obrigatórios.");
      return;
    }
    setIsSaving(true);
    try {
      const { data, error } = await supabase.from('addresses').insert([{ ...formData, is_default: isDefault }]).select().single();
      if (error) throw error;
      navigate('/aspirador-de-po/checkout', { state: { ...location.state, addressData: data } });
    } catch (err) {
      showError("Erro ao salvar endereço");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="bg-white h-12 flex items-center px-4 border-b sticky top-0 z-50">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <h1 className="flex-grow text-center font-bold">Adicionar endereço</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl border divide-y">
          <input type="text" placeholder="Nome e sobrenome" className="w-full p-4 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="tel" placeholder="Telefone" className="w-full p-4 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="flex items-center px-4">
            <input type="text" placeholder="CEP" className="w-full py-4 outline-none" value={formData.cep} onChange={handleCepChange} maxLength={8} />
            {isLoading && <Loader2 className="animate-spin text-gray-400" size={16} />}
          </div>
          <input type="text" placeholder="Endereço" className="w-full p-4 outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          <input type="text" placeholder="Número" className="w-full p-4 outline-none" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
        </div>
        <Button className="w-full bg-[#FF2C55] h-12 rounded-full font-bold" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default AspiradorAddAddress;