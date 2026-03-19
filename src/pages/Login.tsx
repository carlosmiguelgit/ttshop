"use client";

import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/admin-dashboard');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/admin-dashboard');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#FF2C55]/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-[#FF2C55]" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm text-center mt-2">
            Área administrativa Havan - TikTok Shop
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#FF2C55',
                  brandAccent: '#E0254B',
                }
              }
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Login/E-mail',
                password_label: 'Senha',
                button_label: 'Entrar no Painel',
              }
            }
          }}
          theme="light"
        />

        <div className="mt-8 flex items-center justify-center text-[10px] text-gray-400 space-x-2">
          <ShieldCheck size={12} />
          <span>SISTEMA MONITORADO E PROTEGIDO</span>
        </div>
      </div>
    </div>
  );
};

export default Login;