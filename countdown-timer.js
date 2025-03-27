// Countdown Timer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all countdown timers
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    
    // Update all data-end attributes to be 3 days from now
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    const threeDaysFormatted = threeDaysFromNow.toISOString().slice(0, 19);
    
    countdownTimers.forEach(timer => {
        timer.setAttribute('data-end', threeDaysFormatted);
    });
    
    // Function to update countdowns
    function updateCountdowns() {
        countdownTimers.forEach(timer => {
            const endTime = new Date(timer.getAttribute('data-end')).getTime();
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            
            // Get elements
            const daysElement = timer.querySelector('.countdown-days');
            const hoursElement = timer.querySelector('.countdown-hours');
            const minutesElement = timer.querySelector('.countdown-minutes');
            
            if (timeLeft <= 0) {
                // Offer expired
                if (daysElement) daysElement.textContent = '00';
                if (hoursElement) hoursElement.textContent = '00';
                if (minutesElement) minutesElement.textContent = '00';
                
                // Find the parent deal card and mark as expired
                const dealCard = timer.closest('.deal-card');
                if (dealCard && !dealCard.classList.contains('deal-expired')) {
                    dealCard.classList.add('deal-expired');
                }
                
                return;
            }
            
            // Calculate time units
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update display
            if (daysElement) daysElement.textContent = days < 10 ? `0${days}` : days;
            if (hoursElement) hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
            if (minutesElement) minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
            
            // Add urgent styling if time is running out (less than 24 hours)
            if (timeLeft < (24 * 60 * 60 * 1000)) {
                if (!timer.classList.contains('urgent-countdown')) {
                    timer.classList.add('urgent-countdown');
                    
                    // If this is a deal, add extra attention to the price
                    const priceElement = timer.closest('.deal-card')?.querySelector('.text-red-600');
                    if (priceElement) {
                        priceElement.classList.add('scale-animation');
                    }
                }
            }
        });
    }
    
    // Initial update
    updateCountdowns();
    
    // Update every minute
    setInterval(updateCountdowns, 60000);
}); 