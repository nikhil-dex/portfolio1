// Modern Portfolio JavaScript with ES6+ Modules
// Main application entry point

import { ThemeManager } from './modules/theme.js';
import { NavigationManager } from './modules/navigation.js';
import { ScrollAnimations } from './modules/animations.js';
import { ContactForm } from './modules/contact.js';
import { LoadingManager } from './modules/loading.js';

class PortfolioApp {
    constructor() {
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.scrollAnimations = new ScrollAnimations();
        this.contactForm = new ContactForm();
        this.loadingManager = new LoadingManager();
        
        this.init();
    }

    init() {
        // Initialize all modules
        this.themeManager.init();
        this.navigationManager.init();
        this.scrollAnimations.init();
        this.contactForm.init();
        this.loadingManager.init();
        
        // Initialize app-specific functionality
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        
        console.log('Portfolio app initialized successfully');
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = 70;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupIntersectionObserver() {
        // Observe sections for navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-70px 0px -50% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

    setupPerformanceOptimizations() {
        // Lazy load images when they come into view
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for potential external use
export { PortfolioApp };
