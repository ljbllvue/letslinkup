// Age Gate Protection Script for all pages
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















// Sample data for Link Ups - UPDATED WITH CORRECT GENDER TERMINOLOGY
const linkUps = [
    {
        id: 1,
        creator: "Miss Kiskeya",
        type: "Creator",
        platforms: ["Clips4Sale", "LoyalFans", "ManyVids"],
        gender: "Woman",
        location: "Berlin",
        followers: "1.2k",
        followerCount: 1000,
        experience: "Experienced",
        contentTypes: ["G/G", "Femdom", "Fetish"],
        lookingFor: ["Woman", "Non-binary"],
        sceneTypes: ["No PIV", "No sex"],
        tags: ["kinky", "gg", "fetish", "femdom"],
        canHost: "Yes",
        hostingCost: "Covered",
        requirements: "Must be willing to show face",
        sceneSummary: "Looking to film hot femdom scenes with queer women involving role-play...",
        shootDates: "Available from 25 Sept – 21 Oct",
        shootMonth: "2025-10",
        socialLinks: {
        twitter: "@misskiskeya"
        }
    },
    {
        id: 2,
        creator: "Alex Chen",
        type: "Creator",
        platforms: ["OnlyFans", "Fansly"],
        gender: "Man",
        location: "New York, NY",
        followers: "10k-50k",
        followerCount: 25000,
        experience: "New",
        contentTypes: ["B/G", "Couple"],
        lookingFor: ["Woman"],
        sceneTypes: ["Sex", "PIV", "👀"],
        tags: ["bg", "couple", "vanilla"],
        canHost: "No",
        hostingCost: "N/A",
        requirements: "Experience with photography/videography preferred, must be comfortable with artistic direction",
        sceneSummary: "Professional photographer seeking collaborative content creation. Specializing in aesthetic, high-quality productions with emphasis on lighting and composition.",
        shootDates: "Flexible - April 2024",
        shootMonth: "2024-04",
        socialLinks: {
            instagram: "@alexchen_photo",
            twitter: "@alexchenart"
        }
    },
    {
        id: 3,
        creator: "Riley Storm",
        type: "Creator",
        platforms: ["OnlyFans", "ManyVids", "Clips4Sale"],
        gender: "Non-binary",
        location: "Miami, FL",
        followers: "25k-50k",
        followerCount: 35000,
        experience: "Experienced",
        contentTypes: ["Fetish", "Kinky"],
        lookingFor: ["Woman", "Man", "Non-binary"],
        sceneTypes: ["Sex", "No PIV", "Anal", "👀"],
        tags: ["fetish", "femdom", "kinky"],
        canHost: "Yes",
        hostingCost: "Split",
        requirements: "Open-minded, willing to explore alternative themes, must respect boundaries",
        sceneSummary: "Alternative aesthetic creator looking for unique, boundary-pushing content. Open to experimental themes and artistic expression.",
        shootDates: "March 22-25, 2024",
        shootMonth: "2024-03",
        socialLinks: {
            instagram: "@riley_storm_",
            twitter: "@rileystormalt"
        }
    },
    {
        id: 4,
        creator: "Diamond & Co.",
        type: "Agency",
        platforms: ["OnlyFans", "JustForFans"],
        gender: "Woman",
        location: "Las Vegas, NV",
        followers: "100k+",
        followerCount: 250000,
        experience: "Veteran",
        contentTypes: ["G/G", "Group"],
        lookingFor: ["Woman"],
        sceneTypes: ["Sex", "PIV", "No PIV"],
        tags: ["gg", "group", "vanilla"],
        canHost: "Yes",
        hostingCost: "Covered",
        requirements: "Minimum 10k followers, professional portfolio required, must sign exclusivity agreement",
        sceneSummary: "Luxury content studio specializing in high-end productions. Looking for creators who want to be part of exclusive, premium content series.",
        shootDates: "Available weekly",
        shootMonth: "ongoing",
        isOngoing: true,
        socialLinks: {
            instagram: "@diamondco_official",
            twitter: "@diamondco_lux"
        }
    },
    {
        id: 5,
        creator: "Marco Rossi",
        type: "Creator",
        platforms: ["OnlyFans", "Pornhub"],
        gender: "Man",
        location: "Berlin, Germany",
        followers: "15k-25k",
        followerCount: 20000,
        experience: "Experienced",
        contentTypes: ["B/G", "Gay"],
        lookingFor: ["Man", "Trans Man"],
        sceneTypes: ["Sex", "PIV", "Anal"],
        tags: ["bg", "gay", "vanilla"],
        canHost: "Yes",
        hostingCost: "On you",
        requirements: "Conversational English/German, travel documents ready, cultural sensitivity appreciated",
        sceneSummary: "European creator focused on cinematic, story-driven adult content. Looking for international collaborations with creative storytellers.",
        shootDates: "May 1-15, 2024",
        shootMonth: "2024-05",
        socialLinks: {
            instagram: "@marco.rossi.art"
        }
    },
    {
        id: 6,
        creator: "Scarlett Moon",
        type: "Creator",
        platforms: ["OnlyFans", "ManyVids"],
        gender: "Trans Woman",
        location: "London, UK",
        followers: "75k-100k",
        followerCount: 85000,
        experience: "Just Starting",
        contentTypes: ["Cosplay", "Taboo"],
        lookingFor: ["Woman", "Trans Woman"],
        sceneTypes: ["No Sex", "👀"],
        tags: ["fetish", "cosplay", "taboo"],
        canHost: "No",
        hostingCost: "N/A",
        requirements: "Must provide own costumes/props, comfortable with character roleplay, anime knowledge preferred",
        sceneSummary: "Cosplay specialist looking for themed collaborative content. Interested in fantasy, sci-fi, and anime-inspired productions.",
        shootDates: "April 10-14, 2024",
        shootMonth: "2024-04",
        socialLinks: {
            instagram: "@scarlett_moon_cos",
            twitter: "@scarlettmooncos"
        }
    },
    {
        id: 7,
        creator: "Tech Solutions Inc",
        type: "Studio", 
        platforms: ["LoyalFans", "JustForFans"],
        gender: "Man",
        location: "Toronto, Canada",
        followers: "5k-10k",
        followerCount: 7500,
        experience: "New",
        contentTypes: ["B/G", "Tech"],
        lookingFor: ["Woman", "Non-binary"],
        sceneTypes: ["Sex", "PIV", "👀"],
        tags: ["bg", "vanilla"],
        canHost: "Yes",
        hostingCost: "Split",
        requirements: "Must be tech-savvy, comfortable with high-end equipment",
        sceneSummary: "Technology-focused studio creating innovative adult content with cutting-edge equipment.",
        shootDates: "June 1-30, 2024",
        shootMonth: "2024-06",
        socialLinks: {
            instagram: "@techsolutions"
        }
    },
    {
        id: 8,
        creator: "Maya Rodriguez",
        type: "Creator",
        platforms: ["Fansly", "Clips4Sale"],
        gender: "Trans Man",
        location: "Mexico City, Mexico",
        followers: "1k-10k",
        followerCount: 3500,
        experience: "Just Starting",
        contentTypes: ["Solo", "Educational"],
        lookingFor: ["Woman", "Trans Woman"],
        sceneTypes: ["No Sex", "👀"],
        tags: ["vanilla"],
        canHost: "No",
        hostingCost: "N/A",
        requirements: "LGBTQ+ friendly, educational focus preferred",
        sceneSummary: "New creator focusing on educational and inclusive content for the LGBTQ+ community.",
        shootDates: "July 15-25, 2024",
        shootMonth: "2024-07",
        socialLinks: {
            instagram: "@maya_educator"
        }
    },
    {
        id: 9,
        creator: "Zoe & Blake Productions",
        type: "Couple",
        platforms: ["OnlyFans", "ManyVids", "Pornhub"],
        gender: "Couple",
        location: "Austin, TX",
        followers: "100k+",
        followerCount: 120000,
        experience: "Veteran",
        contentTypes: ["B/G", "Couple", "Amateur"],
        lookingFor: ["Woman", "Man", "Couple"],
        sceneTypes: ["Sex", "PIV", "Anal"],
        tags: ["bg", "couple", "vanilla"],
        canHost: "Yes",
        hostingCost: "Covered",
        requirements: "Must be comfortable with couple dynamics, willing to sign content release forms, recent STI testing required",
        sceneSummary: "Established couple creating authentic, passionate content. Looking for singles or other couples for threesome/foursome content with focus on real chemistry and connection.",
        shootDates: "August 5-12, 2024",
        shootMonth: "2024-08",
        socialLinks: {
            instagram: "@zoeblakeproductions",
            twitter: "@zoeblake_xxx"
        }
    },
    {
        id: 10,
        creator: "Phoenix Rising Studio",
        type: "Studio",
        platforms: ["OnlyFans", "JustForFans", "LoyalFans"],
        gender: "Mixed",
        location: "Phoenix, AZ",
        followers: "250k+",
        followerCount: 275000,
        experience: "Veteran",
        contentTypes: ["B/G", "G/G", "Group", "Fetish"],
        lookingFor: ["Woman", "Man"],
        sceneTypes: ["Sex", "PIV", "No PIV"],
        tags: ["bg", "gg", "group", "fetish", "kinky"],
        canHost: "Yes",
        hostingCost: "Covered",
        requirements: "Professional experience required, must have 25k+ followers, portfolio review necessary, exclusive 6-month contract",
        sceneSummary: "Premium adult content studio specializing in high-production value scenes. State-of-the-art facility with professional lighting, multiple sets, and experienced crew. Seeking established creators for ongoing collaboration series.",
        shootDates: "Available year-round",
        shootMonth: "ongoing",
        isOngoing: true,
        socialLinks: {
            instagram: "@phoenixrisingstudio",
            twitter: "@phoenixrising_xxx"
        }
    },
    {
        id: 11,
        creator: "Sage Wilde",
        type: "Creator",
        platforms: ["Fansly", "OnlyFans"],
        gender: "Non-binary",
        location: "Portland, OR",
        followers: "15k-25k",
        followerCount: 18500,
        experience: "Experienced",
        contentTypes: ["Solo", "Artistic", "Alternative"],
        lookingFor: ["Woman", "Non-binary", "Trans Woman"],
        sceneTypes: ["No Sex", "👀"],
        tags: ["fetish", "kinky", "vanilla"],
        canHost: "Yes",
        hostingCost: "Split",
        requirements: "Open to alternative expressions, body-positive mindset, comfortable with artistic nudity and creative direction",
        sceneSummary: "Alternative artist creating boundary-pushing content that blends eroticism with fine art. Interested in collaborative pieces that challenge conventional adult content norms while maintaining sensual appeal.",
        shootDates: "September 10-20, 2024",
        shootMonth: "2024-09",
        socialLinks: {
            instagram: "@sagewilde_art",
            twitter: "@sagewilde"
        }
    },
    {
        id: 12,
        creator: "Velvet Dreams Collective",
        type: "Agency",
        platforms: ["OnlyFans", "ManyVids", "Fansly"],
        gender: "Mixed",
        location: "Miami, FL",
        followers: "500k+",
        followerCount: 650000,
        experience: "Veteran",
        contentTypes: ["B/G", "G/G", "Group", "Luxury"],
        lookingFor: ["Woman", "Man"],
        sceneTypes: ["Sex", "PIV", "No PIV"],
        tags: ["bg", "gg", "group", "vanilla"],
        canHost: "Yes",
        hostingCost: "Covered",
        requirements: "Professional models only, must have 50k+ followers, exclusive representation preferred, wardrobe and styling provided",
        sceneSummary: "Elite adult entertainment collective specializing in luxury lifestyle content. We offer ongoing partnerships with top-tier creators for premium brand collaborations, yacht shoots, international travel content, and high-end production series.",
        shootDates: "Flexible scheduling - ongoing opportunities",
        shootMonth: "ongoing",
        isOngoing: true,
        socialLinks: {
            instagram: "@velvetdreamscollective",
            twitter: "@velvetdreams_vip"
        }
    }
];

