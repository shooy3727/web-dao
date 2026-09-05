/**
 * Detail Page Interactive Logic
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initGallery();
  initStickySidebar();
  initActions();
  initBackToTop();
});

/* ==================================================
   1. HEADER SCROLL & MOBILE MENU
   ================================================== */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll Shadow Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

/* ==================================================
   2. GALLERY INTERACTION & FADE ANIMATION
   ================================================== */
function initGallery() {
  const mainImage = document.getElementById('mainGalleryImage');
  const thumbItems = document.querySelectorAll('.thumb-item');

  if (!mainImage || thumbItems.length === 0) return;

  thumbItems.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const targetSrc = this.getAttribute('data-full-img');

      if (!targetSrc || mainImage.src === targetSrc) return;

      // Unactive all
      thumbItems.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Soft Fade animation transition
      mainImage.classList.add('fade-out');

      setTimeout(() => {
        mainImage.src = targetSrc;
        mainImage.classList.remove('fade-out');
      }, 150);
    });
  });
}

/* ==================================================
   3. STICKY SIDEBAR ADJUSTMENT
   ================================================== */
function initStickySidebar() {
  const sidebar = document.getElementById('stickySidebar');
  if (!sidebar) return;

  // Xử lý động nếu khoảng cách header thay đổi
  const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 64;
  sidebar.style.top = `${headerHeight + 20}px`;
}

/* ==================================================
   4. USER ACTIONS (Copy Link, Share, Toast)
   ================================================== */
function initActions() {
  const btnShare = document.getElementById('btnShare');
  const btnCopyLinkSidebar = document.getElementById('btnCopyLinkSidebar');
  const btnSave = document.getElementById('btnSave');
  const btnReport = document.getElementById('btnReport');

  // Web Share API hoặc Fallback Sao Chép Đường Dẫn
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } catch (err) {
        // Người dùng hủy chia sẻ
      }
    } else {
      copyToClipboard(window.location.href);
    }
  };

  if (btnShare) btnShare.addEventListener('click', handleShare);
  if (btnCopyLinkSidebar) btnCopyLinkSidebar.addEventListener('click', () => copyToClipboard(window.location.href));

  // Toggle Save
  if (btnSave) {
    btnSave.addEventListener('click', function() {
      this.classList.toggle('active');
      const isSaved = this.classList.contains('active');
      this.style.color = isSaved ? '#ff4fa3' : '';
      showToast(isSaved ? 'Đã lưu hồ sơ thành công' : 'Đã bỏ lưu hồ sơ');
    });
  }

  // Report Button
  if (btnReport) {
    btnReport.addEventListener('click', () => {
      showToast('Đã gửi yêu cầu báo cáo!');
    });
  }
}

// Helper Copy Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Đã sao chép liên kết vào bộ nhớ tạm!');
  }).catch(() => {
    showToast('Không thể sao chép liên kết');
  });
}

// Toast Notification System
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==================================================
   5. BACK TO TOP
   ================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('relatedPrevBtn');
  const nextBtn = document.getElementById('relatedNextBtn');
  const track = document.getElementById('relatedSliderTrack');
  const container = document.getElementById('relatedTrackContainer');

  if (!track || !container) return;

  let currentIndex = 0;

  function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  function getTotalCards() {
    return track.querySelectorAll('.related-card').length;
  }

  function updateSliderPosition() {
    if (window.innerWidth < 768) {
      track.style.transform = 'none';
      return;
    }

    const cardsPerPage = getCardsPerPage();
    const totalCards = getTotalCards();
    const maxIndex = Math.max(0, totalCards - cardsPerPage);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const cards = track.querySelectorAll('.related-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 16;
    const moveDistance = (cardWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveDistance}px)`;

    if (prevBtn && nextBtn) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardsPerPage = getCardsPerPage();
      const totalCards = getTotalCards();
      const maxIndex = Math.max(0, totalCards - cardsPerPage);

      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
      }
    });
  }

  window.addEventListener('resize', () => {
    updateSliderPosition();
  });

  updateSliderPosition();
});