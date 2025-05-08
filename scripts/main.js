// ===== PASSWORD PROTECTION =====
document.addEventListener('DOMContentLoaded', function() {
    // Set your secret password here
    const CORRECT_PASSWORD = "Flower-Moon"; // Change this to your actual password
    
    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const unlockButton = document.getElementById('unlock-button');
    const errorMessage = document.getElementById('error-message');
    const passwordGate = document.getElementById('password-gate');
    const websiteContent = document.getElementById('website-content');
    
    // Check password function
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === CORRECT_PASSWORD) {
            // Correct password - unlock website
            passwordGate.style.opacity = '0';
            
            // After fade out, hide gate and show content
            setTimeout(() => {
                passwordGate.style.display = 'none';
                websiteContent.style.display = 'block';
                
                // Initialize all website functionality
                initWebsite();
            }, 500);
        } else {
            // Wrong password - show error
            errorMessage.textContent = "That's not the right password. Try again!";
            passwordInput.value = '';
            passwordInput.focus();
            
            // Shake animation for wrong password
            passwordGate.classList.add('shake');
            setTimeout(() => {
                passwordGate.classList.remove('shake');
            }, 500);
        }
    }
    
    // Event listeners
    unlockButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Initialize website functionality after unlock
    function initWebsite() {
        initPhotoInteractions();
        initMusicPlayer();
        initFloatingHearts();
        initScrollAnimations();
        initTimeline();
    }
    
    // ===== PHOTO INTERACTIONS =====
    function initPhotoInteractions() {
        // Fullscreen photo viewer functionality
        const allPhotos = document.querySelectorAll('img[src*="images/"]');
        
        allPhotos.forEach(photo => {
            photo.addEventListener('click', function() {
                createFullscreenView(this.src, this.alt || 'Special memory');
            });
        });
        
        // Create fullscreen viewer
        function createFullscreenView(src, alt) {
            const fullscreenView = document.createElement('div');
            fullscreenView.className = 'fullscreen-view';
            fullscreenView.innerHTML = `
                <div class="fullscreen-content">
                    <img src="${src}" alt="${alt}">
                    <button class="close-fullscreen">&times;</button>
                </div>
            `;
            
            document.body.appendChild(fullscreenView);
            
            // Close button
            const closeBtn = fullscreenView.querySelector('.close-fullscreen');
            closeBtn.addEventListener('click', () => {
                fullscreenView.remove();
            });
            
            // Also close when clicking outside image
            fullscreenView.addEventListener('click', (e) => {
                if (e.target === fullscreenView) {
                    fullscreenView.remove();
                }
            });
        }

        function initTimeline() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach(item => {
                const img = item.querySelector('img');
                const caption = item.querySelector('p');
                
                // Create container for image and caption
                const container = document.createElement('div');
                container.className = 'timeline-item-container';
                container.appendChild(img.cloneNode(true));
                container.appendChild(caption.cloneNode(true));
                
                // Replace original content with container
                item.innerHTML = '';
                item.appendChild(container);
                
                // Add hover effects
                container.addEventListener('mouseenter', () => {
                    container.style.transform = 'scale(1.05)';
                    container.style.zIndex = '10';
                });
                
                container.addEventListener('mouseleave', () => {
                    container.style.transform = 'scale(1)';
                    container.style.zIndex = '1';
                });
                
                // Add click for fullscreen
                container.addEventListener('click', function() {
                    createFullscreenView(img.src, caption.textContent);
                });
            });
        }
    }
    
    // ===== MUSIC PLAYER =====
    function initMusicPlayer() {
        // Your playlist - add your actual song files
        const playlist = [
            {
                title: "Ojos Asi",
                artist: "Shakira",
                src: "music/song1.mp3"
            },
            {
                title: "Oye Mi Amor",
                artist: "Mana",
                src: "music/song2.mp3"
            },
            {
                title: "Oh, Pretty Woman",
                artist: "Roy Orbison",
                src: "music/song3.mp3"
            },
            {
                title: "Maria",
                artist: "Blondie",
                src: "music/song4.mp3"
            },
            {
                title: "A Dios Le Pido",
                artist: "Juanes",
                src: "music/song5.mp3"
            },
            {
                title: "Abusadora",
                artist: "Wisin & Yandel",
                src: "music/song6.mp3"
            },
            {
                title: "Zumba",
                artist: "Don Omar",
                src: "music/song7.mp3"
            },
            {
                title: "Freakytona",
                artist: "Boy Wonder CF, Plan B",
                src: "music/song8.mp3"
            },
            {
                title: "EoO",
                artist: "Bad Bunny",
                src: "music/song9.mp3"
            },
            {
                title: "Safaera",
                artist: "Bad Bunny",
                src: "music/song10.mp3"
            },
            {
                title: "R U Mine?",
                artist: "Arctic Monkeys",
                src: "music/song11.mp3"
            },
            {
                title: "Livin' la Vida Loca",
                artist: "Ricky Martin",
                src: "music/song12.mp3"
            },
            {
                title: "La Bruja",
                artist: "Tlen Huicani, Lino Chavez",
                src: "music/song13.mp3"
            },
            {
                title: "Hooka",
                artist: "Don Omar",
                src: "music/song14.mp3"
            },
            {
                title: "Lovers Rock",
                artist: "TV Girl",
                src: "music/song15.mp3"
            },
            {
                title: "Virtual Diva",
                artist: "Don Omar",
                src: "music/song16.mp3"
            },
            // Add more songs as needed
        ];
        
        // Player elements
        const playPauseBtn = document.getElementById('play-pause');
        const prevSongBtn = document.getElementById('prev-song');
        const nextSongBtn = document.getElementById('next-song');
        const nowPlayingEl = document.getElementById('now-playing');
        const progressBar = document.querySelector('.progress-bar .progress');
        
        // Audio player
        const audio = new Audio();
        let currentSongIndex = 0;
        let isPlaying = false;
        
        // Load song
        function loadSong(songIndex) {
            const song = playlist[songIndex];
            audio.src = song.src;
            nowPlayingEl.textContent = `${song.title} - ${song.artist}`;
            
            if (isPlaying) {
                audio.play();
            }
        }
        
        // Play/pause toggle
        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        }
        
        // Next song
        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(currentSongIndex);
        }
        
        // Previous song
        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentSongIndex);
        }
        
        // Update progress bar
        function updateProgress() {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            // Automatically play next song when current ends
            if (audio.currentTime >= audio.duration - 0.1) {
                nextSong();
            }
        }
        
        // Event listeners
        playPauseBtn.addEventListener('click', togglePlay);
        nextSongBtn.addEventListener('click', nextSong);
        prevSongBtn.addEventListener('click', prevSong);
        audio.addEventListener('timeupdate', updateProgress);
        
        // Initialize with first song
        loadSong(currentSongIndex);
    }
    
    // ===== FLOATING HEARTS =====
    function initFloatingHearts() {
        // Create floating hearts in prose section
        const proseSection = document.getElementById('prose');
        const floatingHearts = document.querySelector('.floating-hearts');
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            
            // Random position and size
            const size = Math.random() * 30 + 20;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 15 + 10;
            
            heart.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${left}%;
                top: 100%;
                opacity: ${Math.random() * 0.5 + 0.5};
                transform: scale(0);
                animation: floatUp ${animationDuration}s linear forwards;
            `;
            
            floatingHearts.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, animationDuration * 1000);
        }
        
        // Create hearts periodically
        setInterval(createHeart, 800);
        
        // Initial hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(createHeart, i * 300);
        }
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Animate elements when they come into view
        const animatedElements = document.querySelectorAll('.message, .photo-stack, .polaroid, .timeline-item, .love-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Update active section indicator
        const sections = document.querySelectorAll('.fullscreen-section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });
            
            // You could add an active section indicator here if needed
        });
    }
    
    // ===== CUSTOM CURSOR (OPTIONAL) =====
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        // Change cursor when hovering over clickable elements
        const clickables = document.querySelectorAll('button, [data-clickable]');
        clickables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
            });
        });
    }
});
