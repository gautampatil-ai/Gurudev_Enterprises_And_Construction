document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // Set Dynamic Current Year in Footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Portfolio Filtering Logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Contact Form Validation Handling
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");
      } else {
        contactForm.classList.remove("was-validated");
        contactForm.reset();
        formSuccess.classList.remove("d-none");
        setTimeout(() => {
          formSuccess.classList.add("d-none");
        }, 5000);
      }
    });
  }

  // Counter Animation for Stats Section
  const counters = document.querySelectorAll(".count-up");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = target / 50;

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
});
