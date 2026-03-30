/* ============================================================
   NEXACARE 2050 — SHARED JAVASCRIPT
   ============================================================ */

// ── Navbar toggle ──────────────────────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
  }

  // Active link highlight
  const links = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── Scroll reveal ──────────────────────────────────────────
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

// ── Chatbot ────────────────────────────────────────────────
(function () {
  const chatBtn   = document.getElementById('chatbot-btn');
  const chatPanel = document.getElementById('chatbot-panel');
  const chatClose = document.getElementById('chat-close');
  const chatBody  = document.getElementById('chat-body');
  const chatOpts  = document.querySelectorAll('.chat-opt');
  if (!chatBtn) return;

  chatBtn.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
  });
  chatClose.addEventListener('click', () => {
    chatPanel.classList.remove('open');
  });

  const replies = {
    appointment: "📅 You can book online via our portal or call <strong>+1 800 NEXA CARE</strong>. Our next available slot is tomorrow at 10:00 AM.",
    availability: "🩺 Dr. Yuki Chen (AI-Neurology) is available Mon–Fri 9AM–5PM. Dr. Ren Maddox (Cardio) is available Tue, Thu, Sat. Use our app for real-time availability.",
    emergency:    "🚨 <strong>Emergency?</strong> Call <strong>911</strong> immediately or dial our emergency line: <strong>+1 800 NEXA-911</strong>. Our trauma bay is open 24/7.",
    location:     "📍 NexaCare Medical Centre<br>2050 Future Blvd, Neo City, NC 00001.<br><a href='contact.html' style='color:var(--neon)'>View on map →</a>",
    call:         "📞 Main Line: <strong>+1 800 NEXA CARE</strong><br>Emergency: <strong>+1 800 NEXA-911</strong><br>WhatsApp: <strong>+1 800 939 2273</strong>"
  };

  chatOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      appendMsg(btn.textContent.trim(), 'user');
      setTimeout(() => appendMsg(replies[key], 'bot'), 600);
    });
  });

  function appendMsg(html, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.innerHTML = html;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
})();

// ── 3D Card Tilt ───────────────────────────────────────────
(function () {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -20;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
})();

// ── Parallax scroll ────────────────────────────────────────
(function () {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
})();

// ── Counter animation ──────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}

// Trigger counters when visible
const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}
