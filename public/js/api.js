// ===========================
// Profiles theo tỉnh
// ===========================
async function getProfiles(province, area = "all", page = 1) {

    let url = `/api/profiles?province=${province}&page=${page}`;

    if (area !== "all") {
        url += `&area=${encodeURIComponent(area)}`;
    }

    const res = await fetch(url);

    return await res.json();
}


// ===========================
// Profiles theo huyện
// ===========================
async function getProfilesByArea(province, area, page = 1) {

    const res = await fetch(
        `/api/profiles?province=${province}&area=${encodeURIComponent(district)}&page=${page}`
    );

    return await res.json();
}