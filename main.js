(function () {
  'use strict';

  /* scroll progress */
  const bar = document.getElementById('progress');
  if (bar) {
    function updateBar() {
      const d = document.documentElement;
      bar.style.width = (window.scrollY / (d.scrollHeight - d.clientHeight) * 100) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* theme */
  const root = document.documentElement;
  const btn = document.getElementById('theme-btn');
  const saved = localStorage.getItem('fo-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('fo-theme', next);
  });

  /* mobile menu */
  const ham = document.getElementById('ham');
  const mobileNav = document.getElementById('mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => io.observe(r));

})();
