// Loading Manager Module
export class LoadingManager {
    constructor() {
        this.loadingElement = document.querySelector('.loading');
        this.loader = document.querySelector('.loader');
        this.minLoadingTime = 1000; // Minimum loading time in ms
        this.startTime = Date.now();
    }

    init() {
        this.setupLoadingScreen();
        this.bindEvents();
    }

    setupLoadingScreen() {
        // Create loading screen if it doesn't exist
        if (!this.loadingElement) {
            this.createLoadingScreen();
        }
        
        // Ensure loading screen is visible initially
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
    }

    createLoadingScreen() {
        const loadingHTML = `
            <div class="loading">
                <div class="loader"></div>
                <div class="loading-text">
                    <h2>Loading Portfolio...</h2>
                    <p>Preparing amazing content for you</p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        this.loadingElement = document.querySelector('.loading');
        this.loader = document.querySelector('.loader');
    }

    bindEvents() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => this.hideLoadingScreen());
        
        // Also hide after minimum loading time
        setTimeout(() => {
            if (this.loadingElement && this.loadingElement.style.display !== 'none') {
                this.hideLoadingScreen();
            }
        }, this.minLoadingTime);
    }

    hideLoadingScreen() {
        if (!this.loadingElement) return;
        
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            this.loadingElement.style.opacity = '0';
            this.loadingElement.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
                this.triggerPageAnimations();
            }, 500);
        }, remainingTime);
    }

    triggerPageAnimations() {
        // Trigger initial animations for page elements
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('animate-in');
        }
        
        // Animate other sections as they come into view
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate-in');
            }, index * 200);
        });
    }

    // Method to show loading screen programmatically
    showLoadingScreen(message = 'Loading...') {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
            this.loadingElement.style.opacity = '1';
            
            const loadingText = this.loadingElement.querySelector('.loading-text h2');
            if (loadingText) {
                loadingText.textContent = message;
            }
        }
    }

    // Method to update loading progress
    updateProgress(progress) {
        if (this.loader) {
            this.loader.style.setProperty('--progress', `${progress}%`);
        }
    }
}

// Add CSS for loading animations
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    }
    
    .loader {
        width: 50px;
        height: 50px;
        border: 4px solid var(--border-color);
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 2rem;
    }
    
    .loading-text {
        text-align: center;
        color: var(--text-primary);
    }
    
    .loading-text h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .loading-text p {
        color: var(--text-secondary);
        font-size: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(loadingStyles);
