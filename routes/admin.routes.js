const router = require("express").Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    adminController.dashboard
);

// Lấy chi tiết user
router.get(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    adminController.getUser
);

// Đồng ý Verified Human
router.post(
    "/users/:id/approve",
    authMiddleware,
    adminMiddleware,
    adminController.approveHuman
);

// Từ chối Verified Human
router.post(
    "/users/:id/reject",
    authMiddleware,
    adminMiddleware,
    adminController.rejectHuman
);


module.exports = router;