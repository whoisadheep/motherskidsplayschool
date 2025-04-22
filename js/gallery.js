// Add this to your existing script tag in schedule.html, right after the DOMContentLoaded event listeners
document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
  });
// Mobile sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    
    // Open sidebar
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
      });
    }
    
    // Close sidebar functions
    function closeSidebarMenu() {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Close when X is clicked
    if (closeSidebar) {
      closeSidebar.addEventListener('click', closeSidebarMenu);
    }
    
    // Close when overlay is clicked
    if (overlay) {
      overlay.addEventListener('click', closeSidebarMenu);
    }
    
    // Close when a link is clicked
    if (sidebarLinks.length > 0) {
      sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
          closeSidebarMenu();
        });
      });
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Function to update visible items array
    function updateVisibleItems() {
      visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }
    
    // Open lightbox when clicking on a gallery item
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        updateVisibleItems();
        const itemImg = this.querySelector('img');
        const itemCaption = this.querySelector('.gallery-info h3').textContent;
        
        lightboxImg.src = itemImg.src;
        lightboxCaption.textContent = itemCaption;
        
        // Find the index in visible items
        currentIndex = visibleItems.indexOf(this);
        
        lightbox.classList.add('active');
      });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });
    
    // Also close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : visibleItems.length - 1;
      const prevItem = visibleItems[currentIndex];
      const prevImg = prevItem.querySelector('img');
      const prevCaption = prevItem.querySelector('.gallery-info h3').textContent;
      
      lightboxImg.src = prevImg.src;
      lightboxCaption.textContent = prevCaption;
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex < visibleItems.length - 1) ? currentIndex + 1 : 0;
      const nextItem = visibleItems[currentIndex];
      const nextImg = nextItem.querySelector('img');
      const nextCaption = nextItem.querySelector('.gallery-info h3').textContent;
      
      lightboxImg.src = nextImg.src;
      lightboxCaption.textContent = nextCaption;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      } else if (e.key === 'Escape') {
        closeLightbox.click();
      }
    });
    
    // Update visible items when filter changes
    filterButtons.forEach(button => {
      button.addEventListener('click', updateVisibleItems);
    });
    
    // Smooth scroll for navigation (from your original script)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    // Animation for decorative bubbles (from your original script)
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
      const randomDelay = Math.random() * 5;
      bubble.style.animationDelay = `${randomDelay}s`;
    });
  });