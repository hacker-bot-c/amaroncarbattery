// Amaron Battery - Professional Website JavaScript
// Modern Dark Theme - Fully Responsive & Animated

/**
 * DOM Ready Check
 */
document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

/**
 * Initialize All Components
 */
function initAll() {
    initNavbar();
    initScrollReveal();
    initCounters();
    initContactForm();
    initLoadingScreen();
    initSmoothScroll();
    initFloatingElements();
    initShimmerEffects();
    initStatsHover();
}

/**
 * 1. Navbar Functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile hamburger menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

/**
 * 2. Scroll Reveal Animations (Intersection Observer)
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 3. Animated Counters for Stats
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + '+';
    }, 20);
}

/**
 * 4. Contact Form with Validation & EmailJS
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with EmailJS or your backend)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would integrate EmailJS or your API
            /*
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
                .then(() => {
                    showAlert('Message sent successfully!', 'success');
                }, (error) => {
                    showAlert('Something went wrong. Please try again.', 'error');
                });
            */
            
            showAlert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            showAlert('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * 5. Loading Screen
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading');
    if (!loadingScreen) return;
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

/**
 * 6. Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
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

/**
 * 7. Floating Elements Animation
 */
function initFloatingElements() {
    // Dynamic floating elements (optional enhancement)
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Add floating elements if they don't exist
    for (let i = 1; i <= 3; i++) {
        if (!hero.querySelector(`.float-${i}`)) {
            const float = document.createElement('i');
            float.className = `fas fa-bolt float-${i} floating-elem`;
            float.style.animationDelay = `${i * 2}s`;
            hero.appendChild(float);
        }
    }
}

/**
 * 8. Shimmer Hover Effects for Cards
 */
function initShimmerEffects() {
    document.querySelectorAll('.glass-card, .tech-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * 9. Stats Hover Effects
 */
function initStatsHover() {
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.querySelector('.stat-number').style.transform = 'scale(1.1)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.querySelector('.stat-number').style.transform = 'scale(1)';
        });
    });
}

/**
 * Utility Functions
 */

/**
 * Show Alert Messages
 */
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        ${message}
        <button class="alert-close">&times;</button>
    `;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        backdrop-filter: blur(20px);
        max-width: 400px;
        animation: slideInRight 0.4s ease-out;
        ${type === 'success' ? 'background: rgba(34, 197, 94, 0.95);' : 
          type === 'error' ? 'background: rgba(239, 68, 68, 0.95);' : 
          'background: rgba(59, 130, 246, 0.95);'}
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
    
    // Close button
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.remove();
    });
}

/**
 * Parallax Effect for Hero Section
 */
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        }
    });
}

/**
 * Performance Optimization
 * Debounce function for scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Handle scroll events here
}, 10);

// Global Error Handler
window.addEventListener('error', (e) => {
    console.error('Script Error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Website loaded in ${loadTime.toFixed(0)}ms`);
    });
}

/**
 * Export functions for external use (if needed)
 */
window.AmaronSite = {
    initCounters,
    initScrollReveal,
    showAlert
};

// Initialize parallax if needed
// initParallax();
