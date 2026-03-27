/**
 * Utilitário para rastreamento de eventos do TikTok Pixel
 */

interface TikTokPixelData {
  value?: number;
  currency?: string;
  content_id?: string;
  content_type?: string;
  content_name?: string;
  quantity?: number;
  search_string?: string;
  [key: string]: any;
}

export const trackTikTokEvent = (event: string, data: TikTokPixelData = {}) => {
  if (typeof window !== 'undefined' && (window as any).ttq) {
    const pixelData = {
      ...data,
      event_id: `ev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      url: window.location.href,
    };
    
    (window as any).ttq.track(event, pixelData);
    console.log(`[TikTok Pixel] Evento: ${event}`, pixelData);
  }
};