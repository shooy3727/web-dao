const router = require("express").Router();

const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  upload,
  convertToWebp
} = require("../middlewares/upload.middleware");

router.get(
  "/",
  authMiddleware,
  dashboardController.index
);

// Tạo hồ sơ
router.post(
  "/create-profile",
  authMiddleware,
  upload.array("images", 5),
  convertToWebp,
  dashboardController.createProfile
);

// Cập nhật hồ sơ
router.put(
  "/update-profile",
  authMiddleware,
  upload.array("images", 5),
  convertToWebp,
  dashboardController.updateProfile
);

// Xóa hồ sơ
router.delete(
  "/profile",
  authMiddleware,
  dashboardController.deleteProfile
);

// Thông tin tài khoản
router.get(
  "/account",
  authMiddleware,
  dashboardController.account
);

// Thay đổi mật khẩu
router.post(
  "/change-password",
  authMiddleware,
  dashboardController.changePassword
);

// Bật-Tắt HS trên Home
router.post(
  "/profile-visibility",
  authMiddleware,
  dashboardController.updateProfileVisibility
);

module.exports = router;