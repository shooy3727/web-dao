let page = 1;
let isLoading = false;

const loadMoreButton = document.getElementById("loadMore");
const profileGrid = document.getElementById("profileGrid");

if (loadMoreButton && profileGrid) {

    loadMoreButton.addEventListener("click", async () => {

        // Không cho click liên tục khi request đang chạy
        if (isLoading) return;

        isLoading = true;

        // Page tiếp theo
        const nextPage = page + 1;

        // Loading UI
        loadMoreButton.disabled = true;
        loadMoreButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Đang tải...
        `;

        try {

            const params = new URLSearchParams();

            params.set("page", nextPage);
            params.set("province", window.currentProvince);

            // Area
            if (
                window.currentArea &&
                window.currentArea !== "all"
            ) {
                params.set("area", window.currentArea);
            }

            // Price
            if (
                window.filterState &&
                window.filterState.price !== "all"
            ) {
                params.set(
                    "price",
                    window.filterState.price
                );
            }

            // Sort
            if (
                window.filterState &&
                window.filterState.sort !== "default"
            ) {
                params.set(
                    "sort",
                    window.filterState.sort
                );
            }

            // Age
            if (
                window.filterState &&
                window.filterState.age !== "all"
            ) {
                params.set(
                    "age",
                    window.filterState.age
                );
            }

            // Time
            if (
                window.filterState &&
                window.filterState.time !== "default"
            ) {
                params.set(
                    "time",
                    window.filterState.time
                );
            }

            const res = await fetch(
                `/api/profiles?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error("Load profiles failed");
            }

            const data = await res.json();

            const profiles = data.profiles || [];

            // ==========================================
            // API trả về profile
            // ==========================================

            if (profiles.length > 0) {

                profiles.forEach(profile => {

                    profileGrid.insertAdjacentHTML(
                        "beforeend",
                        renderCard(profile)
                    );

                });

                // Chỉ tăng page SAU KHI request thành công
                page = nextPage;
            }

            // ==========================================
            // Không còn dữ liệu
            // ==========================================

            if (profiles.length < 6) {

                loadMoreButton.style.display = "none";

            } else {

                loadMoreButton.disabled = false;

                loadMoreButton.innerHTML = `
                    <i class="fa-solid fa-plus"></i>
                    Hiển Thị Thêm
                `;
            }

        } catch (err) {

            console.error("Load More Error:", err);

            loadMoreButton.disabled = false;

            loadMoreButton.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Hiển Thị Thêm
            `;

        } finally {

            isLoading = false;

        }

    });

}