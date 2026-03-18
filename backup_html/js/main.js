/* ============================================================
   EURO RENTAL CARS LLC — Main JS
   ============================================================ */

// --- Navigation ---
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Mark active nav link
(function markActiveNav() {
  const links = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// --- Back to top ---
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-in');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// --- Vehicle Showcase Carousel ---
function initShowcase() {
  const vehicles = [
    {
      num: '001',
      brand: 'LAMBORGHINI',
      name: 'Lamborghini Urus',
      year: '2019',
      type: 'SUV',
      price: '$1,599',
      desc: 'The world\'s first Super Sport Utility Vehicle. Unmatched performance meets everyday usability.',
      img: './lamborghini_urus.jpg',
      hp: '650',
      speed: '190 MPH',
    },
    {
      num: '002',
      brand: 'FERRARI',
      name: 'Ferrari California T',
      year: '2017',
      type: 'Coupe',
      price: '$1,099',
      desc: 'Open-top grand touring at its finest. The turbocharged California T delivers pure Italian passion.',
      img: './ferrari_california.jpg',
      hp: '553',
      speed: '196 MPH',
    },
    {
      num: '003',
      brand: 'McLAREN',
      name: 'McLaren MP4-12C',
      year: '2014',
      type: 'Spider Coupe',
      price: '$3,499',
      desc: 'British engineering at its most extreme. A mid-engine supercar built for pure driving perfection.',
      img: './mclaren_mp4.jpg',
      hp: '616',
      speed: '205 MPH',
    },
    {
      num: '004',
      brand: 'BENTLEY',
      name: 'Bentley Bentayga',
      year: '2017',
      type: 'SUV',
      price: '$799',
      desc: 'The pinnacle of luxury SUVs. Handcrafted elegance with breathtaking performance.',
      img: './bentley_bentayga.jpg',
      hp: '500',
      speed: '170 MPH',
    },
  ];

  let current = 0;
  const brandBg = document.querySelector('.showcase-brand-bg span');
  const img = document.querySelector('.showcase-image img');
  const num = document.querySelector('.showcase-num');
  const nameEl = document.querySelector('.showcase-name');
  const descEl = document.querySelector('.showcase-desc');
  const priceEl = document.querySelector('.showcase-price-val');
  const hpEl = document.querySelector('[data-spec="hp"]');
  const speedEl = document.querySelector('[data-spec="speed"]');
  const yearEl = document.querySelector('[data-spec="year"]');
  const prevBtn = document.querySelector('.showcase-prev');
  const nextBtn = document.querySelector('.showcase-next');

  if (!brandBg) return;

  function update(v) {
    const wrap = document.querySelector('.showcase-image');
    if (wrap) { wrap.style.opacity = '0'; wrap.style.transform = 'scale(0.97)'; }
    setTimeout(() => {
      if (brandBg) brandBg.textContent = v.brand;
      if (img) { img.src = v.img; img.alt = v.name; }
      if (num) num.textContent = v.num;
      if (nameEl) nameEl.textContent = v.name;
      if (descEl) descEl.textContent = v.desc;
      if (priceEl) priceEl.textContent = v.price;
      if (hpEl) hpEl.textContent = v.hp + ' HP';
      if (speedEl) speedEl.textContent = v.speed;
      if (yearEl) yearEl.textContent = v.year;
      if (wrap) {
        wrap.style.opacity = '1';
        wrap.style.transform = 'scale(1)';
        wrap.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }
    }, 200);
  }

  update(vehicles[0]);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + vehicles.length) % vehicles.length;
      update(vehicles[current]);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % vehicles.length;
      update(vehicles[current]);
    });
  }
}

// --- Form Validation ---
function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#ff4d4d';
          field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        }
      });
      if (!valid) {
        e.preventDefault();
        const first = form.querySelector('[required]:placeholder-shown, [required][value=""]');
        if (first) first.focus();
      }
    });
  });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initShowcase();
  initForms();
});
