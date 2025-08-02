/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SMOOTH SCROLLING ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Handle all navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = 80; // Fixed header height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('show-menu');
                }
            }
        });
    });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if (activeLink) {
                // Remove active class from all links
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active-link');
                });
                // Add active class to current link
                activeLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*==================== PORTFOLIO FILTER ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    const portfolioCards = document.querySelectorAll('.portfolio__card');

    function portfolioFilter() {
        // Remove active class from all items
        portfolioItems.forEach(item => {
            item.classList.remove('portfolio__item-active');
        });
        
        // Add active class to clicked item
        this.classList.add('portfolio__item-active');
        
        const filter = this.getAttribute('data-filter');
        
        // Show/hide cards based on filter
        portfolioCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const filterClass = filter.substring(1); // Remove the dot
                if (card.classList.contains(filterClass)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', portfolioFilter);
    });
});

/*==================== CONTACT FORM ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showMessage('Message sent successfully! I will get back to you soon.', 'success');
            
            // Clear form
            contactForm.reset();
        });
    }
});

/*==================== SHOW MESSAGE ====================*/
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.contact__message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `contact__message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    const bgColor = type === 'success' 
        ? 'rgba(33, 128, 141, 0.1)' 
        : 'rgba(192, 21, 47, 0.1)';
    const textColor = type === 'success' 
        ? 'var(--color-success)' 
        : 'var(--color-error)';
    const borderColor = type === 'success' 
        ? 'rgba(33, 128, 141, 0.25)' 
        : 'rgba(192, 21, 47, 0.25)';
    
    messageElement.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        background-color: ${bgColor};
        color: ${textColor};
        border: 1px solid ${borderColor};
        transition: opacity 0.3s ease;
    `;
    
    // Insert message after form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.appendChild(messageElement);
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

/*==================== CONTACT BUTTONS ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Email button
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Allow default mailto behavior
            console.log('Opening email client...');
        });
    });
    
    // Phone button
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Allow default tel behavior
            console.log('Initiating phone call...');
        });
    });
    
    // LinkedIn button
    const linkedinButtons = document.querySelectorAll('a[href="#"]:not([href^="mailto:"]):not([href^="tel:"])');
    linkedinButtons.forEach(button => {
        if (button.textContent.includes('Connect') || button.querySelector('i[data-lucide="linkedin"]')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showContactMessage('LinkedIn profile will be available soon!', 'info');
            });
        }
    });
});

/*==================== RESUME DOWNLOAD ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const downloadResumeBtn = document.getElementById('download-resume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showContactMessage('Resume download will be available soon! Please contact via email for now.', 'info');
        });
    }
});

function showContactMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.contact__info-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `contact__info-message ${type}`;
    messageElement.textContent = message;
    
    messageElement.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        background-color: rgba(98, 108, 113, 0.1);
        color: var(--color-info);
        border: 1px solid rgba(98, 108, 113, 0.25);
        transition: opacity 0.3s ease;
    `;
    
    // Insert message in contact section
    const contactContainer = document.querySelector('.contact__container');
    if (contactContainer) {
        contactContainer.appendChild(messageElement);
    }
    
    // Remove message after 4 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 4000);
}

/*==================== PORTFOLIO MODAL ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const portfolioButtons = document.querySelectorAll('.portfolio__button');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'portfolio__modal hidden';
    modal.innerHTML = `
        <div class="portfolio__modal-content">
            <span class="portfolio__modal-close">&times;</span>
            <div class="portfolio__modal-body">
                <h3 class="portfolio__modal-title">Project Details</h3>
                <p class="portfolio__modal-description">
                    Thank you for your interest in this project! Detailed case studies and project documentation 
                    are currently being prepared. For more information about my work experience and specific 
                    projects, please feel free to contact me directly via email or phone.
                </p>
                <div class="portfolio__modal-highlights">
                    <h4>Key Highlights:</h4>
                    <ul>
                        <li>Professional content creation and editorial work</li>
                        <li>Field reporting and live coverage experience</li>
                        <li>Social media strategy and community management</li>
                        <li>Multimedia storytelling and production</li>
                    </ul>
                </div>
                <div class="portfolio__modal-contact">
                    <p><strong>Get in touch to learn more:</strong></p>
                    <p>Email: vartikas0608@gmail.com</p>
                    <p>Phone: +91 00094 03049</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .portfolio__modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .portfolio__modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .portfolio__modal-content {
            background-color: var(--color-surface);
            border-radius: var(--radius-lg);
            padding: var(--space-32);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .portfolio__modal.show .portfolio__modal-content {
            transform: scale(1);
        }
        
        .portfolio__modal-close {
            position: absolute;
            top: var(--space-16);
            right: var(--space-20);
            font-size: var(--font-size-3xl);
            color: var(--color-text-secondary);
            cursor: pointer;
            line-height: 1;
        }
        
        .portfolio__modal-close:hover {
            color: var(--color-primary);
        }
        
        .portfolio__modal-title {
            font-size: var(--font-size-2xl);
            color: var(--color-text);
            margin-bottom: var(--space-16);
        }
        
        .portfolio__modal-description {
            color: var(--color-text-secondary);
            line-height: 1.6;
            margin-bottom: var(--space-20);
        }
        
        .portfolio__modal-highlights h4 {
            color: var(--color-text);
            margin-bottom: var(--space-12);
        }
        
        .portfolio__modal-highlights ul {
            color: var(--color-text-secondary);
            margin-left: var(--space-20);
            margin-bottom: var(--space-20);
        }
        
        .portfolio__modal-highlights li {
            margin-bottom: var(--space-8);
        }
        
        .portfolio__modal-contact {
            background-color: var(--color-bg-1);
            padding: var(--space-16);
            border-radius: var(--radius-base);
        }
        
        .portfolio__modal-contact p {
            margin-bottom: var(--space-8);
            color: var(--color-text);
        }
        
        .portfolio__modal-contact p:last-child {
            margin-bottom: 0;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Modal functionality
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    const modalClose = modal.querySelector('.portfolio__modal-close');
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
});

/*==================== SCROLL PROGRESS BAR ====================*/
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-teal-400));
    z-index: 1001;
    transition: width 0.1s ease;
`;

document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

/*==================== MOBILE MENU MANAGEMENT ====================*/
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // Close mobile menu when clicking outside
    if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
    }
});

/*==================== INITIALIZE LUCIDE ICONS ====================*/
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Re-initialize icons after any dynamic content changes
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});

/*==================== TYPING ANIMATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        const originalText = element.innerHTML;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    const tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation
    const heroTitle = document.querySelector('.home__title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 500);
    }
});

/*==================== INITIALIZE ALL FUNCTIONS ====================*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set initial active nav link
    const homeLink = document.querySelector('.nav__link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active-link');
    }
    
    // Smooth scroll to top on page load
    window.scrollTo(0, 0);
});

/*==================== ERROR HANDLING ====================*/
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

/*==================== PERFORMANCE OPTIMIZATION ====================*/
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

// Apply debouncing to intensive scroll events
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollUp = debounce(scrollUp, 10);

// Use debounced versions for scroll events
window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollUp);