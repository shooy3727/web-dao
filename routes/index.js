const router = require("express").Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.home);
router.get("/:province", homeController.home);
router.get("/:province/:area", homeController.home);

module.exports = router;