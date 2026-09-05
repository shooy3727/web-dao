document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // INITIALIZE LUCIDE ICONS
    // ========================================

    if (window.lucide) {
        lucide.createIcons();
    }


    // ========================================
    // CONFIG
    // ========================================

    const ADMIN_USERS = Array.isArray(window.ADMIN_USERS)
        ? window.ADMIN_USERS
        : [];

    const API_BASE = "/dashboard/admin";


    // ========================================
    // 1. MOBILE SIDEBAR
    // ========================================

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const openSidebarBtn = document.getElementById("open-sidebar-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;

        sidebar.classList.remove("-translate-x-full");
        sidebarOverlay.classList.remove("hidden");
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;

        sidebar.classList.add("-translate-x-full");
        sidebarOverlay.classList.add("hidden");
    }

    if (openSidebarBtn) {
        openSidebarBtn.addEventListener("click", openSidebar);
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }


    // ========================================
    // NAVIGATION ACTIVE
    // ========================================

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navItems.forEach((navItem) => {
                navItem.classList.remove("active");
            });

            item.classList.add("active");

            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });


    // ========================================
    // 2. USER DETAIL MODAL
    // ========================================

    const modal = document.getElementById("user-detail-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalCloseAction = document.getElementById("modal-close-action");

    function closeModal() {
        if (!modal) return;

        modal.classList.add(
            "opacity-0",
            "pointer-events-none"
        );

        const modalContent = modal.firstElementChild;

        if (modalContent) {
            modalContent.classList.add("scale-95");
        }
    }

    function showModal() {
        if (!modal) return;

        modal.classList.remove(
            "opacity-0",
            "pointer-events-none"
        );

        const modalContent = modal.firstElementChild;

        if (modalContent) {
            modalContent.classList.remove("scale-95");
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    if (modalCloseAction) {
        modalCloseAction.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }


    // ========================================
    // 3. BADGE HELPERS
    // ========================================

    function getHumanBadge(status) {
        if (status === "approved") {
            return `
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full
                    bg-emerald-500/10
                    text-emerald-400
                    border border-emerald-500/20">
                    Approved
                </span>
            `;
        }

        if (status === "pending") {
            return `
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full
                    bg-amber-500/10
                    text-amber-400
                    border border-amber-500/20">
                    Pending
                </span>
            `;
        }

        return `
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full
                bg-rose-500/10
                text-rose-400
                border border-rose-500/20">
                Rejected
            </span>
        `;
    }


    function getStatusBadge(status) {
        let className = `
            bg-slate-800
            text-slate-300
            border-slate-700
        `;

        if (status === "active") {
            className = `
                bg-emerald-500/10
                text-emerald-400
                border-emerald-500/20
            `;
        }

        if (status === "rejected") {
            className = `
                bg-rose-500/10
                text-rose-400
                border-rose-500/20
            `;
        }

        return `
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full
                border ${className}">
                ${status || "unknown"}
            </span>
        `;
    }


    // ========================================
    // 4. OPEN USER MODAL - API THẬT
    // ========================================

    window.openUserModal = async function (id) {
        try {
            const response = await fetch(
                `${API_BASE}/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                    "Không thể tải thông tin người dùng."
                );

                return;
            }

            const user = data.user;

            document.getElementById("modal-fullname").innerText =
                user.fullname || "Chưa cập nhật";

            document.getElementById("modal-username").innerText =
                `@${user.username || "--"}`;

            document.getElementById("modal-avatar").innerText =
                (user.fullname || user.username || "U")
                    .charAt(0)
                    .toUpperCase();


            // Thời gian đăng ký

            const createdAt = user.created_at
                ? new Date(user.created_at)
                : null;

            document.getElementById("modal-date").innerText =
                createdAt
                    ? createdAt.toLocaleDateString("vi-VN")
                    : "--";

            document.getElementById("modal-time").innerText =
                createdAt
                    ? createdAt.toLocaleTimeString(
                        "vi-VN",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    )
                    : "--";


            // Khu vực

            document.getElementById("modal-city").innerText =
                user.province ||
                user.area ||
                user.name_area ||
                "Chưa cập nhật";

            document.getElementById("modal-region").innerText =
                user.region || "Chưa cập nhật";


            // Verified Human

            document.getElementById("modal-v-human").innerHTML =
                getHumanBadge(
                    user.human_verification_status
                );


            // Account status

            document.getElementById("modal-status").innerHTML =
                getStatusBadge(user.status);


            showModal();

        } catch (error) {
            console.error("GET USER ERROR:", error);

            alert("Không thể tải thông tin người dùng.");
        }
    };


    // ========================================
    // 5. APPROVE VERIFIED HUMAN
    // ========================================

    window.handleApprove = async function (id) {
        const confirmed = confirm(
            "Bạn có chắc muốn duyệt Verified Human cho người dùng này?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE}/users/${id}/approve`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                    "Không thể duyệt người dùng."
                );

                return;
            }

            alert(
                data.message ||
                "Đã duyệt Verified Human."
            );

            // Reload để toàn bộ:
            // - bảng
            // - card mobile
            // - stats
            // - Verified Human section
            // đều lấy dữ liệu mới từ DB

            window.location.reload();

        } catch (error) {
            console.error("APPROVE HUMAN ERROR:", error);

            alert("Có lỗi xảy ra khi duyệt người dùng.");
        }
    };


    // ========================================
    // 6. REJECT VERIFIED HUMAN
    // ========================================

    window.handleReject = async function (id) {
        const confirmed = confirm(
            "Bạn có chắc muốn từ chối Verified Human cho người dùng này?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE}/users/${id}/reject`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                    "Không thể từ chối người dùng."
                );

                return;
            }

            alert(
                data.message ||
                "Đã từ chối Verified Human."
            );

            window.location.reload();

        } catch (error) {
            console.error("REJECT HUMAN ERROR:", error);

            alert("Có lỗi xảy ra khi từ chối người dùng.");
        }
    };


    // ========================================
    // 7. SEARCH & FILTER
    // ========================================

    const searchInput =
        document.getElementById("search-input");

    const filterRegion =
        document.getElementById("filter-region");

    const filterHuman =
        document.getElementById("filter-human");

    const filterStatus =
        document.getElementById("filter-status");


    function normalizeText(value) {
        return String(value || "")
            .trim()
            .toLowerCase();
    }


    function matchesFilters(user) {
        const searchValue =
            normalizeText(searchInput?.value);

        const regionValue =
            normalizeText(filterRegion?.value);

        const humanValue =
            normalizeText(filterHuman?.value);

        const statusValue =
            normalizeText(filterStatus?.value);


        // Search fullname + username

        const fullname =
            normalizeText(user.fullname);

        const username =
            normalizeText(user.username);

        const searchMatched =
            !searchValue ||
            fullname.includes(searchValue) ||
            username.includes(searchValue);


        // Region

        const regionMatched =
            !regionValue ||
            normalizeText(user.region) === regionValue;


        // Human verification

        let humanMatched = true;

        if (humanValue === "verified") {
            humanMatched =
                user.human_verification_status === "approved";
        }

        if (humanValue === "pending") {
            humanMatched =
                user.human_verification_status === "pending";
        }

        if (humanValue === "rejected") {
            humanMatched =
                user.human_verification_status === "rejected";
        }


        // Status
        // EJS đang dùng Pending / Approved / Rejected
        // nhưng DB của m có active / rejected.
        // Mapping ở đây để filter hoạt động đúng.

        let statusMatched = true;

        if (statusValue === "pending") {
            statusMatched =
                user.human_verification_status === "pending";
        }

        if (statusValue === "approved") {
            statusMatched =
                user.human_verification_status === "approved";
        }

        if (statusValue === "rejected") {
            statusMatched =
                user.human_verification_status === "rejected";
        }


        return (
            searchMatched &&
            regionMatched &&
            humanMatched &&
            statusMatched
        );
    }


    function applyFilters() {
        const tableRows =
            document.querySelectorAll(
                "#user-table-body tr[data-user-id]"
            );

        const cards =
            document.querySelectorAll(
                "#user-card-list [data-user-id]"
            );


        // Desktop table

        tableRows.forEach((row) => {
            const userId =
                Number(row.dataset.userId);

            const user =
                ADMIN_USERS.find(
                    (item) => item.id === userId
                );

            if (!user) {
                return;
            }

            row.style.display =
                matchesFilters(user)
                    ? ""
                    : "none";
        });


        // Mobile cards

        cards.forEach((card) => {
            const userId =
                Number(card.dataset.userId);

            const user =
                ADMIN_USERS.find(
                    (item) => item.id === userId
                );

            if (!user) {
                return;
            }

            card.style.display =
                matchesFilters(user)
                    ? ""
                    : "none";
        });
    }


    if (searchInput) {
        searchInput.addEventListener(
            "input",
            applyFilters
        );
    }

    if (filterRegion) {
        filterRegion.addEventListener(
            "change",
            applyFilters
        );
    }

    if (filterHuman) {
        filterHuman.addEventListener(
            "change",
            applyFilters
        );
    }

    if (filterStatus) {
        filterStatus.addEventListener(
            "change",
            applyFilters
        );
    }

});