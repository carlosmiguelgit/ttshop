"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Package, 
  LogOut, 
  ExternalLink, 
  Eye,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    if (!isAuth) {
      navigate('/adminhavan');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este produto do ar?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      showSuccess("Produto removido!");
      fetchProducts();
    } else showError("Erro ao remover.");
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/adminhavan');
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] flex flex-col">
      <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF2C55] p-2 rounded-xl text-white">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 leading-none">PAINEL HAVAN</h1>
            <span className="text-[10px] text-[#00BFA5] font-bold uppercase tracking-widest">Controle de Ofertas</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={fetchProducts} variant="outline" className="rounded-xl h-10">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </Button>
          <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#FF2C55]">
            <LogOut size={22} />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900">Produtos Ativos</h2>
          <p className="text-gray-500 text-sm">Aqui você visualiza e remove os produtos que subimos via chat.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="aspect-[4/3] bg-gray-50 relative">
                  {p.media?.[0]?.src && <img src={p.media[0].src} className="w-full h-full object-cover" />}
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    /{p.slug}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-[15px] line-clamp-1 mb-4">{p.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-11 rounded-xl border-gray-100"
                      onClick={() => window.open(`/${p.slug}`, '_blank')}
                    >
                      <Eye size={16} className="mr-2" /> Ver Link
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-11 h-11 rounded-xl border-gray-100 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;