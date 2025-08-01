// CLEANED UP JAVASCRIPT FOR SOFTLY LINKED

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
function initializeModalEvents() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const shootShotModal = document.getElementById('shootShotModal');
        
        if (e.target === shootShotModal) {
            closeShootShotModal();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeShootShotModal();
        }
    });
}

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

// Form submission with Netlify support
function initializeForm() {
    const form = document.getElementById('shootShotForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Shoot Your Shot submission:', data);
        
        try {
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
                
                // Close modal and reset form
                closeShootShotModal();
                form.reset();
                
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    });
}

// Interactive button effects
function initializeButtonEffects() {
    document.querySelectorAll('button, .submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple effect for disabled buttons
            if (this.disabled) return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
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
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Debounce search
            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    console.log('Searching for:', query);
                    performSearch(query);
                }
            }, 300);
        });
    }
}

// Search implementation
function performSearch(query) {
    // Add your search logic here
    // This could search through stories, content, etc.
    console.log('Performing search for:', query);
}

// Add CSS for ripple animation if not already present
function addRippleCSS() {
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
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
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add necessary CSS
    addRippleCSS();
    
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
