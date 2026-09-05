const router = require("express").Router();

const telegramController = require("../controllers/telegram.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.get(
  "/verify-telegram",
  authMiddleware,
  telegramController.verifyTelegram
);


module.exports = router;