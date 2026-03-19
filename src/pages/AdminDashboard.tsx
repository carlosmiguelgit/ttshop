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
  LayoutGrid
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
    checkUser();
    fetchProducts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/adminhavan');
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
      showSuccess("Produto salvo com sucesso!");
      setIsEditing(false);
      fetchProducts();
    } else {
      showError("Erro ao salvar: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="bg-[#FF2C55] p-1.5 rounded-lg text-white">
            <Package size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Painel Havan</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => openEdit()} className="bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Novo Produto
          </Button>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center py-20">Carregando produtos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {p.media?.[0]?.src && <img src={p.media[0].src} className="w-full h-full object-cover" />}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">
                    /{p.slug}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{p.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#FF2C55] font-bold">R$ {p.current_price}</span>
                    <span className="text-gray-400 text-xs">{p.sales_count} vendidos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="h-9" onClick={() => window.open(`/${p.slug}`, '_blank')}>
                      <ExternalLink size={14} />
                    </Button>
                    <Button variant="outline" className="h-9 text-blue-600" onClick={() => openEdit(p)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="outline" className="h-9 text-red-600" onClick={() => handleDelete(p.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Edição (Simplificado) */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">Configurar Produto</h2>
              <button onClick={() => setIsEditing(false)}><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Slug (Link único)</label>
                  <input 
                    className="w-full border rounded-lg h-10 px-3" 
                    value={currentProduct.slug}
                    onChange={(e) => setCurrentProduct({...currentProduct, slug: e.target.value})}
                    placeholder="ex: robo-aspirador"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Preço Atual</label>
                  <input 
                    className="w-full border rounded-lg h-10 px-3" 
                    value={currentProduct.current_price}
                    onChange={(e) => setCurrentProduct({...currentProduct, current_price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Título Completo</label>
                <textarea 
                  className="w-full border rounded-lg p-3 h-20 resize-none" 
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-700">
                Dica: Use o editor para definir fotos, depoimentos e descrições detalhadas. Por enquanto, os dados de reviews e media são salvos como JSON.
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
              <Button className="bg-[#FF2C55] px-8" onClick={handleSave}>
                <Save size={18} className="mr-2" /> Salvar Produto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;