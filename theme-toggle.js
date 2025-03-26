// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const mobileThemeToggleDarkIcon = document.getElementById('mobile-theme-toggle-dark-icon');
    const mobileThemeToggleLightIcon = document.getElementById('mobile-theme-toggle-light-icon');

    // Set the theme based on local storage or system preference
    function setTheme() {
        // Check if theme choice already exists in local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                enableDarkMode();
            } else {
                enableLightMode();
            }
            return;
        }

        // Check system preference if no saved choice
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }

    function enableDarkMode() {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        
        // Update toggle icons
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
        mobileThemeToggleDarkIcon.classList.add('hidden');
        mobileThemeToggleLightIcon.classList.remove('hidden');
    }

    function enableLightMode() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        
        // Update toggle icons
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
        mobileThemeToggleDarkIcon.classList.remove('hidden');
        mobileThemeToggleLightIcon.classList.add('hidden');
    }

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    }

    // Initialize theme
    setTheme();

    // Add event listeners to toggle buttons
    themeToggleBtn.addEventListener('click', toggleTheme);
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }
    });
}); 