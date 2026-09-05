document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // 2. Main Profile Image Slider (Gallery)
    const slides = document.querySelectorAll('.slider-wrapper .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
            });
        });
    }

    // 3. Related Profiles Infinite Carousel (Auto slide every 30s + Manual Controls)
    const relatedTrack = document.querySelector('.related-track');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    
    if (relatedTrack) {
        let scrollAmount = 0;
        const cardWidth = 280; // card width (260px) + gap (20px)

        function slideNextCard() {
            const maxScroll = relatedTrack.scrollWidth - relatedTrack.parentElement.clientWidth;
            scrollAmount += cardWidth;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0; // Quay về đầu nếu hết danh sách
            }
            relatedTrack.style.transform = `translateX(-${scrollAmount}px)`;
        }

        function slidePrevCard() {
            const maxScroll = relatedTrack.scrollWidth - relatedTrack.parentElement.clientWidth;
            scrollAmount -= cardWidth;
            if (scrollAmount < 0) {
                scrollAmount = maxScroll;
            }
            relatedTrack.style.transform = `translateX(-${scrollAmount}px)`;
        }

        // Tự động chuyển card mỗi 30 giây (30000ms)
        let autoSlideInterval = setInterval(slideNextCard, 30000);

        // Nút điều hướng thủ công (reset lại thời gian 30s khi click)
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                slideNextCard();
                resetInterval();
            });
        }

        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                slidePrevCard();
                resetInterval();
            });
        }

        function resetInterval() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(slideNextCard, 30000);
        }
    }
});