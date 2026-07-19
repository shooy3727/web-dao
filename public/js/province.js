document.addEventListener("DOMContentLoaded", async () => {

    const regionButtons = document.querySelectorAll(".region-btn");

    let openedDropdown = null;

    // Hiển thị tỉnh hiện tại (theo IP)
    const provinceText = document.querySelector(".province-inline-text");

    const districtSelect = document.querySelector("#filterDistrict");

    if (window.currentProvince) {

        const areaData = getAreas(window.currentProvince);

        renderDistricts(areaData);

    } else {

        districtSelect.disabled = true;

    }

    provinceText.textContent = getProvinceBySlug(window.currentProvince)?.name ||
    "Chưa chọn tỉnh";

    regionButtons.forEach(button => {

        const dropdown = button.nextElementSibling;

        button.addEventListener("click", (e) => {

            e.stopPropagation();

            const region = button.dataset.region;

            // Click lại => đóng
            if (dropdown.classList.contains("open")) {

                dropdown.classList.remove("open");
                openedDropdown = null;
                return;
            }

            // Đóng dropdown đang mở
            if (openedDropdown && openedDropdown !== dropdown) {
                openedDropdown.classList.remove("open");
            }

            const provinces = window.REGIONS[region] || [];

            dropdown.innerHTML = provinces.map(province => {

                return `
                    <button
                        class="province-item"
                        data-province="${province.slug}">
                        ${province.name}
                    </button>
                `;

            }).join("");

            dropdown.classList.add("open");

            openedDropdown = dropdown;

        });

    });

    // Click ngoài -> đóng dropdown
    document.addEventListener("click", (e) => {

        if (!e.target.closest(".region-menu")) {

            if (openedDropdown) {

                openedDropdown.classList.remove("open");
                openedDropdown = null;

            }

        }

    });

});


// ============================
// Click Province
// ============================

document.addEventListener("click", async (e) => {

    const provinceBtn = e.target.closest(".province-item");

    if (!provinceBtn) return;

    // Đóng dropdown
    const dropdown = provinceBtn.closest(".province-dropdown");

    if (dropdown) {
        dropdown.classList.remove("open");
    }

    const province = provinceBtn.dataset.province;

    // Lưu tỉnh hiện tại
    window.currentProvince = province;

    const provinceInfo = getProvinceBySlug(province);

    const provinceName = provinceInfo.name;
    const region = getRegionByProvince(province);

    // Hiển thị tên tỉnh
    document.querySelector(".province-inline-text").textContent = provinceName;

    // Active vùng
    document.querySelectorAll(".region-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const regionBtn = document.querySelector(
        `.region-btn[data-region="${region}"]`
    );

    regionBtn?.classList.add("active");

    // Load profile
    const profileData = await getProfiles(province, "all");
    const areaData = getAreas(province);

    renderDistricts(areaData);
    renderGrid(profileData.profiles);

});


// ============================
// Change District
// ============================
const districtSelect = document.querySelector("#filterDistrict");

if (districtSelect) {

    districtSelect.addEventListener("change", async (e) => {

        const area = e.target.value;

        if (area === "all") {

            const data = await getProfiles(
                window.currentProvince,
                "all"
            );

            renderGrid(data.profiles);

            return;
        }

        const data = await getProfiles(
            window.currentProvince,
            area
        );

        renderGrid(data.profiles);

    });

}