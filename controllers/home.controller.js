const profileService = require("../services/home.service");
const geoHelper = require("../helpers/geo.helper");
const provinceHelper = require("../helpers/province.helper");

async function home(req, res) {

  try {

    const ip = geoHelper.getClientIp(req);

    let province = req.params.province;
    const area = req.params.area;

    // ==================================================
    // FILTER QUERY
    // ==================================================

    const price = req.query.price || "all";
    const sort = req.query.sort || "default";
    const age = req.query.age || "all";
    const time = req.query.time || "default";


    // ==================================================
    // LẤY TỈNH THEO IP NẾU URL KHÔNG CÓ TỈNH
    // ==================================================

    if (!province) {
      province = await geoHelper.getProvince(ip);
    }


    // ==================================================
    // PROVINCE INFO
    // ==================================================

    const provinceInfo = provinceHelper.getProvinceInfo(province);


    // ==================================================
    // GET PROFILES + FILTER
    // ==================================================

    const profiles = await profileService.getProfiles({
      province,
      area: area || "all",
      page: 1,
      price,
      sort,
      age,
      time,
      limit: 6
    });


    // ==================================================
    // RENDER
    // ==================================================

    res.render("index", {
      profiles,
      province,
      area,
      provinceInfo,
      provinces: provinceHelper.provinces,

      // Trả filter về EJS
      filters: {
        price,
        sort,
        age,
        time
      }

    });

  } catch (err) {

    console.error(err);

    res.status(500).send("Server Error");

  }

}

module.exports = {
  home
};