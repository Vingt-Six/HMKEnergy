document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupération des valeurs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const type = document.getElementById('type').value;
        const surface = document.getElementById('surface').value;
        const message = document.getElementById('message').value.trim();

        // Validation des champs
        let isValid = true;
        let errorMessage = '';

        if (name.length < 2) {
            isValid = false;
            errorMessage += 'Le nom doit contenir au moins 2 caractères.\n';
        }

        if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Veuillez entrer une adresse email valide.\n';
        }

        if (!isValidPhone(phone)) {
            isValid = false;
            errorMessage += 'Veuillez entrer un numéro de téléphone valide.\n';
        }

        if (type === '') {
            isValid = false;
            errorMessage += 'Veuillez sélectionner un type de bien.\n';
        }

        if (surface <= 0) {
            isValid = false;
            errorMessage += 'La surface doit être supérieure à 0.\n';
        }

        if (message.length < 10) {
            isValid = false;
            errorMessage += 'Le message doit contenir au moins 10 caractères.\n';
        }

        if (isValid) {
            // Envoi du formulaire (à implémenter selon vos besoins)
            alert('Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.');
            contactForm.reset();
        } else {
            alert(errorMessage);
        }
    });

    // Fonctions de validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Format belge : +32 ou 0 suivi de 9 chiffres
        const phoneRegex = /^(\+32|0)[0-9]{9}$/;
        return phoneRegex.test(phone);
    }
}); 