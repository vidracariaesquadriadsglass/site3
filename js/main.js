// ============================================
// DS GLASS - MAIN JAVASCRIPT
// ============================================

(function() {
    'use strict';
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const header = document.querySelector('.header');
        
        if (menuBtn && header) {
            menuBtn.addEventListener('click', function() {
                header.classList.toggle('mobile-menu-open');
                document.body.classList.toggle('no-scroll');
                
                const isOpen = header.classList.contains('mobile-menu-open');
                menuBtn.setAttribute('aria-expanded', isOpen);
                menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
                
                // Animate hamburger icon
                const spans = menuBtn.querySelectorAll('span');
                if (isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }
    
    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(faq => faq.classList.remove('active'));
                    
                    // Open clicked item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                    
                    // Update ARIA
                    faqItems.forEach(faq => {
                        const q = faq.querySelector('.faq-question');
                        const a = faq.querySelector('.faq-answer');
                        if (q && a) {
                            const isOpen = faq.classList.contains('active');
                            q.setAttribute('aria-expanded', isOpen);
                            a.setAttribute('aria-hidden', !isOpen);
                        }
                    });
                });
            }
        });
    }
    
    // Smooth Scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Scroll Reveal Animations
    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-reveal]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            elements.forEach(element => {
                element.classList.add('revealed');
            });
        }
    }
    
    // Initialize all functions
    function init() {
        initMobileMenu();
        initFAQ();
        initSmoothScroll();
        initScrollReveal();
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
