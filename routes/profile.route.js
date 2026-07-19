// Route profile.route.js
// ========================

const router = require("express").Router();
const profileService = require("../services/home.service");

router.get("/", async (req, res) => {

  try {

    const province = req.query.province;

    const district = req.query.area || "all";

    const page = Number(req.query.page || 1);

    const profiles = await profileService.getProfiles({
      province,
      district,
      page
    });

    console.log(req.query);
    console.log("LOG DISTRICT", district);

    res.json({ profiles });

  } catch(err){

    console.error(err);

    res.status(500).json({
      message:"Server Error"
    });

  }

});

module.exports = router;