"use client";

/**
 * SISTEMA SUPREMO DE FILTRAGEM DE TRÁFEGO (CLOAKER)
 * Desenvolvido para proteção contra bots de moderação e espionagem.
 */

const WHITE_PAGE = "https://lojamundoofertas.com.br/";

// Lista de termos proibidos em ISPs/Orgs (Data Centers)
const BANNED_ISPS = [
  "amazon", "google", "microsoft", "oracle", "digitalocean", 
  "facebook", "bytedance", "tiktok", "clouda", "datacenter", 
  "cloud", "server", "hosting", "hetzner", "ovh", "linode",
  "vultr", "alibaba", "tencent"
];

// Lista de User-Agents de Bots comuns
const BANNED_UA = [
  "tiktokbot", "adsbot", "bytedance", "bytespider", "headless", 
  "lighthouse", "googlebot", "bingbot", "crawl", "spider", 
  "slurp", "facebookexternalhit", "monit", "crunch"
];

export const checkTraffic = async (): Promise<boolean> => {
  // 1. Verificação de Navegador Automatizado (Webdriver)
  if (navigator.webdriver) {
    console.log("[Cloaker] Automação detectada (Webdriver)");
    return false;
  }

  // 2. Verificação de User-Agent
  const ua = navigator.userAgent.toLowerCase();
  if (BANNED_UA.some(bot => ua.includes(bot))) {
    console.log("[Cloaker] Bot detectado via User-Agent");
    return false;
  }

  // 3. Verificação de Resolução de Tela Suspeita
  // Bots frequentemente usam 800x600 ou resoluções fixas sem profundidade de cor
  if (window.screen.width === 800 && window.screen.height === 600) return false;
  if (window.screen.colorDepth === 0) return false;

  // 4. Verificação de IP e ISP (A mais poderosa)
  try {
    const response = await fetch('https://ipwho.is/');
    const data = await response.json();

    if (!data.success) return true; // Se a API falhar, permite (fallback seguro)

    const isp = data.connection?.isp?.toLowerCase() || "";
    const org = data.connection?.org?.toLowerCase() || "";
    const country = data.country_code || "";

    // Bloqueia se o ISP for um Data Center conhecido
    if (BANNED_ISPS.some(term => isp.includes(term) || org.includes(term))) {
      console.log("[Cloaker] Acesso via Data Center bloqueado:", isp);
      return false;
    }

    // Opcional: Bloqueio de países (TikTok review as vezes vem de fora do BR)
    // Se seu público é 100% BR e o acesso vier de US/SG/CN, pode ser bot.
    const allowedCountries = ["BR"];
    if (!allowedCountries.includes(country)) {
      console.log("[Cloaker] Acesso internacional bloqueado:", country);
      return false;
    }

    return true;
  } catch (err) {
    // Em caso de erro na API de IP, confiamos nos outros métodos
    return true; 
  }
};

export const redirectToWhitePage = () => {
  window.location.href = WHITE_PAGE;
};