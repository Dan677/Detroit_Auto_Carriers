'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /**
   * NAVBAR TOGGLE
   */
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelectorAll("[data-nav-toggler]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const overlay = document.querySelector("[data-overlay]");

  navToggler.forEach(toggler => {
    toggler.addEventListener("click", () => {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  document.querySelectorAll('a[href^="#newsletter"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offset = 50;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const scrollToPosition = targetRect - bodyRect - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    });
  });

  /**
   * HEADER SCROLL AND BACK TO TOP BUTTON
   */
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });

  /**
   * ZONE CARDS TOOLTIP
   */
  const zoneCards = document.querySelectorAll('.zone-card');
  const tooltip = document.getElementById('zone-tooltip');
  const tooltipCity = document.getElementById('tooltip-city');
  const tooltipCars = document.getElementById('tooltip-cars');
  const tooltipClients = document.getElementById('tooltip-clients');

  let hideTimeout;

  zoneCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      if(hideTimeout) clearTimeout(hideTimeout);
      const city = card.querySelector('.card-title').textContent;
      let cars = card.dataset.cars;
      let clients = card.dataset.clients;
      if(city === "Chicago") { cars = 120; clients = 80; }
      else if(city === "Texas") { cars = 50; clients = 30; }
      else if(city === "Michigan") { cars = 60; clients = 57; }
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

  /**
   * READ MORE BUTTONS (if applicable to other sections)
   */
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  readMoreButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      const card = button.closest(".card-content");
      const output = card.querySelector(".extra-text");
      const label = button.querySelector(".span");
      const message = button.getAttribute("data-text");
      const isHidden = window.getComputedStyle(output).display === "none";
      if (isHidden) {
        output.innerText = message;
        output.style.display = "block";
        label.innerText = "Close details";
      } else {
        output.style.display = "none";
        label.innerText = "Read More";
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

  toggleSwitch.addEventListener('change', () => {
    const isDark = toggleSwitch.checked;
    document.body.classList.toggle('dark-mode', isDark);
    headerElem.classList.toggle('dark-mode', isDark);
    footerElem.classList.toggle('dark-mode', isDark);
    projectCards.forEach(card => card.classList.toggle('dark-mode', isDark));
  });

  const heroContent = document.querySelector(".hero-content");

  function checkHeroInView() {
    const rect = heroContent.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      heroContent.classList.add("show");
    } else {
      heroContent.classList.remove("show");
    }
  }

  // verificare la load (inclusiv redirecționare #home)
  window.addEventListener("load", checkHeroInView);
  // verificare la scroll
  window.addEventListener("scroll", checkHeroInView);
  const aboutContent = document.querySelector(".about-content");

  function checkAboutInView() {
    const rect = aboutContent.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      aboutContent.classList.add("show");
    } else {
      aboutContent.classList.remove("show");
    }
  }

  // verificare la scroll și load
  window.addEventListener("load", checkAboutInView);
  window.addEventListener("scroll", checkAboutInView);
  const serviceSection = document.querySelector(".service");

  function checkServiceInView() {
    const rect = serviceSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      serviceSection.classList.add("show");
    } else {
      serviceSection.classList.remove("show");
    }
  }

  // verificare la scroll și load
  window.addEventListener("load", checkServiceInView);
  window.addEventListener("scroll", checkServiceInView);

  const zoneSection = document.querySelector(".zone");

  function checkZoneInView() {
    const rect = zoneSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      zoneSection.classList.add("show");
    } else {
      zoneSection.classList.remove("show");
    }
  }

  // verificare la load și scroll
  window.addEventListener("load", checkZoneInView);
  window.addEventListener("scroll", checkZoneInView);

  const projectSection = document.querySelector(".project");

  function checkProjectInView() {
    const rect = projectSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      projectSection.classList.add("show");
    } else {
      projectSection.classList.remove("show");
    }
  }

  // verificare la load și scroll
  window.addEventListener("load", checkProjectInView);
  window.addEventListener("scroll", checkProjectInView);

  const blogSection = document.querySelector(".blog");

  function checkBlogInView() {
    const rect = blogSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      blogSection.classList.add("show");
    } else {
      blogSection.classList.remove("show");
    }
  }

  // verificare la load și scroll
  window.addEventListener("load", checkBlogInView);
  window.addEventListener("scroll", checkBlogInView);

  const postsSection = document.querySelector(".Posts");

  function checkPostsInView() {
    const rect = postsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      postsSection.classList.add("show");
    } else {
      postsSection.classList.remove("show");
    }
  }

  // verificare la load și scroll
  window.addEventListener("load", checkPostsInView);
  window.addEventListener("scroll", checkPostsInView);

  const newsletterSection = document.querySelector(".newsletter");

  function checkNewsletterInView() {
    const rect = newsletterSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      newsletterSection.classList.add("show");
    } else {
      newsletterSection.classList.remove("show");
    }
  }

  // verificare la load și scroll
  window.addEventListener("load", checkNewsletterInView);
  window.addEventListener("scroll", checkNewsletterInView);

  const footerSection = document.querySelector(".footer");

  function checkFooterInView() {
    const rect = footerSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      footerSection.classList.add("show");
    } else {
      footerSection.classList.remove("show");
    }
  }
  // verificare la load și scroll
  window.addEventListener("load", checkFooterInView);
  window.addEventListener("scroll", checkFooterInView);

  const headerSection = document.querySelector(".header");

  function checkHeaderInView() {
    const rect = headerSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      headerSection.classList.add("show");
    } else {
      headerSection.classList.remove("show");
    }
  }

  window.addEventListener("load", checkHeaderInView);
  window.addEventListener("scroll", checkHeaderInView);

const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('https://formspree.io/f/mldwkypw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        form.reset();
      } else {
        // Aici poți arăta un mesaj de eroare
        alert('A apărut o problemă la trimiterea formularului.');
      }
    } catch (error) {
      // Aici poți gestiona erorile de rețea
      alert('A apărut o eroare de rețea.');
    }
  });
});
 document.getElementById("calcForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const cars = parseInt(document.getElementById("cars").value);
        const distance = parseInt(document.getElementById("distance").value);
        const type = document.getElementById("type").value;
        let rate = type === "open" ? 0.5 : 0.8; // $/mile
        let total = cars * distance * rate;
        document.getElementById("calcResult").textContent =
          "Estimated Cost: $" + total.toFixed(2);
      });



