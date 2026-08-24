(() => {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    document.documentElement.classList.add("no-gsap");
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll("a");
    const bars = toggle.querySelectorAll("span");
    let isOpen = false;

    const menuTimeline = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
      onStart: () => {
        menu.style.visibility = "visible";
        menu.setAttribute("aria-hidden", "false");
      },
      onReverseComplete: () => {
        menu.style.visibility = "hidden";
        menu.setAttribute("aria-hidden", "true");
      },
    });

    menuTimeline
      .to(menu, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75 })
      .from(links, { yPercent: 110, autoAlpha: 0, stagger: 0.06, duration: 0.7 }, "-=0.4")
      .to(bars[0], { y: 5, rotate: 45, duration: 0.35 }, 0)
      .to(bars[1], { scaleX: 0, duration: 0.25 }, 0)
      .to(bars[2], { y: -5, rotate: -45, duration: 0.35 }, 0);

    function setMenu(open) {
      isOpen = open;
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      isOpen ? menuTimeline.play() : menuTimeline.reverse();
    }

    toggle.addEventListener("click", () => setMenu(!isOpen));
    links.forEach((link) => link.addEventListener("click", () => setMenu(false)));

    window.addEventListener("resize", () => {
      if (!mobileBreakpoint.matches && isOpen) setMenu(false);
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        const target = id && id.length > 1 ? document.querySelector(id) : null;
        if (!target || reducedMotion) return;
        event.preventDefault();
        gsap.to(window, {
          duration: 1.25,
          scrollTo: { y: target, autoKill: true },
          ease: "power3.inOut",
        });
      });
    });
  }

  function initGlassNav() {
    const nav = document.querySelector(".nav-shell");
    if (!nav || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    nav.addEventListener("pointerenter", () => {
      gsap.to(nav, {
        "--glass-strength": 0.95,
        scale: 1.004,
        duration: 0.45,
        ease: "power2.out",
      });
    });

    nav.addEventListener("pointermove", (event) => {
      const bounds = nav.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      gsap.to(nav, {
        "--glass-x": `${x}%`,
        "--glass-y": `${y}%`,
        duration: 0.38,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    nav.addEventListener("pointerleave", () => {
      gsap.to(nav, {
        "--glass-x": "18%",
        "--glass-y": "0%",
        "--glass-strength": 0.62,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    });
  }

  function initHero() {
    const title = document.querySelector(".hero-title");
    const splitTitle = SplitText.create(title, { type: "chars", charsClass: "char" });

    gsap.set(splitTitle.chars, { yPercent: 115, autoAlpha: 0 });
    gsap.set(".hero-model", { xPercent: 7, autoAlpha: 0, scale: 0.985 });
    gsap.set(".hero-copy > *", { y: 22, autoAlpha: 0 });
    gsap.set(".nav-shell, .menu-toggle", { y: -18, autoAlpha: 0 });

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .to(".nav-shell, .menu-toggle", { y: 0, autoAlpha: 1, duration: 0.9 }, 0.1)
      .to(".hero-model", { xPercent: 0, autoAlpha: 1, scale: 1, duration: 1.45 }, 0.15)
      .to(splitTitle.chars, { yPercent: 0, autoAlpha: 1, stagger: 0.045, duration: 1 }, 0.32)
      .to(".hero-copy > *", { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8 }, 0.55);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    })
      .to(".hero-model", { yPercent: 9, scale: 1.025, ease: "none" }, 0)
      .to(".hero-title", { yPercent: -16, ease: "none" }, 0)
      .to(".hero-copy", { yPercent: -18, autoAlpha: 0.4, ease: "none" }, 0);
  }

  function initSplitReveals() {
    document.querySelectorAll(".split-lines").forEach((element) => {
      SplitText.create(element, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        },
      });
    });

    document.querySelectorAll(".split-heading").forEach((element) => {
      SplitText.create(element, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          });
        },
      });
    });
  }

  function initEditorial() {
    document.querySelectorAll(".image-reveal").forEach((wrapper) => {
      const image = wrapper.querySelector("img");
      if (!image) return;

      gsap.fromTo(
        wrapper,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power3.inOut",
          scrollTrigger: { trigger: wrapper, start: "top 86%", once: true },
        },
      );

      gsap.fromTo(
        image,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: wrapper, start: "top 86%", once: true },
        },
      );
    });

    gsap.from(".editorial-card figcaption, .note-block > span", {
      y: 12,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: { trigger: ".editorial", start: "top 72%", once: true },
    });
  }

  function initRevealScene() {
    const stage = document.querySelector(".reveal-stage");
    const maskWord = document.querySelector(".mask-word");
    const maskExpander = document.querySelector(".mask-expander");
    const maskLayer = document.querySelector(".reveal-mask-layer");
    const photo = document.querySelector(".reveal-photo");
    const campaignShade = document.querySelector(".campaign-shade");
    const campaignCopy = document.querySelector(".campaign-copy");
    if (!stage || !maskWord || !maskExpander || !maskLayer || !photo || !campaignShade || !campaignCopy) return;

    gsap.set(maskExpander, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(campaignShade, { autoAlpha: 0 });
    gsap.set(campaignCopy.children, { y: 24, autoAlpha: 0 });

    const finalClip = () => {
      const styles = getComputedStyle(document.documentElement);
      const x = styles.getPropertyValue("--frame-inset-x").trim();
      const y = styles.getPropertyValue("--frame-inset-y").trim();
      return `inset(${y} ${x} ${y} ${x} round 4px)`;
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".reveal-scene",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    timeline
      .to(maskWord, {
        fontSize: () => window.innerWidth * (mobileBreakpoint.matches ? 1.45 : 0.82),
        duration: 3.65,
        ease: "power2.inOut",
      }, 0)
      .to(maskExpander, {
        scale: 1,
        duration: 2.6,
        ease: "power2.inOut",
      }, 0.75)
      .to(photo, { autoAlpha: 1, duration: 0.12 }, 3.55)
      .to(maskLayer, { autoAlpha: 0, duration: 0.12 }, 3.57)
      .to(stage, { backgroundColor: "#e9d6c2", duration: 1.7 }, 4.35)
      .to(photo, { clipPath: finalClip, duration: 1.8, ease: "power3.inOut" }, 4.35)
      .to(campaignShade, { autoAlpha: 1, duration: 1.1, ease: "power2.out" }, 4.9)
      .to(campaignCopy, { autoAlpha: 1, duration: 0.5 }, 5.3)
      .to(campaignCopy.children, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      }, 5.4);
  }

  function initProducts() {
    gsap.from(".product-card", {
      y: 45,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".product-grid", start: "top 82%", once: true },
    });

    document.querySelectorAll(".product-card").forEach((card) => {
      const image = card.querySelector("img");
      card.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.055, duration: 0.8, ease: "power3.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.8, ease: "power3.out" });
      });
    });
  }

  function initMagneticButtons() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.querySelectorAll(".magnetic").forEach((button) => {
      const moveX = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
      const moveY = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });
      const arrow = button.querySelector(".button-arrow");

      button.addEventListener("pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        moveY((event.clientY - bounds.top - bounds.height / 2) * 0.2);
        gsap.to(arrow, { rotate: -28, duration: 0.35, ease: "power2.out" });
      });

      button.addEventListener("pointerleave", () => {
        moveX(0);
        moveY(0);
        gsap.to(arrow, { rotate: 0, duration: 0.5, ease: "power3.out" });
      });
    });
  }

  function initFooter() {
    gsap.from(".footer-inner > *", {
      y: 22,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".footer-inner", start: "top 88%", once: true },
    });
  }

  function init() {
    document.documentElement.classList.add("is-ready");
    initMenu();
    initSmoothAnchors();
    initGlassNav();

    if (!reducedMotion) {
      initHero();
      initSplitReveals();
      initEditorial();
      initRevealScene();
      initProducts();
      initMagneticButtons();
      initFooter();
    }

    ScrollTrigger.refresh();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    window.addEventListener("load", init, { once: true });
  }
})();
