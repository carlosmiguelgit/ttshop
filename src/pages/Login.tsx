"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se já está logado
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    if (isAuth) navigate('/admin-dashboard');
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação exata solicitada pelo usuário
    if (login === 'Veidahavantt' && password === 'Tda669669!') {
      localStorage.setItem('admin_auth', 'true');
      showSuccess("Acesso autorizado!");
      setTimeout(() => navigate('/admin-dashboard'), 500);
    } else {
      showError("Login ou senha incorretos.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden relative">
        {/* Detalhe estético de segurança */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF2C55]"></div>
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-[#FF2C55]/5 rounded-full flex items-center justify-center mb-4 border border-[#FF2C55]/10">
            <Lock className="text-[#FF2C55]" size={36} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">SISTEMA HAVAN</h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Acesso Administrativo Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Usuário</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Digite seu login" 
                className="w-full bg-gray-50 border-none rounded-2xl h-14 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#FF2C55]/20 text-[15px] font-medium transition-all"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Senha</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 border-none rounded-2xl h-14 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#FF2C55]/20 text-[15px] font-medium transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-2xl h-14 text-lg shadow-lg shadow-[#FF2C55]/20 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Validando..." : "Entrar no Painel"}
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t flex flex-col items-center space-y-3">
          <div className="flex items-center text-[11px] text-gray-400 font-bold space-x-2">
            <ShieldCheck size={14} className="text-[#00BFA5]" />
            <span className="uppercase tracking-widest">Conexão Criptografada SSL</span>
          </div>
          <p className="text-[10px] text-gray-300 text-center leading-tight">
            Este sistema é de uso exclusivo da administração Havan.<br/>Tentativas de acesso não autorizado serão registradas.
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-[12px] font-medium uppercase tracking-tighter opacity-50">
        TikTok Shop Partner Program 2024
      </p>
    </div>
  );
};

export default Login;