document.addEventListener('DOMContentLoaded', function() {
    const buildingTypeSelect = document.getElementById('buildingType');
    const surfaceSelect = document.getElementById('surface');
    const estimatedPriceSpan = document.getElementById('estimatedPrice');

    // Prix de base TVAC par type de bâtiment et surface
    const prices = {
        appartement: [
            { range: '0-50', price: 120 },
            { range: '51-75', price: 165 },
            { range: '76-100', price: 175 },
            { range: '101+', price: 205 }
        ],
        maison: [
            { range: '0-150', price: 225 },
            { range: '150-250', price: 245 },
            { range: '250+', price: 265 }
        ],
        immeuble: [
            { range: 'base', basePrice: 120 } // Prix supplémentaire par appartement
        ]
    };

    // Mettre à jour les options de surface en fonction du type de bâtiment
    buildingTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        surfaceSelect.innerHTML = '<option value="">Sélectionnez la superficie</option>';
        
        if (selectedType) {
            surfaceSelect.disabled = false;
            
            if (selectedType === 'appartement') {
                surfaceSelect.innerHTML += `
                    <option value="0-50">0 - 50 m²</option>
                    <option value="51-75">51 - 75 m²</option>
                    <option value="76-100">76 - 100 m²</option>
                    <option value="101+">Plus de 100 m²</option>
                `;
            } else if (selectedType === 'maison') {
                surfaceSelect.innerHTML += `
                    <option value="0-150">Moins de 150 m²</option>
                    <option value="150-250">150 - 250 m²</option>
                    <option value="250+">Plus de 250 m²</option>
                `;
            } else if (selectedType === 'immeuble') {
                surfaceSelect.innerHTML += `
                    <option value="2">2 appartements</option>
                    <option value="3">3 appartements</option>
                    <option value="4">4 appartements</option>
                    <option value="5">5 appartements ou plus</option>
                `;
            }
        } else {
            surfaceSelect.disabled = true;
            estimatedPriceSpan.textContent = '-';
        }
    });

    // Calculer et afficher le prix estimé
    surfaceSelect.addEventListener('change', function() {
        const selectedType = buildingTypeSelect.value;
        const selectedSurface = this.value;
        
        if (selectedType && selectedSurface) {
            let estimatedPrice = 0;
            
            if (selectedType === 'immeuble') {
                // Pour les immeubles, on prend le prix d'un appartement moyen (0-50m²) + 120€ par appartement supplémentaire
                const baseApartmentPrice = 120; // Prix de base pour un appartement
                const additionalPrice = prices.immeuble[0].basePrice; // Prix supplémentaire par appartement
                const numberOfApartments = parseInt(selectedSurface);
                estimatedPrice = baseApartmentPrice + (additionalPrice * (numberOfApartments - 1));
                estimatedPriceSpan.textContent = `À partir de ${estimatedPrice}€ TVAC`;
            } else {
                // Pour les appartements et maisons
                const priceInfo = prices[selectedType].find(p => p.range === selectedSurface);
                if (priceInfo) {
                    estimatedPrice = priceInfo.price;
                    estimatedPriceSpan.textContent = `À partir de ${estimatedPrice}€ TVAC`;
                }
            }
        } else {
            estimatedPriceSpan.textContent = '-';
        }
    });

    // Validation du formulaire
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifier que tous les champs requis sont remplis
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Ajouter le prix estimé au formulaire avant l'envoi
            const hiddenPriceInput = document.createElement('input');
            hiddenPriceInput.type = 'hidden';
            hiddenPriceInput.name = 'estimatedPrice';
            hiddenPriceInput.value = estimatedPriceSpan.textContent;
            this.appendChild(hiddenPriceInput);
            
            // Si tout est valide, soumettre le formulaire
            this.submit();
        }
    });
}); 