/* Palette Pals — interactions */

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    })
  );
}

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Contact form — submits to Netlify Forms via AJAX (no page reload)
// Note: this only works once the site is deployed on Netlify.
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    const data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error('network');
        form.reset();
        if (status) { status.style.color = 'var(--sage)'; status.textContent = "Thank you! Your enquiry is on its way — we'll be in touch soon 🎨"; }
      })
      .catch(() => {
        if (status) { status.style.color = 'var(--terracotta)'; status.textContent = "Hmm, that didn't send. Please email us at WhatsApp +91 84354 69050 💌"; }
      })
      .finally(() => {
        if (btn) { btn.disabled = false; btn.textContent = 'Send enquiry →'; }
      });
  });
}
