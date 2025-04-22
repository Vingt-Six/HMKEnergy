// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Pré-initialiser les états pour éviter les décalages
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Pré-initialiser la navigation
    if (navLinks) {
        navLinks.style.transition = 'none';
        navLinks.style.display = 'flex';
        requestAnimationFrame(() => {
            navLinks.style.transition = '';
        });
    }

    menuToggle?.addEventListener('click', function() {
        requestAnimationFrame(() => {
            navLinks?.classList.toggle('active');
        });
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            requestAnimationFrame(() => {
                navLinks?.classList.remove('active');
            });
        });
    });

    // Animation au scroll avec IntersectionObserver optimisé
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

    // Pré-initialiser les éléments animés
    requestAnimationFrame(() => {
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            observer.observe(element);
        });
    });
}); 