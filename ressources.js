// Age Gate Protection Script

(function() {
    'use strict';
    
    // Configuration
    const AGE_GATE_CONFIG = {
        ageGatePage: '/age-gate',      // Clean URL without .html
        mainPage: '/ressources',                 // Clean URL for homepage
        sessionKey: 'ageVerified',     // SessionStorage key
        cookieKey: 'age_verified',     // Cookie key (optional, for longer persistence)
        cookieExpiryDays: 30          // Cookie expiry in days
    };

    // Check if current page is the age gate itself
    function isAgeGatePage() {
        return window.location.pathname.includes('age-gate') || 
               window.location.pathname.includes('age_gate');
    }

    // Check if user has been age verified
    function isAgeVerified() {
        // Check sessionStorage first (expires when tab closes)
        const sessionVerified = sessionStorage.getItem(AGE_GATE_CONFIG.sessionKey);
        
        // Optional: Check cookie for longer persistence
        const cookieVerified = getCookie(AGE_GATE_CONFIG.cookieKey);
        
        return sessionVerified === 'true' || cookieVerified === 'true';
    }

    // Set age verification
    function setAgeVerified() {
        sessionStorage.setItem(AGE_GATE_CONFIG.sessionKey, 'true');
        
        // Optional: Set cookie for longer persistence
        setCookie(AGE_GATE_CONFIG.cookieKey, 'true', AGE_GATE_CONFIG.cookieExpiryDays);
    }

    // Cookie helper functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Clear age verification (useful for testing or logout)
    function clearAgeVerification() {
        sessionStorage.removeItem(AGE_GATE_CONFIG.sessionKey);
        setCookie(AGE_GATE_CONFIG.cookieKey, '', -1); // Delete cookie
    }

    // Redirect to age gate
    function redirectToAgeGate() {
        window.location.href = AGE_GATE_CONFIG.ageGatePage;
    }

    // Main age gate check function
    function checkAgeGate() {
        // Skip check if we're already on the age gate page
        if (isAgeGatePage()) {
            return;
        }

        // Skip check if user is already verified
        if (isAgeVerified()) {
            return;
        }

        // Redirect to age gate if not verified
        redirectToAgeGate();
    }

    // Initialize age gate protection
    function initAgeGate() {
        // Run check immediately
        checkAgeGate();

        // Also check when page becomes visible (tab switching)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                checkAgeGate();
            }
        });
    }

    // Expose functions globally for manual control if needed
    window.ageGate = {
        check: checkAgeGate,
        setVerified: setAgeVerified,
        clearVerification: clearAgeVerification,
        isVerified: isAgeVerified
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAgeGate);
    } else {
        initAgeGate();
    }

    console.log('Age gate protection initialized');
})();











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

    if (!mobileToggle || !navMenu) return;

    // Toggle mobile menu when hamburger is clicked
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Handle body scroll lock
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
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
            if (mobileToggle && navMenu) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close modals
            closeShootShotModal();
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
    const serviceButtons = document.querySelectorAll('.button-cta, .service-cta');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple effect for form submit buttons to avoid interference
            if (this.type === 'submit') return;
            
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
                case 'Get coaching':
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
    if (!header) return;
    
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

// =============================================================================
// SHOOT YOUR SHOT MODAL FUNCTIONS
// =============================================================================

function openShootShotModal() {
    const modal = document.getElementById('shootShotModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set current month for verification
        updateCurrentMonth();
    }
}

function closeShootShotModal() {
    const modal = document.getElementById('shootShotModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset form if it exists
        const form = document.getElementById('shootShotForm');
        if (form) {
            form.reset();
            
            // Reset all hidden checkbox fields
            document.querySelectorAll('[id$="Hidden"]').forEach(hidden => {
                hidden.value = '';
            });
        }
    }
}

// Update current month for verification
function updateCurrentMonth() {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const monthElements = document.querySelectorAll('#currentMonth, #shootCurrentMonth');
    monthElements.forEach(el => {
        if (el) el.textContent = currentMonth;
    });
}

