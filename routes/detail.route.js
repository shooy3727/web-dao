const express = require("express");
const router = express.Router();

const detailController = require("../controllers/detail.controller");

router.get("/:province/:area/:id", detailController.index);

module.exports = router;