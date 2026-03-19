"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Package, 
  LogOut, 
  ExternalLink, 
  Save, 
  X,
  LayoutGrid,
  Settings,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    // Verificação de segurança local
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
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
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

  const openEdit = (product: any = null) => {
    setCurrentProduct(product || {
      slug: "",
      title: "",
      current_price: "47,00",
      original_price: "249,00",
      description_text: "",
      media: [],
      reviews: [],
      specifications: []
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentProduct.slug || !currentProduct.title) {
      showError("Preencha o slug e o título!");
      return;
    }

    const { error } = await supabase
      .from('products')
      .upsert(currentProduct);

    if (!error) {
      showSuccess("Produto salvo!");
      setIsEditing(false);
      fetchProducts();
    } else {
      showError("Erro ao salvar.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] flex flex-col">
      {/* Header Admin */}
      <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FF2C55] p-2 rounded-xl text-white">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 leading-none">PAINEL HAVAN</h1>
            <span className="text-[10px] text-[#00BFA5] font-bold uppercase tracking-widest">Administrador Master</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={() => openEdit()} className="bg-black hover:bg-gray-800 text-white rounded-xl h-10 px-5 font-bold text-sm">
            <Plus size={18} className="mr-2" /> Novo Produto
          </Button>
          <button 
            onClick={handleLogout} 
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#FF2C55] hover:bg-[#FF2C55]/5 rounded-xl transition-all"
            title="Sair do Sistema"
          >
            <LogOut size={22} />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900">Gerenciar Ofertas</h2>
          <p className="text-gray-500 text-sm">Aqui você controla todos os produtos ativos na sua loja.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-[#FF2C55] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium">Sincronizando com banco de dados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                <Package className="mx-auto text-gray-200 mb-4" size={48} />
                <h3 className="text-lg font-bold text-gray-400">Nenhum produto cadastrado</h3>
                <Button onClick={() => openEdit()} className="mt-4 bg-[#FF2C55] rounded-xl">Começar agora</Button>
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                    {p.media?.[0]?.src ? (
                      <img src={p.media[0].src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200"><LayoutGrid size={48} /></div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase">
                      /{p.slug}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-[15px] line-clamp-1 mb-3">{p.title}</h3>
                    <div className="flex justify-between items-center mb-5 bg-gray-50 p-3 rounded-2xl">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Preço</span>
                        <span className="text-[#FF2C55] font-black text-lg">R$ {p.current_price}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Vendas</span>
                        <span className="text-gray-900 font-black text-lg">{p.sales_count}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-11 rounded-xl border-gray-100 hover:bg-black hover:text-white transition-all"
                        onClick={() => window.open(`/${p.slug}`, '_blank')}
                      >
                        <Eye size={16} className="mr-2" /> Ver
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-11 h-11 rounded-xl border-gray-100 text-blue-500 hover:bg-blue-50"
                        onClick={() => openEdit(p)}
                      >
                        <Settings size={18} />
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
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal de Edição */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="font-black text-xl text-gray-900">Configurar Produto</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Edição em tempo real</p>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Slug (Link do Produto)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">/</span>
                    <input 
                      className="w-full bg-gray-50 border-none rounded-2xl h-12 pl-7 pr-4 outline-none focus:ring-2 focus:ring-[#FF2C55]/20 font-medium" 
                      value={currentProduct.slug}
                      onChange={(e) => setCurrentProduct({...currentProduct, slug: e.target.value})}
                      placeholder="ex: robo-aspirador"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Preço Atual (R$)</label>
                  <input 
                    className="w-full bg-gray-50 border-none rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-[#FF2C55]/20 font-bold" 
                    value={currentProduct.current_price}
                    onChange={(e) => setCurrentProduct({...currentProduct, current_price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Título do Produto</label>
                <textarea 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 h-24 resize-none outline-none focus:ring-2 focus:ring-[#FF2C55]/20 font-medium leading-tight" 
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                  placeholder="Nome que aparece no topo da página..."
                />
              </div>

              <div className="p-4 bg-[#FF2C55]/5 border border-[#FF2C55]/10 rounded-2xl flex items-start space-x-3">
                <div className="bg-[#FF2C55] p-1.5 rounded-lg text-white shrink-0 mt-0.5">
                  <Settings size={14} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900">Dica de Gerenciamento</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                    Os dados de Fotos (Media) e Depoimentos (Reviews) são salvos em formato de dados avançados. 
                    Se precisar mudar as imagens, você pode fazer isso direto no banco de dados Supabase para maior flexibilidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
              <Button 
                variant="ghost" 
                className="h-12 px-6 rounded-2xl font-bold text-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-[#FF2C55] hover:bg-[#E0254B] px-10 h-12 rounded-2xl font-black text-white shadow-lg shadow-[#FF2C55]/20" 
                onClick={handleSave}
              >
                <Save size={18} className="mr-2" /> Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;