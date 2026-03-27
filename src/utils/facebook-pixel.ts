/**
 * Utilitário para rastreamento de eventos do Facebook (Meta) Pixel
 */

interface FacebookPixelData {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  num_items?: number;
  search_string?: string;
  [key: string]: any;
}

export const trackFacebookEvent = (event: string, data: FacebookPixelData = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', event, data);
    console.log(`[Facebook Pixel] Evento: ${event}`, data);
  }
};