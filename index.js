
// Age Gate Protection Script got all pages
(function() {
    'use strict';
    
    // Configuration
    const AGE_GATE_CONFIG = {
        ageGatePage: '/age-gate',      // Clean URL without .html
        sessionKey: 'ageVerified',     // SessionStorage key
        cookieKey: 'age_verified',     // Cookie key (optional, for longer persistence)
        cookieExpiryDays: 30,          // Cookie expiry in days
        returnUrl: 'age_gate_return'   // SessionStorage key for return URL
    };

    // Get current page URL (for returning after verification)
    function getCurrentPageUrl() {
        return window.location.pathname + window.location.search;
    }

    // Store where user should return after age verification
    function storeReturnUrl() {
        sessionStorage.setItem(AGE_GATE_CONFIG.returnUrl, getCurrentPageUrl());
    }

    // Get stored return URL
    function getReturnUrl() {
        const returnUrl = sessionStorage.getItem(AGE_GATE_CONFIG.returnUrl);
        // Clear it after getting it
        sessionStorage.removeItem(AGE_GATE_CONFIG.returnUrl);
        return returnUrl || '/'; // Default to homepage if no return URL
    }

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
        sessionStorage.removeItem(AGE_GATE_CONFIG.returnUrl);
        setCookie(AGE_GATE_CONFIG.cookieKey, '', -1); // Delete cookie
    }

    // Redirect to age gate
    function redirectToAgeGate() {
        // Store current page so user can return here after verification
        storeReturnUrl();
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
        isVerified: isAgeVerified,
        getReturnUrl: getReturnUrl
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAgeGate);
    } else {
        initAgeGate();
    }

    console.log('Age gate protection initialized for:', getCurrentPageUrl());
})();










// Scroll progress indicator
function updateScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;
    
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    indicator.style.width = Math.max(0, Math.min(100, scrolled)) + '%';
}

