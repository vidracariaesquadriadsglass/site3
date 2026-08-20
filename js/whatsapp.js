// ============================================
// DS GLASS - WHATSAPP CONTEXTUAL
// ============================================

(function() {
    'use strict';
    
    const WhatsAppConfig = {
        daniel: {
            name: 'Daniel',
            phone: '553196428321',
            displayPhone: '31 9642-8321',
            messages: [
                'Quero um orçamento.',
                'Preciso de atendimento.',
                'Gostaria de solicitar um orçamento.',
                'Aguardo você me responder.',
                'Gostaria de falar sobre este serviço.'
            ]
        },
        rubens: {
            name: 'Rubens',
            phone: '553181008168',
            displayPhone: '31 8100-8168',
            messages: [
                'Preciso de atendimento.',
                'Quero um orçamento.',
                'Aguardo você.',
                'Gostaria de saber mais.',
                'Quero falar sobre esse serviço.'
            ]
        }
    };
    
    function getPageName() {
        const bodyElement = document.body;
        const pageName = bodyElement.getAttribute('data-page-name');
        return pageName || document.title;
    }
    
    function getRandomMessage(attendant) {
        const config = WhatsAppConfig[attendant];
        if (!config) return 'Quero um orçamento.';
        
        const messages = config.messages;
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    function buildWhatsAppMessage(attendant) {
        const config = WhatsAppConfig[attendant];
        if (!config) return '';
        
        const pageName = getPageName();
        const message = getRandomMessage(attendant);
        
        return `Olá ${config.name}, estou vindo da página "${pageName}". ${message}`;
    }
    
    function createWhatsAppLink(attendant) {
        const config = WhatsAppConfig[attendant];
        if (!config) return '#';
        
        const message = buildWhatsAppMessage(attendant);
        const encodedMessage = encodeURIComponent(message);
        
        return `https://wa.me/${config.phone}?text=${encodedMessage}`;
    }
    
    function initWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
        
        whatsappLinks.forEach(link => {
            const attendant = link.getAttribute('data-whatsapp');
            
            if (attendant && WhatsAppConfig[attendant]) {
                link.setAttribute('href', createWhatsAppLink(attendant));
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add click tracking
                link.addEventListener('click', function(e) {
                    if (typeof trackWhatsAppClick === 'function') {
                        trackWhatsAppClick(attendant);
                    }
                });
            }
        });
    }
    
    // Expose functions globally
    window.createWhatsAppLink = createWhatsAppLink;
    window.buildWhatsAppMessage = buildWhatsAppMessage;
    window.getPageName = getPageName;
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhatsAppLinks);
    } else {
        initWhatsAppLinks();
    }
})();
