import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// O ID de medição deve ser fornecido via variável de ambiente
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

export function useAnalytics() {
  const location = useLocation();

  // Rastreamento de Page View
  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search, 
        title: document.title 
      });
      console.log(`[GA4] Page View tracked: ${location.pathname}`);
    }
  }, [location]);

  // Função para rastrear eventos
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
      console.log(`[GA4] Event tracked: ${category} - ${action}`);
    } else {
      console.warn("GA_MEASUREMENT_ID not set. Analytics events are not being tracked.");
    }
  };

  return { trackEvent };
}