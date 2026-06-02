document.addEventListener('DOMContentLoaded', () => {

    // 0. Page Loader Fade Out on Load
    const loader = document.getElementById('page-loader');
    if (loader) {
        // Hide loader once everything is loaded
        const hideLoader = () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 350); // Elegant 350ms delay to make it snappier and suit the webpage
        };

        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }

        // Safety fallback to prevent infinite loading screen
        setTimeout(() => {
            if (!loader.classList.contains('fade-out')) {
                loader.classList.add('fade-out');
            }
        }, 350);
    }

    // 1. Initialize Animate On Scroll (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 850,
            easing: 'ease-out-cubic',
            once: false,       // Allows animations to play again when scrolling up and down
            mirror: true,      // Triggers animations on elements when scrolling past them downside-up
            offset: 80
        });
    }

    // 2. Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (header) {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('overflow-hidden'); // Prevent background scrolling
            document.documentElement.classList.toggle('overflow-hidden');
        });

        // Close menu when clicking navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
                document.documentElement.classList.remove('overflow-hidden');
            });
        });
    }

    // 4. Testimonials Slider Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dots.length > 0) {
        const showSlide = (index) => {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Set new active slide
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const startSlideShow = () => {
            stopSlideShow();
            slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
        };

        const stopSlideShow = () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };

        // Dot Navigation Click Handler
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startSlideShow(); // Reset timer after manual click
            });
        });

        // Initialize slideshow
        startSlideShow();

        // Pause slideshow when hovering over the testimonials slider
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideShow);
            sliderContainer.addEventListener('mouseleave', startSlideShow);
        }
    }

    // 5. Reservation Form Submission Interactivity
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Form Values (Mock submission)
            const submitBtn = reservationForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Checking availability...';

            setTimeout(() => {
                if (loader) {
                    loader.classList.remove('fade-out');
                    setTimeout(() => {
                        window.location.href = '404.html';
                    }, 500);
                } else {
                    window.location.href = '404.html';
                }
            }, 1000);
        });
    }

    // 6. Navigation Link Interception (Shows pulsing loader screen)
    const navTransitionLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([target="_blank"])');
    navTransitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');

            // Only intercept actual page navigation links (excluding hash links or empty attributes)
            if (targetUrl && targetUrl !== '#' && targetUrl !== 'javascript:void(0)' && !targetUrl.startsWith('#')) {
                e.preventDefault();

                if (loader) {
                    loader.classList.remove('fade-out');
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500); // 500ms delay to display the pulsing logo loader
                } else {
                    window.location.href = targetUrl;
                }
            }
        });
    });

    // 7. Auth Form Submission Interactivity (Pulsing loader on submit)
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing details...';
            }

            setTimeout(() => {
                if (loader) {
                    loader.classList.remove('fade-out');
                    setTimeout(() => {
                        form.submit(); // Perform redirect to form action (404.html)
                    }, 500);
                } else {
                    form.submit();
                }
            }, 1200);
        });
    });
});
