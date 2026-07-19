// ===========================
// Profiles theo tỉnh
// ===========================
async function getProfiles(province, district = "all", page = 1) {

    let url = `/api/profiles?province=${province}&page=${page}`;

    if (district !== "all") {
        url += `&district=${encodeURIComponent(district)}`;
    }

    const res = await fetch(url);

    return await res.json();
}


// ===========================
// Profiles theo huyện
// ===========================
async function getProfilesByArea(province, district, page = 1) {

    const res = await fetch(
        `/api/profiles?province=${province}&district=${encodeURIComponent(district)}&page=${page}`
    );

    return await res.json();
}