// ============================================
// DS GLASS - COOKIES CONSENT
// ============================================

(function() {
    'use strict';
    
    const COOKIE_CONSENT_KEY = 'dsglass_cookie_consent';
    
    function getConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            return consent ? JSON.parse(consent) : null;
        } catch (error) {
            return null;
        }
    }
    
    function setConsent(consent) {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
        } catch (error) {
            console.warn('Não foi possível salvar o consentimento:', error);
        }
    }
    
    function showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner && !getConsent()) {
            banner.classList.add('show');
        }
    }
    
    function hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }
    
    function acceptCookies() {
        setConsent({
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
            timestamp: new Date().toISOString()
        });
        hideCookieBanner();
        loadAnalytics();
    }
    
    function rejectCookies() {
        setConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
            timestamp: new Date().toISOString()
        });
        hideCookieBanner();
    }
    
    function loadAnalytics() {
        const consent = getConsent();
        if (consent && consent.analytics) {
            // Carregar analytics
            if (typeof initAnalytics === 'function') {
                initAnalytics();
            }
        }
    }
    
    // Expose functions globally
    window.acceptCookies = acceptCookies;
    window.rejectCookies = rejectCookies;
    window.getConsent = getConsent;
    
    // Show banner on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showCookieBanner);
    } else {
        showCookieBanner();
    }
})();
