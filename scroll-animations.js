// Scroll Animation Effects
document.addEventListener('DOMContentLoaded', () => {
    // Define animation classes
    const animations = {
        'fade-in': 'animate-fade-in',
        'slide-in-left': 'animate-slide-in-left',
        'slide-in-right': 'animate-slide-in-right',
        'slide-in-up': 'animate-slide-in-up',
        'zoom-in': 'animate-zoom-in',
        'bounce': 'animate-bounce'
    };

    // Configure which elements get which animations
    const animatedElements = [
        { selector: '.hero-content', animation: 'fade-in', delay: 0 },
        { selector: '.destination-card', animation: 'slide-in-up', delay: 100 },
        { selector: '.challenge-card', animation: 'slide-in-left', delay: 100 },
        { selector: '.advantage-card', animation: 'slide-in-right', delay: 100 },
        { selector: '.price-comparison', animation: 'fade-in', delay: 0 },
        { selector: 'h2', animation: 'slide-in-up', delay: 0 },
        { selector: 'h3', animation: 'slide-in-up', delay: 0 }
    ];

    // Create observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation;
                const delay = parseInt(element.dataset.delay || 0);
                
                // Apply animation with delay
                setTimeout(() => {
                    element.classList.add(animations[animationType]);
                    element.style.opacity = '1';
                }, delay);
                
                // Unobserve after animating
                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Apply animation setup to elements
    animatedElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach(element => {
            // Setup element for animation
            element.dataset.animation = item.animation;
            element.dataset.delay = item.delay;
            element.style.opacity = '0';
            
            // Observe element
            observer.observe(element);
        });
    });
}); 