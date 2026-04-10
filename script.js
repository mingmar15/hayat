/* ═══════════════════════════════════════════
   HAYAT HOTEL — script.js
   ═══════════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile burger menu ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    }
  });
});

// ── Star filter for downtown hotels ──
const sfBtns = document.querySelectorAll('.sf-btn');
const hotelListings = document.querySelectorAll('.hotel-listing');

sfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const stars = btn.dataset.stars;
    hotelListings.forEach(listing => {
      if (stars === 'all' || listing.dataset.stars === stars) {
        listing.classList.remove('hidden');
        listing.style.animation = 'none';
        listing.offsetHeight; // reflow
        listing.style.animation = 'fade-up 0.4s ease both';
      } else {
        listing.classList.add('hidden');
      }
    });
  });
});

// ── Booking form submission ──
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  form.style.opacity = '0';
  form.style.transform = 'translateY(-20px)';
  form.style.transition = 'all 0.4s ease';
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.style.animation = 'fade-up 0.6s ease both';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}

function resetForm() {
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  success.style.display = 'none';
  form.style.display = 'block';
  form.style.opacity = '1';
  form.style.transform = 'none';
  form.reset();
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  return false;
}

// ── Set min check-in date to today ──
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
if (checkinInput) {
  checkinInput.min = today;
  checkinInput.addEventListener('change', () => {
    checkoutInput.min = checkinInput.value;
    if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
      checkoutInput.value = '';
    }
  });
}

// ── Fade-in on scroll (Intersection Observer) ──
const fadeEls = document.querySelectorAll(
  '.service-card, .room-card, .testimonial-card, .hotel-listing, .af-item, .cd-item'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── "Book Now" in navbar scrolls to booking section ──
document.getElementById('navBookBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  burger.classList.remove('active');
  navLinks.classList.remove('open');
});
