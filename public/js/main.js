document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. Navbar Scroll Effect
    // ==========================================================================
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    // ==========================================================================
    // 2. Mobile Menu
    // ==========================================================================
    const mobileToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const toggleIcon = mobileToggle?.querySelector("i");

    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener("click", (e) => {

            e.stopPropagation();

            navMenu.classList.toggle("mobile-open");

            if (toggleIcon) {

                if (navMenu.classList.contains("mobile-open")) {

                    toggleIcon.classList.remove("fa-bars");
                    toggleIcon.classList.add("fa-xmark");

                } else {

                    toggleIcon.classList.remove("fa-xmark");
                    toggleIcon.classList.add("fa-bars");

                }

            }

        });

        // Cho phép click tỉnh chạy qua province.js
        navMenu.addEventListener("click", (e) => {

            if (e.target.closest(".province-item")) {
                return;
            }

            e.stopPropagation();

        });

        // Click ngoài menu thì đóng
        document.addEventListener("click", (e) => {

            if (
                navMenu.classList.contains("mobile-open") &&
                !navMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)
            ) {

                navMenu.classList.remove("mobile-open");

                if (toggleIcon) {
                    toggleIcon.classList.remove("fa-xmark");
                    toggleIcon.classList.add("fa-bars");
                }

            }

        });

        // Click menu xong thì đóng (trừ nút miền)
        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                // Không đóng menu khi click Miền Bắc/Trung/Nam
                if (link.classList.contains("region-btn")) {
                    return;
                }

                navMenu.classList.remove("mobile-open");

                if (toggleIcon) {
                    toggleIcon.classList.remove("fa-xmark");
                    toggleIcon.classList.add("fa-bars-staggered");
                }

            });

        });

    }

    // ==========================================================================
    // 3. Movie Card
    // ==========================================================================
    // document.querySelectorAll(".movie-card").forEach(card => {

    //     card.addEventListener("click", () => {

    //         const title = card.querySelector(".card-title")?.innerText;

    //         // Debug
    //         // console.log(title);

    //     });

    // });

    // ==========================================================================
    // 4. Back To Top
    // ==========================================================================
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            backToTop.classList.toggle(
                "active",
                window.scrollY > 500
            );

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    // ==========================================================================
    // 6. Mobile: Click toàn bộ Card
    // ==========================================================================

    const profileGrid = document.getElementById("profileGrid");

    if (profileGrid) {

        profileGrid.addEventListener("click", (e) => {

            // Không chuyển trang khi click nút slider
            if (
                e.target.closest(".slider-btn")
            ) {
                return;
            }

            const card = e.target.closest(".model-card");

            if (!card) return;

            const url = card.dataset.url;

            if (url) {
                window.location.href = url;
            }

        });

    }

});

// ==========================================================================
// 7. Hàm xử lý chuyển ảnh cho Slider trong Card
// ==========================================================================

window.slideImage = function (button, direction, event) {

    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const cardMedia = button.closest(".card-media");

    if (!cardMedia) return;

    const images = cardMedia.querySelectorAll(".card-slider img");

    if (images.length <= 1) return;

    let activeIndex = Array.from(images).findIndex(img =>
        img.classList.contains("active")
    );

    if (activeIndex !== -1) {
        images[activeIndex].classList.remove("active");
    }

    // Nếu chưa có ảnh active thì bắt đầu từ ảnh đầu
    if (activeIndex === -1) {
        activeIndex = 0;
    }

    // Tính ảnh tiếp theo
    let newIndex = activeIndex + direction;

    // Xoay vòng
    if (newIndex >= images.length) {
        newIndex = 0;
    }

    if (newIndex < 0) {
        newIndex = images.length - 1;
    }

    images[newIndex].classList.add("active");
};