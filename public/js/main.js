document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Thêm hiệu ứng đặc biệt khi cuộn trang (Thay đổi độ mờ của Navbar)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Logic Menu vuốt ngang trên Mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-xmark');
        } else {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        }
    });

    // Đóng menu khi bấm ra ngoài hoặc bấm vào các link điều hướng
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        });
    });

    // 3. Xử lý sự kiện click nhanh vào Film Card
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const movieTitle = card.querySelector('.card-title').innerText;
            // In log kiểm tra - Sẵn sàng ghép nối API chi tiết phim tại đây
            console.log(`%c Open Catalog Item: ${movieTitle}`, 'color: #ff2a5f; font-weight: bold; font-size: 12px;');
        });
    });
});