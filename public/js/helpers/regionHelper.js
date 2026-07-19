// =======================================
// Province Helper
// =======================================

// Lấy province theo slug
window.getProvinceBySlug = function (slug) {

    for (const provinces of Object.values(window.REGIONS)) {

        const province = provinces.find(
            p => p.slug === slug
        );

        if (province) {
            return province;
        }

    }

    return null;

};


// Lấy tên miền theo slug
window.getRegionByProvince = function (slug) {

    for (const [region, provinces] of Object.entries(window.REGIONS)) {

        if (provinces.some(p => p.slug === slug)) {

            return region;

        }

    }

    return null;

};


// Lấy danh sách huyện
window.getAreas = function (slug) {

    const province = getProvinceBySlug(slug);

    return province
        ? province.areas
        : [];

};