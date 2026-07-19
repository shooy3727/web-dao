const profileService = require("../services/home.service");
const geoHelper = require("../helpers/geo.helper");
const provinceHelper = require("../helpers/province.helper");

async function home(req, res) {

    try {

        const ip = geoHelper.getClientIp(req);

        const province = await geoHelper.getProvince(ip);

        const provinceInfo = provinceHelper.getProvinceInfo(province);

        const profiles = await profileService.getProfilesByProvince(
            province,
            6
        );

        res.render("index", {

            profiles,

            province,

            provinceInfo,

            provinces: provinceHelper.provinces

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

}

module.exports = {
  home
};