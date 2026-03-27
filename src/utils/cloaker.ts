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
  const ua = navigator.userAgent.toLowerCase();

  // 1. Verificação de Dispositivo (SÓ PERMITE MOBILE)
  const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua);
  if (!isMobile) {
    console.log("[Cloaker] Desktop bloqueado - Acesso via computador não permitido");
    return false;
  }

  // 2. Verificação de Navegador Automatizado (Webdriver)
  if (navigator.webdriver) {
    console.log("[Cloaker] Automação detectada (Webdriver)");
    return false;
  }

  // 3. Verificação de User-Agent (Bots Específicos)
  if (BANNED_UA.some(bot => ua.includes(bot))) {
    console.log("[Cloaker] Bot detectado via User-Agent");
    return false;
  }

  // 4. Verificação de Resolução de Tela Suspeita
  if (window.screen.width === 800 && window.screen.height === 600) return false;
  if (window.screen.colorDepth === 0) return false;

  // 5. Verificação de IP e ISP (Filtro de Data Center)
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

    // Bloqueio de acessos internacionais (TikTok reviews geralmente não são BR)
    const allowedCountries = ["BR"];
    if (!allowedCountries.includes(country)) {
      console.log("[Cloaker] Acesso internacional bloqueado:", country);
      return false;
    }

    return true;
  } catch (err) {
    return true; 
  }
};

export const redirectToWhitePage = () => {
  window.location.href = WHITE_PAGE;
};