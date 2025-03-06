document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (index === 0) span.classList.toggle('rotate-down');
                if (index === 1) span.classList.toggle('fade-out');
                if (index === 2) span.classList.toggle('rotate-up');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or it doesn't exist on the page
            if (targetId === '#' || !document.querySelector(targetId)) {
                return;
            }

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active') && menuToggle) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (index === 0) span.classList.remove('rotate-down');
                    if (index === 1) span.classList.remove('fade-out');
                    if (index === 2) span.classList.remove('rotate-up');
                });
            }

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to navigation links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Check active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Initial check for active nav link
    updateActiveNavLink();

    // Animate elements on scroll
    function revealElements() {
        const revealItems = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item, .gallery-item, .video-item, .fitness-item');

        revealItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 100) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            }
        });
    }

    // Initial check for elements
    revealElements();

    // Check for elements on scroll
    window.addEventListener('scroll', revealElements);

    // Lazy load images and videos
    const lazyImages = document.querySelectorAll('img[data-src], video[data-src]');

    function lazyLoad() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 500) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                if (img.tagName === 'VIDEO' && img.dataset.poster) {
                    img.poster = img.dataset.poster;
                    img.removeAttribute('data-poster');
                }
            }
        });
    }

    // Initial lazy load
    lazyLoad();

    // Lazy load on scroll
    window.addEventListener('scroll', lazyLoad);

    // Preload project placeholder images
    function preloadImages() {
        // Replace with your actual image paths when available
        const imagePaths = [
            'project1.jpg', 
            'project2.jpg', 
            'project3.jpg', 
            'project4.jpg', 
            'project5.jpg', 
            'project6.jpg',
            'profile-photo.jpg',
            'logo.jpg',
            'logo-small.jpg',
            'fitness1.jpg',
            'fitness2.jpg',
            'fitness3.jpg',
            'about1.jpg',
            'about2.jpg',
            'about3.jpg',
            'hero-bg.jpg',
            'video-thumbnail.jpg',
            'video-thumb1.jpg',
            'video-thumb2.jpg'
        ];

        // For each image path, create a new Image object and set its src
        imagePaths.forEach(path => {
            const img = new Image();
            img.src = path;
        });
    }

    // Try to preload images, but don't break the site if images don't exist yet
    try {
        preloadImages();
    } catch (e) {
        console.log('Image preloading error:', e);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .project-card, .skill-category, .contact-item, .gallery-item, .video-item, .fitness-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .timeline-item.show, .project-card.show, .skill-category.show, .contact-item.show, .gallery-item.show, .video-item.show, .fitness-item.show {
            opacity: 1;
            transform: translateY(0);
        }

        .menu-toggle span {
            transition: all 0.3s ease;
        }

        .menu-toggle .rotate-down {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .menu-toggle .fade-out {
            opacity: 0;
        }

        .menu-toggle .rotate-up {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        .nav-links a.active {
            color: #93c5fd;
        }
    `;
    document.head.appendChild(style);
});