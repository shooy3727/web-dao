window.renderCard = function (profile) {

    const detailUrl =
        `/${profile.province}/${profile.area}/${profile.id}`;

    // ==============================
    // Images
    // ==============================

    const images =
        profile.images && profile.images.length
            ? profile.images
            : ["/images/no-image.jpg"];


    // ==============================
    // Phone
    // ==============================

    const phone = profile.phone
        ? profile.phone.substring(0, 6) + "****"
        : "";


    // ==============================
    // Price
    // ==============================

    const price =
        Number(profile.price || 0).toLocaleString("vi-VN");


    // ==============================
    // Measurements
    // ==============================

    const height =
        profile.measurements?.height || "--";

    const weight =
        profile.measurements?.weight || "--";

    const hop =
        profile.measurements?.hop || "--";

    const hip =
        profile.measurements?.hip || "--";


    // ==============================
    // Render images
    // ==============================

    const imageHTML = images.map((image, index) => `
        <img
            src="${image}"
            alt="${profile.title || ""}"
            class="${index === 0 ? "active" : ""}"
            loading="lazy"
        >
    `).join("");


    // ==============================
    // Card
    // ==============================

    return `
        <article
            class="model-card"
            data-url="${detailUrl}"
        >

            <div class="card-media">

                ${
                    profile.is_verified
                        ? `
                            <span class="badge-verified">
                                <i class="fa-solid fa-circle-check"></i>
                                Verified
                            </span>
                          `
                        : ""
                }


                <span class="card-rating">
                    <i class="fa-solid fa-star"></i>
                    5.0
                </span>


                <!-- Slider buttons -->

                ${
                    images.length > 1
                        ? `
                            <button
                                class="slider-btn prev-btn"
                                onclick="slideImage(this, -1, event)"
                                aria-label="Ảnh trước"
                            >
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>

                            <button
                                class="slider-btn next-btn"
                                onclick="slideImage(this, 1, event)"
                                aria-label="Ảnh sau"
                            >
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                          `
                        : ""
                }


                <!-- Image slider -->

                <div class="card-slider">
                    ${imageHTML}
                </div>

            </div>


            <!-- Card content -->

            <div class="card-content">

                <h3 class="card-title">
                    ${profile.title || "Chưa có tiêu đề"}
                </h3>


                <div class="card-price-loc">

                    <span class="price">
                        ${price} VNĐ
                    </span>

                    <span class="location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${profile.area || profile.location || ""}

                    </span>

                </div>


                <!-- Phone -->

                <div class="btn-card-phone">

                    <i class="fa-solid fa-phone"></i>

                    ${phone}

                </div>


                <!-- Stats -->

                <div class="stats-grid">

                    <div class="stat-box stat-full">

                        Số đo:

                        <strong>
                            ${height}
                            -
                            ${hop}
                            -
                            ${hip}
                        </strong>

                    </div>


                    <div class="stat-box">

                        Cao:

                        <strong>
                            ${height}
                        </strong>

                    </div>


                    <div class="stat-box">

                        Nặng:

                        <strong>
                            ${weight}
                        </strong>

                    </div>

                </div>

            </div>

        </article>
    `;
};