// FIXED: Handle Shoot Your Shot form submission with proper checkbox handling
function initializeShootYourShotForm() {
    const form = document.getElementById('shootShotForm');
    if (!form) return;

    // Function to update checkbox groups - collect checked values into hidden inputs
    function updateCheckboxGroups() {
        // Define checkbox groups with their specific selectors
        const checkboxGroups = [
            {
                selector: 'input[id^="shoot-platform-"]',
                hiddenId: 'shootPlatformsHidden'
            },
            {
                selector: 'input[id^="shoot-looking-"]',
                hiddenId: 'shootLookingForHidden'
            },
            {
                selector: 'input[id^="shoot-scene-"]',
                hiddenId: 'shootSceneTypeHidden'
            },
            {
                selector: 'input[id^="shoot-niche-"]',
                hiddenId: 'shootNicheHidden'
            },
            {
                selector: 'input[id^="shoot-hosting-"]',
                hiddenId: 'shootHostingHidden'
            }
        ];

        checkboxGroups.forEach(group => {
            const checkboxes = document.querySelectorAll(group.selector);
            const hiddenField = document.getElementById(group.hiddenId);
            
            if (hiddenField) {
                const selectedValues = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                hiddenField.value = selectedValues.join(', ');
            }
        });
    }

    // Update checkbox groups when any checkbox changes
    form.addEventListener('change', function(e) {
        if (e.target.classList.contains('platform-checkbox')) {
            updateCheckboxGroups();
        }
    });

    // Set current month for verification
    const monthElement = document.getElementById('shootCurrentMonth');
    if (monthElement) {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        monthElement.textContent = currentMonth;
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update checkbox groups before submission
        updateCheckboxGroups();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Create FormData object
        const formData = new FormData(form);
        
        console.log('Shoot Your Shot submission:', Object.fromEntries(formData));
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Success - close modal and redirect to success page
                closeShootShotModal();
                window.location.href = '/success';
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Initialize checkbox groups for real-time updates
function initializeShootYourShotCheckboxes() {
    const checkboxGroups = [
        { prefix: 'shoot-platform-', hiddenId: 'shootPlatformsHidden' },
        { prefix: 'shoot-looking-', hiddenId: 'shootLookingForHidden' },
        { prefix: 'shoot-scene-', hiddenId: 'shootSceneTypeHidden' },
        { prefix: 'shoot-niche-', hiddenId: 'shootNicheHidden' },
        { prefix: 'shoot-hosting-', hiddenId: 'shootHostingHidden' }
    ];

    checkboxGroups.forEach(group => {
        const checkboxes = document.querySelectorAll(`input[id^="${group.prefix}"]`);
        const hiddenField = document.getElementById(group.hiddenId);

        if (hiddenField) {
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const selectedValues = Array.from(checkboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.value);
                    hiddenField.value = selectedValues.join(', ');
                });
            });
        }
    });
}

// =============================================================================
// NEWSLETTER FUNCTIONALITY
// =============================================================================

function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    const emailInput = form.querySelector('input[name="email"]');
    const gdprCheckbox = document.getElementById('gdprConsent');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!emailInput || !gdprCheckbox || !submitButton) return;

    // Validate form before submission
    function validateForm() {
        const email = emailInput.value.trim();
        const gdprChecked = gdprCheckbox.checked;
        
        // Enable/disable submit button based on validation
        const isValid = email && isValidEmail(email) && gdprChecked;
        submitButton.disabled = !isValid;
        
        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message helper
    function showMessage(message, type) {
        const messageDiv = document.getElementById('formMessage');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `form-message ${type}`;
            messageDiv.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            // Fallback to alert if no message div
            alert(message);
        }
    }

    // Add event listeners
    emailInput.addEventListener('input', validateForm);
    gdprCheckbox.addEventListener('change', validateForm);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showMessage('Please enter a valid email and accept our terms.', 'error');
            return;
        }

        // Create FormData object
        const formData = new FormData(form);
        
        // Add GDPR consent to form data
        formData.append('gdpr-consent', gdprCheckbox.checked ? 'yes' : 'no');

        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Success - redirect to thank you page
                window.location.href = '/subscribed';
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('Something went wrong. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
        });
    });

    // Initial validation
    validateForm();
}



// Close modal when clicking outside


// =============================================================================
// WINDOW RESIZE HANDLER
// =============================================================================

function handleWindowResize() {
    window.addEventListener('resize', () => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileToggle && navMenu) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing The Link Board resources...');
    
    // Initialize core functionality
    initializeMobileMenu();
    initializeKeyboardNavigation();
    initializeAccordionAccessibility();
    initializeServiceButtons();
    
    // Initialize enhanced features
    initializeHeaderScrollEffects();
    initializeIntersectionObserver();
    enhanceScrolling();
    handleWindowResize();
    
    // Initialize modal functionality
    initializeModalCloseHandlers();
    
    // Initialize forms
    initializeShootYourShotForm();
    initializeShootYourShotCheckboxes();
    initializeNewsletterForm();
    
    // Add dynamic styles
    addRippleStyles();
    
    // Set current month for verification
    updateCurrentMonth();
    
    console.log('The Link Board resources loaded successfully');
});

// =============================================================================
// GLOBAL FUNCTIONS (for onclick handlers in HTML)
// =============================================================================

// Make functions available globally for HTML onclick handlers
window.toggleAccordion = toggleAccordion;
window.openShootShotModal = openShootShotModal;
window.closeShootShotModal = closeShootShotModal;

// =============================================================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleAccordion,
        openShootShotModal,
        closeShootShotModal,
        initializeMobileMenu,
        initializeKeyboardNavigation,
        initializeAccordionAccessibility,
        initializeServiceButtons,
        initializeNewsletterForm,
        initializeShootYourShotForm
    };
}



