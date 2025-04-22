// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initPricingFilters();
});

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Gestion du clic sur le menu burger
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Fermer le menu lors du défilement
        window.addEventListener('scroll', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .price-card, .testimonial, .process-step, .info-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px',
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                requestAnimationFrame(() => {
                    target.style.transform = 'translateY(0)';
                    target.style.opacity = '1';
                });
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        observer.observe(element);
    });
}

// Filtres de prix
function initPricingFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            pricingCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });
} 