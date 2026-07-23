/* ==========================================================================
   Jay Gurudev Enterprises & Construction - Master Application JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
  });

  // Dynamic Current Year in Footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Animated Counter Effect for Metrics Section
  const counters = document.querySelectorAll('.count-up');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50; // Calculate step increment

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Scroll Trigger for Counters
  const counterSection = document.getElementById('why-choose');
  if (counterSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = counterSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;
      if (sectionPos < screenPos && !animated) {
        runCounters();
        animated = true;
      }
    });
  }

  // Portfolio Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update Active Button Class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          item.classList.add('aos-animate');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Bootstrap Contact Form Client-Side Validation
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (contactForm.checkValidity()) {
        // Collect form data for processing
        const formData = {
          name: document.getElementById('name').value,
          phone: document.getElementById('phone').value,
          email: document.getElementById('email').value,
          service: document.getElementById('service').value,
          message: document.getElementById('message').value
        };

        console.log('Inquiry Data:', formData);

        // Display Success Alert & Reset
        formSuccess.classList.remove('d-none');
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        contactForm.classList.add('was-validated');
      }
    }, false);
  }
});
