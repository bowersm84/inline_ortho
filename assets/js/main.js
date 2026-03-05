/* ============================================================
   inLine Orthodontics — Main JavaScript
   MBR Project Solutions, LLC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     1. HEADER SCROLL EFFECT
     -------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* --------------------------------------------------------
     2. MOBILE NAVIGATION
     -------------------------------------------------------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  function openMobileNav() {
    mobileToggle.classList.add('mobile-toggle--active');
    mainNav.classList.add('main-nav--open');
    if (navOverlay) navOverlay.classList.add('nav-overlay--visible');
    body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileToggle.classList.remove('mobile-toggle--active');
    mainNav.classList.remove('main-nav--open');
    if (navOverlay) navOverlay.classList.remove('nav-overlay--visible');
    body.style.overflow = '';
  }

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('main-nav--open');
      isOpen ? closeMobileNav() : openMobileNav();
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileNav);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('main-nav--open')) {
        closeMobileNav();
      }
    });
  }


  /* --------------------------------------------------------
     3. MOBILE DROPDOWN TOGGLES
     -------------------------------------------------------- */
  const navItems = document.querySelectorAll('.main-nav__item');
  navItems.forEach(item => {
    const link = item.querySelector('.main-nav__link');
    const dropdown = item.querySelector('.dropdown');
    
    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        // Only toggle on mobile
        if (window.innerWidth <= 900) {
          e.preventDefault();
          
          // Close other dropdowns
          navItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('main-nav__item--expanded');
            }
          });
          
          item.classList.toggle('main-nav__item--expanded');
        }
      });
    }
  });

  // Close mobile nav when clicking a dropdown link
  document.querySelectorAll('.dropdown__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeMobileNav();
      }
    });
  });


  /* --------------------------------------------------------
     4. SCROLL FADE-IN ANIMATIONS
     -------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show everything
    fadeElements.forEach(el => el.classList.add('fade-in--visible'));
  }


  /* --------------------------------------------------------
     5. SMOOTH SCROLL FOR ANCHOR LINKS
     -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile nav if open
        if (window.innerWidth <= 900) {
          closeMobileNav();
        }
      }
    });
  });


  /* --------------------------------------------------------
     6. ACTIVE NAV HIGHLIGHTING
     -------------------------------------------------------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('.main-nav__link, .dropdown__link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('main-nav__link--active');
        // Also highlight parent nav item
        const parentItem = link.closest('.main-nav__item');
        if (parentItem) {
          const parentLink = parentItem.querySelector('.main-nav__link');
          if (parentLink) parentLink.classList.add('main-nav__link--active');
        }
      }
    }
  });


  /* --------------------------------------------------------
     7. PHONE NUMBER CLICK TRACKING (GA4)
     -------------------------------------------------------- */
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'phone_call', {
          event_category: 'contact',
          event_label: link.getAttribute('href')
        });
      }
    });
  });

});
