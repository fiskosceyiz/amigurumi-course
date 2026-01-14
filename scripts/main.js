document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll class to header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Simple interaction for cards (optional enhancements)
    const cards = document.querySelectorAll('.level-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tag = card.querySelector('.level-tag');
            if (tag) tag.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            const tag = card.querySelector('.level-tag');
            if (tag) tag.style.transform = 'scale(1)';
        });
    });
});

// Global Toggle Function for Mobile Menu (Robustness Fix)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Close menu when clicking outside (Event Delegation)
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.getElementById('mobile-menu');

    // Only run if menu is active
    if (navLinks && navLinks.classList.contains('active')) {
        // If click is NOT inside nav and NOT on the button/bars
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    }
});
