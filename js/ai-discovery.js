// ============================================
// DS GLASS - AI DISCOVERY
// ============================================

(function() {
    'use strict';
    
    const AIConfig = {
        domain: 'https://vidracariaesquadriadsglass.com.br',
        companyName: 'DS GLASS VIDRAÇARIA E ESQUADRIA',
        location: 'Belo Horizonte, MG',
        
        providers: [
            {
                id: 'chatgpt',
                name: 'ChatGPT',
                icon: '/images/ai/chatgpt.svg',
                urlBuilder: (prompt) => `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
                title: 'Perguntar ao ChatGPT'
            },
            {
                id: 'claude',
                name: 'Claude',
                icon: '/images/ai/claude.svg',
                urlBuilder: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
                title: 'Perguntar ao Claude'
            },
            {
                id: 'perplexity',
                name: 'Perplexity',
                icon: '/images/ai/perplexity.svg',
                urlBuilder: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
                title: 'Perguntar ao Perplexity'
            },
            {
                id: 'gemini',
                name: 'Gemini',
                icon: '/images/ai/gemini.svg',
                urlBuilder: (prompt) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
                title: 'Perguntar ao Gemini'
            },
            {
                id: 'copilot',
                name: 'Copilot',
                icon: '/images/ai/copilot.svg',
                urlBuilder: (prompt) => `https://copilot.microsoft.com/?q=${encodeURIComponent(prompt)}`,
                title: 'Perguntar ao Copilot'
            }
        ]
    };
    
    function getPageName() {
        const bodyElement = document.body;
        return bodyElement.getAttribute('data-page-name') || document.title;
    }
    
    function buildPrompt() {
        const pageName = getPageName();
        const currentUrl = window.location.href;
        
        return `Analise a ${AIConfig.companyName}, empresa localizada em ${AIConfig.location}. ` +
               `Estou consultando a página "${pageName}" do site oficial. ` +
               `Considere os serviços e informações disponíveis em: ${currentUrl}`;
    }
    
    function initAIDiscovery() {
        const aiContainer = document.getElementById('ai-links');
        
        if (!aiContainer) return;
        
        const prompt = buildPrompt();
        
        AIConfig.providers.forEach(provider => {
            const link = document.createElement('a');
            link.href = provider.urlBuilder(prompt);
            link.className = 'ai-link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `${provider.title} sobre DS Glass`);
            link.title = provider.title;
            
            const icon = document.createElement('img');
            icon.src = provider.icon;
            icon.alt = '';
            icon.className = 'ai-icon';
            icon.width = 24;
            icon.height = 24;
            icon.loading = 'lazy';
            icon.setAttribute('aria-hidden', 'true');
            
            const label = document.createElement('span');
            label.textContent = provider.name;
            
            link.appendChild(icon);
            link.appendChild(label);
            
            // Track clicks
            link.addEventListener('click', function() {
                if (typeof trackEvent === 'function') {
                    trackEvent('ai_click', {
                        provider: provider.id,
                        page: getPageName(),
                        timestamp: new Date().toISOString()
                    });
                }
            });
            
            aiContainer.appendChild(link);
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAIDiscovery);
    } else {
        initAIDiscovery();
    }
})();
