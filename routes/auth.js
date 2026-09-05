const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const guestMiddleware = require("../middlewares/guest.middleware");

router.get("/", guestMiddleware, authController.showAuth);
router.post("/register", authController.register);
router.post("/login", authController.login);

// Forgot & Reset Password
router.get("/forgot-password", authController.forgotPasswordPage);
router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password/verify", authController.verifyForgotPassword);
router.get("/reset-password", authController.resetPasswordPage);
router.post("/reset-password", authController.resetPassword);

module.exports = router;