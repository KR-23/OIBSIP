/* ========================================
   FINPAY – script.js
   ======================================== */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

/* ---- Scroll-reveal animations ---- */
const animateEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animateEls.forEach(el => observer.observe(el));

/* ---- Payment method toggle ---- */
const payOptions = document.querySelectorAll('.pay-option');
payOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    payOptions.forEach(o => {
      o.classList.remove('selected');
      o.querySelector('.radio-dot')?.classList.remove('active');
    });
    opt.classList.add('selected');
    opt.querySelector('.radio-dot')?.classList.add('active');
  });
});

/* ---- Animated counter for stats (mission section) ---- */
function animateCounter(el, target, duration = 1800, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.getAttribute('data-val');
      const suffix = el.getAttribute('data-suffix') || '';
      animateCounter(el, parseFloat(text), 1600, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

/* Set data attributes for counters */
const bigStats = document.querySelectorAll('.big-stat');
const statConfigs = [
  { val: 24, suffix: '%' },
  { val: 180, suffix: 'K' },
  { val: 10, suffix: '+' },
];
bigStats.forEach((el, i) => {
  if (statConfigs[i]) {
    el.setAttribute('data-val', statConfigs[i].val);
    el.setAttribute('data-suffix', statConfigs[i].suffix);
    statObserver.observe(el);
  }
});

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Hero email form basic validation ---- */
const heroForm = document.querySelector('.hero-form');
if (heroForm) {
  heroForm.querySelector('.btn-primary').addEventListener('click', (e) => {
    const input = heroForm.querySelector('input[type="email"]');
    if (!input.value || !/\S+@\S+\.\S+/.test(input.value)) {
      e.preventDefault();
      input.style.borderColor = '#e05252';
      input.focus();
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
  });
}

/* ---- Pay button pulse effect ---- */
const payBtn = document.querySelector('.btn-pay');
if (payBtn) {
  payBtn.addEventListener('click', function() {
    this.textContent = '✓ Processing…';
    this.style.background = '#0d7a6e';
    setTimeout(() => {
      this.textContent = 'Pay';
      this.style.background = '';
    }, 2000);
  });
}
