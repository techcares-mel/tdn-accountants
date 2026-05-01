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

/* ==========================================
   INTERSECTION OBSERVERS
   (declared here so they can be reused after
    dynamic re-renders from content fetch)
   ========================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

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

function observeRevealEls(root) {
  root.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function observeStatEls(root) {
  root.querySelectorAll('.stat-num[data-target]').forEach(el => statsObserver.observe(el));
}

// Observe static elements already in the DOM
observeRevealEls(document);
observeStatEls(document);

/* ==========================================
   DYNAMIC CONTENT FROM /api/content
   ========================================== */
function setTextSafe(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderStats(stats) {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  grid.innerHTML = stats.map((s, i) => `
    <div class="stat-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}">
      <div class="stat-num${i % 2 !== 0 ? ' accent' : ''}" data-target="${s.target}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}">
        ${s.prefix || ''}0${s.suffix || ''}
      </div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
  observeRevealEls(grid);
  observeStatEls(grid);
}

function renderTestimonials(testimonials) {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = testimonials.map((t, i) => `
    <div class="testi-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"${t.quote}"</p>
      <div class="testi-author">
        <div class="testi-av">${t.initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-biz">${t.business}</div>
        </div>
      </div>
    </div>
  `).join('');
  observeRevealEls(grid);
}

function renderPricing(pricing) {
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;
  grid.innerHTML = pricing.map((p, i) => `
    <div class="pricing-card${p.featured ? ' featured' : ''} reveal${i > 0 ? ` reveal-delay-${i}` : ''}">
      ${p.featured ? '<div class="pricing-popular">Most Popular</div>' : ''}
      <div class="pricing-tier">${p.tier}</div>
      <div class="pricing-price">${p.price}${p.suffix ? `<span>${p.suffix}</span>` : ''}</div>
      <p class="pricing-desc">${p.desc}</p>
      <ul class="pricing-features">
        ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
        ${(p.excluded || []).map(f => `<li class="dim">✗ ${f}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} w-full">
        ${p.tier === 'Enterprise' ? 'Contact Us' : 'Get Started'}
      </a>
    </div>
  `).join('');
  observeRevealEls(grid);
}

fetch('/api/content')
  .then(r => r.json())
  .then(c => {
    // Hero
    setTextSafe('hero-badge', c.hero.badge);
    setTextSafe('hero-h1-line1', c.hero.h1_line1);
    setTextSafe('hero-h1-line2', c.hero.h1_line2);
    setTextSafe('hero-gradient-word', c.hero.h1_gradient);
    setTextSafe('hero-sub', c.hero.subheading);

    const trustEl = document.getElementById('hero-trust');
    if (trustEl && c.hero.trust) {
      trustEl.innerHTML = c.hero.trust.map(t => `<span>✓ ${t}</span>`).join('');
    }

    // Repeated sections
    renderStats(c.stats);
    renderTestimonials(c.testimonials);
    renderPricing(c.pricing);

    // CTA
    const ctaHeading = document.getElementById('cta-heading');
    if (ctaHeading) ctaHeading.firstChild.textContent = c.cta.heading + ' ';
    setTextSafe('cta-sub', c.cta.subtext);
    setTextSafe('cta-btn', c.cta.button);

    // Footer
    setTextSafe('footer-tagline', c.footer.tagline);
    const addrEl = document.getElementById('footer-address');
    if (addrEl) addrEl.innerHTML = c.footer.address.replace(/\n/g, '<br>');
  })
  .catch(() => {
    // Content load failed — static fallback in HTML remains visible
  });
