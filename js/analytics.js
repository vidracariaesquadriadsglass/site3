// ============================================
// DS GLASS - ANALYTICS
// ============================================

(function() {
    'use strict';
    
    const AnalyticsConfig = {
        gtmId: '[PENDÊNCIA - INSERIR ID GTM]',
        ga4Id: '[PENDÊNCIA - INSERIR ID GA4]',
        metaPixelId: '[PENDÊNCIA - INSERIR ID META PIXEL]',
        clarityId: '[PENDÊNCIA - INSERIR ID CLARITY]'
    };
    
    function initAnalytics() {
        // Google Tag Manager
        if (AnalyticsConfig.gtmId && !AnalyticsConfig.gtmId.includes('PENDÊNCIA')) {
            loadGTM(AnalyticsConfig.gtmId);
        }
        
        // Google Analytics 4
        if (AnalyticsConfig.ga4Id && !AnalyticsConfig.ga4Id.includes('PENDÊNCIA')) {
            loadGA4(AnalyticsConfig.ga4Id);
        }
        
        // Meta Pixel
        if (AnalyticsConfig.metaPixelId && !AnalyticsConfig.metaPixelId.includes('PENDÊNCIA')) {
            loadMetaPixel(AnalyticsConfig.metaPixelId);
        }
        
        // Microsoft Clarity
        if (AnalyticsConfig.clarityId && !AnalyticsConfig.clarityId.includes('PENDÊNCIA')) {
            loadClarity(AnalyticsConfig.clarityId);
        }
    }
    
    function loadGTM(gtmId) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
    }
    
    function loadGA4(ga4Id) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', ga4Id);
    }
    
    function loadMetaPixel(pixelId) {
        // Implementação do Meta Pixel
        // Será carregado após consentimento
    }
    
    function loadClarity(clarityId) {
        // Implementação do Microsoft Clarity
        // Será carregado após consentimento
    }
    
    function trackEvent(eventName, eventData) {
        // Enviar para GTM se disponível
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...eventData,
                timestamp: new Date().toISOString()
            });
        }
        
        // Enviar para GA4 se disponível
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventData);
        }
    }
    
    function trackWhatsAppClick(attendant) {
        trackEvent('whatsapp_click', {
            attendant: attendant,
            page: getPageName(),
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }
    
    // Expose functions
    window.initAnalytics = initAnalytics;
    window.trackEvent = trackEvent;
    window.trackWhatsAppClick = trackWhatsAppClick;
})();
