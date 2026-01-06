/**
 * Project: nimb-netx.org
 * Style: Digital Gazette (AI for People)
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LIBRARY INITIALIZATION ---

  // Lenis Smooth Scroll
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Lucide Icons
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // GSAP ScrollTrigger Registration
  gsap.registerPlugin(ScrollTrigger);


  // --- 2. MOBILE MENU (Full Overlay) ---

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const body = document.body;

  const toggleMenu = () => {
      const isActive = nav.classList.contains('nav--active');
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--active');

      // Background scroll lock
      body.style.overflow = isActive ? '' : 'hidden';

      // Menu links animation
      if (!isActive) {
          gsap.fromTo('.nav__link',
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.3 }
          );
      }
  };

  burger?.addEventListener('click', toggleMenu);

  // Close on anchor click
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('nav--active')) toggleMenu();
      });
  });


  // --- 3. TITLE ANIMATIONS (No word break) ---

  const splitTitles = document.querySelectorAll('#hero-title, .section-title');

  splitTitles.forEach(title => {
      // Create hierarchy: Word > Char. Prevents words from breaking.
      const text = new SplitType(title, { types: 'words, chars' });

      gsap.from(text.chars, {
          scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none"
          },
          opacity: 0,
          y: 20,
          rotateX: -45,
          stagger: 0.02,
          duration: 1,
          ease: "power2.out"
      });
  });


  // --- 4. SECTION ANIMATIONS ---

  // About Section (Image with newspaper effect)
  gsap.from('.about__img-wrapper', {
      scrollTrigger: {
          trigger: '.about',
          start: "top 70%",
      },
      opacity: 0,
      scale: 0.95,
      duration: 1.5,
      ease: "expo.out"
  });

  // Practice Cards
  const practiceCards = document.querySelectorAll('.practice-card');
  practiceCards.forEach((card, index) => {
      gsap.from(card, {
          scrollTrigger: {
              trigger: card,
              start: "top 90%",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          delay: index % 3 * 0.1 // Stagger within a row
      });
  });

  // Education Steps
  const eduSteps = document.querySelectorAll('.edu-step');
  eduSteps.forEach((step, index) => {
      gsap.from(step, {
          scrollTrigger: {
              trigger: step,
              start: "top 95%",
          },
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1
      });
  });

  // Blog
  const blogPosts = document.querySelectorAll('.blog-entry');
  blogPosts.forEach((post) => {
      gsap.from(post, {
          scrollTrigger: {
              trigger: post,
              start: "top 95%",
          },
          opacity: 0,
          y: 20,
          duration: 0.8
      });
  });


  // --- 5. CONTACT FORM & CAPTCHA ---

  // Phone input restriction
  const phoneInput = document.getElementById('phone');
  phoneInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
  });

  // Captcha Generation
  const captchaQ = document.getElementById('captcha-question');
  const n1 = Math.floor(Math.random() * 10);
  const n2 = Math.floor(Math.random() * 5);
  const captchaSum = n1 + n2;

  if (captchaQ) {
      captchaQ.innerText = `${n1} + ${n2} = `;
  }

  const contactForm = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-message');

  contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const userAns = parseInt(document.getElementById('captcha-answer').value);

      if (userAns !== captchaSum) {
          showMessage("Invalid captcha result", "var(--color-accent)");
          return;
      }

      showMessage("One moment, sending...", "var(--color-text)");

      // AJAX Simulation
      setTimeout(() => {
          showMessage("Success! We will contact you shortly.", "green");
          contactForm.reset();
      }, 1500);
  });

  function showMessage(text, color) {
      if (formMsg) {
          formMsg.innerText = text;
          formMsg.style.color = color;
          formMsg.style.display = "block";
      }
  }


  // --- 6. COOKIE POPUP ---

  const cookiePopup = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('cookie-accept');

  // New key for Nimb-Netx
  if (!localStorage.getItem('nimb_cookies_accepted')) {
      setTimeout(() => {
          if (cookiePopup) cookiePopup.style.display = 'flex';
      }, 3000);
  }

  cookieBtn?.addEventListener('click', () => {
      localStorage.setItem('nimb_cookies_accepted', 'true');
      cookiePopup.style.display = 'none';
  });


  // --- 7. HEADER SCROLL EFFECT ---

  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });

});