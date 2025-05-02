document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate On Scroll) ---
    // Docs: https://github.com/michalsnik/aos
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
    // -------------------------------------------


    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Search Form Handler ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                // Redirect to a search results page (e.g., search.html)
                // Pass the search term as a query parameter
                // NOTE: You need to create 'search.html' and implement
                // actual search logic there (likely with backend help or a CMS).
                // Ensure you have a page named search.html or change the path below
                window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
            } else {
                // Optional: Handle empty search input
                console.log("Search term is empty.");
                // searchInput.focus(); // Optionally refocus the input
            }
        });
    }
    // ---------------------------

    // Smooth scrolling for internal links (Improved with offset & navbar closing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (targetId.length > 1 && targetId.startsWith('#')) {
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                    e.preventDefault();
                    const navbar = document.querySelector('.main-nav.fixed-top');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Calculate position relative to the document, minus navbar height
                    const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile navbar after click
                     const navbarToggler = document.querySelector('.navbar-toggler');
                     const navbarCollapse = document.querySelector('.navbar-collapse');
                     // Check if the toggler is visible (mobile view) and the collapse menu is shown
                     if (navbarToggler && getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                          if (bsCollapse) {
                             bsCollapse.hide();
                          }
                     }
                 }
            }
        });
    });

    console.log("Affiliate site script loaded. AOS Initialized. Search handler added.");

});
