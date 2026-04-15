// NAVBAR
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('show', window.scrollY > 400);
  highlightNav();
});

// BURGER
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const b = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    b[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    b[1].style.opacity   = '0';
    b[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    b.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// NAV ACTIVE
function highlightNav() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.hash.slice(1) || 'accueil'; // ou window.location.pathname.split('/').pop()
  
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href')?.slice(1) === current) {
      link.classList.add('active');
    }
  });
}

// TYPEWRITER
const roles = [
  'Administrateur Systèmes & Réseaux',
  'Étudiant BTS SIO SISR',
  'Technicien Réseaux en Alternance',
  'Passionné par la Cybersécurité',
];
let ri = 0, ci = 0, del = false;
const roleEl = document.getElementById('typedRole');
function type() {
  const cur  = roles[ri];
  const disp = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
  roleEl.innerHTML = disp + '<span class="cursor">|</span>';
  if (!del && ci > cur.length)  { del = true;  setTimeout(type, 2000); return; }
  if ( del && ci < 0)            { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 500); return; }
  setTimeout(type, del ? 45 : 75);
}
type();

// SCROLL REVEAL
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 4) * 0.08}s`;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// BACK TO TOP
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// FORMULAIRE
document.getElementById('cForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 3500);
});


// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');

function getSavedTheme() {
  try { return localStorage.getItem('theme'); } catch(e) { return null; }
}
function saveTheme(val) {
  try { localStorage.setItem('theme', val); } catch(e) {}
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme  = getSavedTheme();

if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
  document.body.classList.add('light');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
  saveTheme(isLight ? 'light' : 'dark');
});

window.addEventListener('load', highlightNav);
