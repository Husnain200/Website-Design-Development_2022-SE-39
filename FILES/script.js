// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidebar functionality
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const mobileOverlay = document.getElementById('mobile-sidebar-overlay');
  const mobileClose = document.getElementById('mobile-sidebar-close');

  // Mobile Services Dropdown
  const servicesToggle = document.getElementById('mobile-services-toggle');
  const servicesMenu = document.getElementById('mobile-services-menu');
  const servicesChevron = document.getElementById('mobile-services-chevron');

  // Mobile Industries Dropdown
  const industriesToggle = document.getElementById('mobile-industries-toggle');
  const industriesMenu = document.getElementById('mobile-industries-menu');
  const industriesChevron = document.getElementById('mobile-industries-chevron');

  // Open sidebar
  function openSidebar() {
    mobileSidebar.classList.remove('-translate-x-full');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Close sidebar
  function closeSidebar() {
    mobileSidebar.classList.add('-translate-x-full');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Toggle dropdown menus
  function toggleDropdown(menu, chevron) {
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
      menu.classList.remove('hidden');
      chevron.classList.add('rotate-180');
    } else {
      menu.classList.add('hidden');
      chevron.classList.remove('rotate-180');
    }
  }

  // Event listeners
  if (mobileToggle) {
    mobileToggle.addEventListener('click', openSidebar);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeSidebar);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeSidebar);
  }

  if (servicesToggle && servicesMenu && servicesChevron) {
    servicesToggle.addEventListener('click', () => {
      toggleDropdown(servicesMenu, servicesChevron);
    });
  }

  if (industriesToggle && industriesMenu && industriesChevron) {
    industriesToggle.addEventListener('click', () => {
      toggleDropdown(industriesMenu, industriesChevron);
    });
  }

  // Close sidebar when clicking on links
  const sidebarLinks = mobileSidebar?.querySelectorAll('a');
  if (sidebarLinks) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }

  // Close sidebar on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !mobileSidebar?.classList.contains('-translate-x-full')) {
      closeSidebar();
    }
  });
});

// Initialize Owl Carousel for testimonials when jQuery is available
if (typeof window.jQuery !== "undefined") {
  $(document).ready(function () {
    $(".testimonial-carousel").owlCarousel({
      items: 1,
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      navText: [
        '<svg class="w-6 h-6 ml-[8px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>',
        '<svg class="w-6 h-6 ml-[8px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>'
      ],
      responsive: {
        0: { items: 1, margin: 10 },
        768: { items: 1, margin: 20 },
        1024: { items: 1, margin: 30 }
      }
    });
  });
}