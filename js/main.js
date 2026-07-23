// TODO: Add a proper form submission handler with server-side processing and validation to the office email

/* =====================================================
   McMurray Dental Care — Main JavaScript
   ===================================================== */

/* === NAVBAR === */
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');

// Scroll class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Hamburger toggle
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);

    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'translateY(7px) rotate(45deg)';
      s2.style.opacity   = '0';
      s3.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s1.style.transform = s2.style.opacity = s3.style.transform = '';
    }
  });

  // Close on any link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = s.style.opacity = '';
      });
    });
  });
}

/* === FADE-UP SCROLL ANIMATIONS === */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => io.observe(el));
}

/* === CONTACT FORM === */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn          = contactForm.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    // Simulate async send (replace with real endpoint)
    setTimeout(() => {
      btn.textContent      = '✓ Message Sent!';
      btn.style.background = '#4caf50';
      btn.style.borderColor = '#4caf50';

      setTimeout(() => {
        btn.textContent   = originalText;
        btn.disabled      = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3500);
    }, 1400);
  });
}

/* === AUTO YEAR IN FOOTER === */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* === ACTIVE NAV LINK === */
(function setActiveLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
