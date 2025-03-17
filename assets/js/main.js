(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  // const preloader = document.querySelector('#preloader');
  // if (preloader) {
  //   window.addEventListener('load', () => {
  //     preloader.remove();
  //   });
  // }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Initialize Swiper
  const swiper = new Swiper('.client-review-slider', {
    loop: true,
    autoplay: {
      delay: 10000, // 10 seconds
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Modal Elements
    const bookingModal = document.getElementById("bookingModal");
    const closeModal = document.querySelector(".close");
    const bookConsultationBtn = document.querySelector(".btn-get-started");
    const datePicker = document.getElementById("datePicker");
    const timeSlots = document.getElementById("timeSlots");
    const userDetails = document.getElementById("userDetails");
    const submitBooking = document.getElementById("submitBooking");
    const timeSlot = document.getElementById("timeSlot");

    // Bootstrap Alert Elements
    const bookingAlert = document.getElementById("bookingAlert");
    const bookingAlertMessage = document.getElementById("bookingAlertMessage");

    // Function to show Bootstrap Alert
    function showBootstrapAlert(message, type = "success") {
      bookingAlertMessage.innerHTML = message;
      bookingAlert.className = `alert alert-${type} alert-dismissible fade show`;
      bookingAlert.style.display = "block";

      // Auto-hide alert after 4 seconds
      setTimeout(() => {
        bookingAlert.style.display = "none";
      }, 4000);
    }

    // Function to show the modal
    function showModal() {
      if (bookingModal) {
        bookingModal.style.display = "flex";
      }
    }

    // Open modal
    if (bookConsultationBtn) {
      bookConsultationBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showModal();
      });
    }

    // Close modal
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        bookingModal.style.display = "none";
      });
    }

    window.addEventListener("click", function (event) {
      if (event.target === bookingModal) {
        bookingModal.style.display = "none";
      }
    });

    // Date selection functionality
    if (datePicker) {
      datePicker.addEventListener("change", function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

        if (selectedDate < today) {
          showBootstrapAlert("You cannot select a past date.", "danger");
          this.value = "";
          timeSlots.style.display = "none";
          userDetails.style.display = "none";
          return;
        }

        timeSlots.style.display = "block";
      });
    }

    // Time slot selection functionality
    if (timeSlot) {
      timeSlot.addEventListener("change", function () {
        userDetails.style.display = this.value ? "block" : "none";
      });
    }

    // Submit booking functionality
    if (submitBooking) {
      submitBooking.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        const selectedDate = document.getElementById("datePicker").value;
        const selectedTime = document.getElementById("timeSlot").value;
    
        if (!name || !email || !selectedDate || !selectedTime || !subject || !message) {
          showBootstrapAlert("Please fill in all required fields!", "danger");
          return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);
        formData.append("date", selectedDate);
        formData.append("time", selectedTime);
    
        fetch("forms/appointment.php", { 
          method: "POST",
          body: formData,
        })
        
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            showBootstrapAlert("Booking request sent successfully!", "success");
            setTimeout(() => {
              bookingModal.style.display = "none";
            }, 2000);
          } else {
            showBootstrapAlert(data.message, "danger");
          }
        })
        .catch(error => {
          showBootstrapAlert("An error occurred. Please try again later.", "danger");
          console.error("Error:", error);
        });
      });
    }
    
  });
})();