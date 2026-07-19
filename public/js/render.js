function renderCard(profile) {

    const image =
        profile.images && profile.images.length > 0
            ? profile.images[0]
            : "/images/no-image.jpg";

    const phone = profile.phone
        ? profile.phone.slice(0, -4) + "****"
        : "Liên hệ";

    return `
        <div class="movie-card">

            <div class="card-img-wrapper">

                <div class="card-badges">

                    <span class="badge badge-verified">
                        <i class="fa-solid fa-circle-check"></i>
                        Verified
                    </span>

                    <span class="badge badge-vip">
                        <i class="fa-solid fa-crown"></i>
                        VIP
                    </span>

                </div>

                <img
                    src="${image}"
                    alt="${profile.title}"
                    loading="lazy"
                >

                <span class="card-rating">

                    <i class="fa-solid fa-phone"></i>

                    ${phone}

                </span>

                <div class="card-hover-actions">

                    <button class="action-btn view-detail">

                        <i class="fa-solid fa-eye"></i>

                        <span>Xem Chi Tiết</span>

                    </button>

                    <div class="action-row-buttons">

                        <button class="action-btn-sm favorite">

                            <i class="fa-solid fa-heart"></i>

                        </button>

                        <button class="action-btn-sm contact">

                            <i class="fa-solid fa-comment-dots"></i>

                        </button>

                    </div>

                </div>

            </div>

            <div class="card-info">

                <h3 class="card-title">

                    ${profile.title}

                </h3>

                <div class="card-meta">

                    <span class="meta-price">

                        ${profile.price}

                    </span>

                    <span class="meta-divider">

                        •

                    </span>

                    <span class="meta-location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${profile.location}

                    </span>

                </div>

            </div>

        </div>
    `;
}

function renderGrid(profiles) {

    const grid = document.getElementById("profileGrid");

    if (!profiles || profiles.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-location-dot"></i>

                <h2>Đang cập nhật dữ liệu</h2>

                <p>Khu vực này chưa có profile.</p>

            </div>
        `;

        return;
    }

    let html = "";

    profiles.forEach(profile => {

        html += renderCard(profile);

    });

    grid.innerHTML = html;

}


// Render District
function renderDistricts(districts) {

    const districtSelect = document.querySelector("#filterDistrict");

    if (!districtSelect) return;


    // Reset dropdown
    districtSelect.innerHTML = `
        <option value="all">
            Chọn Quận/Huyện
        </option>
    `;


    // Không có huyện
    if (!districts || districts.length === 0) {

        districtSelect.disabled = true;

        return;
    }

    // Sắp xếp A-Z tiếng Việt
    districts.sort((a, b) =>
        a.name.localeCompare(b.name, "vi")
    );

    districts.forEach(district => {

        districtSelect.innerHTML += `
            <option value="${district.slug}">
                ${district.name}
            </option>
        `;

    });

    districtSelect.disabled = false;

}