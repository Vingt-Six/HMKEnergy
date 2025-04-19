// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        requestAnimationFrame(() => {
            navLinks.classList.toggle('active');
        });
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            requestAnimationFrame(() => {
                navLinks.classList.remove('active');
            });
        });
    });

    // Animation au scroll avec IntersectionObserver
    const animatedElements = document.querySelectorAll('.service-card, .price-card, .testimonial, .process-step, .info-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('fade-in');
                });
                observer.unobserve(entry.target); // Arrêter d'observer une fois animé
            }
        });
    }, observerOptions);

    // Regrouper les lectures DOM
    const elementsToAnimate = Array.from(animatedElements);
    
    // Regrouper les écritures DOM
    requestAnimationFrame(() => {
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.classList.add('fade-in');
            observer.observe(element);
        });
    });
}); 