// Render danh sách Quận / Huyện theo tỉnh
function renderDistricts(areas) {

    const districtSelect =
        document.querySelector("#filterDistrict");

    if (!districtSelect) return;


    // Reset danh sách cũ
    districtSelect.innerHTML =
        `<option value="all">Chọn Quận / Huyện</option>`;


    // Nếu chưa có tỉnh hoặc không có huyện
    if (!Array.isArray(areas) || areas.length === 0) {

        districtSelect.disabled = true;

        return;
    }


    // Có dữ liệu huyện
    districtSelect.disabled = false;


    // Đổ danh sách huyện
    areas.forEach(area => {

        const option = document.createElement("option");

        option.value = area.slug;

        option.textContent = area.name;

        districtSelect.appendChild(option);

    });

}

function updateProvinceBadge(provinceName) {
    const provinceBadge = document.querySelector(".province-badge");

    if (!provinceBadge) return;

    const icon = provinceBadge.querySelector("i");

    // Xóa nội dung cũ
    provinceBadge.innerHTML = "";

    // Giữ lại icon
    if (icon) {
        provinceBadge.appendChild(icon);
    } else {
        const newIcon = document.createElement("i");
        newIcon.className = "fa-solid fa-location-dot";
        provinceBadge.appendChild(newIcon);
    }

    // Thêm tên tỉnh
    provinceBadge.append(` ${provinceName}`);
}


// ==========================================
// DOM Ready
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const regionButtons = document.querySelectorAll(".region-btn");

    let openedDropdown = null;

    const districtSelect = document.querySelector("#filterDistrict");


    // ==========================================
    // Hiển thị tỉnh hiện tại theo IP / URL
    // ==========================================

    if (window.currentProvince) {

        const provinceInfo = getProvinceBySlug(
            window.currentProvince
        );

        updateProvinceBadge(
            provinceInfo?.name || "Chưa chọn tỉnh"
        );

        const areaData = getAreas(
            window.currentProvince
        );

        if (districtSelect) {

            renderDistricts(areaData);

            if (
                window.currentArea &&
                window.currentArea !== "all"
            ) {
                districtSelect.value = window.currentArea;
            }
        }

    } else {

        updateProvinceBadge("Chưa chọn tỉnh");

        if (districtSelect) {
            districtSelect.disabled = true;
        }
    }


    // ==========================================
    // Region Buttons
    // ==========================================

    regionButtons.forEach(button => {

        // Li chứa Region Button
        const parent = button.parentElement;

        if (!parent) return;


        // ==========================================
        // Tự tạo dropdown nếu chưa tồn tại
        // ==========================================

        let dropdown = parent.querySelector(
            ".province-dropdown"
        );

        if (!dropdown) {

            dropdown = document.createElement("div");

            dropdown.className = "province-dropdown";

            parent.appendChild(dropdown);
        }


        // ==========================================
        // Mở Dropdown
        // ==========================================

        const openDropdown = () => {

            // Đang mở rồi thì không làm gì
            if (dropdown.classList.contains("open")) {
                return;
            }


            // Đóng dropdown khác
            if (
                openedDropdown &&
                openedDropdown !== dropdown
            ) {
                openedDropdown.classList.remove("open");
            }


            const region = button.dataset.region;

            const provinces =
                window.REGIONS?.[region] || [];


            // Render danh sách tỉnh
            dropdown.innerHTML = provinces.map(province => `
                <button
                    type="button"
                    class="province-item"
                    data-province="${province.slug}">
                    ${province.name}
                </button>
            `).join("");


            // Mở
            dropdown.classList.add("open");

            openedDropdown = dropdown;
        };


        // ==========================================
        // Desktop: Hover vào miền
        // ==========================================

        button.addEventListener("mouseenter", () => {

            if (window.innerWidth > 767) {
                openDropdown();
            }

        });


        // ==========================================
        // Desktop: Rời khỏi cả khu vực menu
        // Không đóng ngay khi rê từ miền xuống dropdown
        // ==========================================

        parent.addEventListener("mouseleave", () => {

            if (window.innerWidth > 767) {

                dropdown.classList.remove("open");

                if (openedDropdown === dropdown) {
                    openedDropdown = null;
                }
            }

        });


        // ==========================================
        // Click Region
        // ==========================================

        button.addEventListener("click", (e) => {

            e.preventDefault();

            e.stopPropagation();


            // Nếu đang mở → đóng
            if (dropdown.classList.contains("open")) {

                dropdown.classList.remove("open");

                if (openedDropdown === dropdown) {
                    openedDropdown = null;
                }

                return;
            }


            // Nếu chưa mở → mở
            openDropdown();

        });

    });


    // ==========================================
    // Click ngoài -> đóng dropdown
    // ==========================================

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".nav-menu")) {

            if (openedDropdown) {

                openedDropdown.classList.remove("open");

                openedDropdown = null;
            }

        }

    });

});


