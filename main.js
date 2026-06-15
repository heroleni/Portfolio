/* =====================================================================
   main.js — Juan Eduardo Zorrilla Chávez · Portafolio
   Módulos: starfield · navbar · reveal · contact form · utils
   ===================================================================== */

/* =====================================================================
   1. CAMPO ESTELAR ANIMADO (canvas)
   ===================================================================== */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [], shooting = null, W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(180, Math.floor(W * H / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + .3,
      a: Math.random(), s: Math.random() * .015 + .004,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function maybeShoot() {
    if (shooting || Math.random() > .004) return;
    shooting = {
      x: Math.random() * W * .6, y: Math.random() * H * .3,
      len: 0, max: Math.random() * 180 + 120,
      sp: Math.random() * 7 + 6, life: 1
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const st of stars) {
      st.tw += st.s;
      const tw = (Math.sin(st.tw) + 1) / 2;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${180 + tw * 60},${200 + tw * 40},255,${.25 + tw * .6})`;
      ctx.fill();
    }
    maybeShoot();
    if (shooting) {
      const s = shooting;
      s.len += s.sp; s.x += s.sp; s.y += s.sp * .5; s.life -= .012;
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * .5);
      g.addColorStop(0, `rgba(150,210,255,${s.life})`);
      g.addColorStop(1, 'rgba(150,210,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.len, s.y - s.len * .5); ctx.stroke();
      if (s.life <= 0 || s.len > s.max) shooting = null;
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);

  if (reduce) {
    for (const st of stars) {
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,215,255,.5)'; ctx.fill();
    }
  } else { draw(); }
})();

/* =====================================================================
   2. NAVBAR — auto-ocultar · glass scrolled · enlace activo
   ===================================================================== */
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!nav) return;

  let lastY = window.scrollY, ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 30);
    if (y > lastY && y > 200) { nav.classList.add('hidden'); }
    else                       { nav.classList.remove('hidden'); }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // Menú móvil
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }));
  }

  // Enlace activo según sección (solo en index.html)
  const sections = [...document.querySelectorAll('section[id], header[id]')];
  const linkMap  = {};
  document.querySelectorAll('[data-link]').forEach(a => {
    linkMap[a.getAttribute('href').replace(/.*#/, '')] = a;
  });
  if (sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          Object.values(linkMap).forEach(a => a.classList.remove('active'));
          const a = linkMap[en.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }
})();

/* =====================================================================
   3. REVEAL ON SCROLL (fade-in / slide-up)
   ===================================================================== */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* =====================================================================
   4. FORMULARIO DE CONTACTO (demo sin backend)
   ===================================================================== */
(function initForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('msg')) {
      status.style.color = 'var(--rose)';
      status.textContent = '// Faltan campos por completar.';
      return;
    }
    status.style.color = 'var(--stellar)';
    status.textContent = '✦ Señal transmitida. Te responderé pronto.';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
})();

/* =====================================================================
   5. QUICK-LINKS: Discord copia usuario al portapapeles
   ===================================================================== */
(function initSocials() {
  document.querySelectorAll('[data-social]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigator.clipboard?.writeText('juan.zorrilla');
      const small = el.querySelector('.qt small');
      if (!small) return;
      const prev = small.textContent;
      small.textContent = '¡Usuario copiado!';
      setTimeout(() => { small.textContent = prev; }, 1800);
    });
  });
})();

/* =====================================================================
   6. AÑO EN FOOTER
   ===================================================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =====================================================================
   7. HALO HOLOGRÁFICO EN TARJETAS (mousemove)
   ===================================================================== */
(function initCardHalo() {
  const grid = document.getElementById('projGrid');
  if (!grid) return;
  grid.addEventListener('mousemove', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
  });
})();

/* =====================================================================
   8. DATOS DE PROYECTOS — array compartido (importado en proyectos.html)
   ===================================================================== */
window.PROJECTS = [
  {
    title: "Firmeza", path: "Preservación", icon: "🛡️", color: "#6ad7ff",
    desc: "Plataforma web completa con enfoque en robustez y estructura. Front y lógica de extremo a extremo.",
    tech: ["HTML", "CSS", "JavaScript"], tags: ["htmlcss", "js"],
    repo: "#", demo: "#"
  },
  {
    title: "HeroLeni", path: "La Caza", icon: "🚀", color: "#ff7eb6",
    desc: "Aplicación interactiva centrada en la experiencia de usuario, con componentes dinámicos y animaciones fluidas.",
    tech: ["JavaScript", "HTML", "CSS"], tags: ["js", "htmlcss"],
    repo: "https://github.com/heroleni", demo: "#"
  },
  {
    title: "Complete Moodle", path: "La Erudición", icon: "🎓", color: "#f6d36b",
    desc: "Sistema de aprendizaje tipo LMS. Gestión de cursos, usuarios y contenidos con persistencia en base de datos.",
    tech: ["PHP", "SQL", "Bootstrap"], tags: ["db", "htmlcss"],
    repo: "#", demo: "#"
  },
  {
    title: "API de Gestión", path: "La Armonía", icon: "⚙️", color: "#b48cff",
    desc: "Backend RESTful en C# / ASP.NET con autenticación JWT, controladores limpios y Entity Framework.",
    tech: ["C#", "ASP.NET", "SQL"], tags: ["csharp", "aspnet", "db"],
    repo: "#", demo: "#"
  },
  {
    title: "Automatización Python", path: "El Nihilismo", icon: "🐍", color: "#6ad7ff",
    desc: "Scripts de automatización y procesamiento de datos. Tareas repetitivas convertidas en flujos de un clic.",
    tech: ["Python", "Pandas"], tags: ["python"],
    repo: "#", demo: "#"
  },
  {
    title: "Servicio Spring Boot", path: "La Abundancia", icon: "☕", color: "#f6d36b",
    desc: "Microservicio en Java con Spring Boot, capa de servicios desacoplada y conexión a base de datos relacional.",
    tech: ["Java", "Spring Boot", "SQL"], tags: ["db"],
    repo: "#", demo: "#"
  },
  {
    title: "Panel Laravel", path: "La Memoria", icon: "📊", color: "#ff7eb6",
    desc: "Dashboard administrativo en PHP/Laravel con CRUD completo, validaciones y vistas Blade responsivas.",
    tech: ["PHP", "Laravel", "SQL"], tags: ["db", "htmlcss"],
    repo: "#", demo: "#"
  },
  {
    title: "Modelo de Datos", path: "La Destrucción", icon: "🗄️", color: "#b48cff",
    desc: "Diseño y optimización de esquemas SQL: relaciones, índices y consultas eficientes para alto volumen.",
    tech: ["SQL", "PostgreSQL"], tags: ["db"],
    repo: "#", demo: "#"
  }
];
