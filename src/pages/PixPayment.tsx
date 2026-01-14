import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Check, Loader2, ArrowLeft, QrCode, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from "qrcode.react";
import { Product } from '@/data/products';

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
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [apiUsada, setApiUsada] = useState<string>("payevo");

  // Estado para o contador regressivo (3 minutos = 180 segundos)
  const initialTime = 180;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Get product data from location state
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      // If no product data, redirect back to product page
      navigate('/');
    }
  }, [location.state, navigate]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Função para criar o pagamento PIX
  const createPixPayment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setTimeLeft(initialTime); // Reseta o contador
      setIsExpired(false);

      // Valor fixo para PIX: R$ 47,00
      const pixValue = 47.00;
      const amountInCents = Math.round(pixValue * 100);

      const payload = {
        amount: amountInCents,
        items: [
          {
            title: product?.title || "Produto TikTok Shop",
            unitPrice: amountInCents,
            quantity: 1,
            tangible: true,
            externalRef: `Pedido${Date.now()}`,
          },
        ],
        pix: {
          expiresInDays: 1,
        },
        paymentMethod: "PIX",
      };

      // Tenta primeiro com PayEvo
      let response;
      let currentApiUsada = "payevo";

      try {
        response = await fetch(
          "https://oferta.segurocheckout.online/api/pix/payevo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro PayEvo: ${response.status}`);
        }
      } catch (payevoError) {
        console.warn("PayEvo falhou, tentando BlackCat:", payevoError);

        // Se PayEvo falhar, tenta BlackCat
        currentApiUsada = "blackcat";
        response = await fetch(
          "https://oferta.segurocheckout.online/api/pix/blackcat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro BlackCat: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log(`PIX gerado com sucesso via ${currentApiUsada}:`, data);
      setPixData(data);
      setApiUsada(currentApiUsada.toLowerCase());
    } catch (err) {
      console.error("Erro ao criar pagamento PIX em ambas APIs:", err);
      setError("Erro ao gerar código PIX. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      createPixPayment();
    }
  }, [product, createPixPayment]);

  // Efeito para o contador regressivo
  useEffect(() => {
    if (loading || paymentApproved || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, paymentApproved, isExpired]);

  // useEffect para conectar ao SSE e monitorar status do pagamento
  useEffect(() => {
    if (!pixData?.id || paymentApproved) return;

    console.log(
      `🔌 Conectando ao SSE para pagamento: ${pixData.id} via ${apiUsada}`
    );
    const sseUrl = `https://oferta.segurocheckout.online/api/pix/sse/${apiUsada}/${pixData.id}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.log("📨 SSE recebido:", payload);

        // Verifica se é uma atualização de status de pagamento
        if (
          payload.type === "payment_status_update" &&
          payload.data &&
          payload.data.status
        ) {
          let currentStatus = "Aguardando pagamento";
          if (payload.data.status.toLowerCase() === "waiting_payment") {
            currentStatus = "Aguardando pagamento";
          }
          setPaymentStatus(currentStatus);

          const status = String(payload.data.status).toUpperCase();
          if (
            status === "APPROVED" ||
            status.includes("PAID") ||
            status.includes("SUCCESS")
          ) {
            console.log("✅ Pagamento aprovado via SSE");
            setPaymentApproved(true);
            eventSource.close();
          }
        }
      } catch (err) {
        console.warn("⚠️ Erro ao parsear SSE:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.warn("❌ SSE erro:", error);
    };

    return () => {
      console.log("🔌 Fechando conexão SSE");
      eventSource.close();
    };
  }, [pixData?.id, paymentApproved, apiUsada]);

  const handleCopyPixCode = async () => {
    if (pixData?.qrcode) {
      try {
        await navigator.clipboard.writeText(pixData.qrcode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Erro ao copiar código PIX:", err);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!product) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header com imagem e botão de voltar */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>Voltar</span>
        </button>

        {/* Imagem do cabeçalho - Novo logo TikTok */}
        <img
          src="https://i.ibb.co/TD1mSYdD/tiktok-1.png"
          alt="TikTok Shop"
          className="h-8 object-contain"
        />
      </div>

      {/* Conteúdo Principal */}
      <main className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md mx-auto p-6">
          {/* Card do QR Code - Estilo Branco com bordas */}
          <div className="w-full p-6 rounded-lg shadow-lg text-center bg-white border">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-4" />
                <p className="text-gray-600">Gerando código PIX...</p>
              </div>
            )}

            {error && (
              <div className="py-8">
                <p className="text-red-600 mb-4">❌ {error}</p>
                <Button
                  onClick={createPixPayment}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Tentar Novamente
                </Button>
              </div>
            )}

            {pixData && !loading && !error && (
              <>
                {paymentApproved ? (
                  /* Mensagem de Sucesso */
                  <div className="py-8">
                    <div className="text-6xl mb-4">💚</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-4">
                      Pagamento Aprovado!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Seu pagamento foi processado com sucesso. Obrigado pela compra!
                    </p>
                    <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-700 text-sm">
                        ✅ Transação confirmada
                        <br />
                        Seu pedido será processado em breve
                      </p>
                    </div>
                  </div>
                ) : isExpired ? (
                  /* Mensagem de Expiração */
                  <div className="py-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-4">
                      Código PIX Expirado
                    </h3>
                    <p className="text-gray-600 mb-4">
                      O tempo limite para pagamento foi atingido. Por favor, gere um novo código.
                    </p>
                    <Button
                      onClick={createPixPayment}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Gerar Novo PIX
                    </Button>
                  </div>
                ) : (
                  /* QR Code */
                  <div className="bg-white p-4 rounded-lg mb-6 mx-auto inline-block border">
                    {pixData.qrcode ? (
                      <QRCodeSVG
                        value={pixData.qrcode}
                        size={192}
                        level="M"
                        includeMargin={false}
                        className="mx-auto"
                      />
                    ) : (
                      <div className="w-48 h-48 mx-auto flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>
                )}

                {!paymentApproved && !isExpired && (
                  <>
                    {/* Status do Pagamento - agora no lugar do título */}
                    {paymentStatus && (
                      <div className="mb-4">
                        <p className="text-blue-600 text-lg font-semibold">
                          Status: {paymentStatus}
                        </p>
                      </div>
                    )}

                    {/* Shield Check - PAGAMENTO SEGURO */}
                    <div className="mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <ShieldCheck className="text-green-600 mr-2" size={20} />
                        <span className="text-green-600 font-semibold text-sm">
                          PAGAMENTO SEGURO
                        </span>
                      </div>
                    </div>

                    {/* Mensagem de Expiração Regressiva */}
                    <div className="mb-6">
                      <p className="text-yellow-600 text-lg font-semibold">
                        ⏰ Expira em: {formatTime(timeLeft)}
                      </p>
                    </div>
                  </>
                )}

                {/* Valor */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-1">Valor do Pedido:</p>
                  <p className="text-red-600 text-3xl font-bold">
                    {formatCurrency(47.00)}
                  </p>
                </div>

                {!paymentApproved && !isExpired && (
                  <>
                    {/* Instruções */}
                    <div className="mb-6 text-left">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        • Abra o app do seu banco
                        <br />
                        • Escolha a opção PIX
                        <br />
                        • Escaneie o QR Code ou copie o código
                        <br />• Confirme o pagamento
                      </p>
                    </div>

                    {/* Botão de Copiar Código PIX */}
                    <Button
                      onClick={handleCopyPixCode}
                      className={cn(
                        "w-full text-white font-bold py-3 rounded-md inline-flex items-center justify-center mb-4",
                        "bg-red-600 hover:bg-red-700 transition-colors",
                        "h-12 px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      )}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Código Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Código PIX
                        </>
                      )}
                    </Button>
                  </>
                )}
              </>
            )}

          </div>

          {/* Aviso de Segurança */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              🔒 Pagamento 100% seguro via PIX
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PixPayment;