let filteredLinkUps = [...linkUps];
let activeFilter = null;
let advancedFilters = {
    date: '',
    availability: '',
    platform: '',
    experience: '',
    gender: '',
    followers: '',
    lookingFor: '',
    sceneType: ''
};

// Pagination and routing variables
let currentPage = 1;
const itemsPerPage = 9;
let totalPages = 1;
let currentLinkUpId = null;

// FIXED: Checkbox to String Conversion Functions with proper error checking
function updateInterestPlatforms() {
    const checkboxes = document.querySelectorAll('#interestForm .platform-checkbox:checked');
    const hiddenField = document.getElementById('yourPlatformsHidden');
    
    if (!hiddenField) {
        console.error('yourPlatformsHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Interest platforms updated:', hiddenField.value);
}

function updateShootPlatforms() {
    const checkboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-platform-"]:checked');
    const hiddenField = document.getElementById('shootPlatformsHidden');
    
    if (!hiddenField) {
        console.error('shootPlatformsHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Shoot platforms updated:', hiddenField.value);
}

function updateShootLookingFor() {
    const checkboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-looking-"]:checked');
    const hiddenField = document.getElementById('shootLookingForHidden');
    
    if (!hiddenField) {
        console.error('shootLookingForHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Shoot looking for updated:', hiddenField.value);
}

function updateShootSceneType() {
    const checkboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-scene-"]:checked');
    const hiddenField = document.getElementById('shootSceneTypeHidden');
    
    if (!hiddenField) {
        console.error('shootSceneTypeHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Shoot scene type updated:', hiddenField.value);
}

function updateShootNiche() {
    const checkboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-niche-"]:checked');
    const hiddenField = document.getElementById('shootNicheHidden');
    
    if (!hiddenField) {
        console.error('shootNicheHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Shoot niche updated:', hiddenField.value);
}

function updateShootHosting() {
    const checkboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-hosting-"]:checked');
    const hiddenField = document.getElementById('shootHostingHidden');
    
    if (!hiddenField) {
        console.error('shootHostingHidden field not found!');
        return;
    }
    
    const selected = Array.from(checkboxes).map(cb => cb.value);
    hiddenField.value = selected.join(', ');
    console.log('Shoot hosting updated:', hiddenField.value);
}

// Custom Dropdown Functions
function toggleCustomDropdown(type) {
    const dropdown = document.getElementById(type + '-dropdown');
    const isVisible = dropdown.classList.contains('show');
    
    // Close all dropdowns
    document.querySelectorAll('.custom-select-dropdown').forEach(d => d.classList.remove('show'));
    
    // Toggle the clicked dropdown
    if (!isVisible) {
        dropdown.classList.add('show');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select-container')) {
        document.querySelectorAll('.custom-select-dropdown').forEach(d => d.classList.remove('show'));
    }
});

// Handle custom dropdown option selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('custom-select-option')) {
        const dropdown = e.target.parentElement;
        const input = dropdown.parentElement.querySelector('.custom-select-input');
        const value = e.target.dataset.value;
        const text = e.target.textContent;
        
        // Remove selected class from all options in this dropdown
        dropdown.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        e.target.classList.add('selected');
        
        // Update input value
        input.value = text;
        input.dataset.value = value;
        
        // Close dropdown
        dropdown.classList.remove('show');
    }
});

// Advanced Filter Functions
function toggleFilterBar() {
    const filterGrid = document.getElementById('filterGrid');
    const toggleBtn = document.querySelector('.filter-toggle-btn');
    const filterActions = document.querySelector('.filter-actions');
    
    if (filterGrid.style.display === 'none') {
        filterGrid.style.display = 'grid';
        filterActions.style.display = 'flex';
        toggleBtn.textContent = 'Hide Filters';
    } else {
        filterGrid.style.display = 'none';
        filterActions.style.display = 'none';
        toggleBtn.textContent = 'Show Filters';
    }
}

// Initialize Flatpickr month picker
function initializeDatePicker() {
    // Check if flatpickr and monthSelectPlugin are available
    if (typeof flatpickr !== 'undefined') {
        try {
            // Check if monthSelectPlugin is available
            if (typeof monthSelectPlugin !== 'undefined') {
                flatpickr("#filterDate", {
                    plugins: [
                        new monthSelectPlugin({
                            shorthand: true,
                            dateFormat: "Y-m",
                            altFormat: "F Y",
                            theme: "light"
                        })
                    ],
                    onChange: function(selectedDates, dateStr, instance) {
                        applyAdvancedFilters();
                    }
                });
            } else {
                // Use regular flatpickr without month plugin
                flatpickr("#filterDate", {
                    dateFormat: "Y-m",
                    onChange: function(selectedDates, dateStr, instance) {
                        applyAdvancedFilters();
                    }
                });
            }
        } catch (error) {
            console.log('Flatpickr initialization failed, using native month input:', error);
            document.getElementById('filterDate').addEventListener('change', function() {
                applyAdvancedFilters();
            });
        }
    } else {
        console.log('Flatpickr not available, using native month input');
        document.getElementById('filterDate').addEventListener('change', function() {
            applyAdvancedFilters();
        });
    }
}

function clearAllFilters() {
    // Clear advanced filters
    const dateInput = document.getElementById('filterDate');
    
    // Clear both native month input and Flatpickr if present
    dateInput.value = '';
    if (dateInput._flatpickr) {
        dateInput._flatpickr.clear();
    }
    
    // Clear custom dropdowns
    const customInputs = ['filterAvailability', 'filterPlatform', 'filterExperience', 'filterGender', 'filterFollowers', 'filterLookingFor', 'filterSceneType'];
    customInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            const dropdown = input.parentElement.querySelector('.custom-select-dropdown');
            
            if (dropdown) {
                // Reset to first option (All...)
                const firstOption = dropdown.querySelector('.custom-select-option');
                if (firstOption) {
                    input.value = firstOption.textContent;
                    input.dataset.value = firstOption.dataset.value;
                    
                    // Remove selected class from all options
                    dropdown.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));
                    firstOption.classList.add('selected');
                }
            }
        }
    });
    
    // Clear search
    const citySearch = document.getElementById('citySearch');
    if (citySearch) {
        citySearch.value = '';
    }
    
    // Clear tag filters
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    
    // Reset filter objects
    advancedFilters = {
        date: '',
        availability: '',
        platform: '',
        experience: '',
        gender: '',
        followers: '',
        lookingFor: '',
        sceneType: ''
    };
    activeFilter = null;
    
    // Reset pagination and apply filters
    currentPage = 1;
    applyAllFilters();
}

function applyAdvancedFilters() {
    // Get advanced filter values from custom dropdowns
    const dateInput = document.getElementById('filterDate');
    const availabilityInput = document.getElementById('filterAvailability');
    const platformInput = document.getElementById('filterPlatform');
    const experienceInput = document.getElementById('filterExperience');
    const genderInput = document.getElementById('filterGender');
    const followersInput = document.getElementById('filterFollowers');
    const lookingForInput = document.getElementById('filterLookingFor');
    const sceneTypeInput = document.getElementById('filterSceneType');
    
    advancedFilters.date = dateInput ? dateInput.value : '';
    advancedFilters.availability = availabilityInput ? (availabilityInput.dataset.value || '') : '';
    advancedFilters.platform = platformInput ? (platformInput.dataset.value || '') : '';
    advancedFilters.experience = experienceInput ? (experienceInput.dataset.value || '') : '';
    advancedFilters.gender = genderInput ? (genderInput.dataset.value || '') : '';
    advancedFilters.followers = followersInput ? (followersInput.dataset.value || '') : '';
    advancedFilters.lookingFor = lookingForInput ? (lookingForInput.dataset.value || '') : '';
    advancedFilters.sceneType = sceneTypeInput ? (sceneTypeInput.dataset.value || '') : '';
    
    applyAllFilters();
}

function matchesLookingForFilter(lookingFor, filterLookingFor) {
    if (!filterLookingFor) return true;
    return lookingFor && lookingFor.includes(filterLookingFor);
}

function matchesSceneTypeFilter(sceneTypes, filterSceneType) {
    if (!filterSceneType) return true;
    return sceneTypes && sceneTypes.includes(filterSceneType);
}

function matchesAvailabilityFilter(linkUp, availabilityFilter) {
    if (!availabilityFilter) return true;
    
    if (availabilityFilter === 'ongoing') {
        return linkUp.isOngoing === true || linkUp.shootMonth === 'ongoing';
    }
    
    return true;
}

function matchesFollowerRange(followerCount, range) {
    if (!range) return true;
    
    const [min, max] = range.split('-').map(num => parseInt(num));
    return followerCount >= min && followerCount <= max;
}

function matchesDateFilter(shootMonth, filterDate) {
    if (!filterDate) return true;
    return shootMonth === filterDate;
}

function matchesPlatformFilter(platforms, filterPlatform) {
    if (!filterPlatform) return true;
    return platforms.includes(filterPlatform);
}

function applyAllFilters() {
    const citySearch = document.getElementById('citySearch');
    const searchTerm = citySearch ? citySearch.value.toLowerCase().trim() : '';
    
    filteredLinkUps = linkUps.filter(linkUp => {
        // Search term filter
        const matchesSearch = !searchTerm || linkUp.location.toLowerCase().includes(searchTerm);
        
        // Tag filter
        const matchesTag = !activeFilter || linkUp.tags.includes(activeFilter);
        
        // Advanced filters
        const matchesDate = matchesDateFilter(linkUp.shootMonth, advancedFilters.date);
        const matchesAvailability = matchesAvailabilityFilter(linkUp, advancedFilters.availability);
        const matchesPlatform = matchesPlatformFilter(linkUp.platforms, advancedFilters.platform);
        const matchesExperience = !advancedFilters.experience || linkUp.experience === advancedFilters.experience;
        const matchesGender = !advancedFilters.gender || linkUp.gender === advancedFilters.gender;
        const matchesFollowers = matchesFollowerRange(linkUp.followerCount, advancedFilters.followers);
        const matchesLookingFor = matchesLookingForFilter(linkUp.lookingFor, advancedFilters.lookingFor);
        const matchesSceneType = matchesSceneTypeFilter(linkUp.sceneTypes, advancedFilters.sceneType);
        
        return matchesSearch && matchesTag && matchesDate && matchesAvailability && 
               matchesPlatform && matchesExperience && matchesGender && matchesFollowers &&
               matchesLookingFor && matchesSceneType;
    });
    
    // Reset to page 1 when filters change
    currentPage = 1;
    
    // Update pagination and render
    updatePagination();
    renderCurrentPage();
}

function updatePagination() {
    totalPages = Math.ceil(filteredLinkUps.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1; // Always show at least 1 page
    
    // Ensure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    
    renderPagination();
}

function renderPagination() {
    const paginationDiv = document.getElementById('pagination');
    if (!paginationDiv) return;
    
    // Don't show pagination if only 1 page
    if (totalPages <= 1) {
        paginationDiv.style.display = 'none';
        return;
    }
    
    paginationDiv.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    const prevDisabled = currentPage === 1;
    paginationHTML += `<button onclick="goToPage(${currentPage - 1})" ${prevDisabled ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>← Previous</button>`;
    
    // Page numbers (limit to reasonable number of page buttons)
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<button onclick="goToPage(${i})" class="${activeClass}">Page ${i}</button>`;
    }
    
    // Next button
    const nextDisabled = currentPage === totalPages;
    paginationHTML += `<button onclick="goToPage(${currentPage + 1})" ${nextDisabled ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Next →</button>`;
    
    paginationDiv.innerHTML = paginationHTML;
}

function renderCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageItems = filteredLinkUps.slice(startIndex, endIndex);
    
    renderLinkUps(currentPageItems);
}

function goToPage(page) {
    if (page < 1 || page > totalPages) {
        return;
    }
    
    currentPage = page;
    renderCurrentPage();
    renderPagination();
    
    // Scroll to top of results
    const linkUpsGrid = document.getElementById('linkUpsGrid');
    if (linkUpsGrid) {
        linkUpsGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderLinkUps(linkUpsToRender = filteredLinkUps) {
    const grid = document.getElementById('linkUpsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';




    
       // IMPORTANT : empty-state 
     if (!Array.isArray(linkUpsToRender) || linkUpsToRender.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>No results for your search.</p>
                <a href="linkboard.html" class="browse-link">
                    Browse the full Link Board
                </a>
            </div>
        `;

        /* hide pagination while empty */
        const pagination = document.getElementById('pagination');
        if (pagination) pagination.style.display = 'none';
        return;                       // ⬅️ stop here when nothing to render
    }

    /* show pagination again (if it exists) */
    const pagination = document.getElementById('pagination');
    if (pagination) pagination.style.display = '';
    


    
    linkUpsToRender.forEach(linkUp => {
        const card = document.createElement('div');
        card.className = 'link-up-card';
        card.onclick = () => openLinkUpPage(linkUp.id);
        
        // Social links HTML
        let socialLinksHtml = '';
        if (linkUp.socialLinks) {
            if (linkUp.socialLinks.instagram) {
                socialLinksHtml += `<a href="https://instagram.com/${linkUp.socialLinks.instagram.replace('@', '')}" target="_blank" class="social-link" onclick="event.stopPropagation();">📷 ${linkUp.socialLinks.instagram}</a>`;
            }
            if (linkUp.socialLinks.twitter) {
                socialLinksHtml += `<a href="https://twitter.com/${linkUp.socialLinks.twitter.replace('@', '')}" target="_blank" class="social-link" onclick="event.stopPropagation();">🐦 ${linkUp.socialLinks.twitter}</a>`;
            }
        }
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <div class="creator-info">
                        <div class="creator-name">${linkUp.creator}</div>
                        <div class="creator-type">${linkUp.type}</div>
                        <div class="social-links">
                            ${socialLinksHtml}
                        </div>
                    </div>
                    <div class="follower-tag">${linkUp.followers}</div>
                </div>
                <div class="card-info">
                    <div class="info-row">
                        <span class="info-label">Platforms :</span>
                        <div class="info-value">
                            <div class="platforms">
                                ${linkUp.platforms.map(platform => `<span class="platform-tag">${platform}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Gender :</span>
                        <span class="info-value">${linkUp.gender}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Location :</span>
                        <span class="info-value">${linkUp.location}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Can Host ?</span>
                        <span class="info-value">${linkUp.canHost}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Hosting Cost :</span>
                        <span class="info-value">${linkUp.hostingCost}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Content :</span>
                        <div class="info-value">
                            <div class="content-types">
                                ${linkUp.contentTypes.map(type => `<span class="content-tag">${type}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Looking For :</span>
                        <div class="info-value">
                            <div class="content-types">
                                ${(linkUp.lookingFor || []).map(type => `<span class="looking-tag">${type}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Scene Types :</span>
                        <div class="info-value">
                            <div class="content-types">
                                ${(linkUp.sceneTypes || []).map(type => `<span class="scene-tag">${type}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scene-summary">${linkUp.sceneSummary}</div>
                <div class="requirements-section">
                    <strong>Requirements :</strong> ${linkUp.requirements}
                </div>
                <div class="shoot-dates"><strong>Shoot Dates :</strong> ${linkUp.shootDates}</div>
                <button class="interested-btn" onclick="event.stopPropagation(); openInterestModal(${linkUp.id})">I'm Interested</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openInterestModal(linkUpId) {
    const linkUp = linkUps.find(lu => lu.id === linkUpId);
    if (!linkUp) return;

    const linkUpIdInput = document.getElementById('linkUpId');
    const targetCreatorNameInput = document.getElementById('targetCreatorName');
    const targetCreatorSpan = document.getElementById('targetCreator');
    const interestModal = document.getElementById('interestModal');
    
    if (linkUpIdInput) linkUpIdInput.value = linkUpId;
    if (targetCreatorNameInput) targetCreatorNameInput.value = linkUp.creator;
    if (targetCreatorSpan) targetCreatorSpan.textContent = linkUp.creator;
    
    if (interestModal) {
        interestModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const interestModal = document.getElementById('interestModal');
    const interestForm = document.getElementById('interestForm');
    const yourPlatformsHidden = document.getElementById('yourPlatformsHidden');
    
    if (interestModal) {
        interestModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (interestForm) {
        interestForm.reset();
    }
    
    if (yourPlatformsHidden) {
        yourPlatformsHidden.value = '';
    }
}

// Shoot Your Shot Modal Functions
function openShootShotModal() {
    const shootShotModal = document.getElementById('shootShotModal');
    
    if (shootShotModal) {
        shootShotModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Load saved data and set current month/year after modal is opened
        setTimeout(() => {
            loadSavedShootData();
            setShootCurrentMonthYear();
        }, 100);
    }
}

function closeShootShotModal() {
    const shootShotModal = document.getElementById('shootShotModal');
    const shootShotForm = document.getElementById('shootShotForm');
    
    if (shootShotModal) {
        shootShotModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (shootShotForm) {
        shootShotForm.reset();
    }
    
    // Clear all hidden fields
    const hiddenFields = [
        'shootPlatformsHidden',
        'shootLookingForHidden', 
        'shootSceneTypeHidden',
        'shootNicheHidden',
        'shootHostingHidden'
    ];
    
    hiddenFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = '';
        }
    });
}

/* MOBILE MENU - JavaScript for Mobile Menu Functionality */

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
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
}

// Filter tag functionality
function initializeFilterTags() {
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Toggle active state
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                activeFilter = null;
            } else {
                // Remove active from all tags
                document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                activeFilter = filter;
            }
            
            applyAllFilters();
        });
    });
}

function applyFilters() {
    applyAllFilters();
}

// Search functionality
function initializeSearch() {
    const citySearch = document.getElementById('citySearch');
    if (citySearch) {
        citySearch.addEventListener('input', function(e) {
            applyAllFilters();
        });
    }
}

// Close modal when clicking outside




// Handle browser back/forward buttons
function initializeRouting() {
    window.addEventListener('popstate', function(e) {
        handleURLChange();
    });

    // Handle direct URL access
    window.addEventListener('load', function() {
        handleURLChange();
    });
}

// Newsletter Form Submission
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const email = this.querySelector('.newsletter-input').value;
            const gdprConsent = document.getElementById('gdprConsent');
            
            if (!gdprConsent || !gdprConsent.checked) {
                e.preventDefault();
                alert('Please agree to receive marketing emails to subscribe.');
                return;
            }
            
            console.log('Newsletter subscription:', { email, gdprConsent: gdprConsent.checked });
            alert('Thank you for subscribing! You\'ll receive updates about new collaboration opportunities.');
            
            this.reset();
            if (gdprConsent) gdprConsent.checked = false;
        });
    }
}

