// Smooth scroll behavior for any internal links
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

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.reason-card, .gallery-item, .timeline-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Gallery item click to view full image (optional enhancement)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            `;
            
            // Add close functionality
            modal.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.appendChild(enlargedImg);
            document.body.appendChild(modal);
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Restore scroll when modal closes
            modal.addEventListener('click', () => {
                document.body.style.overflow = 'auto';
            });
        }
    });
});

// Add CSS animations for modal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Random floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 20}px;
        color: rgba(212, 218, 218, 0.3);
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        pointer-events: none;
        z-index: 0;
        animation: floatUp ${Math.random() * 3 + 4}s linear;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 7000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add float up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Console message (optional - a little easter egg!)
console.log('%c💕 Made with love for Nikki 💕', 
    'font-size: 20px; color: #667eea; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cEvery line of code was written thinking of you ❤️', 
    'font-size: 14px; color: #764ba2; font-style: italic;');