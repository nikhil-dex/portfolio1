// Theme Management Module
export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.querySelector('.theme-icon i');
        this.themeText = document.querySelector('.theme-text');
        this.currentTheme = localStorage.getItem('theme') || 'light';
    }

    init() {
        this.setInitialTheme();
        this.bindEvents();
    }

    setInitialTheme() {
        // Apply saved theme or system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else if (systemPrefersDark) {
            this.currentTheme = 'dark';
        }
        
        this.applyTheme(this.currentTheme);
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle button
        if (this.themeIcon && this.themeText) {
            if (theme === 'dark') {
                this.themeIcon.className = 'fas fa-moon';
                this.themeText.textContent = 'Dark Mode';
            } else {
                this.themeIcon.className = 'fas fa-sun';
                this.themeText.textContent = 'Light Mode';
            }
        }

        // Add smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}
