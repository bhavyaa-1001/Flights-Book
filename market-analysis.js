// Market Analysis Animations and Charts
document.addEventListener('DOMContentLoaded', () => {
    // Animate statistics on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    });

    // Observe all statistics cards
    document.querySelectorAll('.bg-white.rounded-lg').forEach(card => {
        observer.observe(card);
    });

    // Price comparison table hover effect
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.classList.add('bg-gray-50');
        });
        row.addEventListener('mouseleave', () => {
            row.classList.remove('bg-gray-50');
        });
    });

    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add counter animation for statistics
    const stats = [
        { element: 'operational-costs', value: 30 },
        { element: 'price-wars', value: 40 },
        { element: 'aircraft-utilization', value: 12 }
    ];

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe statistics for animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const value = parseInt(element.dataset.value);
                animateValue(element, 0, value, 2000);
                statsObserver.unobserve(element);
            }
        });
    });

    // Add data attributes to statistics elements
    stats.forEach(stat => {
        const element = document.getElementById(stat.element);
        if (element) {
            element.dataset.value = stat.value;
            statsObserver.observe(element);
        }
    });
}); 