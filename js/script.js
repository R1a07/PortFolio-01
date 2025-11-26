// GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Page load animations
(function() {
  // Set initial states - only for navigation
  gsap.set('.nav', { y: -100, opacity: 0 });
  gsap.set('.nav-logo', { opacity: 0, x: -30 });
  gsap.set('.nav-link', { opacity: 0, y: -20 });
  
  // Navigation animation
  const navTl = gsap.timeline();
  navTl
    .to('.nav', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    })
    .to('.nav-logo', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.nav-link', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4');
})();

// Button animation setup - can be disabled by setting ENABLE_BUTTON_ANIMATION = false
const ENABLE_BUTTON_ANIMATION = true;

// IMMEDIATELY fix buttons - only run if animation is disabled
(function() {
  if (!ENABLE_BUTTON_ANIMATION) {
    function fixButtons() {
      document.querySelectorAll('.btn-primary').forEach(btn => {
        // Kill ALL GSAP animations and ScrollTriggers
        if (typeof gsap !== 'undefined') {
          gsap.killTweensOf(btn);
          // Kill all ScrollTriggers affecting button
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars && (st.vars.trigger === btn || st.trigger === btn)) {
              st.kill();
            }
          });
          // Kill animations on ALL parents
          let parent = btn.parentElement;
          while (parent && parent !== document.body) {
            gsap.killTweensOf(parent);
            gsap.set(parent, { clearProps: 'transform,opacity,y,x' });
            // Kill ScrollTriggers on parents
            ScrollTrigger.getAll().forEach(st => {
              if (st.vars && (st.vars.trigger === parent || st.trigger === parent)) {
                st.kill();
              }
            });
            parent = parent.parentElement;
          }
          gsap.set(btn, { clearProps: 'all', opacity: 1, y: 0, x: 0, scale: 1 });
        }
        // Force inline styles
        btn.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: inline-block !important; transform: translateY(0) translateX(0) !important; position: relative !important; z-index: 99999 !important;';
      });
    }
    // Run immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fixButtons);
    } else {
      fixButtons();
    }
    window.addEventListener('load', fixButtons);
    // Run continuously
    setInterval(fixButtons, 50);
    window.addEventListener('scroll', fixButtons, { passive: true });
    window.addEventListener('resize', fixButtons, { passive: true });
  }
})();


// Navigation scroll effect
gsap.to('.nav', {
  backgroundColor: 'rgba(10, 10, 10, 0.95)',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top -100',
    end: 'bottom top',
    scrub: true
  }
});

// Hero animations
const heroTl = gsap.timeline();

// Prevent animations on hero-text parent (but allow button animation if enabled)
const heroText = document.querySelector('.hero-text');
if (heroText && typeof gsap !== 'undefined' && !ENABLE_BUTTON_ANIMATION) {
  gsap.killTweensOf(heroText);
  gsap.set(heroText, { clearProps: 'all' });
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars && st.vars.trigger === heroText) st.kill();
  });
}

// Set initial state for hero button
const heroButton = document.querySelector('.hero .btn-primary');
if (heroButton) {
  gsap.set(heroButton, { opacity: 0, y: 50, scale: 0.8 });
}

heroTl
  .from('.hero-title .line', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .to('.hero .btn-primary', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.3');

heroTl
  .from('.hero-circle', {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.7)'
  }, '-=1')
  .to('.scroll-indicator', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5');


// Hero circle animation is handled by CSS animations for better performance
// The circle rotates continuously and the border pops out with scale animation

// Scroll indicator animation
gsap.to('.scroll-indicator', {
  opacity: 0,
  y: -20,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Section animations
const sections = document.querySelectorAll('section:not(.hero)');

sections.forEach((section, index) => {
  gsap.from(section.querySelector('.section-header'), {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 50%',
      scrub: true
    }
  });

  // Content animations - exclude contact-content and anything with buttons
  const content = section.querySelectorAll('.about-content, .skills-grid, .projects-grid');
  content.forEach(item => {
    // Skip if contains button
    if (item.querySelector('.btn-primary')) return;
    
    const children = Array.from(item.children).filter(child => !child.querySelector('.btn-primary'));
    if (children.length > 0) {
      gsap.from(children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true
        }
      });
    }
  });
  
  // Contact section button animation (only if enabled)
  if (section.classList.contains('contact')) {
    const contactContent = section.querySelector('.contact-content');
    const contactForm = section.querySelector('.contact-form');
    const contactButton = section.querySelector('.btn-primary');
    
    if (!ENABLE_BUTTON_ANIMATION) {
      // Disable all animations if button animation is disabled
      if (contactContent && typeof gsap !== 'undefined') {
        gsap.killTweensOf(contactContent);
        gsap.set(contactContent, { clearProps: 'all' });
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars && st.vars.trigger === contactContent) st.kill();
        });
      }
      if (contactForm && typeof gsap !== 'undefined') {
        gsap.killTweensOf(contactForm);
        gsap.set(contactForm, { clearProps: 'all' });
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars && st.vars.trigger === contactForm) st.kill();
        });
      }
      if (contactButton && typeof gsap !== 'undefined') {
        gsap.killTweensOf(contactButton);
        gsap.set(contactButton, { clearProps: 'all', opacity: 1, y: 0, x: 0 });
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars && st.vars.trigger === contactButton) st.kill();
        });
      }
    } else {
      // Animate contact button on scroll
      if (contactButton) {
        gsap.set(contactButton, { opacity: 0, y: 50, scale: 0.8 });
        gsap.to(contactButton, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: contactButton,
            start: 'top 85%',
            end: 'top 60%',
            scrub: false,
            once: true
          }
        });
      }
    }
  }
});

// About stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
  const target = parseInt(stat.getAttribute('data-target'));
  const counter = { value: 0 };

  ScrollTrigger.create({
    trigger: stat,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(counter, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          stat.textContent = Math.floor(counter.value);
        }
      });
    }
  });
});

// Skills progress bar animation
const skillBars = document.querySelectorAll('.skill-progress');

skillBars.forEach(bar => {
  const width = bar.getAttribute('data-width');
  
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(bar, {
        width: `${width}%`,
        duration: 1.5,
        ease: 'power2.out'
      });
    }
  });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Smooth scroll for navigation links - immediate response
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80; // Navigation height
      const targetPosition = target.offsetTop - offset;
      
      // Use GSAP ScrollToPlugin for smooth scroll - immediate start
      if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
        // Kill any existing scroll animations
        gsap.killTweensOf(window);
        // Start immediately with no delay
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { 
            y: target, 
            offsetY: offset 
          },
          ease: 'power2.inOut',
          immediateRender: false,
          overwrite: true
        });
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // No animation on submit to prevent button from disappearing

    // Here you would normally send the form data
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Parallax effect for hero
gsap.to('.hero-visual', {
  y: -100,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Text reveal animation
const revealElements = document.querySelectorAll('.about-description, .project-description');

revealElements.forEach(element => {
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'top 60%',
      scrub: true
    }
  });
});

// Contact links animation - exclude contact-form to prevent button animation
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach((link, index) => {
  // Skip if link is inside contact-form (which contains button)
  if (link.closest('.contact-form')) {
    return;
  }
  
  gsap.from(link, {
    x: -50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.1,
    scrollTrigger: {
      trigger: link,
      start: 'top 85%',
      end: 'top 60%',
      scrub: true
    }
  });
});