// Liquid cursor trail
function createCursorTrail() {
    const trail = document.getElementById('cursorTrail');
    if (!trail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`;
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;

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

// Stories Carousel Functionality
let storiesCurrentSlide = 0;
let storiesSlidesPerView = 3;
let storiesTotalSlides = 0;

function updateStoriesSlidesPerView() {
    const width = window.innerWidth;
    if (width < 768) {
        storiesSlidesPerView = 1;
    } else if (width < 1100) {
        storiesSlidesPerView = 2;
    } else {
        storiesSlidesPerView = 3;
    }
}

function createStoriesIndicators() {
    const indicatorsContainer = document.getElementById('storiesCarouselIndicators');
    if (!indicatorsContainer) return;
    
    const maxSlides = Math.max(0, storiesTotalSlides - storiesSlidesPerView + 1);
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < maxSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = `carousel-indicator ${i === storiesCurrentSlide ? 'active' : ''}`;
        indicator.onclick = () => goToStoriesSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
}

function slideStoriesCarousel(direction) {
    const maxSlides = Math.max(0, storiesTotalSlides - storiesSlidesPerView);
    
    if (direction === 'next' && storiesCurrentSlide < maxSlides) {
        storiesCurrentSlide++;
    } else if (direction === 'prev' && storiesCurrentSlide > 0) {
        storiesCurrentSlide--;
    }
    
    updateStoriesCarouselPosition();
    updateStoriesNavigation();
    updateStoriesIndicators();
}

function goToStoriesSlide(slideIndex) {
    const maxSlides = Math.max(0, storiesTotalSlides - storiesSlidesPerView);
    storiesCurrentSlide = Math.max(0, Math.min(slideIndex, maxSlides));
    
    updateStoriesCarouselPosition();
    updateStoriesNavigation();
    updateStoriesIndicators();
}

function updateStoriesCarouselPosition() {
    const carousel = document.getElementById('storiesCarousel');
    if (!carousel) return;
    
    const firstCard = carousel.querySelector('.story-card');
    if (!firstCard) return;
    
    const cardWidth = firstCard.offsetWidth;
    const gap = 30; // gap from CSS
    const translateX = -(storiesCurrentSlide * (cardWidth + gap));
    
    carousel.style.transform = `translateX(${translateX}px)`;
}

function updateStoriesNavigation() {
    const prevBtn = document.getElementById('storiesPrevBtn');
    const nextBtn = document.getElementById('storiesNextBtn');
    
    if (!prevBtn || !nextBtn) return;
    
    const maxSlides = Math.max(0, storiesTotalSlides - storiesSlidesPerView);
    
    prevBtn.disabled = storiesCurrentSlide === 0;
    nextBtn.disabled = storiesCurrentSlide >= maxSlides;
}

function updateStoriesIndicators() {
    const indicators = document.querySelectorAll('#storiesCarouselIndicators .carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === storiesCurrentSlide);
    });
}

function handleStoriesResize() {
    const previousSlidesPerView = storiesSlidesPerView;
    updateStoriesSlidesPerView();
    
    if (previousSlidesPerView !== storiesSlidesPerView) {
        const maxSlides = Math.max(0, storiesTotalSlides - storiesSlidesPerView);
        storiesCurrentSlide = Math.min(storiesCurrentSlide, maxSlides);
        
        createStoriesIndicators();
        updateStoriesCarouselPosition();
        updateStoriesNavigation();
    } else {
        updateStoriesCarouselPosition();
    }
}

function initializeStoriesCarousel() {
    const carousel = document.getElementById('storiesCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.story-card');
    storiesTotalSlides = cards.length;
    
    if (storiesTotalSlides === 0) return;
    
    updateStoriesSlidesPerView();
    createStoriesIndicators();
    updateStoriesNavigation();
    
    window.addEventListener('resize', handleStoriesResize);
}

// Modal Functions
function openShootShotModal() {
    const modal = document.getElementById('shootShotModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        // Fallback if modal doesn't exist
        alert('Submit a Link Up modal would open here');
    }
}

function closeShootShotModal() {
    const modal = document.getElementById('shootShotModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        const form = document.getElementById('shootShotForm');
        if (form) form.reset();
    }
}


// Modal close on outside click and escape key



// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// FIXED: Form submission that works with Netlify Forms
function initializeForm() {
    const form = document.getElementById('shootShotForm');
    if (!form) return;
    
    // Handle checkbox groups - collect checked values into hidden inputs
    function updateCheckboxGroups() {
        // Platforms
        const platformCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
        const platformsHidden = document.getElementById('shootPlatformsHidden');
        if (platformsHidden) {
            const checkedPlatforms = Array.from(platformCheckboxes)
                .filter(cb => cb.checked && cb.closest('.form-group').querySelector('label').textContent.includes('Your Platforms'))
                .map(cb => cb.value);
            platformsHidden.value = checkedPlatforms.join(', ');
        }
        
        // Looking For
        const lookingForCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
        const lookingForHidden = document.getElementById('shootLookingForHidden');
        if (lookingForHidden) {
            const checkedLookingFor = Array.from(lookingForCheckboxes)
                .filter(cb => cb.checked && cb.closest('.form-group').querySelector('label').textContent.includes('Looking for'))
                .map(cb => cb.value);
            lookingForHidden.value = checkedLookingFor.join(', ');
        }
        
        // Scene Type
        const sceneTypeCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
        const sceneTypeHidden = document.getElementById('shootSceneTypeHidden');
        if (sceneTypeHidden) {
            const checkedSceneType = Array.from(sceneTypeCheckboxes)
                .filter(cb => cb.checked && cb.closest('.form-group').querySelector('label').textContent.includes('What type of scenes'))
                .map(cb => cb.value);
            sceneTypeHidden.value = checkedSceneType.join(', ');
        }
        
        // Niche
        const nicheCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
        const nicheHidden = document.getElementById('shootNicheHidden');
        if (nicheHidden) {
            const checkedNiche = Array.from(nicheCheckboxes)
                .filter(cb => cb.checked && cb.closest('.form-group').querySelector('label').textContent.includes('What type of niche'))
                .map(cb => cb.value);
            nicheHidden.value = checkedNiche.join(', ');
        }
        
        // Hosting
        const hostingCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
        const hostingHidden = document.getElementById('shootHostingHidden');
        if (hostingHidden) {
            const checkedHosting = Array.from(hostingCheckboxes)
                .filter(cb => cb.checked && cb.closest('.form-group').querySelector('label').textContent.includes('Hosting'))
                .map(cb => cb.value);
            hostingHidden.value = checkedHosting.join(', ');
        }
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
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update checkbox groups before submission
        updateCheckboxGroups();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Shoot Your Shot submission:', data);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"], .submit-btn');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
        }
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Close modal and redirect to success page
            closeShootShotModal();
            window.location.href = '/success';
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            alert('There was an error submitting your form. Please try again.');
            
            // Reset button state
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

// Interactive button effects
function initializeButtonEffects() {
    document.querySelectorAll('button, .submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple effect for form submit buttons to avoid interference
            if (this.type === 'submit') return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Searching for:', this.value);
            // Add your search functionality here
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    createCursorTrail();
    initializeMobileMenu();
    initializeStoriesCarousel();
    
    // Modal and form functionality
    initializeForm();
    initializeModalEvents();
    
    // UI enhancements
    initializeSmoothScrolling();
    initializeButtonEffects();
    initializeSearch();
    
    // Scroll events
    window.addEventListener('scroll', updateScrollIndicator);
    
    console.log('Softly Linked website initialized successfully!');
});




