document.addEventListener('DOMContentLoaded', () => {
    
    const card = document.querySelector('.verif-card-glass');

    // 1. Thêm một chút tương tác hover glow cho card (option)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Tạo hiệu ứng spotlight glow nhẹ di chuyển theo chuột
        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px, rgba(168, 36, 255, 0.07) 0%, rgba(255, 255, 255, 0.04) 50%)
        `;
    });

    card.addEventListener('mouseleave', () => {
        // Trả lại nền ban đầu khi chuột rời khỏi
        card.style.background = 'var(--card-bg-glass)';
    });
   
    const btn = document.getElementById("telegramConnectBtn");
    const loading = document.getElementById("telegramLoading");

    if(!btn) return;

    btn.addEventListener("click", () => {
        loading.classList.remove("hidden");
        window.location.href = telegramLink;
    });

});