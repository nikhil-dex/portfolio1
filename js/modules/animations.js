// Scroll Animations Module
export class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.projectCards = document.querySelectorAll('.project-card');
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
    }

    init() {
        this.setupScrollAnimations();
        this.setupSkillBarAnimations();
        this.setupProjectCardAnimations();
        this.setupParallaxEffects();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for multiple elements
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            });
        }, this.observerOptions);

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupSkillBarAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    
                    // Animate skill bar
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 200);
                    
                    skillObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    setupProjectCardAnimations() {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        this.projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animationDelay = `${index * 100}ms`;
            projectObserver.observe(card);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.addParallaxListener(entry.target);
                } else {
                    this.removeParallaxListener(entry.target);
                }
            });
        });

        parallaxElements.forEach(element => {
            parallaxObserver.observe(element);
        });
    }

    addParallaxListener(element) {
        const speed = element.dataset.speed || 0.5;
        
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            element.style.transform = `translateY(${rate}px)`;
        };

        element._parallaxHandler = handleScroll;
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    removeParallaxListener(element) {
        if (element._parallaxHandler) {
            window.removeEventListener('scroll', element._parallaxHandler);
            delete element._parallaxHandler;
        }
    }

    // Utility method to animate elements on demand
    animateElement(element, animation = 'fadeInUp', duration = 600) {
        element.style.animation = `${animation} ${duration}ms ease-out forwards`;
    }

    // Method to reset animations
    resetAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animated');
            element.style.animation = '';
            element.style.animationDelay = '';
        });
    }
}
