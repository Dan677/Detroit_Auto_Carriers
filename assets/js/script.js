'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * NAVBAR TOGGLE
   */
  const navbar = document.querySelector('[data-navbar]');
  const navToggler = document.querySelectorAll('[data-nav-toggler]');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const overlay = document.querySelector('[data-overlay]');

  if (navbar && navToggler && navLinks && overlay) {
    navToggler.forEach(toggler => {
      toggler.addEventListener('click', () => {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // ✅ blocăm/deblocăm scroll-ul
      });
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll'); // ✅ când se închide, scoatem blocarea
      });
    });
  }

  /**
   * SMOOTH SCROLL FOR #newsletter LINKS
   */
  document.querySelectorAll('a[href^="#newsletter"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 50;
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const scrollToPosition = targetRect - bodyRect - offset;

        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  /**
   * HEADER SCROLL AND BACK TO TOP BUTTON
   */
  const header = document.querySelector('[data-header]');
  const backTopBtn = document.querySelector('[data-back-top-btn]');

  if (header && backTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 100) {
        header.classList.add('active');
        backTopBtn.classList.add('active');
      } else {
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
      }
    });
  }

  /**
   * ZONE CARDS TOOLTIP
   */
  const zoneCards = document.querySelectorAll('.zone-card');
  const tooltip = document.getElementById('zone-tooltip');
  const tooltipCity = document.getElementById('tooltip-city');
  const tooltipCars = document.getElementById('tooltip-cars');
  const tooltipClients = document.getElementById('tooltip-clients');

  if (tooltip && tooltipCity && tooltipCars && tooltipClients) {
    let hideTimeout;
    zoneCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (hideTimeout) clearTimeout(hideTimeout);
        const city = card.querySelector('.card-title').textContent;
        let cars = card.dataset.cars || 0;
        let clients = card.dataset.clients || 0;
        if (city === 'Chicago') { cars = 120; clients = 80; }
        else if (city === 'Texas') { cars = 50; clients = 30; }
        else if (city === 'Michigan') { cars = 60; clients = 57; }
        tooltipCity.textContent = city;
        tooltipCars.textContent = `🚗 Cars Delivered: ${cars}`;
        tooltipClients.textContent = `👥 Clients Served: ${clients}`;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
      });

      card.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 15 + 'px';
        tooltip.style.top = e.pageY + 15 + 'px';
      });

      card.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        hideTimeout = setTimeout(() => {
          tooltip.style.display = 'none';
        }, 300);
      });
    });
  }

  /**
   * READ MORE BUTTONS
   */
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const card = button.closest('.card-content');
      const output = card.querySelector('.extra-text');
      const label = button.querySelector('.span');
      const message = button.getAttribute('data-text');
      const isHidden = window.getComputedStyle(output).display === 'none';
      if (isHidden) {
        output.innerText = message;
        output.style.display = 'block';
        label.innerText = 'Close details';
      } else {
        output.style.display = 'none';
        label.innerText = 'Read More';
      }
    });
  });

  /**
   * BLOG POSTS "VIEW DETAIL" BUTTONS
   */
  const blogButtons = document.querySelectorAll('.posts-card .btn-link');
  blogButtons.forEach(button => {
    const card = button.closest('.posts-card');
    const cardText = card.querySelector('.card-text');
    const buttonSpan = button.querySelector('.span');
    const initialText = cardText.getAttribute('data-initial-text');
    const detailedText = button.getAttribute('data-details');
    const initialButtonText = 'View Detail';
    const closeButtonText = 'Close details';

    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (buttonSpan.textContent === initialButtonText) {
        cardText.textContent = detailedText;
        buttonSpan.textContent = closeButtonText;
      } else {
        cardText.textContent = initialText;
        buttonSpan.textContent = initialButtonText;
      }
    });
  });

  /**
   * THEME TOGGLE
   */
  const toggleSwitch = document.getElementById('theme-toggle');
  const headerElem = document.querySelector('.header');
  const footerElem = document.querySelector('.footer');
  const projectCards = document.querySelectorAll('.project-card');

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', () => {
      const isDark = toggleSwitch.checked;
      document.body.classList.toggle('dark-mode', isDark);
      if (headerElem) headerElem.classList.toggle('dark-mode', isDark);
      if (footerElem) footerElem.classList.toggle('dark-mode', isDark);
      projectCards.forEach(card => card.classList.toggle('dark-mode', isDark));
    });
  }

  /**
   * IN-VIEW ANIMATIONS
   */
  const sections = [
    '.hero-content',
    '.about-content',
    '.service',
    '.zone',
    '.project',
    '.blog',
    '.Posts',
    '.newsletter',
    '.footer',
    '.header',
  ];

  sections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      const checkInView = () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          section.classList.add('show');
        } else {
          section.classList.remove('show');
        }
      };
      window.addEventListener('load', checkInView);
      window.addEventListener('scroll', checkInView);
    }
  });

  /**
   * CONTACT FORM
   */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('https://formspree.io/f/mldwkypw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          form.reset();
        } else {
          alert('A apărut o problemă la trimiterea formularului.');
        }
      } catch (error) {
        alert('A apărut o eroare de rețea.');
      }
    });
  }

  /**
   * COOKIE MODAL
   */
  const modal = document.getElementById('cookieModal');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');

  if (modal && acceptBtn && declineBtn) {
    if (!localStorage.getItem('cookieConsent')) {
      modal.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      modal.style.display = 'none';
    });

    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      modal.style.display = 'none';
    });
  }

  /**
   * TOGGLE ROUTES
   */
  const zones = document.getElementById('zones');
  const toggleBtn = document.getElementById('toggle-routes');
  const extra = document.getElementById('extra-routes');

  if (zones && toggleBtn && extra) {
    console.log('Zones:', zones);
    console.log('ToggleBtn:', toggleBtn);
    console.log('Extra:', extra);

    // Setare inițială
    zones.classList.remove('routes-expanded');
    toggleBtn.setAttribute('aria-expanded', 'false');
    extra.setAttribute('aria-hidden', 'true');

    // Logica de click
    toggleBtn.addEventListener('click', () => {
      console.log('Butonul toggle-routes a fost apăsat!');
      const expanded = zones.classList.toggle('routes-expanded');
      toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggleBtn.textContent = expanded ? 'Less Routes' : 'More Routes';
      extra.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    });
  } else {
    console.warn('Routes toggle: element missing', { zones, toggleBtn, extra });
  }

  /**
   * REVIEW CAROUSEL
   */
  const track = document.querySelector('.reviews-track');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.getElementById('review-dots');

  if (track && cards.length && prevBtn && nextBtn && dotsContainer) {
    let index = 0;
    const total = cards.length;

    // Generează buline
    cards.forEach((_, i) => {
      let dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll('#review-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Evenimente pentru butoane
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % total;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      updateCarousel();
    });

    // Inițializare
    updateCarousel();

    // Autoplay (opțional)
    let autoPlayInterval = setInterval(() => {
      index = (index + 1) % total;
      updateCarousel();
    }, 6000);

    // Oprește autoplay la hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        index = (index + 1) % total;
        updateCarousel();
      }, 6000);
    });
  } else {
    console.warn('Review carousel: element missing', { track, cards, prevBtn, nextBtn, dotsContainer });
  }
});
 document.querySelectorAll(".flip-card").forEach(card => {
     card.addEventListener("click", () => {
       card.classList.toggle("flipped");
     });
   });