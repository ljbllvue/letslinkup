
// Accordion toggle functionality
function toggleAccordion(element) {
    const isActive = element.classList.contains('active');
    
    // Close all other accordion items with smooth animation
    document.querySelectorAll('.accordion-item.active').forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        element.classList.remove('active');
    } else {
        element.classList.add('active');
        
        // Smooth scroll to center the opened item
        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    }
}



// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle mobile menu when hamburger is clicked
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close all FAQ items
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                item.classList.remove('active');
            });
            
            // Close mobile menu
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Add accessibility support to accordion items
function initializeAccordionAccessibility() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(item);
            }
        });
        
        // Make items focusable for accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when accordion state changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = item.classList.contains('active');
                    item.setAttribute('aria-expanded', isActive);
                }
            });
        });
        
        observer.observe(item, { attributes: true });
    });
}

// Service button interactions
function initializeServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-cta');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button action based on text
            const buttonText = this.textContent.trim();
            switch(buttonText) {
                case 'Get Coaching':
                    console.log('Coaching service requested');
                    // Add your coaching service logic here
                    break;
                case 'Get Certified':
                    console.log('Certification requested');
                    // Add your certification logic here
                    break;
                case 'Learn More':
                    console.log('Learn more about intimacy coordination');
                    // Add your learn more logic here
                    break;
                default:
                    console.log('Service button clicked:', buttonText);
            }
        });
    });
}

// Header scroll effects
function initializeHeaderScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for enhanced animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.accordion-item, .service-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling enhancement
function enhanceScrolling() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a slight delay to ensure the accordion opens first
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                
                // Only scroll if the item is not fully in view
                if (!isInView) {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 300);
        });
    });
}

// Add CSS for ripple animation dynamically
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Prevent body scroll when mobile menu is open
function handleBodyScrollLock() {
    const mobileToggle = document.getElementById('mobileToggle');
    const body = document.body;
    
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            // Restore body scroll when menu is closed
            body.style.overflow = '';
        } else {
            // Prevent body scroll when menu is open
            body.style.overflow = 'hidden';
        }
    });
    
    // Restore scroll when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !document.getElementById('navMenu').contains(e.target)) {
            body.style.overflow = '';
        }
    });
}

// Form validation framework for future use
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation logic here
            console.log('Form submitted');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeMobileMenu();
    initializeKeyboardNavigation();
    initializeAccordionAccessibility();
    initializeServiceButtons();
    
    // Initialize enhanced features
    initializeHeaderScrollEffects();
    initializeIntersectionObserver();
    enhanceScrolling();
    handleBodyScrollLock();
    initializeFormValidation();
    
    // Add dynamic styles
    addRippleStyles();
    
    console.log('Services page loaded successfully');
});

// Handle window resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleAccordion,
        initializeMobileMenu,
        initializeKeyboardNavigation,
        initializeAccordionAccessibility,
        initializeServiceButtons
    };
}

 // Shoot Your Shot Modal Functions
        function openShootShotModal() {
            document.getElementById('shootShotModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeShootShotModal() {
            document.getElementById('shootShotModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            document.getElementById('shootShotForm').reset();
        }


        // Shoot Your Shot form submission
        document.getElementById('shootShotForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            console.log('Shoot Your Shot submission:', data);
            
            // For demo purposes, just show an alert
            alert('Link Up submitted successfully! We\'ll review your submission and get back to you soon.');
            closeShootShotModal();
        });

 // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const interestModal = document.getElementById('interestModal');
            const shootShotModal = document.getElementById('shootShotModal');
            
            if (e.target === interestModal) {
                closeModal();
            }
            if (e.target === shootShotModal) {
                closeShootShotModal();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                closeShootShotModal();
                closeCollabPopup();
            }
        });



