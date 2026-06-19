(function () {
  const cfg = window.SITE_CONFIG || {};
  const services = window.SERVICES || [];
  const year = new Date().getFullYear();

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function serviceUrl(slug) {
    return `${slug}.html`;
  }

  function icon(name, attrs = "") {
    return `<i data-lucide="${name}" ${attrs}></i>`;
  }

  function header() {
    return `
      <div class="topbar">
        <div class="container topbar-inner">
          <p>${icon("phone-call")} <span>Free estimate line:</span> <a data-phone-link data-phone-text href="#"></a></p>
          <p>${icon("clock-3")} <span data-business-hours></span></p>
          <p class="topbar-email">${icon("mail")} <a data-email-link data-email-text href="#"></a></p>
        </div>
      </div>
      <header class="site-header" data-header>
        <div class="container nav-shell">
          <a class="brand" href="index.html" aria-label="Home">
            <span class="brand-mark">${icon("warehouse")}</span>
            <span><strong data-company-name></strong><small>Garage Door Services</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
          <nav class="nav-menu" data-nav-menu aria-label="Main navigation">
            <a href="index.html">Home</a>
            <div class="nav-dropdown" data-mobile-dropdown>
              <a href="services.html" data-mobile-dropdown-toggle aria-expanded="false">Services ${icon("chevron-down")}</a>
              <div class="dropdown-panel">
                <div class="dropdown-grid">
                  <a class="all-services-link" href="services.html">${icon("layout-grid")}<span>All Services<small>View every garage door service category</small></span></a>
                  ${services.map(s => `<a href="${serviceUrl(s.slug)}">${icon(s.icon)}<span>${s.title}<small>${s.short}</small></span></a>`).join("")}
                </div>
              </div>
            </div>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a class="nav-email" data-email-link data-email-text href="#"></a>
          </nav>
          <div class="nav-actions">
            <a class="icon-btn" data-phone-link href="#" aria-label="Call">${icon("phone")}</a>
            <a class="btn btn-primary" href="contact.html"><span data-cta-primary></span><b></b></a>
          </div>
        </div>
      </header>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a class="brand footer-brand" href="index.html">
              <span class="brand-mark">${icon("warehouse")}</span>
              <span><strong data-company-name></strong><small>Garage Door Services</small></span>
            </a>
            <p data-footer-text-primary></p>
            <p class="muted" data-footer-text-secondary></p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>${services.slice(0, 6).map(s => `<li><a href="${serviceUrl(s.slug)}">${s.title}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>${icon("phone")} <a data-phone-link data-phone-text href="#"></a></li>
              <li>${icon("mail")} <a data-email-link data-email-text href="#"></a></li>
              <li>${icon("globe-2")} <span data-website></span></li>
              <li>${icon("map-pin")} <span data-company-address></span></li>
            </ul>
          </div>
          <div>
            <h3>Legal pages</h3>
            <ul>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li>
              <li><a href="cookie-policy.html">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="container footer-disclaimer">
          <p data-disclaimer-short></p>
          <p data-footer-disclaimer></p>
          <p class="small" data-disclaimer-full></p>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <span data-footer-company-line></span>
            <span>&copy; <span data-year></span> <span data-copyright-line></span></span>
          </div>
        </div>
      </footer>
      <a class="floating-call" data-phone-link href="#" aria-label="Call garage door service">${icon("phone-call")}</a>
      <button class="scroll-top" type="button" data-scroll-top aria-label="Back to top">${icon("arrow-up")}</button>
      <div class="cookie-banner" data-cookie-banner>
        <div class="cookie-copy">
          <span class="cookie-icon">${icon("cookie")}</span>
          <div>
            <strong>Cookie preferences</strong>
            <p>We use essential cookies to remember your choice and keep the garage door service forms working. Read the <a href="cookie-policy.html">Cookie Policy</a>.</p>
          </div>
        </div>
        <div class="cookie-actions"><button class="btn btn-dark" data-cookie-decline>Decline</button><button class="btn btn-primary" data-cookie-accept><span>Accept</span><b></b></button></div>
      </div>`;
  }

  function hydrateConfig() {
    const address = [cfg.addressLine1, cfg.addressLine2].filter(Boolean).join(", ");
    const phoneHref = `tel:${(cfg.phone || "").replace(/[^\d+]/g, "")}`;
    const emailHref = `mailto:${cfg.email}`;
    const siteTitle = document.title.replace("{{companyName}}", cfg.companyName || "");
    document.title = siteTitle.includes("{{") ? `${cfg.companyName} | Garage Door Services` : siteTitle;

    const map = {
      "[data-company-name]": cfg.companyName,
      "[data-company-legal-name]": cfg.companyLegalName,
      "[data-company-id]": cfg.companyId,
      "[data-company-address]": address,
      "[data-phone-text]": cfg.phoneDisplay,
      "[data-email-text]": cfg.email,
      "[data-website]": cfg.website,
      "[data-cta-primary]": cfg.ctaPrimary,
      "[data-cta-secondary]": cfg.ctaSecondary,
      "[data-footer-text-primary]": cfg.footerTextPrimary,
      "[data-footer-text-secondary]": cfg.footerTextSecondary,
      "[data-disclaimer-short]": cfg.disclaimerShort,
      "[data-disclaimer-full]": cfg.disclaimerFull,
      "[data-footer-disclaimer]": cfg.footerDisclaimer,
      "[data-service-area]": cfg.serviceArea,
      "[data-business-hours]": cfg.businessHours,
      "[data-copyright-line]": cfg.copyrightLine,
      "[data-year]": year,
      "[data-footer-company-line]": `${cfg.companyName} - ${address} - ${cfg.companyId}`
    };

    Object.entries(map).forEach(([selector, value]) => qa(selector).forEach(el => { el.textContent = value || ""; }));
    qa("[data-phone-link]").forEach(el => { el.setAttribute("href", phoneHref); });
    qa("[data-email-link]").forEach(el => { el.setAttribute("href", emailHref); });
    qa("[data-phone-label]").forEach(el => { el.textContent = cfg.phoneButtonLabel || "Call"; });
  }

  function injectChrome() {
    const headerSlot = q("[data-site-header]");
    const footerSlot = q("[data-site-footer]");
    if (headerSlot) headerSlot.innerHTML = header();
    if (footerSlot) footerSlot.innerHTML = footer();
  }

  function serviceCard(s) {
    return `
      <article class="service-card reveal">
        <a class="service-image" href="${serviceUrl(s.slug)}"><img src="${s.image}" alt="${s.title}" loading="lazy"></a>
        <div class="service-body">
          <span class="service-icon">${icon(s.icon)}</span>
          <p class="eyebrow">${s.eyebrow}</p>
          <h3><a href="${serviceUrl(s.slug)}">${s.title}</a></h3>
          <p>${s.short}</p>
          <a class="text-link" href="${serviceUrl(s.slug)}">Read More ${icon("arrow-right")}</a>
        </div>
      </article>`;
  }

  function renderServices() {
    qa("[data-services-grid]").forEach(el => {
      if (el.hasAttribute("data-home-showcase")) {
        const ordered = [
          "new-garage-door-installation",
          "commercial-garage-doors",
          "garage-door-repair",
          "garage-door-opener-repair",
          "spring-replacement",
          "cable-track-repair",
          "maintenance-tune-up",
          "emergency-garage-door-service",
          "smart-garage-controls"
        ].map(slug => services.find(s => s.slug === slug)).filter(Boolean);
        el.innerHTML = ordered.map(serviceCard).join("");
      } else {
        el.innerHTML = services.map(serviceCard).join("");
      }
    });
    qa("[data-services-compact]").forEach(el => {
      el.innerHTML = services.map(s => `<a href="${serviceUrl(s.slug)}">${icon(s.icon)}<span>${s.title}<small>${s.short}</small></span></a>`).join("");
    });
  }

  function initServiceShowcase() {
    const section = q(".services-showcase");
    const track = q("[data-home-showcase]");
    if (!section || !track) return;

    const cards = qa(".service-card", track);
    const viewport = q(".showcase-viewport", section);
    const prev = q("[data-showcase-prev]", section);
    const next = q("[data-showcase-next]", section);
    let index = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    function perView() {
      return window.matchMedia("(max-width: 760px)").matches ? 1 : 3;
    }

    function maxIndex() {
      return Math.max(0, cards.length - perView());
    }

    function update() {
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
      const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
      index = Math.max(0, Math.min(index, maxIndex()));
      track.style.transform = `translateX(${-index * (cardWidth + gap)}px)`;
      section.setAttribute("data-showcase-index", String(index));
    }

    prev?.addEventListener("click", () => {
      index = index <= 0 ? maxIndex() : index - 1;
      update();
    });

    next?.addEventListener("click", () => {
      index = index >= maxIndex() ? 0 : index + 1;
      update();
    });

    viewport?.addEventListener("touchstart", event => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    viewport?.addEventListener("touchend", event => {
      if (!window.matchMedia("(max-width: 760px)").matches) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
      index = deltaX < 0
        ? (index >= maxIndex() ? 0 : index + 1)
        : (index <= 0 ? maxIndex() : index - 1);
      update();
    }, { passive: true });

    window.addEventListener("resize", update);
    update();
  }

  function list(items) {
    return `<ul class="check-list">${items.map(item => `<li>${icon("check")}<span>${item}</span></li>`).join("")}</ul>`;
  }

  function renderServicePage() {
    const root = q("[data-service-page]");
    if (!root) return;
    const slug = root.getAttribute("data-service-page");
    const service = services.find(s => s.slug === slug);
    if (!service) {
      root.innerHTML = `<section class="section"><div class="container"><h1>Service not found</h1><p>Please return to the services directory.</p></div></section>`;
      return;
    }
    document.title = `${service.title} | ${cfg.companyName}`;
    root.innerHTML = `
      <section class="page-hero service-hero" style="--hero-image:url('/${service.image}')">
        <div class="container hero-grid">
          <div class="hero-copy reveal">
            <p class="eyebrow">${icon(service.icon)} ${service.eyebrow}</p>
            <h1>${service.title}</h1>
            <p>${service.intro}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="contact.html"><span data-cta-secondary></span><b></b></a>
              <a class="call-inline" data-phone-link href="#">${icon("phone-call")} <span data-phone-text></span></a>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container split-layout">
          <div class="reveal">
            <p class="eyebrow">What is included</p>
            <h2>Detailed service coverage</h2>
            ${list(service.included)}
          </div>
          <div class="feature-panel reveal">
            <h3>Options customers commonly compare</h3>
            ${list(service.options)}
          </div>
        </div>
      </section>
      <section class="section blue-section">
        <div class="container split-layout">
          <div class="reveal">
            <p class="eyebrow">Best fit</p>
            <h2>When this service makes sense</h2>
            ${list(service.bestFor)}
          </div>
          <div class="process-list reveal">
            ${service.process.map((step, i) => `<div><strong>${String(i + 1).padStart(2, "0")}</strong><p>${step}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container content-columns">
          ${service.details.map(d => `<article class="detail-card reveal">${icon("info")}<p>${d}</p></article>`).join("")}
        </div>
      </section>
      <section class="section faq-section">
        <div class="container narrow">
          <p class="eyebrow reveal">Questions</p>
          <h2 class="reveal">Useful details before you schedule</h2>
          <div class="accordion">
            ${service.faqs.map((faq, i) => `<button class="acc-btn ${i === 0 ? "active" : ""}" type="button">${faq[0]}${icon("chevron-down")}</button><div class="acc-panel ${i === 0 ? "open" : ""}"><p>${faq[1]}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section related-section">
        <div class="container">
          <div class="section-head reveal"><p class="eyebrow">Related services</p><h2>Keep the whole system working together</h2></div>
          <div class="service-grid compact">${service.related.map(slug => serviceCard(services.find(s => s.slug === slug))).join("")}</div>
        </div>
      </section>`;
    hydrateConfig();
  }

  function renderLegal() {
    qa("[data-config-company]").forEach(el => el.textContent = cfg.companyName);
    qa("[data-config-legal]").forEach(el => el.textContent = cfg.companyLegalName);
    qa("[data-config-email]").forEach(el => el.textContent = cfg.email);
    qa("[data-config-area]").forEach(el => el.textContent = cfg.serviceArea);
    qa("[data-config-disclaimer]").forEach(el => el.textContent = cfg.disclaimerFull);
  }

  function interactions() {
    const headerEl = q("[data-header]");
    const scrollTop = q("[data-scroll-top]");
    const navToggle = q(".nav-toggle");
    const navMenu = q("[data-nav-menu]");

    window.addEventListener("scroll", () => {
      const fixed = window.scrollY > 110;
      headerEl?.classList.toggle("fixed-header", fixed);
      scrollTop?.classList.toggle("open", fixed);
    }, { passive: true });

    navToggle?.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    qa("[data-mobile-dropdown-toggle]").forEach(toggle => {
      toggle.addEventListener("click", event => {
        if (!window.matchMedia("(max-width: 760px)").matches) return;
        event.preventDefault();
        const dropdown = toggle.closest("[data-mobile-dropdown]");
        const panel = q(".dropdown-panel", dropdown);
        const open = dropdown.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        if (panel) panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
      });
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 760px)").matches) return;
      qa("[data-mobile-dropdown]").forEach(dropdown => {
        dropdown.classList.remove("open");
        q("[data-mobile-dropdown-toggle]", dropdown)?.setAttribute("aria-expanded", "false");
        const panel = q(".dropdown-panel", dropdown);
        if (panel) panel.style.maxHeight = "";
      });
    });

    scrollTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    qa(".accordion").forEach(accordion => {
      const buttons = qa(".acc-btn", accordion);
      const panels = qa(".acc-panel", accordion);

      function setPanel(btn, panel, open) {
        btn.classList.toggle("active", open);
        btn.setAttribute("aria-expanded", String(open));
        panel.classList.toggle("open", open);
        panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
      }

      buttons.forEach(btn => {
        const panel = btn.nextElementSibling;
        if (!panel?.classList.contains("acc-panel")) return;
        setPanel(btn, panel, panel.classList.contains("open"));
        btn.addEventListener("click", () => {
          const shouldOpen = !panel.classList.contains("open");
          panels.forEach((item, index) => setPanel(buttons[index], item, item === panel && shouldOpen));
        });
      });
    });

    qa("[data-contact-form]").forEach(form => {
      form.addEventListener("submit", event => {
        event.preventDefault();
        const msg = q("[data-success-message]", form.parentElement);
        if (msg) {
          msg.textContent = `Thanks. ${cfg.companyName} received your request. A local provider or our coordination team will follow up using ${cfg.email}.`;
          msg.classList.add("show");
        }
        form.reset();
      });
    });
  }

  function revealAndCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        if (entry.target.matches("[data-counter]") && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          const end = Number(entry.target.dataset.counter);
          const start = performance.now();
          const run = now => {
            const p = Math.min((now - start) / 1400, 1);
            entry.target.textContent = Math.floor(end * p).toLocaleString();
            if (p < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    qa(".reveal, [data-counter]").forEach(el => observer.observe(el));
  }

  function cookies() {
    const key = "doorcraft_cookie_preference";
    const banner = q("[data-cookie-banner]");
    if (!banner || localStorage.getItem(key)) return;
    banner.classList.add("show");
    q("[data-cookie-accept]")?.addEventListener("click", () => { localStorage.setItem(key, "accepted"); banner.classList.remove("show"); });
    q("[data-cookie-decline]")?.addEventListener("click", () => { localStorage.setItem(key, "declined"); banner.classList.remove("show"); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectChrome();
    renderServices();
    initServiceShowcase();
    renderServicePage();
    renderLegal();
    hydrateConfig();
    interactions();
    revealAndCounters();
    cookies();
    if (window.lucide) window.lucide.createIcons();
  });
})();
