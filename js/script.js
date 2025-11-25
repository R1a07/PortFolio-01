// GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

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
  .from('.btn-primary', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-circle', {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.7)'
  }, '-=1');

// Hero circle rotation
gsap.to('.hero-circle', {
  rotation: 360,
  duration: 20,
  repeat: -1,
  ease: 'none'
});

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

  // Content animations
  const content = section.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
  content.forEach(item => {
    gsap.from(item.children, {
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
  });
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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80
        },
        ease: 'power2.inOut'
      });
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation on submit
    gsap.to(contactForm, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

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

// Contact links animation
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach((link, index) => {
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

