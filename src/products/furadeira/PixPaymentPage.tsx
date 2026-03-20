"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Copy, Check, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from "qrcode.react";

const FuradeiraPixPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pixCode] = useState("00020126580014br.gov.bcb.pix0136a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z60212TikTokShop0503***520400005303986540589.905802BR5913HAVAN%20LOJAS6009SAO%20PAULO62070503***6304ABCD");

  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  const handleCopy = () => { navigator.clipboard.writeText(pixCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center">
      <div className="w-full max-w-[600px] bg-white border-b h-12 flex items-center px-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
        <div className="flex-grow flex justify-center"><img src="https://i.ibb.co/TD1mSYdD/tiktok-1.png" className="h-6" /></div>
      </div>
      <main className="w-full max-w-[600px] p-4 space-y-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <span className="text-gray-500 text-sm">Total a pagar</span>
          <h2 className="text-3xl font-bold text-[#FF2C55] my-2">R$ 97,94</h2>
          <div className="flex items-center justify-center text-[#00BFA5] text-xs font-bold uppercase mt-4"><ShieldCheck size={16} className="mr-1" /> Pagamento Seguro</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-6">
          {loading ? <Loader2 className="animate-spin mx-auto text-[#FF2C55]" size={32} /> : (
            <>
              <div className="bg-white p-4 border rounded-xl inline-block"><QRCodeSVG value={pixCode} size={180} /></div>
              <Button className="w-full bg-[#FF2C55] h-12 rounded-full font-bold" onClick={handleCopy}>{copied ? "Copiado!" : "Copiar Código Pix"}</Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FuradeiraPixPayment;