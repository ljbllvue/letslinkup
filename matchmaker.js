// Sample data for demonstration - RESTORED ALL CREATORS
        let creators = [
            {
                name: "Luna Rose",
                socialLink: "https://onlyfans.com/lunarose",
                twitterHandle: "@LunaRoseXX",
                gender: "Woman",
                city: "London",
                platform: "OnlyFans",
                category: ["Vanilla", "Taboo"],
                aesthetic: ["Girl Next Door", "Natural"],
                contentType: ["Amateur", "POV"],
                lookingFor: ["Men", "Women"],
                experienceLevel: ["Medium", "Experienced"]
            },
            {
                name: "Raven Dark",
                socialLink: "https://onlyfans.com/ravendark",
                twitterHandle: "@RavenDarkXXX",
                gender: "Woman",
                city: "Berlin",
                platform: "OnlyFans",
                category: ["Femdom", "Fetish"],
                aesthetic: ["Goth/Alt", "Tattooed"],
                contentType: ["POV", "Standard"],
                lookingFor: ["Men", "Non Binary"],
                experienceLevel: ["Experienced", "Veteran"]
            },
            {
                name: "Alex & Jordan",
                socialLink: "https://justforfans.com/alexjordan",
                twitterHandle: "@AlexJordanDuo",
                gender: "Couple",
                city: "Berlin",
                platform: "JustForFans",
                category: ["Group", "Hardcore"],
                aesthetic: ["Natural", "Babe"],
                contentType: ["Standard", "Studio"],
                lookingFor: ["Women", "Men", "Trans Women"],
                experienceLevel: ["Medium", "Experienced"]
            },
            {
                name: "Jake Steel",
                socialLink: "https://onlyfans.com/jakesteel",
                twitterHandle: "@JakeSteelXXX",
                gender: "Man",
                city: "London",
                platform: "OnlyFans",
                category: ["Hardcore", "Fetish"],
                aesthetic: ["Muscular", "Big Dick"],
                contentType: ["Amateur", "POV"],
                lookingFor: ["Women", "Trans Women", "Non Binary"],
                experienceLevel: ["Medium", "Experienced"]
            }
        ];

        // Selected values storage
        let selectedValues = {
            category: [],
            aesthetic: [],
            contentType: [],
            lookingFor: [],
            experienceLevel: [],
            desiredCategory: [],
            desiredAesthetic: [],
            desiredContentType: [],
            desiredExperienceLevel: [],
            // Single select values
            gender: '',
            city: '',
            platform: '',
            yourGender: '',
            desiredGender: '',
            desiredCity: '',
            platformPreference: ''
        };

        // Global functions that can be called from HTML
        function switchTab(tab) {
            console.log('switchTab called with:', tab);
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tab + '-section').classList.add('active');
            
            // Close any open dropdowns
            document.querySelectorAll('.multiselect-dropdown').forEach(d => d.style.display = 'none');
        }

        function toggleDropdown(type) {
            const dropdown = document.getElementById(type + '-dropdown');
            const isVisible = dropdown.style.display === 'block';
            
            // Close all dropdowns
            document.querySelectorAll('.multiselect-dropdown').forEach(d => d.style.display = 'none');
            
            // Toggle the clicked dropdown
            if (!isVisible) {
                dropdown.style.display = 'block';
            }
        }

        function performSearch() {
            console.log('=== SEARCH DEBUG START ===');
            console.log('performSearch called');
            console.log('selectedValues:', selectedValues);
            
            // Clear previous matches first
            document.getElementById('matches-container').innerHTML = '<div class="no-matches">Searching for matches...</div>';
            
            const yourGender = selectedValues.yourGender;
            const desiredGender = selectedValues.desiredGender;
            const desiredCity = selectedValues.desiredCity;
            const platformPreference = selectedValues.platformPreference;
            const desiredCategory = selectedValues.desiredCategory;
            const desiredAesthetic = selectedValues.desiredAesthetic;
            const desiredContentType = selectedValues.desiredContentType;
            
            // Don't search if required fields are empty
            if (!yourGender || !desiredGender || !desiredCity || 
                desiredCategory.length !== 2 || desiredContentType.length !== 2 || selectedValues.desiredExperienceLevel.length === 0) {
                
                let errorMsg = 'Please fill out all required fields:';
                if (!yourGender) errorMsg += '<br>- Your Gender';
                if (!desiredGender) errorMsg += '<br>- Desired Gender';
                if (!desiredCity) errorMsg += '<br>- City';
                if (desiredCategory.length !== 2) errorMsg += '<br>- Exactly 2 Categories required';
                if (desiredContentType.length !== 2) errorMsg += '<br>- Exactly 2 Content Types required';
                if (selectedValues.desiredExperienceLevel.length === 0) errorMsg += '<br>- At least 1 Experience Level required';
                
                document.getElementById('matches-container').innerHTML = '<div class="no-matches">' + errorMsg + '</div>';
                return;
            }
            
            // Score and filter creators with ORIGINAL SCORING SYSTEM (max 10 points)
            const matches = creators.map(function(creator, index) {
                let score = 0;
                
                // MANDATORY: City must match exactly
                if (creator.city !== desiredCity) {
                    return null;
                }
                score += 1; // City match: 1 point
                
                // BIDIRECTIONAL GENDER MATCHING - WITH GENDER MAPPING
                const creatorGenderMatches = (desiredGender === 'Any' || 
                                            creator.gender === desiredGender ||
                                            (desiredGender === 'Mixed (couple)' && creator.gender === 'Couple'));
                
                // Map singular to plural forms for matching
                const genderMap = {
                    'Man': ['Men', 'Man'],
                    'Woman': ['Women', 'Woman'], 
                    'Trans Man': ['Trans Men', 'Trans Man'],
                    'Trans Woman': ['Trans Women', 'Trans Woman'],
                    'Non Binary': ['Non Binary', 'Non binary'],
                    'Couple': ['Couples', 'Couple']
                };
                
                const possibleMatches = genderMap[yourGender] || [yourGender];
                const yourGenderInCreatorList = creator.lookingFor.some(function(lookingForGender) {
                    return possibleMatches.includes(lookingForGender);
                });
                
                if (!creatorGenderMatches || !yourGenderInCreatorList) {
                    return null;
                }
                score += 2; // Gender compatibility: 2 points
                
                // Platform match (optional) - FIXED: Only give points if platform was actually selected
                if (platformPreference && platformPreference !== '' && creator.platform === platformPreference) {
                    score += 1; // Platform: 1 point ONLY if a platform was selected and matches
                }
                
                // Category overlap - 1 point per matching category (max 2)
                let categoryMatches = 0;
                desiredCategory.forEach(function(desiredCat) {
                    if (creator.category.includes(desiredCat)) {
                        categoryMatches++;
                        score += 1;
                    }
                });
                
                // Content type overlap - 1 point if ANY content type matches
                const contentMatch = creator.contentType.some(function(type) { 
                    return desiredContentType.includes(type); 
                });
                if (contentMatch) {
                    score += 1; // Content: 1 point total (not per match)
                }
                
                // Aesthetic overlap - 1 point if any match (only if user selected aesthetics)
                if (desiredAesthetic.length > 0) {
                    const aestheticMatch = creator.aesthetic.some(function(aes) { 
                        return desiredAesthetic.includes(aes); 
                    });
                    if (aestheticMatch) {
                        score += 1; // Aesthetic: 1 point
                    }
                }
                
                // Experience Level overlap - 2 points if any match
                const experienceMatch = creator.experienceLevel.some(function(exp) { 
                    return selectedValues.desiredExperienceLevel.includes(exp); 
                });
                if (experienceMatch) {
                    score += 2; // Experience: 2 points
                }
                
                return Object.assign({}, creator, { score: score });
            })
            .filter(function(creator) { return creator !== null; })
            .sort(function(a, b) { return b.score - a.score; })
            .slice(0, 3);
            
            displayMatches(matches);
        }

        function displayMatches(matches) {
            const container = document.getElementById('matches-container');
            
            if (matches.length === 0) {
                container.innerHTML = '<div class="no-matches">No matches found. Try adjusting your search criteria.</div>';
                return;
            }
            
            const matchesHtml = matches.map(function(match, index) {
                const compatibilityLines = [
                    "Perfect collaboration potential! 🌟",
                    "Great creative chemistry awaits! ✨",
                    "Exciting collaboration opportunity! 🎯"
                ];
                
                const compatibilityLine = compatibilityLines[index] || compatibilityLines[0];
                
                return '<div class="match-card">' +
                    '<div class="match-header">' +
                        '<div>' +
                            '<div class="match-name">' + match.name + '</div>' +
                            '<div style="font-size: 0.8rem; color: #9ca3af;">' + match.city + ' • ' + match.platform + '</div>' +
                        '</div>' +
                        '<div class="match-compatibility">' + match.score + '/10 match</div>' +
                    '</div>' +
                    '<div class="match-details">' +
                        '<div class="match-detail"><strong>Gender:</strong> ' + match.gender + '</div>' +
                        '<div class="match-detail"><strong>Categories:</strong> ' + match.category.join(', ') + '</div>' +
                        '<div class="match-detail"><strong>Content Types:</strong> ' + match.contentType.join(', ') + '</div>' +
                        (match.aesthetic.length > 0 ? '<div class="match-detail"><strong>Aesthetic:</strong> ' + match.aesthetic.join(', ') + '</div>' : '') +
                        '<div class="match-detail" style="font-style: italic; color: #6b7280; margin-top: 12px;">' + compatibilityLine + '</div>' +
                    '</div>' +
                    '<div class="match-actions">' +
                        '<button class="match-btn primary" onclick="showMatchPage(\'' + match.name.replace(/'/g, "\\'") + '\', \'' + match.socialLink + '\', \'' + match.city + '\', \'' + match.platform + '\', \'' + match.category.join(', ') + '\', \'' + match.contentType.join(', ') + '\')">🎯 It\'s a Match!</button>' +
                        '<a href="' + match.socialLink + '" target="_blank" class="match-btn">Visit Profile</a>' +
                    '</div>' +
                '</div>';
            }).join('');
            
            container.innerHTML = matchesHtml;
        }

        function showMatchPage(name, socialLink, city, platform, categories, contentTypes) {
            const modal = document.getElementById('match-modal');
            const matchDetails = document.getElementById('match-details');
            const twitterShare = document.getElementById('twitter-share');
            
            // Find the matched creator to get their Twitter handle
            const matchedCreator = creators.find(creator => creator.name === name);
            const twitterHandle = matchedCreator && matchedCreator.twitterHandle ? matchedCreator.twitterHandle : '';
            
            // Populate match details
            matchDetails.innerHTML = '<div class="match-creator-name">' + name + '</div>' +
                '<div class="match-creator-details">' +
                    '<strong>📍 Location:</strong> ' + city + '<br>' +
                    '<strong>🔗 Platform:</strong> ' + platform + '<br>' +
                    '<strong>🎭 Categories:</strong> ' + categories + '<br>' +
                    '<strong>🎬 Content Types:</strong> ' + contentTypes +
                    (twitterHandle ? '<br><strong>🐦 Twitter:</strong> ' + twitterHandle : '') +
                '</div>';
            
            // Setup Twitter share with proper mention and hashtags
            let tweetText = 'Just found an amazing collaboration match on Link & Match! ✨ ';
            
            if (twitterHandle) {
                // Ensure handle starts with @ for proper mention
                const cleanHandle = twitterHandle.startsWith('@') ? twitterHandle : '@' + twitterHandle;
                tweetText += `Ready to create something incredible with ${cleanHandle}! 🎬`;
            } else {
                tweetText += 'Ready to create something incredible together! 🎬';
            }
            
            // Add hashtags at the end for better reach
            tweetText += ' #ContentCreator #Collaboration #LinkAndMatch';
            
            // If there's a Twitter handle, add it as a separate mention parameter for better visibility
            let twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText);
            
            // Add via parameter to credit the platform
            twitterUrl += '&via=LinkAndMatch';
            
            // If there's a Twitter handle, include it in the related parameter for suggestions
            if (twitterHandle) {
                const cleanHandleForUrl = twitterHandle.replace('@', '');
                twitterUrl += '&related=' + encodeURIComponent(cleanHandleForUrl);
            }
            
            twitterShare.href = twitterUrl;
            
            // Show modal with animation
            modal.classList.add('show');
            
            // Auto-hide after 10 seconds
            setTimeout(function() {
                if (modal.classList.contains('show')) {
                    closeMatchModal();
                }
            }, 10000);
        }

        function closeMatchModal() {
            const modal = document.getElementById('match-modal');
            modal.classList.remove('show');
        }

        // Typewriter effect for title
        function startTypewriter() {
            const words = ['Match', 'Shoot', 'Connect', 'Collab'];
            const typewriterElement = document.getElementById('typewriter');
            if (!typewriterElement) return;
            
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let currentWord = '';

            function type() {
                currentWord = words[wordIndex];
                
                if (isDeleting) {
                    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                let typeSpeed = isDeleting ? 100 : 150;

                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500;
                }

                setTimeout(type, typeSpeed);
            }

            type();
        }

        // Setup everything when DOM loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, setting up event listeners');
            
            // Start typewriter effect
            startTypewriter();
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.multiselect-container')) {
                    document.querySelectorAll('.multiselect-dropdown').forEach(d => d.style.display = 'none');
                }
            });

            // Handle multiselect and single select options
            document.querySelectorAll('.multiselect-option').forEach(option => {
                option.addEventListener('click', function() {
                    const dropdown = this.parentElement;
                    const type = dropdown.id.replace('-dropdown', '');
                    const value = this.dataset.value;
                    const input = dropdown.parentElement.querySelector('.multiselect-input');
                    
                    // Check if this is a single-select dropdown
                    const singleSelectTypes = ['gender-select', 'city-select', 'platform-select', 'your-gender-select', 'desired-gender-select', 'desired-city-select', 'platform-preference-select'];
                    const isSingleSelect = singleSelectTypes.includes(type);
                    
                    if (isSingleSelect) {
                        // Single select behavior
                        dropdown.querySelectorAll('.multiselect-option').forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        input.value = value;
                        
                        // Store the value in correct format
                        if (type === 'gender-select') {
                            selectedValues.gender = value;
                        } else if (type === 'city-select') {
                            selectedValues.city = value;
                        } else if (type === 'platform-select') {
                            selectedValues.platform = value;
                        } else if (type === 'your-gender-select') {
                            selectedValues.yourGender = value;
                        } else if (type === 'desired-gender-select') {
                            selectedValues.desiredGender = value;
                        } else if (type === 'desired-city-select') {
                            selectedValues.desiredCity = value;
                        } else if (type === 'platform-preference-select') {
                            selectedValues.platformPreference = value;
                        }
                        
                        // Close dropdown after selection
                        dropdown.style.display = 'none';
                    } else {
                        // Multi select behavior
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            selectedValues[type] = selectedValues[type].filter(v => v !== value);
                        } else {
                            // Check if we're at the limit for desired fields
                            if ((type === 'desiredCategory' || type === 'desiredContentType') && selectedValues[type].length >= 2) {
                                alert('Please select exactly 2 options for this field.');
                                return;
                            }
                            if ((type === 'experienceLevel' || type === 'desiredExperienceLevel') && selectedValues[type].length >= 2) {
                                alert('Please select up to 2 experience levels.');
                                return;
                            }
                            
                            this.classList.add('selected');
                            selectedValues[type].push(value);
                        }
                        
                        input.value = selectedValues[type].join(', ');
                    }
                });
            });

            // Modal event listeners
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMatchModal();
                }
            });

            const modal = document.getElementById('match-modal');
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeMatchModal();
                    }
                });
            }

            console.log('Event listeners setup complete');
        });

        console.log('JavaScript loaded successfully');