// FIXED: Setup form event listeners for checkbox handling
function setupFormEventListeners() {
    // Interest form platform checkboxes
    const interestPlatformCheckboxes = document.querySelectorAll('#interestForm .platform-checkbox');
    interestPlatformCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateInterestPlatforms);
    });
    
    // Shoot form platform checkboxes
    const shootPlatformCheckboxes = document.querySelectorAll('#shootShotForm .platform-checkbox');
    shootPlatformCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShootPlatforms);
    });
    
    // Shoot form looking for checkboxes
    const shootLookingForCheckboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-looking-"]');
    shootLookingForCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShootLookingFor);
    });
    
    // Shoot form scene type checkboxes
    const shootSceneTypeCheckboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-scene-"]');
    shootSceneTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShootSceneType);
    });
    
    // Shoot form niche checkboxes
    const shootNicheCheckboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-niche-"]');
    shootNicheCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShootNiche);
    });
    
    // Shoot form hosting checkboxes
    const shootHostingCheckboxes = document.querySelectorAll('#shootShotForm input[id^="shoot-hosting-"]');
    shootHostingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShootHosting);
    });
    
    // FIXED: Form submission handlers
    const interestForm = document.getElementById('interestForm');
    if (interestForm) {
        interestForm.addEventListener('submit', function(e) {
            console.log('Interest form submitting...');
            
            // Update platforms before submission
            updateInterestPlatforms();
            
            // Log form data for debugging
            const formData = new FormData(this);
            console.log('Interest form data:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
        });
    }
    
    const shootForm = document.getElementById('shootShotForm');
    if (shootForm) {
        shootForm.addEventListener('submit', function(e) {
            console.log('Shoot form submitting...');
            
            // Update all multi-select fields before submission
            updateShootPlatforms();
            updateShootLookingFor();
            updateShootSceneType();
            updateShootNiche();
            updateShootHosting();
            
            // Log form data for debugging
            const formData = new FormData(this);
            console.log('Shoot form data:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
        });
    }
}

// Set current month/year for shoot verification
function setShootCurrentMonthYear() {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const currentMonthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    
    const shootMonthElement = document.getElementById('shootCurrentMonth');
    if (shootMonthElement) {
        shootMonthElement.textContent = currentMonthYear;
    }
    
    // Also set for interest modal
    const interestMonthElement = document.getElementById('currentMonth');
    if (interestMonthElement) {
        interestMonthElement.textContent = currentMonthYear;
    }
}

// Load saved shoot your shot data (simplified version without localStorage)
function loadSavedShootData() {
    // This would load from localStorage in a real implementation
    // For now, just set the current month/year
    setShootCurrentMonthYear();
}

// URL routing functions
function updateURL(linkUpId = null) {
    const url = new URL(window.location);
    
    if (linkUpId) {
        url.hash = `#linkup-${linkUpId}`;
    } else {
        url.hash = '';
    }
    
    window.history.pushState({ linkUpId }, '', url);
}

function handleURLChange() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#linkup-')) {
        const linkUpId = parseInt(hash.replace('#linkup-', ''));
        if (linkUpId && linkUps.find(lu => lu.id === linkUpId)) {
            currentLinkUpId = linkUpId;
            const linkUp = linkUps.find(lu => lu.id === linkUpId);
            showLinkUpDetails(linkUp);
        } else {
            // Invalid link-up ID, go back to main view
            currentLinkUpId = null;
            updateURL();
        }
    } else {
        // No hash or main view
        if (currentLinkUpId) {
            closeLinkUpDetails();
        }
        currentLinkUpId = null;
    }
}

