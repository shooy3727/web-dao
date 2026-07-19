const router = require("express").Router();
const areaService = require("../services/area.service");

router.get("/", async (req, res) => {

    try {

      const province = req.query.province;
      const areas = await areaService.getAreas(province);

      res.json(areas);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Server Error"
      });

    }

});

module.exports = router;