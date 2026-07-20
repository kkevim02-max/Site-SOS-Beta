// Marca o documento antes da pintura para evitar que os elementos apareçam sem animação.
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    const backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    document.body.appendChild(backdrop);

    const closeMenu = () => {
      nav.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.textContent = "☰";
      toggle.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      nav.classList.add("open");
      backdrop.classList.add("open");
      document.body.classList.add("menu-open");
      toggle.textContent = "✕";
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => nav.classList.contains("open") ? closeMenu() : openMenu());
    backdrop.addEventListener("click", closeMenu);
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
  }

  /*
   * Adiciona animações automaticamente. Assim, páginas e aulas novas também
   * recebem movimento sem exigir a classe reveal em cada elemento.
   */
  const motionGroups = [
    [".section-head, .course-header, .notice, .toolbar, .liturgy-intro, .catholic-band", "motion-zoom"],
    [".card, .lesson-row, .resource, .season, .lesson-block, .faith-card, .rite-card, .criteria-list > div", "motion-item"],
    [".content-grid > .sidebar, .grid-2 > :nth-child(odd)", "motion-left"],
    [".content-grid > .article, .grid-2 > :nth-child(even)", "motion-right"],
    [".article > section:nth-of-type(odd)", "motion-left"],
    [".article > section:nth-of-type(even)", "motion-right"],
    [".visual-gallery, .visual-steps, .instrument-parts, .mini-table, .error-grid, .chord-flow, .study-plan, .quiz-list, .visual-checklist, .breath-diagram, .pitch-ladder, .vowel-row, .visual-timeline, .rhythm-grid, .mic-diagram, .hand-pair, .keyboard-diagram, .bass-board", "motion-scale"],
    [".footer-grid > *, .footer-bottom", "motion-item"]
  ];

  motionGroups.forEach(([selector, variant]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add("motion-item");
      if (variant !== "motion-item") element.classList.add(variant);
    });
  });

  // Grades aparecem em sequência, um item após o outro.
  document.querySelectorAll(".grid-2, .grid-3, .grid-4, .lesson-list, .resource-list, .seasons, .faith-grid, .rites-grid, .criteria-list, .footer-grid").forEach((group) => {
    group.classList.add("motion-stagger");
    [...group.children].forEach((child, index) => {
      child.classList.add("motion-item");
      child.style.setProperty("--motion-delay", `${Math.min(index, 8) * 75}ms`);
    });
  });

  const items = [...document.querySelectorAll(".motion-item, .reveal")];
  items.forEach((item) => item.classList.add("motion-item"));

  const showItem = (item) => {
    item.classList.add("motion-visible", "visible");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showItem(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -7% 0px"
    });

    items.forEach((item) => observer.observe(item));

    // Conteúdo criado pelo JavaScript (aulas, folhas, apostilas) também anima.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const candidates = [node, ...node.querySelectorAll?.(".card, .lesson-row, .resource, .season, .lesson-block") || []];
          candidates.forEach((element, index) => {
            if (!element.matches?.(".card, .lesson-row, .resource, .season, .lesson-block")) return;
            element.classList.add("motion-item");
            element.style.setProperty("--motion-delay", `${Math.min(index, 8) * 65}ms`);
            observer.observe(element);
          });
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    items.forEach(showItem);
  }

  const logo = document.querySelector(".hero-logo");
  if (logo && matchMedia("(min-width:900px)").matches) {
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / innerWidth - .5) * 8;
      const y = (event.clientY / innerHeight - .5) * -8;
      logo.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
    document.addEventListener("mouseleave", () => { logo.style.transform = ""; });
  }

  // Parallax discreto somente em telas grandes.
  if (matchMedia("(min-width:900px) and (prefers-reduced-motion:no-preference)").matches) {
    const pageSymbol = document.querySelector(".page-symbol");
    const floating = [...document.querySelectorAll(".floating span")];
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (pageSymbol) pageSymbol.style.transform = `translateY(${Math.min(y * .07, 26)}px) rotate(${Math.min(y * .01, 4)}deg)`;
        floating.forEach((element, index) => {
          element.style.transform = `translateY(${y * (.025 + index * .006)}px)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }
});
