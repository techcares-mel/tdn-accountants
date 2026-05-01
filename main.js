/* ==========================================
   NAV SCROLL BEHAVIOUR
   ========================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ==========================================
   MOBILE HAMBURGER
   ========================================== */
const hamburger   = document.getElementById('hamburger');
const overlay     = document.getElementById('mobile-overlay');
const closeBtn    = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeMenu() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ==========================================
   SCROLL REVEAL
   ========================================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ==========================================
   COUNT-UP ANIMATION
   ========================================== */
function animateCount(el, target, prefix, suffix, duration) {
  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(eased * target);
    el.textContent = (prefix || '') + current + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.stat-num[data-target]');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, prefix, suffix, 1800);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statsObserver.observe(el));
