// Countdown timer functionality
document.addEventListener('DOMContentLoaded', () => {
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    
    // Update all countdown timers
    function updateCountdowns() {
        const now = new Date().getTime();
        
        countdownTimers.forEach(timer => {
            const endTimeStr = timer.getAttribute('data-end');
            const endTime = new Date(endTimeStr).getTime();
            const timeLeft = endTime - now;
            
            // Find elements to update
            const daysElement = timer.querySelector('.countdown-days');
            const hoursElement = timer.querySelector('.countdown-hours');
            const minutesElement = timer.querySelector('.countdown-minutes');
            
            if (timeLeft <= 0) {
                // Offer expired
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                
                // Add expired class for styling
                timer.closest('.deal-card').classList.add('deal-expired');
                return;
            }
            
            // Calculate time units
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update the timer elements
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            
            // Add animations based on urgency
            if (days === 0 && hours < 12) {
                timer.classList.add('urgent-countdown');
                
                // Pulse animation for urgency
                if (!timer.classList.contains('pulse-animation')) {
                    timer.querySelectorAll('div').forEach(element => {
                        element.classList.add('pulse-animation');
                    });
                }
            }
        });
    }
    
    // Apply deal card animations
    function applyDealAnimations() {
        const dealCards = document.querySelectorAll('.deal-card');
        
        dealCards.forEach((card, index) => {
            // Add staggered entrance animations
            setTimeout(() => {
                card.classList.add('animate-fade-in');
            }, index * 200);
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                const discount = card.querySelector('.bg-red-600');
                if (discount) {
                    discount.classList.add('scale-animation');
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const discount = card.querySelector('.bg-red-600');
                if (discount) {
                    discount.classList.remove('scale-animation');
                }
            });
        });
    }
    
    // Initialize animations
    applyDealAnimations();
    
    // Initialize and start countdown
    if (countdownTimers.length > 0) {
        updateCountdowns();
        setInterval(updateCountdowns, 60000); // Update every minute
    }
}); 