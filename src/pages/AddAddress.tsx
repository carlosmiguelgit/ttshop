"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const AddAddress: React.FC = () => {
  const navigate = useNavigate();
  const [isDefault, setIsDefault] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header */}
      <div className="bg-white h-12 flex items-center px-4 border-b sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[16px] font-bold mr-8">Adicionar endereço</h1>
      </div>

      <div className="flex-grow p-4 space-y-4">
        {/* Form Fields */}
        <div className="bg-white rounded-xl overflow-hidden divide-y divide-gray-50 border">
          <div className="px-4 py-3.5">
            <input type="text" placeholder="Nome e sobrenome" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
          <div className="px-4 py-3.5">
            <input type="text" placeholder="CEP" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-50">
            <div className="px-4 py-3.5">
              <input type="text" placeholder="Estado/UF" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
            </div>
            <div className="px-4 py-3.5">
              <input type="text" placeholder="Cidade" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
            </div>
          </div>
          <div className="px-4 py-3.5">
            <input type="text" placeholder="Bairro" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
          <div className="px-4 py-3.5">
            <input type="text" placeholder="Endereço" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
          <div className="px-4 py-3.5">
            <input type="text" placeholder="N da residência" className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
          <div className="px-4 py-3.5">
            <input type="text" placeholder="Apartamento, bloco, unidade etc." className="w-full outline-none text-[15px] placeholder:text-gray-300" />
          </div>
        </div>

        {/* Configurações */}
        <div className="space-y-2 pt-2">
          <h3 className="text-[13px] text-gray-400 font-medium px-1">Configurações</h3>
          <div className="bg-white rounded-xl p-4 border flex items-center justify-between">
            <span className="text-[15px] font-bold text-gray-900">Definir como padrão</span>
            <Switch 
              checked={isDefault} 
              onCheckedChange={setIsDefault}
              className="data-[state=checked]:bg-[#007AFF]" 
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-[#F8F8F8] space-y-4">
        <p className="text-[11px] text-gray-400 text-center leading-tight">
          Leia a política de privacidade do tiktok para saber mais sobre como usamos suas informações pessoais.
        </p>
        <Button 
          className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px] text-[16px]"
          onClick={() => navigate(-1)}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default AddAddress;