// Enhanced openLinkUpPage function with URL generation
function openLinkUpPage(linkUpId) {
    const linkUp = linkUps.find(lu => lu.id === linkUpId);
    if (linkUp) {
        currentLinkUpId = linkUpId;
        updateURL(linkUpId);
        showLinkUpDetails(linkUp);
    }
}

// Enhanced detailed view modal with URL support
function showLinkUpDetails(linkUp) {
    // Create detailed modal content
    const modalContent = `
        <div class="modal" id="linkUpDetailsModal" style="display: block;">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <span class="close" onclick="closeLinkUpDetails()">&times;</span>
                    <h2>${linkUp.creator}</h2>
                    <p>Detailed collaboration opportunity</p>
                    <div style="margin-top: 10px;">
                        <button onclick="copyLinkUpURL(${linkUp.id})" style="background: #f0f0f0; border: 1px solid #ddd; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                            📋 Copy Link
                        </button>
                        <span id="copyFeedback-${linkUp.id}" style="margin-left: 10px; color: #28a745; font-size: 0.85rem; display: none;">Link copied!</span>
                    </div>
                </div>
                <div class="form-container">
                    <div style="padding: 20px;">
                        <h3>About ${linkUp.creator}</h3>
                        <p><strong>Type:</strong> ${linkUp.type}</p>
                        <p><strong>Location:</strong> ${linkUp.location}</p>
                        <p><strong>Experience:</strong> ${linkUp.experience}</p>
                        <p><strong>Followers:</strong> ${linkUp.followers}</p>
                        
                        <h3>Project Details</h3>
                        <p>${linkUp.sceneSummary}</p>
                        
                        <h3>Requirements</h3>
                        <p>${linkUp.requirements}</p>
                        
                        <h3>Logistics</h3>
                        <p><strong>Can Host:</strong> ${linkUp.canHost}</p>
                        <p><strong>Hosting Cost:</strong> ${linkUp.hostingCost}</p>
                        <p><strong>Shoot Dates:</strong> ${linkUp.shootDates}</p>
                        
                        <h3>Platforms</h3>
                        <div style="display: flex; gap: 8px; margin: 10px 0;">
                            ${linkUp.platforms.map(platform => `<span class="platform-tag">${platform}</span>`).join('')}
                        </div>
                        
                        <h3>Content Types</h3>
                        <div style="display: flex; gap: 8px; margin: 10px 0;">
                            ${linkUp.contentTypes.map(type => `<span class="content-tag">${type}</span>`).join('')}
                        </div>
                        
                        <h3>Looking For</h3>
                        <div style="display: flex; gap: 8px; margin: 10px 0;">
                            ${(linkUp.lookingFor || []).map(type => `<span class="looking-tag">${type}</span>`).join('')}
                        </div>
                        
                        <h3>Scene Types</h3>
                        <div style="display: flex; gap: 8px; margin: 10px 0;">
                            ${(linkUp.sceneTypes || []).map(type => `<span class="scene-tag">${type}</span>`).join('')}
                        </div>
                        
                        <button class="submit-btn" onclick="openInterestModal(${linkUp.id}); closeLinkUpDetails();" style="margin-top: 20px;">Express Interest</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalContent);
    document.body.style.overflow = 'hidden';
}

function closeLinkUpDetails() {
    const modal = document.getElementById('linkUpDetailsModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = 'auto';
    
    // Update URL to remove hash
    if (currentLinkUpId) {
        currentLinkUpId = null;
        updateURL();
    }
}

// Copy link functionality
function copyLinkUpURL(linkUpId) {
    const url = `${window.location.origin}${window.location.pathname}#linkup-${linkUpId}`;
    
    navigator.clipboard.writeText(url).then(() => {
        // Show feedback
        const feedback = document.getElementById(`copyFeedback-${linkUpId}`);
        if (feedback) {
            feedback.style.display = 'inline';
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 2000);
        }
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show feedback
        const feedback = document.getElementById(`copyFeedback-${linkUpId}`);
        if (feedback) {
            feedback.style.display = 'inline';
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 2000);
        }
    });
}


