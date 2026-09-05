const router = require("express").Router();
const profileService = require("../services/home.service");

router.get("/", async (req, res) => {

    try {

        const province = req.query.province;

        if (!province) {
            return res.status(400).json({
                message: "Province is required"
            });
        }

        const area = req.query.area || "all";
        const page = Number(req.query.page || 1);

        const price = req.query.price || "all";
        const sort = req.query.sort || "default";
        const age = req.query.age || "all";
        const time = req.query.time || "default";

        const profiles = await profileService.getProfiles({
            province,
            area,
            page,
            price,
            sort,
            age,
            time,
            limit: 6
        });

        res.json({
            profiles
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;