// ==========================================
// Click Province
// ==========================================

document.addEventListener("click", (e) => {

    const provinceBtn = e.target.closest(".province-item");

    if (!provinceBtn) return;


    e.preventDefault();

    e.stopPropagation();


    // ==========================================
    // Lấy slug tỉnh
    // ==========================================

    const province = provinceBtn.dataset.province;

    if (!province) return;


    // ==========================================
    // Lấy thông tin tỉnh
    // ==========================================

    const provinceInfo = getProvinceBySlug(province);

    if (!provinceInfo) return;


    const provinceName = provinceInfo.name;

    const region = getRegionByProvince(province);


    // ==========================================
    // Lưu tỉnh hiện tại
    // ==========================================

    window.currentProvince = province;


    // ==========================================
    // Cập nhật Badge
    // ==========================================

    updateProvinceBadge(provinceName);


    // ==========================================
    // Active Region
    // ==========================================

    document.querySelectorAll(".region-btn").forEach(btn => {
        btn.classList.remove("active");
    });


    const regionBtn = document.querySelector(
        `.region-btn[data-region="${region}"]`
    );

    if (regionBtn) {
        regionBtn.classList.add("active");
    }


    // ==========================================
    // Load URL Profile
    // ==========================================

    window.location.href = `/${province}`;

});


// ==========================================
// Change District
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const districtSelect = document.querySelector("#filterDistrict");

    if (!districtSelect) return;


    districtSelect.addEventListener("change", (e) => {

        const area = e.target.value;


        // Chưa có tỉnh thì không làm gì
        if (!window.currentProvince) return;


        if (area === "all") {

            window.location.href =
                `/${window.currentProvince}`;

            return;
        }


        window.location.href =
            `/${window.currentProvince}/${area}`;

    });

});


// ==================================================
// FILTER: PRICE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    const filterPrice = document.getElementById("filterPrice");
    const filterAge = document.getElementById("filterAge");
    const timeButtons = document.querySelectorAll(".segment-btn");


    // ==================================================
    // Hàm lấy URL hiện tại và cập nhật filter
    // ==================================================

    function updateFilterUrl(key, value) {

        const url = new URL(window.location.href);

        // Giá và sắp xếp dùng chung select
        if (key === "price") {

            // low-high / high-low thực chất là sort
            if (value === "low-high" || value === "high-low") {

                url.searchParams.delete("price");

                url.searchParams.set("sort", value);

            } else {

                url.searchParams.delete("sort");

                if (value === "all") {
                    url.searchParams.delete("price");
                } else {
                    url.searchParams.set("price", value);
                }

            }

        } else {

            if (value === "all" || value === "default") {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }

        }

        window.location.href = url.toString();

    }


    // ==================================================
    // PRICE
    // ==================================================

    if (filterPrice) {

        filterPrice.addEventListener("change", (e) => {

            updateFilterUrl("price", e.target.value);

        });

    }


    // ==================================================
    // AGE
    // ==================================================

    if (filterAge) {

        filterAge.addEventListener("change", (e) => {

            updateFilterUrl("age", e.target.value);

        });

    }


    // ==================================================
    // TIME
    // ==================================================

    timeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const value = button.dataset.value;

            updateFilterUrl("time", value);

        });

    });

});
