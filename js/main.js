/* ============================================
   DS GLASSES - JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll
    const header = document.querySelector('.site-header');
    
    function handleScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            const isOpen = mobileMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Fechar menu ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Animações de entrada (fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Injetar mapa
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer && typeof embedCode !== 'undefined') {
        mapContainer.innerHTML = embedCode;
    }
    
    // Criar botão WhatsApp flutuante
    if (typeof pageContent !== 'undefined') {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'whatsapp-float';
        whatsappBtn.href = `https://wa.me/${pageContent.general.whatsappNumber}?text=${encodeURIComponent(pageContent.general.whatsappMessage)}`;
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener';
        whatsappBtn.setAttribute('aria-label', 'Falar no WhatsApp');
        
        whatsappBtn.innerHTML = `
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.592 4.464 1.712 6.416L3.2 28.8l6.592-1.664a12.768 12.768 0 0 0 6.208 1.616h.008c7.056 0 12.792-5.744 12.792-12.8 0-3.424-1.328-6.64-3.744-9.056A12.716 12.716 0 0 0 16.004 3.2zm0 23.36h-.008a10.52 10.52 0 0 1-5.36-1.472l-.384-.224-3.936.992 1.04-3.824-.256-.4a10.496 10.496 0 0 1-1.616-5.632c0-5.84 4.752-10.592 10.6-10.592a10.52 10.52 0 0 1 7.488 3.104 10.516 10.516 0 0 1 3.096 7.488c0 5.84-4.752 10.592-10.6 10.592zm5.792-7.936c-.32-.16-1.872-.928-2.16-1.032-.288-.112-.512-.16-.72.16-.208.32-.832 1.04-1.024 1.248-.192.208-.384.24-.704.08-.32-.16-1.344-.496-2.56-1.584a9.6 9.6 0 0 1-1.776-2.208c-.192-.32-.016-.48.144-.64.144-.144.32-.368.48-.56.16-.192.208-.32.32-.544.112-.224.064-.416-.016-.576-.08-.16-.72-1.744-.992-2.384-.256-.624-.52-.544-.72-.544l-.688-.016c-.24 0-.624.08-.944.416-.32.336-1.248 1.216-1.248 2.96 0 1.744 1.28 3.424 1.456 3.664.176.24 2.512 3.824 6.08 5.36.848.368 1.512.592 2.032.752.848.272 1.616.24 2.224.144.688-.096 1.872-.768 2.144-1.504.272-.736.272-1.36.192-1.488-.08-.128-.288-.192-.608-.352z"/>
            </svg>
        `;
        
        document.body.appendChild(whatsappBtn);
    }
    
    // Aplicar Schema.org via JavaScript
    if (typeof pageContent !== 'undefined' && pageContent.schema) {
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": pageContent.schema.name,
            "description": pageContent.schema.description,
            "telephone": pageContent.schema.phone,
            "email": pageContent.schema.email,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": pageContent.schema.address.street,
                "addressLocality": pageContent.schema.address.city,
                "addressRegion": pageContent.schema.address.state,
                "postalCode": pageContent.schema.address.zip,
                "addressCountry": pageContent.schema.address.country
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": pageContent.schema.geo.latitude,
                "longitude": pageContent.schema.geo.longitude
            },
            "url": "https://vidracariaesquadriadsglass.com.br",
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80",
            "priceRange": "$$",
            "openingHours": "Mo-Fr 08:00-11:45, 13:00-17:00"
        };
        
        schemaScript.textContent = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
    }
    
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
