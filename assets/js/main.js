// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initPricingFilters();
    initContactForm();
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

    // Déclencher le filtre "appartement" par défaut au chargement
    const defaultFilter = document.querySelector('.filter-btn[data-filter="appartement"]');
    if (defaultFilter) {
        defaultFilter.click();
    }
}

// Prix des certificats PEB
const pricingData = {
    appartement: {
        "0-50": { htva: 99, tvac: 120 },
        "51-75": { htva: 136, tvac: 165 },
        "76-100": { htva: 145, tvac: 175 },
        ">100": { htva: 169, tvac: 205 }
    },
    maison: {
        "<150": { htva: 186, tvac: 225 },
        "150-250": { htva: 202, tvac: 245 },
        ">250": { htva: 219, tvac: 265 }
    },
    immeuble: {
        "par-appartement": { htva: "Prix du certificat d'un appartement + 120 € par appartement", tvac: "Prix du certificat d'un appartement + 120 € par appartement" }
    }
};

// Gestion du formulaire de contact
function initContactForm() {
    const buildingTypeSelect = document.getElementById('buildingType');
    const surfaceSelect = document.getElementById('surface');
    const estimatedPriceSpan = document.getElementById('estimatedPrice');

    if (buildingTypeSelect && surfaceSelect) {
        buildingTypeSelect.addEventListener('change', function() {
            // Réinitialiser le select de superficie
            surfaceSelect.innerHTML = '<option value="">Sélectionnez une superficie</option>';
            surfaceSelect.disabled = false;

            // Ajouter les options de superficie selon le type de bâtiment
            const selectedType = this.value;
            const surfaces = getSurfacesForType(selectedType);
            
            surfaces.forEach(surface => {
                const option = document.createElement('option');
                option.value = surface;
                option.textContent = getSurfaceLabel(selectedType, surface);
                surfaceSelect.appendChild(option);
            });

            // Réinitialiser le prix estimé
            estimatedPriceSpan.textContent = '-';
        });

        surfaceSelect.addEventListener('change', function() {
            const selectedType = buildingTypeSelect.value;
            const selectedSurface = this.value;
            
            if (selectedType && selectedSurface) {
                const price = pricingData[selectedType][selectedSurface];
                if (price) {
                    estimatedPriceSpan.textContent = `${price.tvac} € TVAC`;
                }
            }
        });
    }
}

function getSurfacesForType(type) {
    switch(type) {
        case 'appartement':
            return ['0-50', '51-75', '76-100', '>100'];
        case 'maison':
            return ['<150', '150-250', '>250'];
        case 'immeuble':
            return ['par-appartement'];
        default:
            return [];
    }
}

function getSurfaceLabel(type, surface) {
    switch(type) {
        case 'appartement':
            return surface === '>100' ? 'Plus de 100 m²' : `${surface} m²`;
        case 'maison':
            return surface === '>250' ? 'Plus de 250 m²' : `${surface} m²`;
        case 'immeuble':
            return 'Certificat par appartement';
        default:
            return surface;
    }
} 