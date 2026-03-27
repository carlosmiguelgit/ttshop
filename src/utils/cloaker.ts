"use client";

/**
 * CLOAKER ULTRA 2026 - Versão reforçada contra reviewers TikTok/Meta
 */

const WHITE_PAGE = "https://lojamundoofertas.com.br/";
const ALLOWED_COUNTRIES = ["BR"];

const BANNED_ISPS = [
  "amazon", "google", "microsoft", "oracle", "digitalocean", "hetzner", "ovh",
  "linode", "vultr", "alibaba", "tencent", "bytedance", "cloudflare", "aws",
  "gcp", "azure", "contabo", "scaleway", "leaseweb", "choopa", "psychz",
  "datacenter", "hosting", "server", "proxy"
];

const BANNED_UA = ["tiktok", "bytespider", "bytedance", "adsbot", "googlebot", "bingbot", "facebookexternalhit", "lighthouse", "headless", "selenium", "puppeteer", "playwright"];

let score = 0;
let mouseMoves: Array<{x: number; y: number; t: number; dx?: number; dy?: number}> = [];
let scrollData: number[] = [];
let interactions = 0;
let startTime = Date.now();
let lastActivity = Date.now();

const addScore = (points: number, reason: string) => {
  score += points;
};

const isLikelyBotUA = (ua: string): boolean => {
  return BANNED_UA.some(term => ua.includes(term));
};

const collectAdvancedBehavior = () => {
  if (typeof window === 'undefined') return;

  let lastX = 0, lastY = 0, lastT = Date.now();
  
  const handleMove = (e: MouseEvent) => {
    const now = Date.now();
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dt = now - lastT;

    if (dt > 0 && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
      mouseMoves.push({ x: e.clientX, y: e.clientY, t: now, dx, dy });
      if (mouseMoves.length > 80) mouseMoves.shift();
      if (dt > 120 && dt < 800) interactions++;
    }

    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
    lastActivity = now;
  };

  document.addEventListener("mousemove", handleMove, { passive: true });

  let lastScroll = window.scrollY;
  const handleScroll = () => {
    const current = window.scrollY;
    const velocity = Math.abs(current - lastScroll);
    scrollData.push(velocity);
    if (scrollData.length > 30) scrollData.shift();
    lastScroll = current;
    lastActivity = Date.now();
    interactions++;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  if ("ontouchstart" in window) {
    document.addEventListener("touchmove", () => {
      interactions += 2;
      lastActivity = Date.now();
    }, { passive: true });
  }
};

const calculateBehaviorScore = (): number => {
  let bScore = 0;
  const timeElapsed = Date.now() - startTime;

  if (timeElapsed > 4500 && interactions < 12) bScore += 28;

  if (mouseMoves.length > 25) {
    const dxs = mouseMoves.map(m => m.dx || 0).filter(Boolean);
    const variance = dxs.reduce((sum, v) => sum + v * v, 0) / dxs.length;
    if (variance < 180) bScore += 22; 
  }

  if (scrollData.length > 15) {
    const avgVelocity = scrollData.reduce((a, b) => a + b, 0) / scrollData.length;
    if (avgVelocity > 0 && avgVelocity < 35) bScore += 15;
  }

  if (Date.now() - lastActivity > 6500 && timeElapsed > 8000) bScore += 18;

  return bScore;
};

const getHarderFingerprint = async (): Promise<number> => {
  let fScore = 0;

  try {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      c.width = 280; c.height = 60;
      ctx.fillStyle = "#f70"; ctx.fillRect(0, 0, 280, 60);
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#08f";
      ctx.fillText("Test Fingerprint 2026", 25, 38);
      const data = ctx.getImageData(0, 0, 280, 60).data;
      const sum = data.reduce((a, b) => a + b, 0);
      if (sum < 80000 || sum > 1200000) fScore += 25;
    }
  } catch { fScore += 32; }

  try {
    const glCanvas = document.createElement("canvas");
    const gl = (glCanvas.getContext("webgl2") || glCanvas.getContext("webgl")) as WebGLRenderingContext;
    if (gl) {
      const debug = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "";
      const vendor = debug ? gl.getParameter(debug.UNMASKED_VENDOR_WEBGL) : "";
      if (!renderer || /swiftshader|llvmpipe|virtual|software|angle/i.test(renderer + vendor)) {
        fScore += 30;
      }
    } else fScore += 18;
  } catch { fScore += 22; }

  if (navigator.hardwareConcurrency) {
    const hc = navigator.hardwareConcurrency;
    if (hc < 4 || hc > 24 || !Number.isInteger(hc)) fScore += 10;
  }

  return fScore;
};

export const checkTraffic = async (): Promise<boolean> => {
  // BYPASS PARA DESENVOLVIMENTO (DYAD E LOCALHOST)
  const isDev = window.location.hostname.includes('dyad') || 
                window.location.hostname === 'localhost' || 
                window.location.search.includes('admin=true');
  
  if (isDev) return true;

  const ua = navigator.userAgent.toLowerCase();

  // Layer 1 - Dispositivo e Automação
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone|mobile/i.test(ua);
  if (!isMobile) { addScore(80, "Desktop"); return false; }

  if (navigator.webdriver || (window as any).selenium) { addScore(90, "Webdriver"); return false; }
  if (isLikelyBotUA(ua)) { addScore(85, "UA banido"); return false; }

  // Layer 2 - IP e ISP
  try {
    let ipData: any;
    try {
      const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=free&fields=country_code,isp,org,proxy,hosting,threat`);
      ipData = await res.json();
    } catch {
      const res2 = await fetch("https://ipapi.co/json/");
      ipData = await res2.json();
    }

    const ispLower = (ipData.isp || ipData.org || "").toLowerCase();
    const isBad = BANNED_ISPS.some(term => ispLower.includes(term)) ||
                  ipData.proxy === true || ipData.hosting === true ||
                  (ipData.threat && ipData.threat.is_proxy);

    if (isBad) { addScore(95, "ISP/Proxy/Data Center"); return false; }

    if (!ALLOWED_COUNTRIES.includes(ipData.country_code || ipData.countryCode || "")) {
      addScore(70, `País não permitido`);
      return false;
    }
  } catch (e) {
    addScore(5, "IP Lookup falhou");
  }

  const fpScore = await getHarderFingerprint();
  addScore(fpScore, "Fingerprint");

  // Reduzi o tempo de espera para 0.8s para evitar que usuários mobile achem que travou
  await new Promise(r => setTimeout(r, 800 + Math.random() * 400));

  const behaviorScore = calculateBehaviorScore();
  addScore(behaviorScore, "Behavioral");

  console.log(`[Cloaker] Score final: ${score}`);
  return score < 85; // Aumentei um pouco a tolerância para evitar falsos positivos no seu celular
};

export const initCloaker = async (options: { silent?: boolean } = { silent: true }): Promise<boolean> => {
  startTime = Date.now();
  collectAdvancedBehavior();

  const isHuman = await checkTraffic();

  if (!isHuman) {
    if (options.silent) {
      document.documentElement.style.opacity = "0";
      document.documentElement.style.transition = "opacity 0.8s";
      setTimeout(() => {
        window.location.replace(WHITE_PAGE);
      }, 600);
    } else {
      window.location.replace(WHITE_PAGE);
    }
    return false;
  }
  
  return true;
};