// Collaboration Knowledge Pop-up Functions
function showCollabPopup() {
    const collabPopup = document.getElementById('collabPopup');
    if (collabPopup) {
        collabPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCollabPopup() {
    const collabPopup = document.getElementById('collabPopup');
    if (collabPopup) {
        collabPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}


// Initialize everything
function initializePage() {
    // Initial render with pagination
    updatePagination();
    renderCurrentPage();
    initializeDatePicker();
    
    // Initialize all components
    initializeMobileMenu();
    initializeFilterTags();
    initializeSearch();
    initializeModalHandlers();
    initializeRouting();
    initializeNewsletter();
    
    // Setup form event listeners
    setupFormEventListeners();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all scripts are loaded
    setTimeout(() => {
        initializePage();
        setShootCurrentMonthYear();
        // Handle any direct URL access after page loads
        handleURLChange();
    }, 100);
    
    // Auto-show popup after 3 seconds for demo (you can remove this)
    setTimeout(() => {
        showCollabPopup();
    }, 3000);
});



// Search function for index 
(function () {
  const params = new URLSearchParams(window.location.search);
  const incomingCity = params.get('city'); 

  if (incomingCity) {
    const cityInput = document.getElementById('citySearch');
    if (cityInput) cityInput.value = incomingCity;
      
    if (typeof applyAllFilters === 'function') {
      applyAllFilters();
    }
  }
})();



