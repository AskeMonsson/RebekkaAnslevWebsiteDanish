/* nav.js — shared navigation & footer injected on every page */

(function () {
  const pages = [
    { label: 'Terapi',                href: '/subpages/terapi.html' },
    { label: 'Workshops & foredrag',  href: '/subpages/workshops.html' },
    { label: 'Forfatter',             href: '/subpages/forfatter.html' },
    { label: 'Til virksomheder',      href: '/subpages/til_virksomheder.html' },
    { label: 'Om mig',                href: '/subpages/om_mig.html' },
    { label: 'Priser',                href: '/subpages/priser.html' },
    { label: 'Kontakt',               href: '/subpages/kontakt.html' },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = pages.map(p => {
    const active = current === p.href ? ' class="active"' : '';
    return `<li><a href="${p.href}"${active}>${p.label}</a></li>`;
  }).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

const flagSVG = (w, h) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width="${w}" height="${h}" aria-hidden="true" style="display:block;border-radius:2px;">
    <!-- Blue background -->
    <rect width="60" height="36" fill="#012169"/>
    <!-- White diagonals (St Andrew + St Patrick combined, wide) -->
    <polygon points="0,0 8,0 60,32 60,36 52,36 0,4" fill="#fff"/>
    <polygon points="60,0 52,0 0,32 0,36 8,36 60,4" fill="#fff"/>
    <!-- Red diagonals (St Patrick, narrow, offset) -->
    <polygon points="0,0 0,4 54,36 60,36 60,32 6,0" fill="#C8102E"/>
    <polygon points="60,0 60,4 6,36 0,36 0,32 54,0" fill="#C8102E"/>
    <!-- White cross (St George, wide) -->
    <rect x="22" y="0" width="16" height="36" fill="#fff"/>
    <rect x="0" y="13" width="60" height="10" fill="#fff"/>
    <!-- Red cross (St George, narrow) -->
    <rect x="25" y="0" width="10" height="36" fill="#C8102E"/>
    <rect x="0" y="15" width="60" height="6" fill="#C8102E"/>
  </svg>`;

  // Inject nav
  document.getElementById('site-nav').innerHTML = `
    <nav id="navbar">
      <a class="nav-logo" href="/index.html" aria-label="Hjem">
        <img src="/images/logo.png" alt="Rebekka Anslev logo" onerror="this.style.display='none'">
        <span>Rebekka Anslev</span>
      </a>
      <ul class="nav-links">${navLinks}</ul>
      <div class="nav-right">
        <a class="lang-switch" href="https://rebekkaanslev.com" title="Go to English site">
          ${flagSVG(25, 19)}
          <span>English</span>
        </a>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
      </a>
    </div>
  `;

  // Inject footer
  document.getElementById('site-footer').innerHTML = `
    <footer>
      <a class="footer-logo" href="/index.html">Rebekka Anslev</a>
      <div class="footer-links">
        ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
      </div>
      <span class="footer-copy">CVR 44261022 · © Alle rettigheder forbeholdes</span>
    </footer>
  `;

  // Nav scroll shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  document.getElementById('mobileMenu').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') document.getElementById('mobileMenu').classList.remove('open');
  });

  // Scroll-triggered fade-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();