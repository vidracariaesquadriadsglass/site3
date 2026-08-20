// ============================================
// DS GLASS - GERADOR DE PÁGINAS (Referência)
// Este script documenta a estrutura das páginas
// ============================================

const PageTemplates = {
    // Página de serviço padrão
    service: {
        head: (title, description, canonical) => `
            <title>${title}</title>
            <meta name="description" content="${description}">
            <link rel="canonical" href="${canonical}">
        `,
        breadcrumb: (items) => {
            return items.map((item, index) => {
                if (index === items.length - 1) {
                    return `<span class="breadcrumb-current" aria-current="page">${item.label}</span>`;
                }
                return `<a href="${item.url}" class="breadcrumb-link">${item.label}</a>
                        <span class="breadcrumb-separator" aria-hidden="true">/</span>`;
            }).join('');
        },
        ctaSection: (title, text) => `
            <div class="cta-section" style="border-radius: var(--radius-lg); margin-top: var(--space-2xl);">
                <h3 class="cta-title">${title}</h3>
                <p class="cta-text">${text}</p>
                <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                    <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="daniel">Falar com Daniel</a>
                    <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="rubens">Falar com Rubens</a>
                </div>
            </div>
        `
    }
};
