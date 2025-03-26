// Persistent animations and back navigation handling
document.addEventListener('DOMContentLoaded', () => {
    // Track page visits to detect back navigation
    if (!sessionStorage.getItem('pageVisited')) {
        sessionStorage.setItem('pageVisited', 'true');
        sessionStorage.setItem('isBackNavigation', 'false');
    } else {
        // This could be a back navigation
        sessionStorage.setItem('isBackNavigation', 'true');
    }

    const isBackNavigation = sessionStorage.getItem('isBackNavigation') === 'true';

    // Add permanent rotation animations to selected cards
    const applyPermanentAnimations = () => {
        // Apply rotation animations to destination cards (only on home page)
        if (document.querySelector('.destination-card')) {
            const destCards = document.querySelectorAll('.destination-card');
            
            // Apply different rotation effect to each card for visual variety
            if (destCards.length > 0) {
                destCards[0].classList.add('rotate-hover');
                if (destCards.length > 1) {
                    destCards[1].classList.add('pulse-animation');
                }
                if (destCards.length > 2) {
                    destCards[2].classList.add('float-animation');
                }
            }
        }
        
        // Add permanent animation classes to other elements
        const elementsToAnimate = [
            { selector: '.challenge-card', animClass: 'rotate-hover shake-animation' },
            { selector: '.advantage-card', animClass: 'float-animation' },
            { selector: '.price-comparison', animClass: 'permanent-fade-in' },
            { selector: '.search-form button', animClass: 'pulse-animation' },
            { selector: '.booking-form button', animClass: 'pulse-animation' }
        ];
        
        elementsToAnimate.forEach(item => {
            document.querySelectorAll(item.selector).forEach(element => {
                // Add animation classes
                const classes = item.animClass.split(' ');
                classes.forEach(cls => element.classList.add(cls));
            });
        });
    };

    // Apply permanent animations
    applyPermanentAnimations();

    // If this is back navigation, add additional animations
    if (isBackNavigation) {
        document.body.classList.add('back-navigation');
        
        // Adding animations for back navigation
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            heading.classList.add('permanent-slide-up');
        });
        
        // Find all flight and booking cards and add permanent animation
        const cards = document.querySelectorAll('.flight-card, .booking-card');
        cards.forEach((card, index) => {
            // Stagger animations
            setTimeout(() => {
                card.classList.add('permanent-slide-left');
            }, index * 150);
        });
    }

    // Create interactive elements with 3D effects
    const createFlipCards = () => {
        // Find suitable elements to transform into flip cards
        const potentialFlipCards = document.querySelectorAll('.advantage-card');
        
        potentialFlipCards.forEach(card => {
            // Only transform if it's not already a flip card
            if (!card.classList.contains('flip-container')) {
                // Store the original content and dimensions
                const originalContent = card.innerHTML;
                const cardHeight = Math.max(card.offsetHeight, 250); // Ensure minimum height
                const title = card.querySelector('h4')?.textContent || 'Ryanair Advantage';
                
                // Extract bullet points for back of card
                const bulletPoints = [];
                const points = card.querySelectorAll('.flex.items-center p');
                points.forEach(point => {
                    bulletPoints.push(point.textContent);
                });
                
                // Create flip card structure
                card.classList.add('flip-container');
                card.style.minHeight = `${cardHeight}px`;
                
                // Create a more detailed back side with the bullet points
                let bulletPointsHTML = '';
                if (bulletPoints.length > 0) {
                    bulletPointsHTML = `
                    <ul class="text-left text-white space-y-2 mt-4">
                        ${bulletPoints.map(point => `<li><i class="fas fa-check text-ryanair-yellow mr-2"></i>${point}</li>`).join('')}
                    </ul>`;
                }
                
                card.innerHTML = `
                    <div class="flip-card">
                        <div class="flip-front">
                            ${originalContent}
                        </div>
                        <div class="flip-back p-6 flex flex-col justify-center">
                            <div class="text-center">
                                <h4 class="text-xl font-bold text-white mb-4">${title}</h4>
                                <p class="text-white">Ryanair delivers excellence</p>
                                ${bulletPointsHTML}
                                <i class="fas fa-sync-alt text-ryanair-yellow text-3xl mt-4 rotate-slow"></i>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    };
    
    // Apply flip card transformations
    createFlipCards();
    
    // Apply continuous rotation to specific icons
    const icons = document.querySelectorAll('.fa-plane, .fa-chart-line');
    icons.forEach(icon => {
        icon.classList.add('rotate-slow');
    });
    
    // Add wobble/pulse effects to buttons on hover
    const buttons = document.querySelectorAll('button, a.bg-ryanair-yellow, a.bg-ryanair-blue');
    buttons.forEach(button => {
        if (!button.classList.contains('pulse-hover')) {
            button.classList.add('pulse-animation');
        }
    });
}); 